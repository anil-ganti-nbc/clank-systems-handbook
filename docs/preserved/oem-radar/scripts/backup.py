#!/usr/bin/env python3
"""Consistent SQLite backup for OEM Radar.

Uses sqlite3's online backup API (Connection.backup()) rather than copying
the file directly, so a WAL-mode write in progress is handled correctly.
Stdlib only. Also archives the raw evidence directory alongside the DB.

Usage: python scripts/backup.py [--db PATH] [--raw-dir PATH] [--out-dir DIR]
"""

from __future__ import annotations

import argparse
import os
import sqlite3
import tarfile
from datetime import datetime, timezone
from pathlib import Path

DATA_DIR = Path(os.environ.get("OEM_RADAR_DATA_DIR", "/app/data"))
DEFAULT_DB = DATA_DIR / "radar.db"
DEFAULT_RAW = DATA_DIR / "raw"
DEFAULT_OUT = DATA_DIR / "backups"


def backup_database(db_path: Path, out_dir: Path, stamp: str) -> Path:
    if not db_path.exists():
        raise SystemExit(f"database not found: {db_path}")
    out_dir.mkdir(parents=True, exist_ok=True)
    dest = out_dir / f"radar-{stamp}.db"
    src_conn = sqlite3.connect(str(db_path))
    try:
        dest_conn = sqlite3.connect(str(dest))
        try:
            src_conn.backup(dest_conn)
            # The live DB runs WAL mode; backup() copies that header flag onto
            # the destination too, which then needs write access to its own
            # directory just to be *opened* (to create companion -wal/-shm
            # files) even for a pure read. Checkpoint it back to a plain,
            # self-contained file so the backup can be read anywhere,
            # including a read-only mount - this only affects the backup
            # copy, never the live database's own journal mode.
            dest_conn.execute("PRAGMA journal_mode=DELETE")
        finally:
            dest_conn.close()
    finally:
        src_conn.close()
    return dest


def backup_raw(raw_dir: Path, out_dir: Path, stamp: str) -> Path | None:
    if not raw_dir.exists():
        return None
    dest = out_dir / f"raw-{stamp}.tar.gz"
    with tarfile.open(dest, "w:gz") as tar:
        tar.add(raw_dir, arcname="raw")
    return dest


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--db", type=Path, default=DEFAULT_DB)
    parser.add_argument("--raw-dir", type=Path, default=DEFAULT_RAW)
    parser.add_argument("--out-dir", type=Path, default=DEFAULT_OUT)
    args = parser.parse_args()

    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    db_backup = backup_database(args.db, args.out_dir, stamp)
    raw_backup = backup_raw(args.raw_dir, args.out_dir, stamp)

    print(f"database backup: {db_backup}")
    print(f"raw evidence backup: {raw_backup or 'skipped (raw dir not found)'}")


if __name__ == "__main__":
    main()
