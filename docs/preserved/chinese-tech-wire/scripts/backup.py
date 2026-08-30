#!/usr/bin/env python3
"""Consistent SQLite backup for Chinese Tech Wire.

Chinese Tech Wire had no existing backup mechanism prior to this cloud
migration phase. Uses sqlite3's online backup API (Connection.backup())
rather than copying the file directly, so a WAL-mode write in progress is
handled correctly instead of risking a torn/inconsistent copy. Stdlib only —
runs inside the staging image with no extra dependencies.

Usage: python scripts/backup.py [--db PATH] [--out-dir DIR]
Writes: <out-dir>/ctw-<UTC timestamp>.db
"""

from __future__ import annotations

import argparse
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

DEFAULT_DB = Path(os.environ.get("CTW_DATABASE_PATH", "/app/data/ctw.db"))
DEFAULT_OUT = Path(os.environ.get("CTW_BACKUP_DIR", "/app/data/backups"))


def backup_database(db_path: Path, out_dir: Path, stamp: str) -> Path:
    if not db_path.exists():
        raise SystemExit(f"database not found: {db_path}")
    out_dir.mkdir(parents=True, exist_ok=True)
    dest = out_dir / f"ctw-{stamp}.db"
    src_conn = sqlite3.connect(str(db_path))
    try:
        dest_conn = sqlite3.connect(str(dest))
        try:
            src_conn.backup(dest_conn)
        finally:
            dest_conn.close()
    finally:
        src_conn.close()
    return dest


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--db", type=Path, default=DEFAULT_DB)
    parser.add_argument("--out-dir", type=Path, default=DEFAULT_OUT)
    args = parser.parse_args()

    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    db_backup = backup_database(args.db, args.out_dir, stamp)
    print(f"database backup: {db_backup}")


if __name__ == "__main__":
    main()
