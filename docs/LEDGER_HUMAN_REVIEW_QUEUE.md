# Ledger Human Review Queue

Do **not** silently rewrite the 27 original rows. This is a walk-one-at-a-time queue.

Machine-readable: `src/content/ledger-review.ts` (one object per `HISTORY` id, including the new `h-evidence-preservation` row).

UI: Handbook **Evidence → Rows awaiting human review**.

## How to audit a row

1. Open `/history#{id}` and the matching object in `ledger-review.ts`.
2. Separate **verified claims** (artefact exists) from **inferred claims** (motive, current host state).
3. Read **over-read risk**. If the wording is stronger than the artefact, split the host-facing clause or mark it incomplete — do not delete the git event.
4. Answer **open questions** only with new artefacts.
5. Set recommended action: keep / split / await-host-probe / await-human / downgrade.

## Flagged first (recommended action ≠ keep)

| id | action | why |
|---|---|---|
| h-consumer-clanks | await-human | archaeology baseline SHAs not re-hashed this pass |
| h-portability | keep (split applied in-row) | Owner walk 2026-08-28: machinery-in-git VERIFIED; archaeology SHAs not live; inventory 22 Aug dated; live SHA UNKNOWN |
| h-dual-scheduler | keep (split applied in-row) | Owner walk 2026-08-28: Law 5 scar VERIFIED; 21:06Z is law/inventory not live journal; current scheduler UNKNOWN |
| h-motherclank-born | keep (split applied in-row) | Owner walk 2026-08-28: created ≠ supervising; live SHA/process/timer/var UNKNOWN |
| h-materialization | keep (split applied in-row) | Owner walk 2026-08-27: mechanism VERIFIED; host timestamps/syslog INCOMPLETE |
| h-volume-loss | keep (split applied in-row) | Owner walk 2026-08-29: restore ≠ rewind; ACT-011 stays on h-act011; var/ BLOCKED; live path UNKNOWN |
| h-ctw-dogfood | keep (split applied in-row) | Owner walk 2026-08-30: dogfood VERIFIED; 7f977d6 is the guessed-path finding; dated topology not a map; live volume UNKNOWN |
| h-watch-qc | keep (SHA pinned, counts dated) | Owner walk 2026-08-27: 5de5329; 639/580/41 are 26 Aug snapshot, not live |
| h-watch-qc-race | keep (SHA pinned, 500 not lived) | Owner walk 2026-08-28: pin ee3f34d; UNIQUE ≠ operator contract; no lived host 500; later HEADs out |

All other original rows: **keep**, with residual notes. None recommended for deletion. None mass-downgraded.

`h-evidence-preservation` (new, 28th): **keep**. Do not read “artefacts preserved” as “live host known”.

## Owner checklist

- [ ] Walk flagged rows first
- [x] Decide whether to split h-materialization host timestamps into an incomplete child claim — **in-row split, no new id.** Mechanism verified; chronology incomplete.
- [x] Attach a SHA to h-watch-qc if teaching 639/580/41 — **pinned 5de5329; numbers dated as 2026-08-26 snapshot. Live queue UNKNOWN.**
- [x] Split h-motherclank-born created ≠ supervising — **in-row split, no new id.** Architectural birth verified; live SHA/process/timer/var UNKNOWN. Do not present M1–M4 as proven live on 22 Aug.
- [x] Split h-portability machinery-in-git ≠ those archaeology SHAs running — **in-row split, no new id.** Do not put 473931e / 12e8d3e / 938cc62 / f0b327a into commits[]. Live SHA UNKNOWN.
- [x] Split h-watch-qc-race UNIQUE ≠ operator contract — **in-row split, pin ee3f34d.** Do not narrate a lived host 500. Later HEADs out. Live SHA UNKNOWN.
- [x] Split h-dual-scheduler recorded retirement ≠ current scheduler authority — **in-row split, pin d046d54.** 21:06Z is law/inventory. Templates ≠ enabled. Live scheduler UNKNOWN.
- [x] Split h-volume-loss restore ≠ rewind — **in-row split, no new id.** Loss and two continuity outcomes VERIFIED. ACT-011 is later scratch, not closing. var/ BLOCKED. Live path/epoch/backup UNKNOWN.
- [x] Split h-ctw-dogfood dogfood ≠ current topology — **in-row split, pin 66cef4c and 7f977d6.** Scorecard did not record the guessed path; 7f977d6 did. Live volume/SHA/scheduler UNKNOWN.
- [ ] After operator-reprobe.sh, only then consider upgrading any await-host-probe row
- [ ] Do not upgrade UNKNOWN to healthy because several docs repeat it
