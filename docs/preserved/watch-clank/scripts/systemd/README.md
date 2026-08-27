# Watch Clank on Linux/systemd

These unit files are **templates to review and adapt**, not a deployment
this repository performs automatically. Nothing here is installed by any
script — you must copy, edit the paths, and enable them yourself. They
assume a native `/opt/watch-clank` venv install and root-owned
`/etc/systemd/system` units.

**If the target host already runs Watch Clank as a Docker container
against a persistent volume (e.g. Hetzner, where root SSH is intentionally
disabled) — see `scripts/systemd/docker/README.md` instead.** That path
generates the equivalent unit set from the same registry these templates
describe, using `docker run` and user-level (`systemctl --user`) units, no
root required. This is the real mechanism used for the 2026-08-14 Hetzner
redeploy — see `ai/handoff/HETZNER_DEPLOYMENT.md`.

## Files

- `watch-clank.service` / `watch-clank.timer` — the Casio production lane
  (mirrors the Windows Task Scheduler task `WatchClank-CasioJapan`, same
  90-minute interval, same exit-code contract). Unaffected by everything
  below — separate collector_id, separate lock file.
- `watch-clank-citizen-news.service` / `.timer` — EXPERIMENTAL, 90 min.
- `watch-clank-seiko-news.service` / `.timer` — EXPERIMENTAL, 90 min.
- `watch-clank-citizen-products.service` / `.timer` — EXPERIMENTAL, 6h.
  Paginates citizenwatch.com's search-hit listing across two broad
  categories (mens/womens, ~530 candidate references, confirmed live
  2026-08-11) — see app/collectors/citizen_products.py for the discovery
  mechanism and its documented breadth-over-depth tradeoff (no availability
  signal from this path, only from the smaller per-product-page lane).
- `watch-clank-citizen-de-products.service` / `.timer` — EXPERIMENTAL,
  12h sitemap-delta monitor. The initial source-scoped baseline reads the
  bounded official German product sitemap (maximum 600 URLs); subsequent
  runs fetch only URLs not already observed, preserving source load while
  retaining first-party EUR price and explicit availability evidence.
- `watch-clank-seiko-products.service` / `.timer` — EXPERIMENTAL, 6h.
  Paginates seikousa.com's public Shopify `products.json` (225 watches
  confirmed live 2026-08-11 — the full catalogue, not a sample).
- `watch-clank-casioblog.service` / `.timer` — EXPERIMENTAL specialist
  early-warning, 45 min (mirrors Windows task `WatchClank-Casioblog`).
- `watch-clank-gcentral.service` / `.timer` — EXPERIMENTAL specialist
  early-warning, 45 min (mirrors Windows task `WatchClank-GCentral`).
- `watch-clank-plus9time.service` / `.timer` — EXPERIMENTAL specialist
  early-warning, 6h (mirrors Windows task `WatchClank-Plus9Time`).
- `watch-clank-monochrome.service` / `.timer` — EXPERIMENTAL specialist
  early-warning, 45 min (public RSS; mirrors `WatchClank-Monochrome`).
- `watch-clank-deployant.service` / `.timer` — EXPERIMENTAL specialist
  early-warning, 90 min (public RSS; mirrors `WatchClank-Deployant`).
- `watch-clank-fratello.service` / `.timer` — EXPERIMENTAL specialist
  early-warning, 45 min (public RSS; mirrors `WatchClank-Fratello`).
- `watch-clank-watchtime.service` / `.timer` — EXPERIMENTAL specialist
  early-warning, 90 min (public RSS; mirrors `WatchClank-WatchTime`).
- `watch-clank-timex-news.service` / `.timer` — EXPERIMENTAL, 90 min
  (mirrors Windows task `WatchClank-TimexNews`). Sprint 11 hardened the
  underlying SKU extraction and reference resolution — see
  `ai/handoff/TIMEX_MISS_AUTOPSY.md`.
- `watch-clank-timex-products.service` / `.timer` — EXPERIMENTAL, 6h
  (mirrors Windows task `WatchClank-TimexProducts`).
- `watch-clank-seiko-jp-products.service` / `.timer` — EXPERIMENTAL, 6h
  (2026-08-14 sprint). store.seikowatches.com, Seiko's own Japan retail
  site — confirmed live NOT geo-blocked from the Hetzner cloud vantage
  point. See `ai/handoff/SEIKO_JP_COLLECTOR.md`.
- `watch-clank-casio-uk-sitemap.service` / `.timer` — EXPERIMENTAL, 12h
  sitemap-delta monitor (2026-08-14 sprint). Casio's UK product pages are
  Cloudflare-blocked, but `www.casio.com/uk/sitemap.xml` is not; this
  source can only ever produce NEW_REFERENCE/NEW_REGION (no price or
  availability data exists in a sitemap). See
  `ai/handoff/UK_SIGNAL_PATH_RESEARCH.md` for why no Citizen UK equivalent
  was built (Cloudflare-blocked **and** Citizen's robots.txt explicitly
  disallows ClaudeBot by name).

Each experimental unit is fully independent: distinct
`collector_id`, distinct lock file (see app/services/run_lock.py), distinct
`collector_runs` rows. Disabling or stopping any one has zero effect on the
others or on the Casio production lane.

Cadence rationale: news lanes match Casio's own 90-minute interval (press
announcements are infrequent; more frequent polling adds no value). Product
lanes run every 6 hours — same-day price/availability transitions are still
caught well within a news cycle, while keeping total request volume low
(the catalogue crawls paginate a handful of listing requests, not one
request per product — see each collector's module docstring).

## Install (adapt paths first)

```bash
sudo cp scripts/systemd/watch-clank*.service scripts/systemd/watch-clank*.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now watch-clank.timer
# Experimental lanes — approved for scheduling as of Sprint 4 (all four
# passed fixtures, regression tests, isolated live validation, and repeat-run
# dedup before this):
sudo systemctl enable --now watch-clank-citizen-news.timer
sudo systemctl enable --now watch-clank-seiko-news.timer
sudo systemctl enable --now watch-clank-citizen-products.timer
sudo systemctl enable --now watch-clank-citizen-de-products.timer
sudo systemctl enable --now watch-clank-seiko-products.timer
sudo systemctl enable --now watch-clank-casioblog.timer
sudo systemctl enable --now watch-clank-gcentral.timer
sudo systemctl enable --now watch-clank-plus9time.timer
sudo systemctl enable --now watch-clank-monochrome.timer
sudo systemctl enable --now watch-clank-deployant.timer
sudo systemctl enable --now watch-clank-fratello.timer
sudo systemctl enable --now watch-clank-watchtime.timer
sudo systemctl enable --now watch-clank-timex-news.timer
sudo systemctl enable --now watch-clank-timex-products.timer
sudo systemctl enable --now watch-clank-seiko-jp-products.timer
sudo systemctl enable --now watch-clank-casio-uk-sitemap.timer
```

To disable any one lane independently: `sudo systemctl disable --now watch-clank-<name>.timer`.

## First run on a brand-new host: baseline before scheduling (Sprint 11)

A fresh SQLite DB knows nothing. If you `alembic upgrade head` and then
immediately enable every timer above, the very first crawl of each source
will otherwise classify its entire existing catalogue/backlog as "new" —
exactly the failure this project's `force_baseline` mechanism (Sprint 9)
exists to prevent. Before enabling the timers, run each source manually
once with `--force-baseline` (mirrors `install_windows_experimental_tasks.ps1`'s
own pre-flight baseline step):

```bash
cd /opt/watch-clank
.venv/bin/python -m scripts.run_pipeline --scheduled --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-brand citizen --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-brand seiko --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-product citizen --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-product seiko --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-specialist casioblog --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-specialist gcentral --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-specialist plus9time --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-specialist monochrome --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-specialist deployant --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-specialist fratello --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-specialist watchtime --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-brand timex --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-product timex --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-product seiko_jp --force-baseline
.venv/bin/python -m scripts.run_pipeline --experimental-product casio_uk --force-baseline
```

Then run every one of the above a second time *without* `--force-baseline`
and confirm 0 new leads/watches/events on the repeat (repeat-run stability)
before enabling any timer. Only after that should the `systemctl enable
--now` block above run. This has not been executed against a real Hetzner
host in this session — no SSH/host access has been available in any sprint
since Sprint 5 (disclosed honestly each time) — this section documents
exactly what must happen, not a claim that it has happened.

## Discord notification authority (Sprint 11 dual-runtime policy)

Discord webhooks are purely `.env`-driven (`discord_editorial_webhook_url`,
`discord_health_webhook_url` in `app/core/config.py`, both default `None`)
-- there is no separate "authority" flag to build, because whichever host's
`.env` actually has a real URL filled in is the one that sends. **Policy:
Hetzner is the designated future Discord notification authority once a
real webhook exists; Windows keeps Discord unconfigured (`.env` webhook
fields left blank) and stays collection + local-GUI-only.** This avoids
duplicate alert storms once both hosts are eventually populated with real
webhook URLs, with zero code change required -- just don't fill in the
Windows `.env`'s webhook fields. No webhook has been configured on either
host this sprint (none was supplied); this section documents the intended
policy for whenever one is.

## Secrets and environment

Both units load `EnvironmentFile=-/opt/watch-clank/.env` (the leading `-`
means "don't fail if the file is missing"). Populate `.env` from
`.env.example` and never commit it — same policy as `.gitignore` already
enforces for the Windows path. Discord webhook URLs
(`DISCORD_EDITORIAL_WEBHOOK_URL`, `DISCORD_HEALTH_WEBHOOK_URL`) belong here,
not in any unit file or source.

## Database path (Windows + Linux/cloud running simultaneously)

**Decision: independent databases, not shared/synchronised state.**

If both a Windows machine and a Linux/cloud host are collecting at the same
time, they each write to their own local SQLite file
(`data/watch_clank.db`), with their own snapshot storage under
`data/snapshots/`. This project deliberately does **not** attempt to
synchronise two SQLite databases over a network — SQLite's WAL mode assumes
a single writer host, and cross-host sync would require either a shared
network filesystem (fragile with SQLite locking) or a real replication
layer, neither of which this sprint builds. Building that would be exactly
the kind of premature infrastructure the project's own philosophy rejects
(see HANDOFF.md §55/56).

Practical implication: if you run both simultaneously, you get two
independent observation histories with possibly-different watch/lead ids
for the same real-world reference. That's an acceptable and explicit
tradeoff for now — it is not a bug. When you settle on one permanent host,
retire the other and treat its database as historical record (do not merge
databases automatically).

## Logs

Same files as Windows, just a different OS path:
`data/logs/scheduled-wrapper.log` and `data/logs/scheduled-python.log`.

## Overlap protection

Each collector_id has its own DB-row + lock-file check
(`app/services/run_lock.py::RunLockService`), scoped by `collector_id` since
the Sprint 2 fix (previously `casio_multi` runs were invisible to the
overlap/stale-recovery logic, which had `collector_id="casio_japan"`
hardcoded — see HANDOFF.md's Sprint 2 checkpoint). A second instance
starting on the same DB while one is already running gets `SKIPPED_OVERLAP`,
not a crash or duplicate write.
