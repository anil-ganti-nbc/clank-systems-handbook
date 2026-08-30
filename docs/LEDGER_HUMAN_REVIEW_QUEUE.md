# Ledger Human Review Queue

Machine-readable: `src/content/ledger-review.ts` (one object per `HISTORY` id, including `h-evidence-preservation`).

UI: Handbook **Evidence → Rows awaiting human review**.

Git/document-backed historical QA is complete. Remaining non-KEEP action is **blocked on live Hetzner evidence**, not another git walk.

## Final categories (28 rows)

### APPROVED (plain keep)

| id | note |
|---|---|
| h-github-account | GitHub `created_at` VERIFIED |
| h-first-repos | Four repos 4 Aug VERIFIED; unification motive inferred |
| h-sqlite-authoritative | Archaeology “mostly SQLite-backed” VERIFIED; live filenames UNKNOWN |
| h-diagnostic-clank | Repo/ADR-0001 VERIFIED; not a running supervisor |
| h-expansion-scars | Named failure classes as documents |
| h-phase0-freeze | Freeze docs + inventory frozen flag |
| h-fleet-laws | Eight laws + deferred 9 @ d046d54 |
| h-def-m15 | DEF-M1.5 CLOSED same day; current harvest UNKNOWN |
| h-dau-worlds | Repo created; absorption SHA not re-fetched (low risk) |
| h-archaeology | Report exists; inventory through 22 Aug; did not operate collectors |
| h-act011 | 24 Aug scratch restore VERIFIED; Layer C DESIGNED; scratch-now UNKNOWN |
| h-gitignore-runtime | oem-radar@44ce1ac |
| h-watch-unwired | e7eeb3f VERIFIED; host-finding is commit-message testimony |
| h-v03-freeze | Matrix freeze 25 Aug; e9c4a2b is later hygiene |
| h-ai-workflow | Implementation-agent vs operator roles in commit metadata |
| h-handbook | Repo + content-phase commits |
| h-tablet-local | a41d1e7; not a Hetzner membership change |
| h-evidence-preservation | Hashed copies ≠ live host known |

### APPROVED WITH IN-ROW SPLIT

| id | split |
|---|---|
| h-consumer-clanks | Independent collectors before supervisor VERIFIED. Archaeology baselines 14712d9 / 4c115ce are recoverability checkpoints, not exam SHAs, not live. |
| h-portability | Machinery-in-git VERIFIED. Archaeology SHAs not live. Inventory 22 Aug dated. Live SHA UNKNOWN. |
| h-dual-scheduler | Law 5 scar VERIFIED. 21:06Z is law/inventory not live journal. Current scheduler UNKNOWN. |
| h-motherclank-born | Architectural birth VERIFIED. Created ≠ supervising. Live SHA/process/timer/var UNKNOWN. |
| h-materialization | Mechanism VERIFIED. Host timestamps/syslog INCOMPLETE. |
| h-volume-loss | Loss + two continuity outcomes VERIFIED. Restore ≠ rewind. var/ BLOCKED. Live path UNKNOWN. |
| h-ctw-dogfood | Dogfood VERIFIED. 7f977d6 is the guessed-path finding. Dated topology not a map. Live volume UNKNOWN. |
| h-watch-qc | Pin 5de5329. 639/580/41 are 26 Aug snapshot. Live queue UNKNOWN. |
| h-watch-qc-race | Pin ee3f34d. UNIQUE ≠ operator contract. No lived host 500. Later HEADs out. |

### HUMAN DECISION STILL NEEDED

None. Git/document-backed wording risks were resolved in-row. Do not reopen without a new artefact.

### BLOCKED ON LIVE EVIDENCE

| id | action | why |
|---|---|---|
| h-current-gaps | await-host-probe | This row *is* the live-unknown snapshot. SHA/process/scheduler/DB/backup/host stay UNKNOWN until `operator-reprobe.sh`. Historical rows above do not wait on that probe. |

## Owner checklist

- [x] Walk flagged rows first
- [x] Split h-materialization host timestamps — in-row, no new id
- [x] Pin h-watch-qc 5de5329; 639/580/41 dated 26 Aug
- [x] Split h-motherclank-born created ≠ supervising
- [x] Split h-portability machinery-in-git ≠ archaeology SHAs running
- [x] Split h-watch-qc-race UNIQUE ≠ operator contract
- [x] Split h-dual-scheduler recorded retirement ≠ current scheduler
- [x] Split h-volume-loss restore ≠ rewind
- [x] Split h-ctw-dogfood dogfood ≠ current topology
- [x] Split h-consumer-clanks phase ≠ exam SHAs
- [ ] After operator-reprobe.sh, only then consider upgrading live UNKNOWN cells
- [ ] Do not upgrade UNKNOWN to healthy because several docs repeat it
