"""Safe SQLite backup using the sqlite3 backup API (not a raw file copy --
a raw copy of a live WAL-mode database can capture a torn/inconsistent
snapshot; sqlite3.Connection.backup() is the supported, safe mechanism
even against a database with concurrent writers).

Backups are written outside the repo's tracked tree (data/backups/, already
covered by .gitignore's `*.db` pattern) and are never uploaded/pushed.
Retention: keeps the most recent N backups, deletes older ones -- this only
ever deletes backup *copies* it created itself, never the live database and
never any observation/event history in it.

Usage:
    python -m scripts.db_backup
    python -m scripts.db_backup --keep 14
"""

from __future__ import annotations

import argparse
import sqlite3
import sys
from datetime import UTC, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app.core.config import get_settings


def backup_database(*, keep: int = 14) -> Path:
    settings = get_settings()
    db_url = settings.resolved_database_url
    if not db_url.startswith("sqlite:///"):
        raise SystemExit(f"db_backup only supports sqlite databases, got: {db_url}")

    src_path = Path(db_url[len("sqlite:///") :])
    if not src_path.exists():
        raise SystemExit(f"database not found at {src_path}")

    backup_dir = src_path.parent / "backups"
    backup_dir.mkdir(parents=True, exist_ok=True)

    stamp = datetime.now(UTC).strftime("%Y%m%dT%H%M%S%fZ")
    dest_path = backup_dir / f"{src_path.stem}-{stamp}.db"

    src_conn = sqlite3.connect(str(src_path))
    dest_conn = sqlite3.connect(str(dest_path))
    try:
        src_conn.backup(dest_conn)
    finally:
        dest_conn.close()
        src_conn.close()

    existing = sorted(backup_dir.glob(f"{src_path.stem}-*.db"), key=lambda p: p.name)
    for stale in existing[:-keep] if keep > 0 else []:
        stale.unlink()

    return dest_path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--keep", type=int, default=14, help="number of backups to retain")
    args = parser.parse_args()

    dest = backup_database(keep=args.keep)
    print(f"backed up to {dest} ({dest.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
