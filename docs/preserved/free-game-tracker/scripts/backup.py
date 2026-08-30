#!/usr/bin/env python3
"""Consistent SQLite backup for Free Game Tracker.

Uses sqlite3's online backup API (Connection.backup()) rather than copying
the file directly, so a WAL-mode write in progress is handled correctly
instead of risking a torn/inconsistent copy. Stdlib only — runs inside the
production image with no extra dependencies.

Usage: newsroom_backup [--db PATH] [--reports PATH] [--out-dir DIR]
Writes: <out-dir>/newsroom-<UTC timestamp>.db (+ reports-<stamp>.tar.gz if
the reports directory exists).
"""

from __future__ import annotations

import argparse
import os
import sqlite3
import tarfile
from datetime import datetime, timezone
from pathlib import Path

DEFAULT_DB = Path(os.environ.get("NEWSROOM_DATABASE_PATH", "/app/data/newsroom.db"))
DEFAULT_REPORTS = Path(os.environ.get("NEWSROOM_REPORTS_DIR", "/app/data/reports"))
DEFAULT_OUT = Path(os.environ.get("NEWSROOM_BACKUP_DIR", "/app/data/backups"))


def backup_database(db_path: Path, out_dir: Path, stamp: str) -> Path:
    if not db_path.exists():
        raise SystemExit(f"database not found: {db_path}")
    out_dir.mkdir(parents=True, exist_ok=True)
    dest = out_dir / f"newsroom-{stamp}.db"
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


def backup_reports(reports_dir: Path, out_dir: Path, stamp: str) -> Path | None:
    if not reports_dir.exists():
        return None
    dest = out_dir / f"reports-{stamp}.tar.gz"
    with tarfile.open(dest, "w:gz") as tar:
        tar.add(reports_dir, arcname="reports")
    return dest


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--db", type=Path, default=DEFAULT_DB)
    parser.add_argument("--reports", type=Path, default=DEFAULT_REPORTS)
    parser.add_argument("--out-dir", type=Path, default=DEFAULT_OUT)
    args = parser.parse_args()

    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    db_backup = backup_database(args.db, args.out_dir, stamp)
    reports_backup = backup_reports(args.reports, args.out_dir, stamp)

    print(f"database backup: {db_backup}")
    print(f"reports backup:  {reports_backup or 'skipped (reports dir not found)'}")


if __name__ == "__main__":
    main()
