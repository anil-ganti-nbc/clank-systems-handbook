# Fleet Data Survivability Architecture

Status: **DESIGNED + PARTIALLY LIVE** (ACT-011 executed by the privileged
operator; see §17 Pass-2 update)
Authority: ADR-0007 (draft), ADR-0009 (draft); ownership boundaries per
ADR-0001/0002/0006
Companion incident records: INC-20260822-23 fleet outage + volume loss
(two families; Diagnostic Clank IDs 62b03383… / 4e3ff5af… / c683b0ff…)
Separation discipline: every item below is tagged DESIGNED / IMPLEMENTED /
LIVE / VERIFIED. Nothing in this document authorizes writing to, snapshotting,
relocating, or restoring live production state without explicit operator
authorization for THAT action.

## 1. Failure model

Human and agent destructive error is an EXPECTED failure mode. Required
coverage:

| ID | Failure class | Prevention | Detection | Recovery | Max loss target | Motherclank evidence |
|---|---|---|---|---|---|---|
| R1 | DB file deletion | pre-mutation checkpoint; labels | continuity event; harvest FAILED_ADAPTER | restore from layer A/B | ≤ RPO class | backup_state, continuity |
| R2 | volume deletion (INC-20260823) | destructive-op law + labels | same | same | same | same |
| R3 | state-dir deletion | same | same | same | same | same |
| R4 | bad migration | pre-mutation checkpoint contract | schema-revision drift | rollback recovery point | ≤ 1 migration | schema revision evidence |
| R5 | DB corruption | SQLite-safe snapshots; WAL discipline | integrity verification cadence | older generation | ≤ last verified good | INTEGRITY_VERIFIED records |
| R6 | deploy against empty/wrong volume | instance/lane identity fencing | epoch discontinuity detection | reattach correct volume | none if caught fast | epoch/continuity plane |
| R7 | host FS failure | host-level backups | backup staleness | host restore | RPO class B | failure_domain field |
| R8 | total Hetzner loss | off-host copy (layer C) | off-host sync evidence | rebuild to new host | RPO class C | off_host_copy flag |
| R9 | backup deletion | generational retention; backup metadata outside data dir | missing expected generations | other generations/off-host | bounded by retention | retention evidence |
| R10 | stale/wrong-backup restore | backup identity metadata (epoch, schema, hash) | restore-drill mismatch | redo with correct RP | none persistent | RESTORE_VERIFIED history |
| R11 | scheduler outage gap | single-authority law (Law 5) | invocation-vs-work pairing | n/a — represent gap | n/a | OBSERVATION_GAP continuity |
| R12 | silent backup failure | verify-after-write cadence | STALE/FAILED states | fix mechanism | detected within 1 cadence | backup_state transitions |
| R13 | corrupt/unrestorable backup | periodic restore drills | drill failure | regenerate from source while alive | bounded by drill cadence | drill records |
| R14 | staging/prod confusion | lane fencing (v0.2 §2) | LANE-LEAK fixtures | n/a | n/a | instance/lane on all claims |
| R15 | shared failure domain | off-host requirement for irreplaceable classes | failure_domain audit | independent copy | per class | failure_domain ≠ primary |

## 2. Recovery objectives (terminology)

`RPO` — maximum acceptable observation-history loss.
`RTO` — maximum acceptable restoration time. `BACKUP_HORIZON` — age of the
newest recoverable point. `RESTORE_VERIFICATION` — proof a specific backup
restores (integrity + isolated application probe). `FAILURE_DOMAIN` — the
smallest blast radius containing both primary and a given copy.

## 3. Proposed protection classes (derive-from-evidence, not arbitrary)

| Class | Definition | Candidate lanes | Target RPO | Layers |
|---|---|---|---|---|
| CRITICAL HISTORY | irreconstructable observational memory | smartwatch, feature-phone (new epoch), watch, oem-radar | hours | A+B+C+D+E+F |
| STANDARD HISTORY | reconstructable with difficulty/partial loss | smartphone, ktw, semint | ~1 day | A+B+D+(E sampled) |
| RECONSTRUCTABLE STATE | re-collectable from sources | FGT current deals, tablet experimental | days–weeks | A+C(best-effort) |
| EPHEMERAL STATE | caches/cursors only | scratch volumes, browser profiles | n/a | none required |

Class assignment is PROPOSED per lane pending operator confirmation of DB
sizes/write rates/historical value (inventory §4).

## 4. Datastore inventory (READ-ONLY; UNKNOWN where unverified)

| Clank/Lane | Store | Type | Size (known) | Backup mechanism today | Newest known RP | Off-host | Class (proposed) |
|---|---|---|---|---|---|---|---|
| smartwatch/staging | smartwatch_clank_staging_data → restored | sqlite ~107MB→167MB | pre-stage-c backup 2026-08-18T205037Z, integrity ok | that backup (pre-incident) | UNKNOWN post-incident | CRITICAL |
| feature-phone/prod | feature_phone_clank_staging_data → recreated | sqlite, tiny (331KB at loss) | **NONE existed** | none (ABSENT) | no | CRITICAL |
| watch/prod | host path UNKNOWN (matrix) | sqlite | UNKNOWN | UNKNOWN | UNKNOWN | CRITICAL |
| smartphone/prod | /opt/smartphone-clank/data | sqlite | UNKNOWN | UNKNOWN | UNKNOWN | STANDARD |
| ktw/staging | /opt/korean-tech-wire/var | sqlite | UNKNOWN | UNKNOWN | UNKNOWN | STANDARD |
| ctw/staging | data/ctw.db | sqlite | UNKNOWN | UNKNOWN | UNKNOWN | STANDARD |
| semint/staging | semintel_staging_data | sqlite | UNKNOWN | UNKNOWN | UNKNOWN | STANDARD |
| fgt/prod | container volume | sqlite | UNKNOWN | backup/restore scripts exist (repo) | UNKNOWN | RECONSTRUCTABLE |
| oem-radar/staging | data/ WAL mode | sqlite | UNKNOWN | UNKNOWN | UNKNOWN | CRITICAL |
| tablet/experimental | var/tablet_clank.db | sqlite | negligible | UNKNOWN | UNKNOWN | EPHEMERAL→RECONSTRUCTABLE |

All UNKNOWN cells require ACT-001-style host verification with fresh as_of.

## 5. Multi-layer protection model (SQLite-safe mechanics)

- **Layer A — frequent local versioned snapshots**: `sqlite3 .backup` or
  VACUUM INTO against a held read transaction — NEVER `cp` of a live WAL DB.
- **Layer B — retained host backups**: timestamped + checksummed copies in a
  non-volume host path, generational retention (§7).
- **Layer C — independent failure domain**: one copy outside the Hetzner
  host for CRITICAL class. Destination selection is a separate reviewed step
  (NAS exists in fleet lore via OEM/FGT precedent; object storage optional).
  No credentials inside archives; no production data uploaded without an
  approved destination decision.
- **Layer D — integrity verification**: post-snapshot `PRAGMA
  integrity_check` PLUS recorded size/hash; explicitly NOT equated to
  application restorability.
- **Layer E — isolated restore drills** (§9).
- **Layer F — pre-mutation emergency snapshot**: mandatory before any
  authorized persistent-state mutation.

## 6. Smartwatch case analysis (post-incident posture)

Restored DB is authoritative from 2026-08-23T22:09Z serving history through
≈2026-08-18T20:13Z. The 2026-08-18T205037Z file is now BOTH the newest
verified recovery point AND nearly the ONLY one. Priorities: (1) fresh
post-restore Layer-A/B/C snapshot of the restored DB; (2) confirm whether
the pre-incident backup pipeline resumed after restore (UNKNOWN); (3)
schedule first restore drill in isolation. Do NOT overwrite the restored
production DB.

## 7. Feature Phone new-epoch protection analysis

Epoch fpc-epoch-2 begins 2026-08-23T21:36:11Z and is irreplaceable from its
first byte. Growth is small (331KB at old-epoch death), so Layer A can run
at very high frequency at trivial cost; Layer C is cheap and mandatory for
CRITICAL class. New backups do NOT repair the lost epoch — they protect
surviving/future history only.

## 8. Retention architecture (proposed)

Generational scheme per protected store: recent (per-cadence, keep N=24) +
daily (keep 14) + weekly (keep 8) + monthly checkpoints (keep ≥6). Exact
numbers require storage-cost confirmation; the binding requirement is that
"newest known-good recovery point" must be answerable from evidence, and a
single rolling newest backup is insufficient by design (corruption window).

## 9. Isolated restore-test design

```
backup → positively identified temporary resource (labeled temp-restore-<id>)
       → restore into isolation
       → PRAGMA integrity_check + schema-version vs manifest check
       → minimal read-only application probe
       → destroy ONLY the labeled temp resource (identity-checked)
       → record RESTORE_VERIFIED evidence {backup_id, drill_at, result}
```

Drills never touch live state; cleanup follows the destructive-op safety law.

## 10. Pre-mutation checkpoint contract

See ADR-0007 Decision 3. Implemented nowhere yet; operator procedure until
tooling exists.

## 11. Destructive-operation safety

See ADR-0007 Decision 1. Docker label convention proposed:
`org.clank.clank_id`, `org.clank.instance_id`, `org.clank.lane_id`,
`org.clank.environment`, `org.clank.data_role=persistent`,
`org.clank.epoch_id`. Labels are advisory-to-agents, enforced by procedure;
they confer no authority themselves.

## 12. Least-privilege findings (audit-first)

TO AUDIT (not yet performed): which identities can delete volumes; modify
production DBs; stop/recreate containers; modify backups; whether backup
storage shares credentials/failure domains with production. Expected
finding pattern: coherence/deployment agents hold volume-deletion rights
that their task scope does not need. Any permission change requires separate
explicit approval.

## 13. Motherclank survivability plane (schema)

Adapter-plane evidence object (Diagnostic Clank exposes; Motherclank
consumes):

```json
{
  "clank_id": "...", "instance_id": "...", "lane_id": "...", "epoch_id": "…",
  "backup_state": "ABSENT|PRESENT_UNVERIFIED|INTEGRITY_VERIFIED|RESTORE_VERIFIED|STALE|FAILED|UNKNOWN|UNSUPPORTED_BY_POLICY",
  "last_backup_at": null, "integrity_verified_at": null,
  "restore_verified_at": null, "failure_domain": "primary-host",
  "off_host_copy": false, "current_rpo_estimate": "UNKNOWN",
  "observed_at": "...", "evidence_refs": []
}
```

Reported orthogonally to operational health; never aggregated across lanes;
never upgrades UNKNOWN. Alerting design (BACKUP_MISSING, BACKUP_STALE,
RPO_VIOLATED, ONLY_COPY_ON_PRIMARY_HOST, CONTINUITY_GAP_DETECTED) is M2
detector-class work AFTER the evidence plane exists; Motherclank may report
and recommend but holds no remediation authority.

## 14. Implementation order (proposal)

1. Operator adopts Layer A+B for feature-phone new epoch (highest value,
   smallest cost) using SQLite-safe mechanics — requires host access and
   authorization.
2. Same for restored smartwatch DB (post-restore first snapshot).
3. Adapter evidence object implemented in diagnostic-clank plane; matrix
   gains backup/continuity columns.
4. Generational retention + verification cadence script (boring, inspectable).
5. Restore-drill harness against isolated resources.
6. Off-host destination selection ADR for CRITICAL lanes.
7. M2 survivability detectors + alert vocabulary.
8. Least-privilege audit report → separate approval workflow.

## 15. Acceptance test — "Claude deletes the volume again"

PASS condition for this architecture: for any protected lane, one mistaken
`docker volume rm` results in (a) permanent loss ≤ the lane's accepted RPO;
(b) newest verified independent recovery point age known from evidence; (c)
restore possible without inventing continuity; (d) Motherclank identifies
the resulting gap via CONTINUITY_EVENT machinery (implemented); (e)
restore-vs-new-epoch distinguishable (implemented); (f) recovery copy lives
outside the destroyed resource's failure domain; (g) demonstration restore
ran in isolation. Today: (d)+(e) are IMPLEMENTED and test-covered; (a)-(c),
(f), (g) are DESIGNED pending operator adoption. Feature Phone currently
fails (f) outright — no protection exists for its new epoch.

## 16. Remaining UNKNOWNs

Post-incident backup existence/cadence for smartwatch; all inventory UNKNOWN
cells in §4; storage costs; available safe off-host destinations and their
authorization status; least-privilege audit results; whether FGT's existing
backup scripts are scheduled anywhere.

---

## 17. PASS 2 UPDATE — 2026-08-24 (operator-verified evidence only)

### 17.1 ACT-011 results (LIVE / VERIFIED)

| Lane | Recovery point | Integrity | Restore drill | Off-host | Durable off-host |
|---|---|---|---|---|---|
| smartwatch/staging (epoch sw-epoch-1-restored…) | act011 post-restore RP1; 516 runs; 52,126 observations; RPO ≈ 0 at capture | integrity_check=ok VERIFIED | passed (disposable volume restore) VERIFIED | copy exists | **NO — temporary_scratch only** |
| feature-phone/production (epoch fpc-epoch-2) | act011 epoch2 RP1; first RP of the new epoch; RPO ≈ 0 at capture | integrity_check=ok VERIFIED | passed (disposable volume restore) VERIFIED | copy exists | **NO — temporary_scratch only** |

Evidence records: `motherclank` `continuity/seeds/survivability-ACT011-verified-live.jsonl`
(derived protection state per lane: RESTORE_VERIFIED; `off_host_durable: false`;
durable-redundancy gate OPEN for both lanes).

### 17.2 Objective protection-class criteria (refines §3)

- CRITICAL: observations cannot be reliably reconstructed from upstream
  sources (source rotation, editorial removal, entitlement expiry). Value is
  independent of size — a 331 KB irreplaceable DB outranks a multi-GB cache.
- STANDARD: history materially matters but partial reconstruction from
  upstream is plausible within days.
- RECONSTRUCTABLE: canonical upstream sources permit deterministic rebuild.
- EPHEMERAL: intentionally disposable by design.

### 17.3 Initial RPO/RTO targets — **NOT RATIFIED; ILLUSTRATIVE ONLY**

The numbers in this table are engineering illustrations of how the class
system maps to policy. They are explicitly NOT ratified and MUST NOT be
enforced by any tooling, gate, or conformance check. Numeric RPO/RTO is
lane-aware POLICY to be derived after a real inventory of (a) collection
cadence per source/lane, (b) data value/replaceability, and (c) storage
cost — a four-times-daily collector and a half-hour news collector have
different meaningful loss windows, and one global number would encode a
fiction. Only the CLASS system itself (§3/§17.2) is proposed for canon.

| Class | Illustrative RPO | Illustrative RTO | Cadence sketch | Retention sketch | Off-host | Drill cadence |
|---|---|---|---|---|---|---|
| CRITICAL | ≤ 6 h ? | ≤ 4 h ? | ≥ every 6 h (Layer A) + daily Layer B | recent×24 / daily×14 / weekly×8 / monthly×6 | mandatory, destination_class=durable | monthly per lane |
| STANDARD | ≤ 24 h ? | ≤ 24 h ? | daily | daily×14 / weekly×8 | recommended | quarterly |
| RECONSTRUCTABLE | ≤ 7 d ? | ≤ 7 d ? | weekly or pre-mutation only | ×4 | optional | on adoption |
| EPHEMERAL | n/a | n/a | none | none | no | no |

Each "?" marks an unratified placeholder pending the inventory above.

### 17.4 Fleet survivability matrix (deliverable G; UNKNOWN where unverified)

| Clank/Lane | Store | Backup mechanism | Newest RP | Restore verified? | Off-host durable? | Epoch known? | Scheduler type | Expected-exec policy | Protection class | Confidence |
|---|---|---|---|---|---|---|---|---|---|---|
| oem-radar/staging | data/ WAL sqlite | UNKNOWN | UNKNOWN | UNKNOWN | NO evidence | CONTIGUOUS (no loss) | cron (repaired) | PERIODIC (seed) | CRITICAL | medium |
| smartwatch/staging | restored volume sqlite | ACT-011 RP1 LIVE | 2026-08-24 capture | YES (VERIFIED) | NO (scratch) | sw-epoch-1-restored… | cron (repaired) | PERIODIC (seed) | CRITICAL | high |
| feature-phone/prod | recreated volume sqlite | ACT-011 RP1 LIVE | 2026-08-24 capture | YES (VERIFIED) | NO (scratch) | fpc-epoch-2 | prod-cron (repaired) | PERIODIC (seed) | CRITICAL | high |
| watch/prod | host path UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | presumed contiguous | user-timers | PERIODIC (seed) | CRITICAL | low |
| smartphone/prod | /opt/.../data sqlite | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | presumed contiguous | systemd timers | PERIODIC (seed) | STANDARD | low |
| ktw/staging | /opt/korean-tech-wire/var | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | presumed contiguous | cron/timer | PERIODIC (seed) | STANDARD | low |
| ctw/staging | data/ctw.db | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | presumed contiguous | hourly cron | PERIODIC (seed) | STANDARD | low |
| semint/staging | semintel_staging_data | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | presumed contiguous | OperationalScheduler (path residual open) | PERIODIC (seed) | STANDARD | low |
| fgt/prod | container volume | scripts exist in repo; scheduling UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | presumed contiguous | hourly cron | PERIODIC (seed) | RECONSTRUCTABLE | low |
| tablet/experimental | var/tablet_clank.db | none by design | n/a | n/a | no | contiguous | none (by design) | RETIRED (manual/on-demand after Wave 1) | EPHEMERAL→RECONSTRUCTABLE | high |

"presumed contiguous" = no contrary evidence; not a positive claim.

### 17.5 DESIGNED vs IMPLEMENTED vs LIVE vs VERIFIED ledger

| Item | State |
|---|---|
| Continuity/liveness/survivability derivation modules + G1–G8 fixtures | IMPLEMENTED (motherclank branch, transferable bundle) |
| ContinuityEvent / expectation / backup-evidence registries | IMPLEMENTED + seeded with operator-verified incident evidence |
| ACT-011 recovery points (SW, FPC) | LIVE + VERIFIED (integrity + disposable-volume restore drill) |
| Durable off-host redundancy | DESIGNED ONLY — current copies are temporary scratch (BLOCKER B-1) |
| Generational retention, verification cadence tooling | DESIGNED ONLY |
| Adapter-plane backup-posture evidence object | DESIGNED (schema drafted in this document §13) |
| Least-privilege destructive-capability audit | NOT STARTED (ACT-012) |
