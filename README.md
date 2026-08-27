# Clank Systems Handbook

Interactive learning application for the human who directed the Clank ecosystem.

This is **not** a programming course and **not** an alphabetical glossary with a GUI.
It teaches software-development and systems-engineering literacy through the real
Clank development story, with three layers on every important concept:

1. Technical definition
2. Real Clank example (repository / commit / report)
3. Explain-it-to-a-human sentence

## Epistemic rules

Every historical claim is one of:

- **verified** — backed by a cited artefact
- **inferred** — interpretation of those artefacts
- **incomplete** — evidence missing; we do not invent it
- **illustrative** — teaching example, not history

Incidents live in `src/content/incidents.ts` as machine-readable manifests.

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
npm test            # content schema, unique ids, dangling-link checks
npm run typecheck
npm run build
npx playwright install chromium
npm run e2e         # lesson nav, freeze→reveal, evidence, Explain It Back
```

Browser-local state key is `clank-handbook-v1`. The Handbook GUI is this
repository; it does not depend on Grok App Builder auth, preview bridges, or
`/__grok` chrome.

## Vertical slice (shipped)

- Pipeline narrative + timeline
- Git/HEAD/SHA/provenance lesson
- Testing vs mission-success lesson
- Deployment/runtime-state lesson
- Three investigations: MATERIALIZATION_GAP, Watch QC flood, BANKAI zero-recall
- Explain-it-back with freeze → reveal + self-rating
- Searchable glossary
