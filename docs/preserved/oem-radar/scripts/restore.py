#!/usr/bin/env python3
"""Restore an OEM Radar backup into an ISOLATED path for verification.

Never touches live production state. Refuses to overwrite an existing
radar.db at --target-dir unless --force is passed.

Usage:
  python scripts/restore.py --backup /app/data/backups/radar-<stamp>.db \
      --target-dir /app/restore-test [--raw-archive ...]
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
    dest = target_dir / "radar.db"
    if dest.exists() and not force:
        raise SystemExit(f"refusing to overwrite existing {dest} (pass --force)")
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


def restore_raw(raw_archive: Path | None, target_dir: Path) -> Path | None:
    if raw_archive is None or not raw_archive.exists():
        return None
    with tarfile.open(raw_archive, "r:gz") as tar:
        tar.extractall(target_dir, filter="data")
    return target_dir / "raw"


def verify(dest_db: Path) -> None:
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
    parser.add_argument("--raw-archive", type=Path, default=None)
    parser.add_argument("--target-dir", type=Path, required=True)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    dest_db = restore_database(args.backup, args.target_dir, args.force)
    verify(dest_db)
    raw_dest = restore_raw(args.raw_archive, args.target_dir)

    print(f"restored database: {dest_db}")
    print(f"restored raw evidence: {raw_dest or 'none supplied'}")


if __name__ == "__main__":
    main()
