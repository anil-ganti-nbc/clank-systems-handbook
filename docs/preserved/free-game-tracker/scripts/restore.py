#!/usr/bin/env python3
"""Restore a Free Game Tracker backup into an ISOLATED path for verification.

Never touches live production state. Copies the chosen backup database (and
reports archive, if given) into --target-dir, which must not already contain
a newsroom.db unless --force is passed.

Usage:
  python scripts/restore.py --backup /app/data/backups/newsroom-<stamp>.db \
      --target-dir /app/data/restore-test [--reports-archive ...]

After restoring, point a *separate* container's NEWSROOM_DATABASE_PATH at the
restored file (e.g. bind-mount --target-dir) and run `newsroom status` /
`newsroom health` against it before ever treating this as a verified restore
or considering a production cutover.
"""

from __future__ import annotations

import argparse
import sqlite3
import tarfile
from pathlib import Path


def restore_database(backup_path: Path, target_dir: Path, force: bool) -> Path:
    if not backup_path.exists():
        raise SystemExit(f"backup not found: {backup_path}")
    target_dir.mkdir(parents=True, exist_ok=True)
    dest = target_dir / "newsroom.db"
    if dest.exists() and not force:
        raise SystemExit(
            f"refusing to overwrite existing {dest} (pass --force if this is intentional)"
        )
    # Re-materialize through sqlite3's backup API rather than a raw file copy,
    # so a backup taken mid-checkpoint lands as one consistent snapshot.
    src_conn = sqlite3.connect(str(backup_path))
    try:
        dest_conn = sqlite3.connect(str(dest))
        try:
            src_conn.backup(dest_conn)
        finally:
            dest_conn.close()
    finally:
        src_conn.close()
    return dest


def restore_reports(reports_archive: Path | None, target_dir: Path) -> Path | None:
    if reports_archive is None or not reports_archive.exists():
        return None
    with tarfile.open(reports_archive, "r:gz") as tar:
        tar.extractall(target_dir, filter="data")
    return target_dir / "reports"


def verify(dest_db: Path) -> None:
    """Cheap internal-consistency check: PRAGMA integrity_check + table list."""
    conn = sqlite3.connect(str(dest_db))
    try:
        (result,) = conn.execute("PRAGMA integrity_check").fetchone()
        if result != "ok":
            raise SystemExit(f"integrity check FAILED: {result}")
        tables = [
            r[0]
            for r in conn.execute(
                "SELECT name FROM sqlite_master WHERE type='table'"
            ).fetchall()
        ]
        print(f"integrity check: ok ({len(tables)} tables: {', '.join(sorted(tables))})")
    finally:
        conn.close()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--backup", type=Path, required=True)
    parser.add_argument("--reports-archive", type=Path, default=None)
    parser.add_argument("--target-dir", type=Path, required=True)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    dest_db = restore_database(args.backup, args.target_dir, args.force)
    verify(dest_db)
    reports_dest = restore_reports(args.reports_archive, args.target_dir)

    print(f"restored database: {dest_db}")
    print(f"restored reports:  {reports_dest or 'none supplied'}")
    print(
        "Next: point a container's NEWSROOM_DATABASE_PATH at this file and check "
        "`newsroom status` / `newsroom health` before treating this as verified."
    )


if __name__ == "__main__":
    main()
