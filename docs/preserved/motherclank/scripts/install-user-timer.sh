#!/bin/sh
# Installs EXACTLY ONE fixed-clock systemd USER timer (smartwatch precedent).
set -eu
UNIT_DIR="$HOME/.config/systemd/user"
mkdir -p "$UNIT_DIR"
cat > "$UNIT_DIR/motherclank-harvest.service" <<'SERVICE'
[Unit]
Description=Motherclank M0 read-only fleet harvest

[Service]
Type=oneshot
ExecStart=%h/motherclank/scripts/host-harvest.sh
TimeoutStartSec=900
SERVICE
cat > "$UNIT_DIR/motherclank-harvest.timer" <<'TIMER'
[Unit]
Description=Motherclank daily fixed-clock harvest

[Timer]
OnCalendar=*-*-* 06:15:00 UTC
Persistent=true

[Install]
WantedBy=timers.target
TIMER
systemctl --user daemon-reload
systemctl --user enable --now motherclank-harvest.timer
systemctl --user list-timers --no-pager | grep motherclank || true
