# Architecture

```
content (TS manifests)
  → validateHandbook()  [fails CI on dangling ids]
  → GUI (overview, modules, timeline, labs, explain, glossary)
  → browser-local navigation state (clank-handbook-v1)
  → optional postMessage practice result to DAU
```

Ownership:

- Handbook: evidence, explanations, lab session UI
- DAU: mastery, SRS, progression
- Worlds: generated causal simulation (different repo/module)

Do not implement this as a dau-world-generator domain plugin.
