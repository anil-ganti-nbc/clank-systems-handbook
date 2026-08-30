# Architecture

```
content (TS manifests: concepts, modules, incidents, history, laws, fleet)
  → validateHandbook()  [fails CI on dangling ids / missing locators]
  → GUI (overview, how-we-built-it, history, development, systems,
         architecture + law lineage, fleet map, incidents, labs,
         explain-it-back, glossary)
  → browser-local navigation state (clank-handbook-v1)
  → optional postMessage practice result to DAU
```

Canonical historical spine:

- Human: `docs/CLANK_HISTORY_LEDGER.md`
- Machine: `src/content/history.ts`

If they disagree, content validation trusts TypeScript, then the ledger document must be regenerated.

Ownership:

- Handbook: evidence, explanations, lab session UI, historical ledger
- DAU: mastery, SRS, progression
- Worlds: generated causal simulation (different repo/module)

Do not implement this as a dau-world-generator domain plugin.
Do not assign mastery, proficiency, or course completion from this app.
