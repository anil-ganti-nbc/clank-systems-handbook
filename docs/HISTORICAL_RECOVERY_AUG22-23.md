# Historical Recovery — 22–23 August 2026

Status: **partial**. Git-resident evidence recovered and hashed. Host syslog and Motherclank `var/` **not recovered** from this environment.

## Two families (do not conflate)

Documented in `audits/INCIDENT_IMPACT_MAP_2026-08-23.md` (preserved sha256 `29589fe4c946171c…`) and continuity seeds.

### Family A — MATERIALIZATION_GAP (INC-20260822-A)

- ~2026-08-22 09:59–10:06Z: root `git stash -u` / `stash pop` recreated untracked `logs/` as root:root in oem-radar, smartwatch, feature-phone checkouts.
- Cron redirects failed **before** collector exec. Scheduler invocations existed; PROCESS_STARTED never occurred.
- Silent ~36h. OEM Radar lost **no** DB data.
- Diagnostic id 62b03383… cited in the decision ledger.
- Codified ADR-0008 / GIC-04.

**Recovered this campaign:** impact map Pass 2 addendum; continuity seed `INC-20260822-23-fleet-outage-and-volume-loss.jsonl` (sha256 `c4777eabf36a933d…`); oem-radar gitignore commit 44ce1ac as the mechanical counterpart (ADR-0009).

**Not recovered:** raw syslog/journal. Likely rotated. Recorded as `art-live-syslog-aug22` / gap `gap-syslog-aug22`. Do not invent log lines.

### Family B — volume deletion (INC-20260823)

| Instant UTC | Event |
|---|---|
| 2026-08-22T10:00Z | last known live observation both DBs; scheduler outage already in progress |
| 2026-08-23T21:22:08Z | `smartwatch_clank_staging_data` destroyed |
| 2026-08-23T21:22:11Z | `feature_phone_clank_staging_data` destroyed |
| 2026-08-23T21:36:11Z | Feature Phone fresh DB → NEW_EPOCH (baseline suppressed) |
| 2026-08-23T22:09:00Z | Smartwatch restored from 2026-08-18T20:50:37Z backup |

Permanently missing Smartwatch history ≈ 2026-08-18T20:13Z → 2026-08-22T10:00Z (~3d13h, not “4 days”).
Feature Phone pre-incident history: **entirely irrecoverable**.
No observations may be inferred 2026-08-22T10:00Z → 2026-08-23T22:09Z.

**Recovered this campaign:** impact map; seed `INC-20260823-volume-loss.jsonl` (sha256 `665a662bf1cdc87f…`); ACT-011 seed; DATA_SURVIVABILITY.md §6–7, §17.

**Not recovered:** Motherclank `var/` batches for states A–E. Impact map: **BLOCKED**. Seeds encode A–E so a future harvest can qualify without rewriting historical lines. Seeds ≠ missing batches.

## What can be upgraded inferred → verified

**Nothing host-level this campaign.** The documented timeline was already verified from operator-provided evidence in Pass 2. This campaign **re-preserved** those documents and seeds; it did not independently re-read syslog or var/.

Do not upgrade:

- Motherclank’s contemporary HEALTHY/STALE claims in the window (need var/).
- Exact cron argv from memory.
- “Backup pipeline resumed after restore.”

## What remains irrecoverable (from here; maybe not from the host)

- Syslog/journal for Family A if rotated.
- Motherclank var/ if deleted or never copied.
- Feature Phone pre-epoch-2 observational memory (irrecoverable even on the host).
- Smartwatch gap 18 Aug 20:13Z – 22 Aug 10:00Z (irrecoverable; restore does not invent those hours).

## Tablet correction (already in the map)

Stale `tablet-clank-soak.service` ≠ MISSING_RUN. INTENTIONALLY_DORMANT. A 2026-08-27 QC commit does not change that without a live membership probe.
