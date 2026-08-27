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

## Verify

```bash
npm install
npm test        # content schema, unique ids, dangling-link checks
```

The polished GUI currently runs as the Grok App Builder preview of this campaign
(TanStack Start shell). Source of truth for curriculum/evidence is this repository.

## Vertical slice (shipped)

- Pipeline narrative + timeline
- Git/HEAD/SHA/provenance lesson
- Testing vs mission-success lesson
- Deployment/runtime-state lesson
- Three investigations: MATERIALIZATION_GAP, Watch QC flood, BANKAI zero-recall
- Explain-it-back with freeze → reveal + self-rating
- Searchable glossary
