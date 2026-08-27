# Evidence Preservation Manifest

Canonical inventory of historically important Clank artefacts captured **2026-08-27T08:14:00Z**.

Machine-readable twin: `src/content/evidence.ts` (validated) and `docs/preserved/CAPTURE.json` (hashes).

**Live host probe: INCOMPLETE.** This environment has no SSH to Hetzner. Google Drive contained no Clank dumps. GitHub HEAD is not deployed SHA. Law 6 UNKNOWNs stay UNKNOWN.

Secrets: none copied. Webhook URLs remain `${ENV}` interpolations. `EnvironmentFile=` paths are structural.

## Capture context

| Field | Value |
|---|---|
| Capture UTC | 2026-08-27T08:14:00Z |
| Environment | Grok App Builder sandbox |
| Off-host of live DBs | **no** |
| Off-host of git templates | **yes** (this repository, `docs/preserved/`) |
| Inventory artefact | `fleet.yaml` as_of **2026-08-22T22:30:00Z**, status INVENTORY_INCOMPLETE |
| Inventory host name | ubuntu-4gb-hel1-1 (not live-verified 2026-08-27) |

## Git-resident copies (hashed)

| id | system | artefact | type | git SHA | sha256 | risk | off-host |
|---|---|---|---|---|---|---|---|
| `art-diagnostic-clank-fleet-yaml` | diagnostic-clank | `fleet.yaml` | inventory | `3667af02c8dd` | `9d8d950b53cdc72e…` | medium | yes |
| `art-clank-architecture-data-survivability-md` | clank-architecture | `DATA_SURVIVABILITY.md` | survivability-doc | `e9c4a2b77f0a` | `d9198715cfd302a4…` | low | yes |
| `art-clank-architecture-incident-impact-map-2026-08-23-md` | clank-architecture | `INCIDENT_IMPACT_MAP_2026-08-23.md` | incident-report | `e9c4a2b77f0a` | `29589fe4c946171c…` | low | yes |
| `art-clank-architecture-clank-fleet-archaeology-report-2026-08-24` | clank-architecture | `CLANK_FLEET_ARCHAEOLOGY_REPORT_2026-08-24.md` | incident-report | `e9c4a2b77f0a` | `726c8b8e4638f727…` | low | yes |
| `art-clank-architecture-fleet-laws-md` | clank-architecture | `FLEET_LAWS.md` | fleet-law-doc | `e9c4a2b77f0a` | `77d2abf2c975054e…` | low | yes |
| `art-motherclank-install-user-timer-sh` | motherclank | `install-user-timer.sh` | systemd-timer | `7cee2f89c4e8` | `9f8b49105bca9ad5…` | high | yes |
| `art-motherclank-seed-inc-20260822-23-fleet-outage-and-volume-los` | motherclank | `INC-20260822-23-fleet-outage-and-volume-loss.jsonl` | continuity-seed | `7cee2f89c4e8` | `c4777eabf36a933d…` | medium | yes |
| `art-motherclank-seed-inc-20260823-volume-loss-jsonl` | motherclank | `INC-20260823-volume-loss.jsonl` | continuity-seed | `7cee2f89c4e8` | `665a662bf1cdc87f…` | medium | yes |
| `art-motherclank-seed-survivability-act011-verified-live-jsonl` | motherclank | `survivability-ACT011-verified-live.jsonl` | continuity-seed | `7cee2f89c4e8` | `84149d7c3adccec6…` | medium | yes |
| `art-motherclank-seed-execution-expectations-seed-v1-jsonl` | motherclank | `execution-expectations-seed-v1.jsonl` | continuity-seed | `7cee2f89c4e8` | `c0fedbdf2c20b435…` | medium | yes |
| `art-oem-radar-deploy-oem-radar-run-service-example` | oem-radar | `oem-radar-run.service.example` | systemd-unit | `44ce1ac5538e` | `4381cc5c1c8f8ac0…` | high | yes |
| `art-oem-radar-deploy-oem-radar-run-timer-example` | oem-radar | `oem-radar-run.timer.example` | systemd-timer | `44ce1ac5538e` | `34ce866a9348f6cf…` | high | yes |
| `art-oem-radar-deploy-crontab-example` | oem-radar | `crontab.example` | cron | `44ce1ac5538e` | `68474cf9d9a343f6…` | high | yes |
| `art-oem-radar-backup-py` | oem-radar | `backup.py` | backup-script | `44ce1ac5538e` | `c1b58171e1afd421…` | medium | yes |
| `art-oem-radar-restore-py` | oem-radar | `restore.py` | restore-script | `44ce1ac5538e` | `eb18faf40584e9af…` | medium | yes |
| `art-oem-radar-compose-yml` | oem-radar | `docker-compose.yml` | docker-compose | `44ce1ac5538e` | `37a5392c4112a647…` | high | yes |
| `art-free-game-tracker-deploy-free-game-tracker-run-service-examp` | free-game-tracker | `free-game-tracker-run.service.example` | systemd-unit | `45b47a5af368` | `9e273b5365e680d0…` | high | yes |
| `art-free-game-tracker-deploy-free-game-tracker-run-timer-example` | free-game-tracker | `free-game-tracker-run.timer.example` | systemd-timer | `45b47a5af368` | `ffbf69b85f849c47…` | high | yes |
| `art-free-game-tracker-deploy-crontab-example` | free-game-tracker | `crontab.example` | cron | `45b47a5af368` | `b52ca919771d2c5b…` | high | yes |
| `art-free-game-tracker-backup-py` | free-game-tracker | `backup.py` | backup-script | `45b47a5af368` | `fb84047195cc4524…` | medium | yes |
| `art-free-game-tracker-restore-py` | free-game-tracker | `restore.py` | restore-script | `45b47a5af368` | `1ceb9cc1e5b96c17…` | medium | yes |
| `art-free-game-tracker-compose-yml` | free-game-tracker | `docker-compose.yml` | docker-compose | `45b47a5af368` | `3adcfe6e3b057dda…` | high | yes |
| `art-watch-clank-unit-watch-clank-service` | watch-clank | `watch-clank.service` | systemd-unit | `d4fda3708596` | `9cd627eb2e21a856…` | high | yes |
| `art-watch-clank-unit-watch-clank-timer` | watch-clank | `watch-clank.timer` | systemd-timer | `d4fda3708596` | `0544be10f427c19e…` | high | yes |
| `art-watch-clank-unit-readme-md` | watch-clank | `README.md` | deployment-template | `d4fda3708596` | `a0841f9d6916c74e…` | low | yes |
| `art-watch-clank-unit-docker-watch-clank-docker-service-template` | watch-clank | `watch-clank-docker.service.template` | systemd-unit | `d4fda3708596` | `7a46309c6f0f6ac4…` | high | yes |
| `art-watch-clank-unit-docker-watch-clank-docker-timer-template` | watch-clank | `watch-clank-docker.timer.template` | systemd-timer | `d4fda3708596` | `d8fa155d76c70ef4…` | high | yes |
| `art-watch-clank-db-backup-py` | watch-clank | `db_backup.py` | backup-script | `d4fda3708596` | `c9560edbd63a936b…` | medium | yes |
| `art-watch-clank-compose-staging-yml` | watch-clank | `docker-compose.staging.yml` | docker-compose | `d4fda3708596` | `8061b8756482aba8…` | high | yes |
| `art-smartwatch-clank-deploy-smartwatch-clank-soak-service-exampl` | smartwatch-clank | `smartwatch-clank-soak.service.example` | systemd-unit | `7ed4d74291de` | `0fe41998176d06d8…` | high | yes |
| `art-smartwatch-clank-deploy-smartwatch-clank-soak-timer-example` | smartwatch-clank | `smartwatch-clank-soak.timer.example` | systemd-timer | `7ed4d74291de` | `17f4245cd2a0e562…` | high | yes |
| `art-smartwatch-clank-deploy-crontab-example` | smartwatch-clank | `crontab.example` | cron | `7ed4d74291de` | `f440826cff515f0a…` | high | yes |
| `art-smartwatch-clank-compose-staging-yml` | smartwatch-clank | `docker-compose.staging.yml` | docker-compose | `7ed4d74291de` | `5ef47de5fd7f674a…` | high | yes |
| `art-smartphone-clank-unit-smartphone-clank-source-service` | smartphone-clank | `smartphone-clank-source@.service` | systemd-unit | `10906e681378` | `4ce75d4b828b9995…` | high | yes |
| `art-smartphone-clank-unit-smartphone-clank-soak-service` | smartphone-clank | `smartphone-clank-soak@.service` | systemd-unit | `10906e681378` | `e712afca3eae2aa0…` | high | yes |
| `art-smartphone-clank-unit-readme-md` | smartphone-clank | `README.md` | deployment-template | `10906e681378` | `e4954a9e5080f61d…` | low | yes |
| `art-smartphone-clank-unit-smartphone-clank-samsung-us-support-si` | smartphone-clank | `smartphone-clank-samsung_us_support_sitemap.timer` | systemd-timer | `10906e681378` | `81fc6294c2b335ee…` | high | yes |
| `art-feature-phone-clank-compose-staging-yml` | feature-phone-clank | `docker-compose.staging.yml` | docker-compose | `c173beae757a` | `266d2ac5ffbe4980…` | high | yes |
| `art-feature-phone-clank-dockerfile` | feature-phone-clank | `Dockerfile` | dockerfile | `c173beae757a` | `68a12469fc276e71…` | low | yes |
| `art-tablet-clank-unit-tablet-clank-production-service-example` | tablet-clank | `tablet-clank-production.service.example` | systemd-unit | `a41d1e7fa58f` | `e86d25ea909a82dc…` | high | yes |
| `art-tablet-clank-unit-tablet-clank-production-timer-example` | tablet-clank | `tablet-clank-production.timer.example` | systemd-timer | `a41d1e7fa58f` | `dbee99b8bbe1574e…` | high | yes |
| `art-korean-tech-wire-unit-korean-tech-wire-soak-service` | korean-tech-wire | `korean-tech-wire-soak.service` | systemd-unit | `ad11b0f5cb3c` | `4b97e8c6f2dc55a8…` | high | yes |
| `art-korean-tech-wire-unit-korean-tech-wire-soak-timer` | korean-tech-wire | `korean-tech-wire-soak.timer` | systemd-timer | `ad11b0f5cb3c` | `cd5a4ba772dcbd87…` | high | yes |
| `art-chinese-tech-wire-backup-py` | chinese-tech-wire | `backup.py` | backup-script | `1a47220c69e6` | `e4dbabac9f898006…` | medium | yes |
| `art-chinese-tech-wire-restore-py` | chinese-tech-wire | `restore.py` | restore-script | `1a47220c69e6` | `f3440802d57cd36f…` | medium | yes |
| `art-chinese-tech-wire-compose-staging-yml` | chinese-tech-wire | `docker-compose.staging.yml` | docker-compose | `1a47220c69e6` | `5e84a7f261f845d2…` | high | yes |
| `art-semiconductor-intelligence-deploy-crontab-example` | semiconductor-intelligence | `crontab.example` | cron | `ece4b001c60d` | `0b7985db42da8cb2…` | high | yes |
| `art-semiconductor-intelligence-semi-intel-operations-backup-py` | semiconductor-intelligence | `backup.py` | backup-script | `ece4b001c60d` | `dad85d319cdbba00…` | medium | yes |
| `art-diagnostic-clank-operations-phase0-deployment-instance-templ` | diagnostic-clank | `deployment-instance.template.yaml` | deployment-template | `3667af02c8dd` | `be1d70acb2958ff7…` | low | yes |
| `art-diagnostic-clank-compose-yml` | diagnostic-clank | `docker-compose.yml` | docker-compose | `3667af02c8dd` | `61e550a64525f7cf…` | high | yes |

Full SHA-256 and notes live in `src/content/evidence.ts`. Files live under the `preservedLocation` path.

## Live-host holes (not preserved)

| id | artefact | retention | verification |
|---|---|---|---|
| `art-live-syslog-aug22` | syslog/journald INC-20260822-A | rotating / likely irrecoverable | incomplete |
| `art-live-motherclank-var` | Motherclank var/ JSONL batches | high | incomplete (impact map BLOCKED) |
| `art-live-deployed-shas` | running process / image digest | high | incomplete |
| `art-live-scheduler-state` | enabled timers/cron | high | incomplete |
| `art-live-backup-locations` | on-host backup files | high | incomplete |
| `art-drive-offhost` | Google Drive / NAS dumps | irrecoverable from here | incomplete (Drive empty) |
| `art-operator-reprobe-script` | `docs/scripts/operator-reprobe.sh` | low | verified (script authored, not executed) |

## What this is not

- Not a live operations dashboard.
- Not proof a systemd template is enabled.
- Not durable off-host backup of Clank SQLite (ACT-011 was scratch).
- Not a reason to un-freeze promotion.

