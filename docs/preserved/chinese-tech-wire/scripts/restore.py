#!/usr/bin/env python3
"""Restore a Chinese Tech Wire backup into an ISOLATED path for verification.

Never touches live state. Copies the chosen backup database into
--target-dir, which must not already contain a ctw.db unless --force is
passed. This script only ever writes under --target-dir — it never accepts
or defaults to the live data/ directory.

Usage:
  python scripts/restore.py --backup /app/data/backups/ctw-<stamp>.db \
      --target-dir /app/data/restore-test [--force]

After restoring, point a *separate* process's DATABASE_URL at the restored
file (e.g. bind-mount --target-dir) and run `python main.py --health` /
`--source-health` against it before ever treating this as a verified restore.
"""

from __future__ import annotations

import argparse
import sqlite3
from pathlib import Path

# Restore must never be pointed at the real data directory, even by
# accident (e.g. a copy-pasted --target-dir). This is a staging/soak clank
# with no production cutover in scope for this phase, but the isolation
# invariant is enforced regardless.
_FORBIDDEN_TARGET_NAMES = {"data"}


def _refuse_if_live_path(target_dir: Path) -> None:
    resolved = target_dir.resolve()
    if resolved.name in _FORBIDDEN_TARGET_NAMES and (resolved / "ctw.db").exists():
        raise SystemExit(
            f"refusing to restore into {resolved} — looks like the live data "
            "directory (contains ctw.db). Use an isolated --target-dir."
        )


def restore_database(backup_path: Path, target_dir: Path, force: bool) -> Path:
    if not backup_path.exists():
        raise SystemExit(f"backup not found: {backup_path}")
    _refuse_if_live_path(target_dir)
    target_dir.mkdir(parents=True, exist_ok=True)
    dest = target_dir / "ctw.db"
    if dest.exists() and not force:
        raise SystemExit(
            f"refusing to overwrite existing {dest} (pass --force if this is intentional)"
        )
    # Re-materialize through sqlite3's backup API rather than a raw file
    # copy, so a backup taken mid-checkpoint lands as one consistent
    # snapshot.
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
    parser.add_argument("--target-dir", type=Path, required=True)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    dest_db = restore_database(args.backup, args.target_dir, args.force)
    verify(dest_db)

    print(f"restored database: {dest_db}")
    print(
        "Next: point a process's DATABASE_URL at this file and run "
        "`python main.py --health` before treating this as verified."
    )


if __name__ == "__main__":
    main()
