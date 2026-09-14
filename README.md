# Clank Systems Handbook

Interactive learning application for the human who directed the Clank ecosystem.

This is **not** a programming course and **not** an alphabetical glossary with a GUI.
It teaches software-development and systems-engineering literacy through the real
Clank development story, with three layers on every important concept:

1. Technical definition
2. Real Clank example (repository / commit / report)
3. Explain-it-to-a-human sentence

The unacceptable explanation of the fleet is “I pasted one AI output into another.”

## v0.2 — second-act curriculum (14 September 2026)

`v0.2` is a commissioned update. The **v0.1 freeze was real** (commit
`1803f31749dc219d0662085d6e6b2fb3efc03267`, 30 August 2026) and is preserved as
history. This campaign does not pretend the freeze never happened.

What v0.2 adds, without becoming governance:

- Standards Clank (26/26 RATIFIED at `7c821ea`) — law vs implementation vs
  conformance vs historical vs current
- CVC Clank (GitHub `5328a3c`) — frozen evidence validation; still not a collector
- Clank Ledger M0 (Jules `2c31787`, **no main**) — HIT/MISS / editorial usefulness
- ClankOps Foundations 0–10 (`4467c13`) — Mission ≠ Session ≠ process ≠ handoff
- Quartermaster Clank — local-only **incomplete**; no GitHub repo found
- Then vs now, system-responsibility map, second-act labs
- Fleet cards refreshed to 14 September GitHub HEADs, with COM-001 historically
  proven live SHAs as a **separate** column. Live deployed SHA stays UNKNOWN.

Counts (do not conflate):

| Question | Answer |
| --- | --- |
| Systems v0.1 fleet map knew | 12 |
| Strict post-v0.1 logical births | 3 (Quartermaster, Ledger, ClankOps) |
| New GitHub repos after the freeze | 2 (clank-ledger, clankops) |
| Major systems v0.1 omitted, now taught | 5 (CVC, Standards, Quartermaster, Ledger, ClankOps) |

Reddit is a **source-admission experiment**, not a Clank.

Full archaeology: [`docs/HANDBOOK_V0_2_UPDATE_REPORT.md`](docs/HANDBOOK_V0_2_UPDATE_REPORT.md).

## v0.1 — first usable curriculum (historically frozen)

`v0.1` was the first usable curriculum. Feature development was frozen pending
owner study and learning validation **until this commissioned v0.2**.

v0.1 constraints that **remain binding** in v0.2:

- Live host provenance remains **incomplete by design**. Law 6 cells stay UNKNOWN
  until an operator re-probe lands. GitHub HEAD is not deployed SHA.
- A historical COM-001 live proof is not today's running SHA.
- UNKNOWN stays UNKNOWN. This Handbook is teaching, not normative authority.

The old freeze-deferred list (new modules, labs, routes) was lifted **only** for
this v0.2 campaign, inside this repository.

## Epistemic rules

Every historical claim is one of:

- **verified** — backed by a cited artefact
- **inferred** — interpretation of those artefacts
- **incomplete** — evidence missing; we do not invent it
- **illustrative** — teaching example, not history

UNKNOWN stays UNKNOWN. A commit existing in Git does not prove production is running it.

## Historical ledger

Canonical spine:

- Human-readable: [`docs/CLANK_HISTORY_LEDGER.md`](docs/CLANK_HISTORY_LEDGER.md)
- Machine-readable: `src/content/history.ts` plus `src/content/v02/history.ts`

Incidents live in `src/content/incidents.ts` and `src/content/v02/incidents.ts`.
Fleet Laws live in `src/content/laws.ts`.
Current-state Clank cards live in `src/content/fleet.ts` and are labelled stale where
live-host evidence was not re-probed.

## Relationship to Dead Air University

Separate application. DAU may launch a Handbook exercise via the Practice Labs
`?practice=` query and receive `dau:practice-result`. The Handbook never assigns
mastery, SRS, proficiency, or course completion.

Native DAU Worlds (`idle-time-learning-doodad` `src/worlds`) are simulated causal
systems. This Handbook’s labs use **historical evidence**, not generated physics.

## Run

```bash
npm install
npm run dev         # Vite / TanStack Start at http://localhost:5173
npm test            # content schema, unique ids, dangling-link checks, ledger sync
npm run typecheck
npm run build
npx playwright install chromium
npm run e2e         # lesson nav, freeze→reveal, evidence locker, Explain It Back, history, fleet, then-vs-now, confidence audit
```

Browser-local state key is `clank-handbook-v1`. The Handbook GUI is this
repository; it does not depend on Grok App Builder auth, preview bridges, or
`/__grok` chrome.

## Curriculum

- Historical ledger: twelve phases (nine from v0.1, three second-act), artefact-backed entries
- Then vs now (`/then-now`) and federated responsibility map (`/responsibilities`)
- Evidence preservation manifest + hashed git-resident unit/compose/backup/seed copies (`docs/preserved/`)
- Live provenance report: Law 6 cells remain UNKNOWN (no SSH this campaign)
- Ledger human-review queue (rows not silently rewritten)
- Confidence audit UI (`/evidence`): filter by verified / inferred / incomplete
- History search/filter by concept, Clank, date, law
- How-we-built-it chronological narrative + AI-assisted workflow
- Git/HEAD/SHA/provenance, lifecycle, tests, deploy, ops, SQLite
- Architecture evolution, Fleet Law lineage, Motherclank M0–M4 / Diagnostic inventory
- Standards / ClankOps / Ledger / CVC / Quartermaster / Reddit admission
- Current fleet map: inventory SHA vs repo HEAD vs historically proven vs live UNKNOWN
- Investigation labs (v0.1 nine plus second-act labs)
- Explain-it-back with freeze → reveal + self-rating
- Searchable three-layer glossary

UNKNOWN stays UNKNOWN. GitHub HEAD is not deployed SHA.
