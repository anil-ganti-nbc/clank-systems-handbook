# Clank Systems Handbook

Interactive learning application for the human who directed the Clank ecosystem.

This is **not** a programming course and **not** an alphabetical glossary with a GUI.
It teaches software-development and systems-engineering literacy through the real
Clank development story, with three layers on every important concept:

1. Technical definition
2. Real Clank example (repository / commit / report)
3. Explain-it-to-a-human sentence

The unacceptable explanation of the fleet is “I pasted one AI output into another.”

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
- Machine-readable: `src/content/history.ts`

Incidents live in `src/content/incidents.ts`. Fleet Laws live in `src/content/laws.ts`.
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
npm run e2e         # lesson nav, freeze→reveal, evidence locker, Explain It Back, history, fleet, confidence audit
```

Browser-local state key is `clank-handbook-v1`. The Handbook GUI is this
repository; it does not depend on Grok App Builder auth, preview bridges, or
`/__grok` chrome.

## Curriculum

- Historical ledger: nine phases, artefact-backed entries (content phase 27; evidence phase adds `h-evidence-preservation`)
- Evidence preservation manifest + hashed git-resident unit/compose/backup/seed copies (`docs/preserved/`)
- Live provenance report: Law 6 cells remain UNKNOWN (no SSH this campaign)
- Ledger human-review queue (rows not silently rewritten)
- Confidence audit UI (`/evidence`): filter by verified / inferred / incomplete
- History search/filter by concept, Clank, date, law
- How-we-built-it chronological narrative + AI-assisted workflow
- Git/HEAD/SHA/provenance, lifecycle, tests, deploy, ops, SQLite
- Architecture evolution, Fleet Law lineage, Motherclank M0–M4 / Diagnostic inventory structure
- Current fleet map with stale/UNKNOWN notes
- Nine investigation labs (start with MATERIALIZATION_GAP, Watch QC, BANKAI)
- Explain-it-back with freeze → reveal + self-rating
- Searchable three-layer glossary

UNKNOWN stays UNKNOWN. GitHub HEAD is not deployed SHA.
