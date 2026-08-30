#!/bin/sh
# Read-only Clank host re-probe. Run ON the Hetzner host (or current fleet host).
# Does NOT restart services, rotate logs, print secrets, or write production DBs.
# Redirect stdout to a file, redact anything that still looks like a credential,
# then commit the transcript to clank-systems-handbook.
#
# Usage: sh operator-reprobe.sh > reprobe-$(date -u +%Y%m%dT%H%M%SZ).txt

set -eu

say() { printf '\n===== %s =====\n' "$1"; }

say "host identity"
hostname -f 2>/dev/null || hostname
uname -a
date -u +%Y-%m-%dT%H:%M:%SZ
whoami
id

say "warning"
echo "Do not cat EnvironmentFile, *.env, secrets.env, webhooks, tokens, cookies."
echo "Do not docker compose down. Do not systemctl restart. Do not sqlite3 writes."

say "user systemd timers (Law 5 / Motherclank harvest)"
systemctl --user list-timers --all --no-pager 2>/dev/null || echo "user systemd unavailable"
systemctl --user list-units --type=service --all --no-pager 2>/dev/null | head -n 80 || true

say "system timers (if permitted)"
systemctl list-timers --all --no-pager 2>/dev/null | head -n 80 || echo "system systemd unavailable"

say "crontab (current user)"
crontab -l 2>/dev/null || echo "no user crontab"

say "docker (names, image tags — not env)"
if command -v docker >/dev/null 2>&1; then
  docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.ID}}' 2>/dev/null || true
  docker images --format 'table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedSince}}' 2>/dev/null | head -n 40 || true
  docker volume ls 2>/dev/null || true
else
  echo "docker not in PATH"
fi

say "likely checkouts — record HEAD vs origin/main. Do not pull."
for dir in \
  "$HOME/watch-clank" \
  "$HOME/motherclank" \
  "$HOME/diagnostic-clank" \
  /opt/watch-clank \
  /opt/smartphone-clank \
  /opt/oem-radar \
  /opt/korean-tech-wire \
  /home/deploy/staging/smartwatch-clank \
  /home/anilganti/watch-clank
do
  if [ -d "$dir/.git" ]; then
    echo "--- $dir ---"
    git -C "$dir" rev-parse --abbrev-ref HEAD 2>/dev/null || true
    git -C "$dir" rev-parse HEAD 2>/dev/null || true
    git -C "$dir" rev-parse origin/main 2>/dev/null || git -C "$dir" rev-parse origin/HEAD 2>/dev/null || true
    git -C "$dir" status --porcelain=v1 2>/dev/null | head -n 20 || true
  fi
done

say "sqlite files found (paths and sizes only)"
find "$HOME" /opt /var/lib/docker/volumes /home/deploy -name '*.db' -o -name '*.sqlite' 2>/dev/null | head -n 80 || true

say "backup-looking paths (names only)"
find "$HOME" /opt /var/backups /tmp -iname '*backup*' 2>/dev/null | head -n 80 || true

say "motherclank var (names and mtimes, not contents)"
if [ -d "$HOME/motherclank/var" ]; then
  ls -la "$HOME/motherclank/var" | head -n 50
else
  echo "no $HOME/motherclank/var"
fi

say "done"
echo "Commit this transcript after redacting secrets. Do not fill Law 6 from GitHub."
