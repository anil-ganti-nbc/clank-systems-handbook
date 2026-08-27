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
| h-portability | await-host-probe | FGT/Watch deployment SHAs are archaeology, not live |
| h-dual-scheduler | await-host-probe | 2026-08-21T21:06Z retirement is law text, not 2026-08-27 journal |
| h-motherclank-born | await-host-probe | timer installer ≠ enabled |
| h-materialization | keep (split applied in-row) | Owner walk 2026-08-27: mechanism VERIFIED; host timestamps/syslog INCOMPLETE |
| h-volume-loss | await-host-probe | Motherclank var/ still BLOCKED |
| h-ctw-dogfood | await-host-probe | live volume name as of 27 Aug unknown |
| h-watch-qc | keep (SHA pinned, counts dated) | Owner walk 2026-08-27: 5de5329; 639/580/41 are 26 Aug snapshot, not live |
| h-watch-qc-race | await-host-probe | ee3f34d/d4fda37 are repo HEAD |

All other original rows: **keep**, with residual notes. None recommended for deletion. None mass-downgraded.

`h-evidence-preservation` (new, 28th): **keep**. Do not read “artefacts preserved” as “live host known”.

## Owner checklist

- [ ] Walk flagged rows first
- [x] Decide whether to split h-materialization host timestamps into an incomplete child claim — **in-row split, no new id.** Mechanism verified; chronology incomplete.
- [x] Attach a SHA to h-watch-qc if teaching 639/580/41 — **pinned 5de5329; numbers dated as 2026-08-26 snapshot. Live queue UNKNOWN.**
- [ ] After operator-reprobe.sh, only then consider upgrading any await-host-probe row
- [ ] Do not upgrade UNKNOWN to healthy because several docs repeat it
