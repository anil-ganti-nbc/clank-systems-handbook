# Handbook v0.2 update report

- **Campaign date:** 2026-09-14
- **Baseline (canonical main / v0.1 freeze):** `1803f31749dc219d0662085d6e6b2fb3efc03267` (2026-08-30)
- **Branch:** `handbook-v0.2-2026-09-14`
- **Version:** 0.2.0
- **Authority:** operator-commissioned freeze lift for **this repository only**. Other Clank repos were read-only evidence.

## Why the freeze was lifted

v0.1 was the first usable curriculum and was frozen pending owner study. Between 30 August and 14 September the ecosystem grew a second act: ratified standards, a development control plane, an editorial HIT/MISS ledger, a local resource/quota tool, and collector work (UI family, schema barriers, Discord, Reddit admission, runtime identity). Teaching v0.1 as “current” would have been a new Law 6 lie. The freeze is preserved as history (`h-v01-freeze`); it is not erased.

## Epistemic firewall (unchanged)

- UNKNOWN stays UNKNOWN.
- GitHub HEAD is not deployed SHA.
- COM-001 historically proven live SHA is not current live.
- Census 2026-09-09 is RECONSTRUCTED, not omniscient live history.
- Absence of a GitHub repo is not filled with a guessed URL.
- Reddit is not a Clank.
- This Handbook is not Standards, Motherclank, ClankOps, or DAU.

## Evidence sources inspected (read-only)

| Source | What it was used for | Limit |
| --- | --- | --- |
| Handbook git @ `1803f31` | v0.1 curriculum, schema, tests, freeze text | — |
| `anil-ganti-nbc/standards-clank` @ `7c821ea` | 26/26 RATIFIED, M58, COM-001 historical proofs | README 12/3 stale |
| `anil-ganti-nbc/clankops` @ `4467c13` | Foundations 0–10, census artefact | no production deploy |
| `anil-ganti-nbc/clank-ledger` @ `2c31787` Jules branch | M0 HIT/MISS | **no main** |
| `anil-ganti-nbc/cvc-clank` @ `5328a3c` | frozen corpus, blockers | local Windows CVC not inspected |
| `clank-architecture` @ `e9c4a2b` | unchanged v0.3 freeze | — |
| `motherclank` @ `7cee2f8` | unchanged M0–M4 | live harvest UNKNOWN |
| `diagnostic-clank` `diagnostic-clank-2026-08` @ `3667af0` | unchanged adapters | live inventory UNKNOWN |
| GitHub default-branch HEADs of 10 participant collectors, 2026-09-14 | repoHead column | not live |
| COM-001 admitted SHAs (nine systems) | historicallyProvenDeployedSha | not current |
| ClankOps census 2026-09-09T23:09:03Z | local-only identities, duplicate groups | source=RECONSTRUCTED |
| Windows paths (`Desktop\Quartermaster Clank`, etc.) | **not present** in this Linux campaign | incomplete |

No `.env`, token, or secret files were read. Dirty worktrees on other Clanks were not reset.

## Strict counts (verified this campaign)

| Question | Count | Identities |
| --- | --- | --- |
| How many logical systems did Handbook v0.1 know about? | **12** | Watch, Smartwatch, Smartphone, Feature Phone, Tablet, KTW, CTW, OEM Radar, FGT, SemInt, Motherclank, Diagnostic |
| How many genuinely new Clank/system identities were created after the 30 August freeze? | **3** logical / **2** GitHub | Quartermaster (local), Clank Ledger, ClankOps |
| How many important systems were absent from v0.1 and are now incorporated? | **5** | CVC (existed, excluded), Standards (existed at boundary, then expanded), Quartermaster, Ledger, ClankOps |

Do not count Reddit as a birth. Do not count Editorial Assist / CVC Workbench / Unified Clank Platform as post-v0.1 births; they are named so they are not collapsed into the five.

## Systems added

Fleet cards (new): `standards-clank`, `cvc-clank`, `clank-ledger`, `clankops`, `quartermaster`, plus teaching identities `unified-clank-platform` (historical), `editorial-assist` (local-probable), `cvc-workbench` (local-probable, not CVC).

## Systems substantially revised

All twelve v0.1 collector/control cards: `repoHead` moved to 2026-09-14 GitHub capture; `inventorySha` / `inventoryAsOf` **unchanged** (2026-08-22 document); `liveDeployedSha` still UNKNOWN; optional `historicallyProvenDeployedSha` from COM-001 where evidenced; `evolution` notes for post-v0.1 git work.

Notable participant git (HEAD ≠ live):

- Watch `930aef1` casio_multi
- Smartwatch `9d85f92` Discord outbox
- Smartphone `60bc5f5` canary promotion
- Tablet `7fd6939` GUI MANUAL provenance
- FPC `c376801` gitignore compose `.env`; schema barrier `b60e881` historical
- KTW `c80a696` The Elec members-only
- CTW `e7f10f8` manual-run DB-race
- OEM `24d61dd` `OEM_RADAR_GIT_SHA`
- FGT `011b89f` operator-console tests
- SemInt `a9a202a` Reddit RSS pilot (muted)

Motherclank and Diagnostic default branches **did not move**.

## Historical phases added

v0.1 nine phases preserved. Appended:

- `p-standards`
- `p-control-planes`
- `p-second-act`

Seventeen history rows `h-v01-freeze` … `h-handbook-v02`. Each has a ledger review.

## Curriculum surfaces added

- `/then-now` — architectural pressure, not a changelog
- `/responsibilities` — federated questions (Motherclank ≠ ClankOps ≠ Standards ≠ Ledger ≠ Quartermaster ≠ CVC)
- Eight second-act labs
- Twelve explain-it-back prompts
- Modules: standards, ClankOps (Foundations 0–10, ClankOps numbering), ledger, quartermaster, CVC, Reddit admission, second act, responsibilities
- 40 new three-layer concepts

## UNKNOWNs retained (deliberate)

- Every collector **live deployed SHA**
- Whether COM-001 SHAs are still running
- Quartermaster local code, APIs, maturity
- CVC local-ahead-of-GitHub
- ClankOps production (none evidenced)
- Ledger `main` (does not exist)
- Windows Task Scheduler remnants
- Durable off-host backups (still DESIGNED except two scratch RPs)
- Motherclank harvest timer enablement / var/

## Local-only evidence

- Quartermaster: census PROBABLE, path `C:\Users\anil\Desktop\Quartermaster Clank`, no GitHub remote (condensed remote `-` / branch `-` is **not** "no git"). Nested `token-stats` SUPPORT_COMPONENT observed `dirty=true`, `dirty_count=4`, latest commit `2026-08-31T09:02:30+05:30` `fix: render recommendation fit percentages`. The `quartermaster-clank` candidate itself records `is_git=false` at the folder root. GitHub search empty. **Windows path not inspected here.** Do not copy the token-stats SHA as Quartermaster HEAD. Stay PROBABLE / incomplete.
- Editorial Assist / Story Intelligence: census PROBABLE local, not counted as a birth Clank.
- CVC Workbench: separate from `cvc-clank`.
- CVC Desktop: NEEDS_RECONSTRUCTION in census; GitHub `5328a3c` is what we have.

## Dirty-worktree evidence

This campaign did not inspect live Windows dirty trees (paths unavailable). Census reported token-stats ahead 12 and dirty — recorded as reconstructed census, not as a verified diff.

## Tests / build / e2e

Ran against this working tree on 2026-09-14, before the PR commit:

| Check | Result |
| --- | --- |
| `npm test` (content/schema integrity) | **16/16 pass**. `HANDBOOK_ISSUES` empty. `PHASES.length >= 12` with all nine v0.1 ids present. historicallyProven ≠ live. Reddit is not a fleet id. |
| `npm run typecheck` | **pass** (`tsc --noEmit`) |
| `npm run build` | **pass** (vite client + SSR + nitro). Catalog chunk is large (~701 kB / gzip 203 kB) because this is a content-heavy teaching app, not a defect. |
| `npm run e2e` | **8/8 pass** (Chromium). Existing vertical-slice, lab freeze, evidence locker, Explain-it-back, History/Fleet UNKNOWN, law lineage, confidence-audit tests plus the new Then vs now / Responsibilities surface. |

Live SHA still UNKNOWN. Inventory as-of still 2026-08-22. The freeze commit `1803f31` remains the parent of this branch.

Playwright note: this sandbox's Handbook `node_modules` is a symlink onto the workspace install, which did not originally expose `@playwright/test`. That package was installed into the shared workspace modules for this run only; it is **not** a Handbook source change and is not part of this PR.

## Correction pass (same branch, unmerged)

Narrow factual repairs after PR #6 opened. Curriculum not redesigned.

1. **Quartermaster is not "no git".** Condensed census remote `-` / branch `-` means no GitHub remote evidenced. `clank_census.json` observed nested token-stats as a git checkout (`dirty=4`, 31 August 2026 commit). Folder-root candidate `is_git=false`. Stay PROBABLE / incomplete. Do not invent a remote or copy the token-stats SHA.
2. **ClankOps Foundation numbers** now mirror ClankOps docs: 0 ledger (+ census bootstrap), 0.1 hardening, 1 Mission/Session/handoff, 2 fleet + Terminal, 3 Git/GitHub, 4 CI evidence, 5 CI artefacts, 6 deployment/runtime, 7 attention, 8 resume packets, 9 launcher admission, 10 process-exit. Parallel Handbook F-sequence removed.
3. **Then-vs-now Standards wording:** existed around the v0.1 boundary but was not one of the 12 taught cards; CVC was the explicit exclusion. Counts unchanged (12 / 3 / 2 / 5).


## Remaining content debt

- Operator live host re-probe (`docs/scripts/operator-reprobe.sh`) still not run.
- Quartermaster folder inspection on Windows.
- Confirm whether local CVC is ahead of `5328a3c`.
- Operator decision on Ledger `main`.
- Whether later Standards/Reddit contracts exist only locally.
- SemInt canonical CI remains RED (disclosed; not called green).
- Brand/OG assets for this standalone GitHub app were not part of the v0.1 freeze contract and were not regenerated here.

## Deliberately excluded

- Merging any PR (Handbook, DAU, CVC observer, Mission 3).
- Filling live SHA from HEAD or COM-001.
- Inventing a Quartermaster GitHub repo or deploy.
- Counting Reddit as a Clank.
- Treating unmerged CVC observer PRs as current architecture.
- Rewriting v0.1 incident chronology.
- M5 mutation, LLM grading, folding Handbook into DAU.
- Edits to any repo other than `clank-systems-handbook`.
