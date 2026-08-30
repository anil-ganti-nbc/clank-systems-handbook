# Live Provenance Report

Capture: **2026-08-27T08:14:00Z**
Live host probe: **INCOMPLETE** (no SSH to Hetzner from this campaign environment).
Google Drive: **no Clank dumps**.

Law 6: missing stays UNKNOWN. Repo HEAD ≠ origin/main ≠ deployed SHA ≠ running process ≠ authoritative DB.

Machine-readable: `src/content/provenance.ts`.

## What was inspected

- GitHub clones of 13 Clank-related repositories (architecture, diagnostic-clank default branch `diagnostic-clank-2026-08`, motherclank, ten collectors, this handbook).
- `fleet.yaml` as_of **2026-08-22T22:30:00Z** (preserved, hash `9d8d950b53cdc7…`).
- `DATA_SURVIVABILITY.md` §4 / §17.
- Unit/compose/backup templates in those git trees.

## What was not inspected

- Running processes, image digests, `systemctl list-timers`, live crontab, live SQLite, Motherclank `var/`, syslog.
- Windows Task Scheduler remnants.
- NAS.

## Per-system (compressed)

Inventory SHAs below are **2026-08-22 fleet.yaml**, not a 2026-08-27 probe.

| System | GitHub HEAD (2026-08-27) | origin default | Inventory deployed SHA (2026-08-22) | Live deployed / running / scheduler / backup | Confidence |
|---|---|---|---|---|---|
| watch-clank | d4fda37 | d4fda37 | f0b327a | UNKNOWN | incomplete |
| smartwatch-clank | 7ed4d74 | 7ed4d74 | d987b66 (cron lane) | UNKNOWN. ACT-011 scratch RP 2026-08-24 only | incomplete |
| smartphone-clank | 10906e6 | 10906e6 | b8b8988 | UNKNOWN | incomplete |
| feature-phone-clank | c173bea | c173bea | c749df3 prod | UNKNOWN. Epoch fpc-epoch-2 documented. ACT-011 scratch RP | incomplete |
| tablet-clank | a41d1e7 | a41d1e7 | 1d3509b DISABLED | UNKNOWN. Do not treat HEAD as production | incomplete |
| oem-radar | 44ce1ac | 44ce1ac | 410313b staging | UNKNOWN. Family A: no DB loss | incomplete |
| free-game-tracker | 45b47a5 | 45b47a5 | cec0346 | UNKNOWN. Checkout newsroom.db is STALE leftover | incomplete |
| chinese-tech-wire | 1a47220 | 1a47220 | c1b3a41 | UNKNOWN | incomplete |
| korean-tech-wire | ad11b0f | ad11b0f | 262c36d | UNKNOWN | incomplete |
| semiconductor-intelligence | ece4b00 | ece4b00 | 9dbf06d | UNKNOWN. Scheduler path residual open | incomplete |
| diagnostic-clank | 3667af0 on `diagnostic-clank-2026-08` | that branch | UNKNOWN instances in yaml | UNKNOWN | incomplete |
| motherclank | 7cee2f8 | 7cee2f8 | UNKNOWN | Harvest timer template ≠ enabled | incomplete |
| clank-architecture | e9c4a2b | e9c4a2b | N/A (governance) | N/A | verified |
| clank-systems-handbook | main 8c267de; content cacfe56 | main 8c267de | N/A | App Builder ≠ Hetzner | verified |

Host identity in inventory: `ubuntu-4gb-hel1-1` / `hel1`. **Live identity UNVERIFIED this campaign.**

## UNKNOWNs closed

**None** of the Law 6 live cells (deployed SHA, running process, scheduler authority, backup last-success, DB epoch on disk).

Closed only as **git facts**: current GitHub HEADs, presence of unit/backup templates, fleet.yaml inventory snapshot, ACT-011 seed contents.

## UNKNOWNs remaining

Every live collector cell in the table. Plus: Watch DB host path; FGT live volume filename; whether ACT-011 scratch files still exist; Windows tasks; Motherclank last harvest; syslog retention.

Operator action: `docs/scripts/operator-reprobe.sh`.
