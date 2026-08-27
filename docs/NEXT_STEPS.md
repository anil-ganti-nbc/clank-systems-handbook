# Recommended next steps

Ranked in `src/content/next-steps.ts` and listed as **Do now** vs **Do not do yet** on the Evidence page via that module.

Live host re-probe remains **deferred**. Teaching work in this pass does not close Law 6.

| id | impact | urgency | confidence | scope | do now |
|---|---|---|---|---|---|
| ns-operator-reprobe | high | now | verified | small | **deferred operator** — only way to close Law 6 live cells |
| ns-mirror-git-artefacts | high | now | verified | small | yes — evidence branch already holds hashed copies |
| ns-durable-offhost | high | now | verified | medium | yes — Layer C for FPC epoch-2 + restored SW first |
| ns-motherclank-var-copy | high | soon | inferred | small | yes if var/ still exists |
| ns-human-ledger-walk | high | soon | verified | small | yes |
| ns-watch-db-path | high | soon | incomplete | small | yes — deferred operator |
| ns-no-downgrade-mass | high | now | verified | small | yes |
| ns-fleet-snapshot-teaching | high | now | verified | small | **shipped** — three SHA columns; live stays UNKNOWN |
| ns-handbook-search | medium | now | verified | small | **shipped** — epistemic + failure-class filters |
| ns-motherclank-module | medium | later | verified | medium | **shipped** git-evidence teaching; wait for harvest reports |
| ns-diagnostic-module | medium | later | verified | medium | **shipped** git-evidence teaching; live Diagnostic UNKNOWN |
| ns-ai-workflow-module | medium | later | verified | small | **shipped** role map; no LLM grading |
| ns-syslog-export | medium | soon | incomplete | small | if journal retained |
| ns-fgt-live-volume | medium | soon | verified | small | after re-probe |
| ns-second-db-archaeology | medium | later | inferred | large | only for ranked questions |
| ns-dau-launch | low | later | verified | medium | do not fold Handbook into DAU |

## Deferred operator list (needs SSH / Hetzner console)

These do **not** block teaching work. Do not infer them from GitHub HEAD or unit templates.

1. Live re-probe (read-only): deployed SHA, running image/process, scheduler authority, authoritative DB path, DB epoch, host identity, last successful backup.
2. Authoritative Watch production DB path.
3. Whether Motherclank 06:15 UTC user timer is enabled.
4. Whether ACT-011 scratch volumes still exist.
5. Layer C off-host backup implementation (destination ADR + first copy + restore drill from that copy).
6. Export journalctl for 2026-08-22–24 if retained; otherwise record irrecoverable.

## Ranked DB questions (if a second archaeology pass is ever justified)

1. **High value:** Feature-phone epoch boundary and smartwatch restore vs gap — already documented; DB rows would confirm counts, not the story. Only worth it on an off-host copy.
2. **High value:** Watch QC 639/580/41 if those numbers are taught as live.
3. **Medium:** FIRST_SEEN flood specimens that still lack row-level proof (Timex cluster is already a regression fixture — **docs/tests suffice**, skip live DB).
4. **Low:** BANKAI 6349→0 — conformance/docs suffice.
5. **Do not:** giant sweep of all collector DBs.

## Do not do yet

See `DO_NOT_DO_YET` in `src/content/next-steps.ts`. Short form: no filling Law 6 from GitHub HEAD, no Tablet/Watch HEAD as production, no un-freeze, no archive of old repos, no DAU fold-in, no LLM grading, no M5, no destructive restore, no ACT-012 permission changes in this campaign.