"""Consistent SQLite backups, verification, bounded pruning and safe restore."""

from __future__ import annotations

import datetime as dt
import hashlib
import json
import os
import shutil
import sqlite3
import tempfile
from pathlib import Path

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from semi_intel import __version__
from semi_intel.db import get_engine, get_sessionmaker
from semi_intel.domain.enums import BackupStatus
from semi_intel.domain.models import (
    BackupRecord, Notification, OperationalJobLease, ProviderRun, SignalCandidate, Source,
)
from semi_intel.notifications.service import safe_error, utcnow
from semi_intel.operations.scheduler import get_scheduler_settings


BACKUP_PREFIX = "semi-intel-backup-"


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def _inspect_sqlite_file(path: Path) -> dict:
    """Raw sqlite3-level checks only -- integrity, required tables, stamped
    revision, and record counts. No SQLAlchemy/ORM involved and no managed-
    path restriction, so this also backs `BackupService.rehearse`, which runs
    it against a throwaway temporary copy that lives outside the backup
    directory."""
    connection = sqlite3.connect(str(path))
    try:
        integrity = connection.execute("PRAGMA integrity_check").fetchone()[0]
        tables = {
            row[0] for row in connection.execute(
                "SELECT name FROM sqlite_master WHERE type='table'"
            )
        }
        required = {"sources", "signal_candidates", "notifications", "alembic_version"}
        if integrity != "ok":
            raise ValueError(f"SQLite integrity check returned {integrity!r}.")
        missing = required - tables
        if missing:
            raise ValueError(f"Backup is missing core tables: {', '.join(sorted(missing))}.")
        revision_row = connection.execute("SELECT version_num FROM alembic_version").fetchone()
        counts = {}
        for table in ("sources", "signal_candidates", "notifications", "provider_runs"):
            counts[table] = connection.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
        return {
            "integrity_result": integrity, "alembic_revision": revision_row[0] if revision_row else None,
            "table_count": len(tables) - 1, "record_counts": counts,
            "size_bytes": path.stat().st_size, "sha256": _sha256(path),
        }
    finally:
        connection.close()


def _expected_head() -> str | None:
    """The Alembic revision this installed application code expects. Used
    only for an informational comparison against a backup's own stamped
    revision (see `BackupService.rehearse`) -- never to gate backup/restore
    itself, since restoring an older-but-otherwise-valid backup is legitimate
    and the operator can run `db upgrade` afterward."""
    try:
        from alembic.script import ScriptDirectory

        from semi_intel.cli import _alembic_config

        return ScriptDirectory.from_config(_alembic_config()).get_current_head()
    except Exception:
        return None


class BackupService:
    def __init__(self, session: Session, *, backup_directory: Path | None = None):
        self.session = session
        self.settings = get_scheduler_settings(session)
        configured = backup_directory or Path(self.settings.backup_directory)
        if not configured.is_absolute():
            # Persisted relative backup paths belong to the database's data
            # directory, not whichever working directory happened to launch
            # this particular entry point.  Otherwise a backup created by the
            # dashboard can be rejected by `semintel backups rehearse` when
            # the CLI is opened from another folder.  An explicitly injected
            # relative path retains the caller-relative behavior used by
            # tests/tools; only the persisted default receives stable data-
            # directory semantics.
            base = Path.cwd()
            if backup_directory is None:
                engine = session.get_bind()
                if engine.url.get_backend_name() == "sqlite" and engine.url.database:
                    database = Path(engine.url.database)
                    if str(database) != ":memory:":
                        if not database.is_absolute():
                            database = Path.cwd() / database
                        base = database.resolve().parent
            configured = base / configured
        self.backup_directory = configured.resolve()

    def _database_path(self) -> Path:
        engine = self.session.get_bind()
        if engine.url.get_backend_name() != "sqlite" or not engine.url.database:
            raise ValueError("Phase 9 local backup supports file-backed SQLite databases only.")
        path = Path(engine.url.database)
        if not path.is_absolute():
            path = Path.cwd() / path
        path = path.resolve()
        if str(path) == ":memory:":
            raise ValueError("In-memory databases cannot be backed up.")
        return path

    def _managed_path(self, path: Path) -> Path:
        resolved = path.resolve()
        try:
            resolved.relative_to(self.backup_directory)
        except ValueError as exc:
            raise ValueError("Backup path must stay inside the configured backup directory.") from exc
        if not resolved.name.startswith(BACKUP_PREFIX):
            raise ValueError("File is not an application-managed backup.")
        return resolved

    def create(self, *, now: dt.datetime | None = None) -> BackupRecord:
        now = now or utcnow()
        database_path = self._database_path()
        self.backup_directory.mkdir(parents=True, exist_ok=True)
        stamp = now.strftime("%Y%m%dT%H%M%S.%fZ")
        filename = f"{BACKUP_PREFIX}{stamp}.sqlite3"
        destination = self._managed_path(self.backup_directory / filename)
        if destination.exists():
            raise FileExistsError(f"Backup already exists: {filename}")

        source = sqlite3.connect(str(database_path))
        target = sqlite3.connect(str(destination))
        try:
            source.backup(target)
        finally:
            target.close()
            source.close()

        try:
            verification = self.verify_file(destination)
        except Exception as exc:
            failed = destination.with_name(destination.stem + ".failed.sqlite3")
            os.replace(destination, failed)
            record = BackupRecord(
                filename=failed.name, path=str(failed), status=BackupStatus.FAILED,
                created_at=now, application_version=__version__,
                size_bytes=failed.stat().st_size, sha256=_sha256(failed),
                integrity_result="failed", error_summary=safe_error(str(exc)),
            )
            self.session.add(record)
            self.session.commit()
            raise ValueError(
                f"Backup verification failed; the artifact was preserved as {failed.name}."
            ) from exc
        manifest_path = destination.with_suffix(".manifest.json")
        manifest = {
            "application_version": __version__,
            "alembic_revision": verification["alembic_revision"],
            "created_at": now.isoformat(),
            "source_database": database_path.name,
            "filename": filename,
            "size_bytes": destination.stat().st_size,
            "sha256": _sha256(destination),
            "integrity_result": verification["integrity_result"],
            "table_count": verification["table_count"],
            "record_counts": verification["record_counts"],
        }
        manifest_path.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        record = BackupRecord(
            filename=filename, path=str(destination), status=BackupStatus.VERIFIED,
            created_at=now, verified_at=now, application_version=__version__,
            alembic_revision=verification["alembic_revision"],
            size_bytes=manifest["size_bytes"], sha256=manifest["sha256"],
            integrity_result=verification["integrity_result"],
            table_count=verification["table_count"],
            record_counts=json.dumps(verification["record_counts"], sort_keys=True),
            manifest_path=str(manifest_path),
        )
        self.session.add(record)
        self.session.commit()
        return record

    def verify_file(self, path: Path) -> dict:
        path = self._managed_path(path)
        if not path.exists():
            raise FileNotFoundError(path)
        return _inspect_sqlite_file(path)

    def verify(self, path: Path, *, now: dt.datetime | None = None) -> dict:
        result = self.verify_file(path)
        record = self.session.scalar(select(BackupRecord).where(
            BackupRecord.path == str(path.resolve())
        ))
        if record:
            record.status = BackupStatus.VERIFIED
            record.verified_at = now or utcnow()
            record.integrity_result = result["integrity_result"]
            record.sha256 = result["sha256"]
            record.size_bytes = result["size_bytes"]
            self.session.commit()
        return result

    def list(self) -> list[BackupRecord]:
        return list(self.session.scalars(select(BackupRecord).order_by(BackupRecord.created_at.desc())))

    def prune(self, *, now: dt.datetime | None = None, dry_run: bool = True) -> list[Path]:
        now = now or utcnow()
        records = [row for row in self.list() if row.status != BackupStatus.PRUNED]
        keep_count = max(self.settings.backup_retention_count, 1)
        cutoff = now - dt.timedelta(days=max(self.settings.backup_retention_days, 1))
        targets: list[BackupRecord] = []
        for index, record in enumerate(records):
            if index >= keep_count or record.created_at.replace(tzinfo=dt.UTC) < cutoff:
                targets.append(record)
        paths: list[Path] = []
        for record in targets:
            path = self._managed_path(Path(record.path))
            paths.append(path)
            if not dry_run:
                if path.exists():
                    path.unlink()
                manifest = path.with_suffix(".manifest.json")
                if manifest.exists():
                    self._managed_path(manifest.with_name(path.name))  # validate parent/name scope
                    manifest.unlink()
                record.status = BackupStatus.PRUNED
        if not dry_run:
            self.session.commit()
        return paths

    def restore(self, path: Path, *, dry_run: bool = True) -> dict:
        path = self._managed_path(path)
        verification = self.verify_file(path)
        active = self.session.scalar(select(func.count()).select_from(OperationalJobLease)) or 0
        if active:
            raise ValueError("Restore refused while an operational job lease is active.")
        result = {"dry_run": dry_run, "backup": str(path), "verification": verification}
        if dry_run:
            return result

        # A verified safety backup is mandatory before replacement.
        safety = self.create()
        database_path = self._database_path()
        temporary = database_path.with_name(f"{database_path.name}.restore-{os.getpid()}.tmp")
        shutil.copy2(path, temporary)
        temp_connection = sqlite3.connect(str(temporary))
        try:
            integrity = temp_connection.execute("PRAGMA integrity_check").fetchone()[0]
            if integrity != "ok":
                raise ValueError("Temporary restored database failed integrity validation.")
        finally:
            temp_connection.close()
        self.session.commit()
        self.session.get_bind().dispose()
        os.replace(temporary, database_path)
        result.update({"dry_run": False, "safety_backup": safety.path, "restored": True})
        return result

    def rehearse(self, path: Path) -> dict:
        """Prove a verified backup would actually work if restored, without
        ever touching the live database, session or leases.

        `restore(dry_run=True)`/`verify()` only run raw sqlite3 checks
        (integrity_check plus a handful of required table names) against the
        backup file itself. That misses two real failure modes: (1) the
        backup's stamped Alembic revision may be behind the code currently
        installed, so the app would need `db upgrade` immediately after a
        restore; (2) the file can pass integrity_check and still fail to load
        through the ORM (a column/type mismatch between the stamped schema
        and the currently installed model classes). This copies the backup
        to a throwaway temp file, opens it with a real SQLAlchemy engine, and
        runs representative ORM counts through the actual domain models --
        then deletes the copy. Never raises; failures are reported in the
        result so a bad backup doesn't crash the caller."""
        path = self._managed_path(path)
        expected_head = _expected_head()
        report: dict = {
            "backup": str(path), "passed": False, "expected_head": expected_head,
            "schema_revision": None, "schema_up_to_date": None,
            "orm_record_counts": None, "error": None,
        }
        try:
            inspection = _inspect_sqlite_file(path)
        except Exception as exc:
            report["error"] = safe_error(str(exc))
            return report
        report["schema_revision"] = inspection["alembic_revision"]
        if expected_head is not None and inspection["alembic_revision"] is not None:
            report["schema_up_to_date"] = inspection["alembic_revision"] == expected_head

        fd, temp_name = tempfile.mkstemp(prefix="semi-intel-rehearsal-", suffix=".sqlite3")
        os.close(fd)
        temporary = Path(temp_name)
        engine = None
        try:
            shutil.copy2(path, temporary)
            engine = get_engine(f"sqlite:///{temporary}")
            rehearsal_session = get_sessionmaker(engine)()
            try:
                report["orm_record_counts"] = {
                    "sources": rehearsal_session.scalar(select(func.count()).select_from(Source)),
                    "signal_candidates": rehearsal_session.scalar(
                        select(func.count()).select_from(SignalCandidate)
                    ),
                    "notifications": rehearsal_session.scalar(select(func.count()).select_from(Notification)),
                    "provider_runs": rehearsal_session.scalar(select(func.count()).select_from(ProviderRun)),
                }
            finally:
                rehearsal_session.close()
            report["passed"] = True
        except Exception as exc:
            report["error"] = safe_error(str(exc))
        finally:
            if engine is not None:
                engine.dispose()
            temporary.unlink(missing_ok=True)
        return report
