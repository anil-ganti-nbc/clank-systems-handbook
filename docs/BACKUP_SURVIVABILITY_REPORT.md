# Backup Survivability Report

Authority: `DATA_SURVIVABILITY.md` (preserved, sha256 `d9198715cfd302a4…`, architecture@e9c4a2b).
Companion seed: `motherclank/continuity/seeds/survivability-ACT011-verified-live.jsonl` (sha256 `84149d7c3adccec6…`).

**This campaign did not implement Layer C.** No SSH, no approved destination, no production writes.

## Current design (from DATA_SURVIVABILITY.md)

Status of the source document: **DESIGNED + PARTIALLY LIVE**.

Layers:

| Layer | Intent | State as of 2026-08-24 doc | State this campaign 2026-08-27 |
|---|---|---|---|
| A frequent local sqlite-safe snapshots | `.backup` / VACUUM INTO | DESIGNED (scripts exist in several repos) | Scripts preserved; **scheduling UNKNOWN** |
| B retained host backups | timestamped + checksummed off-volume | DESIGNED | UNKNOWN live |
| C independent failure domain (off-host) | CRITICAL lanes | **DESIGNED ONLY** (blocker B-1) | **still DESIGNED ONLY**. Drive empty. NAS unreachable |
| D integrity_check | post-snapshot | ACT-011 VERIFIED for two RPs | not re-run |
| E isolated restore drills | labeled temp volume | ACT-011 VERIFIED on disposable volume | not re-run |
| F pre-mutation checkpoint | ADR-0007 | implemented nowhere | unchanged |

Failure model R1–R15 remains the design. R8 (total Hetzner loss) is **uncovered**.

## Actual durable / off-host coverage

| Lane | What is backed up | Where | Off-host durable? | Last successful (documented) | Restore proof |
|---|---|---|---|---|---|
| smartwatch/staging | ACT-011 RP1 (516 runs, 52,126 obs) | temporary_scratch | **NO** | 2026-08-24 capture | integrity ok + disposable-volume restore VERIFIED **then** |
| feature-phone/prod epoch-2 | ACT-011 first RP of new epoch | temporary_scratch | **NO** | 2026-08-24 capture | same |
| watch/prod | UNKNOWN | UNKNOWN path | UNKNOWN | UNKNOWN | none |
| smartphone, KTW, CTW, SemInt, FGT, OEM | scripts in git and/or UNKNOWN | UNKNOWN | no evidence | UNKNOWN | none |
| tablet | none by design | n/a | no | n/a | n/a |

FGT/OEM/CTW/Watch/SemInt **backup scripts are preserved** in this handbook. A script is not a scheduled job. FGT compose volume name `fgt_production_data` is structural evidence only.

## Restore proof

- **Proven:** ACT-011 2026-08-24 operator-executed integrity + restore onto a disposable volume for two lanes. Seed in git.
- **Not proven:** restore from a copy that would survive Hetzner loss.
- **Not proven:** those scratch files still exist on 2026-08-27.
- **Forbidden:** restoring over production to “test”.

## Minimum viable durable scheme (design, not implemented here)

1. Operator picks a destination outside Hetzner (NAS already in FGT/OEM lore, or object storage). Separate reviewed step. No credentials inside archives.
2. For CRITICAL lanes first (feature-phone epoch-2, restored smartwatch, then watch once the path is known, then oem-radar):
   - `sqlite3` online backup / existing `scripts/backup.py` (OEM already uses `Connection.backup()`, never `cp` of WAL).
   - `PRAGMA integrity_check` + sha256 + size + epoch id recorded beside the file.
   - Copy to destination. Record `off_host_copy=true`, `failure_domain≠primary-host`.
3. Restore drill: labeled `temp-restore-<id>` only; destroy only that label; write RESTORE_VERIFIED from **the off-host object**.
4. Generational retention as in §8 (recent×24 / daily×14 / weekly×8 / monthly×6) — numbers still unratified; the binding requirement is “newest known-good RP is answerable from evidence”.
5. Adapter-plane backup_state object (§13) remains DESIGNED; do not fake Motherclank detectors.

Feature-phone new epoch is the cheapest CRITICAL win (tiny DB, irreplaceable from byte one).

## Remaining gaps

- Durable off-host: DESIGNED ONLY.
- ACT-012 least-privilege audit: NOT STARTED. Do not change deletion rights in this campaign.
- Whether pre-incident smartwatch backup pipeline resumed: UNKNOWN.
- FGT backup script scheduling: UNKNOWN.
- Watch host path: UNKNOWN.
