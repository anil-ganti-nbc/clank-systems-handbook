# Clank Fleet Archaeology Report

Status: **Audit draft — evidence-led, not a promotion decision**
Prepared: 2026-08-24
Scope: Watch, Smartwatch, Korean Tech Wire (KTW), Chinese Tech Wire (CTW), Feature Phone, Tablet, Smartphone, Semiconductor Intelligence (SemInt), Free Game Tracker (FGT), and OEM Radar.

## Executive finding

The fleet was not built from one platform. It is a set of independently evolved, mostly SQLite-backed collectors and intelligence systems. The repositories were imported or bootstrapped between 2026-08-04 and 2026-08-10, then rapidly changed through cloud-portability work, field-test launchers, source expansion, deployment repairs, Phase 0 containment, and Fleet-Law conformance.

The integration conclusion is **adapter-first preservation, not collector rewrite**. Each Clank has different identity, source, baseline, state, cadence, and delivery semantics. Motherclank should ingest declared, read-only facts with provenance and capability negotiation. It must not centralize their databases, infer domain meaning, infer deployment truth from a Git branch, or turn an unverified source into a mutation-capable integration.

Recurring failure patterns are:

1. A successful process/run is not proof of useful extraction, delivery, recurrence, or recall.
2. Initial, empty, stale, and historical state can be semantically dangerous; it is not automatically novelty.
3. Scheduler, lock, provenance, and deployment identity are product requirements.
4. Source failure is often an upstream access or coverage failure, not a parser defect.
5. Field-test/owner acceptance can falsify a green automated build.

No Clank is promotion-eligible in the authoritative fleet inventory snapshot. That inventory is explicitly marked INVENTORY_INCOMPLETE and is current only through 2026-08-22. This report does not claim live-host facts beyond that snapshot.

## 1. Method and limits

### Evidence method

The report was reconstructed from:

- the authoritative repository membership and deployment snapshot in diagnostic-clank, fleet.yaml;
- diagnostic-clank architecture, adapter, and DiagnosticBench records;
- all available commit subjects in each target repository, including fetched remote branches;
- current repository READMEs, handoffs, runbooks, and named incident documents; and
- the repository heads listed below.

An evidence reference such as watch-clank@e20eeb3 means the commit that records the change. It establishes that a change was committed, not that it was deployed. Confirmed, partial, open, and unknown retain the meanings used by DiagnosticBench and the fleet inventory.

### Limits auditors must preserve

- Several repositories begin with baseline/import commits. Earlier local or pre-Git history cannot be reconstructed from Git and is deliberately not invented here.
- This review did not operate collectors, inspect production databases, send notifications, or access hosts. Host statements are only those recorded in the fleet inventory.
- A current branch head can differ from a deployed SHA; the report shows both where evidence exists.
- Commit messages are useful chronology, not independent proof of root cause. Stronger claims identify a test, incident report, fleet entry, or DiagnosticBench case.

## 2. Evidence snapshot

| Clank | Head inspected | Commit count | Fleet snapshot position |
|---|---:|---:|---|
| Watch | e982527 | 85 | RUNNING production; Phase 2C read-only adapter |
| Smartwatch | 20d5d0d | 39 | RUNNING staging; obsolete failing timer retired |
| KTW | 6e95c29 | 29 | RUNNING staging; Phase 2C read-only adapter |
| CTW | 9eec9f0 | 26 | RUNNING staging; no host notification authority found |
| Feature Phone | d5d9344 | 30 | production and separate experimental lanes; adapter exists |
| Tablet | f66a7c7 | 19 | disabled experimental checkout |
| Smartphone | 10d5222 | 34 | RUNNING production; Phase 2C read-only adapter |
| SemInt | ece4b00 | 25 | RUNNING staging; scheduler residual explicitly open |
| FGT | 45b47a5 | 27 | RUNNING production; stale local database warning |
| OEM Radar | e12afe9 | 34 | RUNNING staging plus isolated experimental lane; adapter exists |

All deployment classifications, environments, and adapter claims above are from the 2026-08-22 fleet inventory, not a live probe.

## 3. Common chronology

### Origin/import phase: 2026-08-04 through 2026-08-10

FGT and OEM Radar began as imports/pilots. Watch, Smartwatch, Feature Phone, CTW, Smartphone, and SemInt were captured as baseline-before-cloud-migration commits; KTW and Tablet were bootstrapped as new projects. Most early work introduced local Python/SQLite pipelines, source-specific collectors, fixtures, and CLI/dashboard surfaces.

The first architecture precedent is negative: a baseline commit is a recoverability checkpoint, not proof that design, source scope, or deployment is correct.

### Portability/deployment phase: 2026-08-08 through 2026-08-19

Most repositories added Docker or an external one-shot runner, source/image identity, backup artifacts, a scheduler launcher, and host-specific handoff notes. This established that each Clank is a separate runtime with local state. It did not standardize their internal data models.

This phase exposed container layout assumptions, unstable container host names, lock semantics, Task Scheduler actions, duplicate scheduling, stale artifacts, and the distinction between fresh cloud baselines and transferred state.

### Expansion, field test, and repair: 2026-08-10 through 08-21

Source sets expanded quickly. Watch acquired many official and specialist sources; Smartwatch gained official-news and Stage C vendors; KTW added Korean editorial sources; Feature Phone gained isolated itel/Lava lanes; Tablet tested Apple/Samsung/Honor/TCL; Smartphone expanded candidate OEMs; OEM Radar built product engines and experimental sitemap lanes.

The high-value failures were false novelty, empty/zero catalogues, stale evidence, scheduler recurrence mistakes, field-test launcher drift, source 403s, extraction-zero conditions, delivery gaps, and shared-SQLite contention.

### Phase 0 containment and Fleet Laws: 2026-08-21 through 08-22

Every repository received containment-oriented changes: loopback/read-only dashboard controls, dependency/secret/CI remediation, safe Windows process checks where applicable, and Fleet-Law conformance. This is a safety boundary, not a declaration of production readiness.

## 4. Individual dossiers

### 4.1 Watch Clank

**Origin.** Watch started as Casio-Japan editorial discovery. Its pipeline is collector -> content-addressed raw snapshot -> replayable parser -> reference normalization -> identity resolution -> observation -> ledger/dashboard. Collectors/parsers do not directly write the database; pipeline persistence owns transactions. The Git baseline is 14712d9 (2026-08-08).

**Evolution.** It grew into Citizen, Seiko, Timex, Casio regional sitemap deltas, and specialist sources. Important changes include multi-brand observations and scheduling (114d7be, c9b39b8), Timex as a fourth official brand (0ccf8b5), regional commercialisation events (6b6e4ef), specialist-source expansion (cadaac4, b838618), and Hetzner/user-timer operations (12e8d3e, 938cc62, f0b327a). Human QC, review dispositions, and evidence semantics arrived later (f169882, ba36cae).

**Failures and repairs.**

- DiagnosticBench L-WATCH-001 confirms shared SQLite writer contention under timer fan-out. Busy timeout/related hardening was committed in 3fd9a04 and 2d15275. Per-source schedules did not eliminate shared-writer risk.
- Timex baseline absorption occurred because publication time was not consulted (f9a401a); the freshness sequence continued in 0a241e5 and ef2800d. L-WATCH-002 confirms that first seen by a Clank is not new to market.
- Uninitialized-DB new-reference flood (0a505dc), a Citizen stale/out-of-stock flood (f169882), a casio_multi path that could neither emit events nor notify (c81ebed), and silent zero-item health (c474e75, ea2f5a8) are recorded.
- Legacy launcher and notification incidents were treated explicitly (af3b84c, 415fc4c); Windows liveness handling became safer (a2f729c).
- Fleet inventory says deployed revision was f0b327a, not the inspected head. Delivery accounting is not persisted by Watch, so the adapter reports it null/unsupported.

**Integration precedent.** Read-only onboarding is correct for last run, telemetry, event summary, QC dispositions, and schema revision. Do not manufacture delivery success, recompute product identity, or convert a first observation to a fleet finding. Require source-semantic health, baseline flags, time/freshness, and explicit delivery-unknown capability.

### 4.2 Smartwatch Clank

**Origin.** Baseline checkpoint 4c115ce (2026-08-09). The system is an independently runnable connected-wearable collector with durable SQLite observations, deterministic changes, source isolation, silent initial baseline, and protection against failed/empty/catastrophically-shrunken catalogues replacing healthy state.

**Evolution.** Cloud staging and Git-revision provenance arrived in c7422cb and bc948a3. Stage A introduced source/evidence infrastructure (c014eb7), Stage B added Samsung/Google/Garmin/Apple official-news sources (684465b), and Stage C added Garmin catalogue plus Amazfit/Zepp/COROS collectors (8bc79e4, merged as d987b66). Portable soak runner and fixed-clock schedule repairs are e79c5f8 and ad14b92.

**Failures and repairs.**

- Experimental soak accidentally ran production Samsung collectors. e9a897c made run scope explicit. Lifecycle/scope must therefore cross the adapter boundary.
- The host-migration design preserves healthy snapshots, but a container-generated host name would record false migrations without a stable host ID. bc948a3 documents the remedy.
- Fleet inventory records a second systemd soak timer that failed on every fire and was retired on 2026-08-21. Cron is the sole scheduler and must not be re-enabled while it exists.
- First healthy output is a silent baseline; failed/empty/shrunken output must not advance it.

**Integration precedent.** Ingest scope/mode, host migrations, baseline state, run lock/block status, source health, and deployment identity. Never combine staging and retired scheduler evidence as one healthy execution stream. Do not assume notifications.

### 4.3 Korean Tech Wire

**Origin.** KTW was bootstrapped on 2026-08-10 (6dd5d98) as an independent Korean-language technology package, database, configuration, and runtime. It has per-source lifecycle and health with SQLite storage and no alert integration by policy.

**Evolution.** Source research, experimental collectors, storage, Samsung/The Elec hardening, SK hynix, LG Display, ETNews, lifecycle/soak tooling, and Linux handoff arrived from 46f1b60 through b22fd29. Stage 4 promoted The Elec and ETNews on evidence (379d3c2). Stage 4.1 introduced per-source due-gating and failure backoff (afe158e, 45e6ec4). QC writes gained soak-lock protection in 6e95c29.

**Failures and repairs.**

- SK hynix RSS has returned 403 from Hetzner since 2026-08-10. It is documented as a host-level block, not a parser defect; the source backs off rather than retrying at full cadence.
- Adapter onboarding explicitly prevents a blocked streak being displayed as healthy by history; source recency must be honest.
- Delivery/event capabilities are unsupported by policy, not a missing boolean Motherclank can infer.

**Integration precedent.** Use the read-only adapter for lifecycle, per-source health, throughput, and feedback rows. Carry host-blocked/partial/unknown. Do not treat zero articles, historical success, or a scheduler invocation as current source health.

### 4.4 Chinese Tech Wire

**Origin.** CTW was captured as a pre-cloud baseline (c424bbe, 2026-08-08). It is a Chinese technology discovery pipeline: source-specific HTML/RSS parsing, normalized metadata, deterministic scoring, duplicate clustering, original-Chinese preservation, SQLite storage, and selective notification. The V0.1 source set is ITHome, MyDrivers, Expreview, ZOL, and Jiwei.

**Evolution.** Portability added runtime identity/health bridge, Docker, SQLite backup/restore, soak runbook, and immutable image revision (7291c3 through 9f9977b). Windows scheduler, dashboard launcher, field-test collection, and documentary/JD watchlist work expanded it. Current staging image repair added the security package (c1b3a41).

**Failures and repairs.**

- Historical secret scanning and credential rotation remain operator-required.
- Phase 0 hardened credential redaction and dashboard mutation controls (d529526, 6dea216), then corrected portable lock and CI behavior (1ccc968, c177f89, 382d703).
- The fleet inventory records no notification authority/environment on the host, though product code can support Discord. Runtime capability must win.

**Integration precedent.** Ingest per-source collection/source-health facts read-only. Preserve source language, timestamps, raw/story provenance, duplicate-cluster links, and layer (news/community/documentary). Keep blocked regulatory/Geekbench monitoring as unsupported/disabled, not a silent empty source.

### 4.5 Feature Phone Clank

**Origin.** Baseline 7db4f53 (2026-08-09). The core collects HMD listings/sitemap entries, classifies product URLs, extracts embedded structured fields, persists append-only SQLite observations, and diffs deterministic change events.

**Evolution.** Docker/provenance and initial Hetzner lane landed in ea071cc; compose argument order was corrected in dcea466. Stage 4 added durable outbox/Discord delivery (63cbf21), then repaired duplicate unchanged-rerun identity-anomaly notification (a46cc1b). itel and Lava are separately scheduled experimental runners/volumes (b771a0f, af16f30, fc76d20, 49eab25). Field-test application/interactivity followed.

**Failures and repairs.**

- DiagnosticBench L-PHONE-001 confirms stale app/build/launcher mismatch: automated success did not equal owner launch success. The real owner launcher is an acceptance gate.
- Outbox delivery is independent of collection/event persistence. Dedup uses a database UNIQUE constraint on event dedup key, not timestamp heuristics.
- Fleet snapshot has production pinned to c749df3, before current Phase 0/notification changes, and marks notifications not implemented on that deployed revision. It also records an unmerged itel/Lava experimental lane with isolated state.

**Integration precedent.** Report collector runs and blocked_zero_result exactly. Treat production and experimental lanes as different instances. Do not claim delivery from repository head, merge lane baselines, or replace durable outbox states with a generic boolean.

### 4.6 Tablet Clank

**Origin.** Tablet was built as Stage 1 foundation on 2026-08-10 (cbcc10f): evidence-first first-party tablet catalogue changes, no production members, no alerts.

**Evolution.** It added platform-agnostic handoff, safe source validation, Apple reconnaissance/Store probes, Apple identity correction distinction, frozen pre-soak roster, an experimental soak runner, Honor/TCL promotion, and a dense owner field-test console (de921b4 through 8c9e080).

**Failures and repairs.**

- Apple sitemap handling was blocked/retired (bb0115c); this cannot become “no tablets found.”
- Apple identity corrections were explicitly separated from discoveries (a66e52f).
- DiagnosticBench L-FLEET-001 confirms Tablet was omitted when a local directory sweep was treated as fleet inventory.
- Fleet snapshot shows disabled experimental checkout, stale source freshness, no scheduler/notification, and unknown backup.

**Integration precedent.** Membership must come from manifest/registry, never filesystem discovery. Represent disabled state and experimental scope. Require fresh baseline plus scheduler, backup, and source-health evidence before wider onboarding.

### 4.7 Smartphone Clank

**Origin.** Baseline eddf335 (2026-08-08). Smartphone is an evidence engine: collectors normalize discoveries; downstream deterministic enrichment, persistent aliases, timeline, confidence/decay, family links, and alerts interpret them.

**Evolution.** Cloud migration used external one-shot execution (2f66bf8). An eight-OEM soak baseline was recorded in 6d3e333; Wave 1 Google/OnePlus/Nothing/Xiaomi candidates were hard isolated in ddfc2a3. Scheduler starvation/Google health repair followed in fa52929 and b8b8988. macOS runtime boundary fixed a bundled Alembic path (c03bfb8); current code adds a minimal QC action writer (10d5222).

**Failures and repairs.**

- DiagnosticBench L-SMART-001 is partial/open: Samsung traversal succeeded yet zero valid devices were extracted. Root cause is explicitly unknown. HTTP/traversal success is not extraction success and dual baseline authority is a risk.
- The existing adapter exposes collector-run metrics, timeline taxonomy, alert generation versus webhook delivery, rejected candidates, confidence ledger, analyst actions, QC counts, and Alembic revision.
- Fleet snapshot reports production at b8b8988, while the repository includes later security/containment/QC work.

**Integration precedent.** Do not duplicate alias/family/decay logic in Motherclank. Ingest normalized evidence/timeline and declared confidence provenance. Keep extraction health separate from HTTP success and alert generation separate from delivery. A new central baseline may not override local baseline without a migration ADR.

### 4.8 Semiconductor Intelligence

**Origin.** SemInt baseline ff25b6e (2026-08-08) is a legacy import checkpoint. It is a claims-and-evidence intelligence platform whose atomic unit is a claim, not an article. It includes deterministic source plugins, claim suggestions, contradiction logic, source trust, graph queries, story scoring, dashboard, and Signal Radar import.

**Evolution.** Runtime identity/health and Docker landed in c355fab, 6b34977, and c560e07. Unattended collection repair fixed Task Scheduler action and added provider-aware polling (d43481f). Phase 0 added scheduler evidence (54fe610, 89fb7fa); the latest head routes the lane through OperationalScheduler (ece4b00).

**Failures and repairs.**

- Broken Task Scheduler action meant collection was not unattended until d43481f. Scheduler command/provenance is therefore an audit artifact.
- Fleet inventory records a residual: hourly cron invoked pipeline run directly, bypassing OperationalScheduler, flagged for operator decision under Laws 3/5. Repo head improvement is not proof the host changed.
- Signal Radar import is preview-first/transactional: raw sources can import, old derived stories/scores/evidence/entities/labels are not trusted.

**Integration precedent.** Integrate claims/evidence as a distinct subject model, not article events. Preserve source trust, proposal status, and human authority. Require scheduler-path proof before automation health is healthy. Never automatically promote imported derived legacy data to canonical truth.

### 4.9 Free Game Tracker

**Origin.** FGT began as portability pilot c1897aa (2026-08-04) and baseline db8e43a. It detects newly free PC games from Epic, Steam, GOG, then GamerPower; compares snapshots, stores evidence, quality-gates, and selectively notifies. Facts and editorial judgment are separate.

**Evolution.** Portability added Docker/runtime bridge/scheduling/backup restore (421c28f), shifted deployment guidance to NAS (e39fc62), used local hashed-snapshot provenance (ffd5fa5), and recorded Hetzner deployment (473931e). Subscription notifications, category coverage, delivery accounting, Git provenance, and cross-process lock hardening followed (cee8a99, 8d7e2bf, cec0346).

**Failures and repairs.**

- newsroom logs were silently swallowed after each database initialization; 840641f repaired this. A successful run without logs is not evidence.
- Category coverage and delivery accounting were added after hardening; detection and notification success are separate.
- DiagnosticBench L-FGT-001 records partial Helldivers 2/PS Plus miss: catalogue path is not subscription-entitlement path. Root cause remains unknown.
- Fleet snapshot says a repository-directory database is a stale legacy copy; production is a container volume.

**Integration precedent.** Ingest source/category coverage, fact events, quality-gate/suppression count, lock, and delivery accounting separately. Declare subscription entitlement coverage separate from store catalogue coverage. Never use arbitrary local database as production truth.

### 4.10 OEM Radar

**Origin.** OEM Radar began as pre-discount import 2097e9e (2026-08-04), then cloud baseline 6805c0c. It has product normalization, append-only content-hash snapshots, semantic diffing, source descriptors, durable outbox, and optional AI rendering of machine facts. Source is the extension unit, not OEM-specific code plugin.

**Evolution.** Docker/runtime bridge/backup landed in 08f0da6; image provenance in 7510871. Dell US was disabled for persistent 403 (0ceb001); Medion cadence was reduced after soak evidence (0292a66). Editorial recall benchmarks/review candidates, availability transitions, and experimental Lenovo/ASUS/Beelink lanes followed (be44918 through 31fc46b). Stage 2B merge 410313b added availability events, BANKAI recall work, and experimental soaks. Recent work makes dashboard auto-crawl fail closed (4e585ac) and review writes opt-in (e12afe9).

**Failures and repairs.**

- DiagnosticBench L-OEM-001 confirms recurrence error: first fire was mistaken for hourly cadence; it was actually daily. Prove cadence, not one run.
- L-OEM-002 confirms NAS canary safety: pending notifications were correct because NAS could not double-deliver while Hetzner remained authoritative.
- L-OEM-003 records partial/open BANKAI recall gap: operational health did not prove newsroom recall. L-OEM-004 is incomplete-evidence Beelink miss; parser fault must not be invented without exposure evidence.
- DB-002 documents initial-baseline flood: baseline events had to be excluded from dashboard/analytics.
- Dashboard historically could start crawl; later law repair defaults auto-crawl fail-closed. A read surface must not create a second scheduler/crawl authority.

**Integration precedent.** OEM Radar is a reference for immutable snapshots, semantic diff, durable outbox, feedback history, and availability transitions, but not a shared library. Preserve baseline flags, event class/severity, source configuration, outbox state, review history, and experimental/staging separation. Editorial recall is not collector health.

## 5. Cross-fleet precedents

| Precedent | Evidence | Integration rule |
|---|---|---|
| Registry, not directory discovery | Tablet omission L-FLEET-001 | Membership comes from manifest/inventory and stable IDs. |
| Read-only adapters over rewrites | Diagnostic Clank principles; Phase 2C | Adapt local contracts; do not require common databases/collector refactors. |
| Canonical history outlives collector | Smartwatch transfer; Watch/Smartphone baseline failures | Preserve accepted observations/provenance, migrate identity deliberately. |
| Initial baseline is silent | Smartwatch; Watch/FGT/OEM incidents | Carry baseline mode and block live novelty/alerts. |
| Unknown/zero is meaningful | Watch zero items; KTW 403; Smartphone zero extraction | Preserve source status; never coerce unknown/zero to healthy. |
| Health is multi-plane | Watch delivery; FGT logs; OEM recall; Smartphone extraction | Ingest execution, collection, semantic, coverage, persistence, delivery separately. |
| One scheduler/notification authority | Smartwatch retired timer; OEM/FGT dual-host | Inventory authority per lane; prove recurrence; fence duplicate writers. |
| Delivery is not collection | Feature Phone outbox; FGT; Smartphone adapter | Store generated, pending, sent, failed, suppressed, unsupported separately. |
| Field acceptance is evidence | Feature Phone stale app | Owner launcher receives explicit acceptance check. |
| Runtime provenance is mandatory | CTW/OEM/Smartwatch identity; stale FGT DB | Report deployed SHA/config/host/data store; Git head is insufficient. |
| Experimental is isolated | Smartwatch scope defect; Feature Phone/OEM lanes | Explicit environment, database, scheduler, notification boundaries. |

## 6. What auditors should prohibit

1. A fleet-wide shared SQLite database.
2. A single generic success boolean.
3. Central recomputation of local identity/baseline without approved handover.
4. Declaring parser fault without source-exposure evidence.
5. Dashboards/viewers that start collection by default.
6. Mixing experimental and production records, clocks, or notification authority.
7. One-time run being accepted as cadence proof.
8. Alert generation being treated as delivery success.
9. Source absence being reported as a market conclusion.
10. Promotion based on repository CI rather than deployment, backup/restore, scheduler, semantic health, and owner evidence.

## 7. Recommended Motherclank integration sequence

1. Register each **instance**, not only repository: stable Clank ID, environment, deployed SHA, scheduler authority, data-store identity, notification authority, source scope, and adapter version.
2. Begin with read-only evidence adapters. No triggers, config changes, feedback writes, or scheduler registration.
3. Publish adapter mappings for status vocabulary, baseline/mode, observation/finding IDs, times, raw evidence, outbox states, and unsupported fields.
4. Document the authoritative local baseline, keying, and successor identity/alias plan. Generate no candidates during this step.
5. Validate all health planes and at least one independent semantic/coverage probe. Confirm zero/blocked/partial status remains honest.
6. Verify Motherclank cannot introduce a second scheduler or notification sender.
7. Replay historical fixtures to prove no duplicate finding, baseline flood, false novelty, or cross-lane leakage.
8. Run a non-production hot-swap drill: adapter/collector replacement while preserving history, aliases, provenance, and rollback.
9. Use an ADR and human evidence review for every new capability. Phase 0 freeze remains controlling.

## 8. Auditor questions

- **Watch:** Which fields distinguish historical catch-up, discovery, market novelty, and availability? What proves each source and delivery accounting?
- **Smartwatch:** Is exactly one scheduler enabled per lane, and do scope fields prevent experimental/production confusion?
- **KTW:** Is SK hynix block visible/backoff-recognized, and are unsupported delivery values preserved?
- **CTW:** Which source/layer produced a story, what is its timestamp confidence, and is notification authority actually configured?
- **Feature Phone:** Which lane/database generated the event? Is outbox state available and owner launcher accepted?
- **Tablet:** Is it intentionally disabled? Are blocked Apple paths visible and source scope baselined?
- **Smartphone:** Is extraction success measured per collector, and which baseline/alias store is authoritative?
- **SemInt:** Does the scheduler invoke the intended path, and are claim proposals/imports distinct from truth?
- **FGT:** Which source/category/entitlement path was covered, and is the observed DB a production volume rather than stale local copy?
- **OEM Radar:** What are source/recall coverage, baseline, outbox, scheduler/auto-crawl authority, and experimental isolation states?

## 9. Immediate evidence gaps

This report supports design review, not live mutation authority. The next audit needs:

1. current host verification of deployed SHA, data path, lock, scheduler, notification authority, and backup/restore for every instance;
2. machine-readable adapter capability/schema matrix for all Clanks, including explicit unsupported values;
3. baseline and identity-handover records;
4. source coverage/semantic-probe corpus, especially Watch, Smartphone, FGT, OEM Radar, KTW, and Tablet;
5. source-specific incident fixtures from the confirmed cases;
6. lock-safe, append-only evidence for review/QC writes; and
7. single-authority reconciliation for multi-lane deployments.

## Appendix: evidence index

- Membership/deployment authority: diagnostic-clank@10bf0c8, clank-fleet/inventories/fleet.yaml
- Fleet architecture boundaries: diagnostic-clank@10bf0c8, ARCHITECTURE_PRINCIPLES.md
- Reconciliation/non-adoptions: diagnostic-clank@10bf0c8, AUDIT_RECONCILIATION.md
- Seed incident cases: diagnostic-clank@10bf0c8, diagnosticbench/cases/SEED_FIRST_10.yaml
- OEM health/baseline cases: diagnostic-clank@10bf0c8, diagnosticbench/cases/DB-001.yaml through DB-005.yaml
- Watch incidents: diagnostic-clank@10bf0c8, diagnosticbench/cases/DB-006.yaml through DB-008.yaml
- Adapter evidence: diagnostic-clank@215dd7d, then 97b07ae, baf038b, and 6363263

## Conclusion

The evidence does not support a “plug every Clank into Motherclank” sprint. It supports an evidence sequence: stable identity, read-only adapters, preserved local semantics, verified baselines, health/coverage honesty, single authority, and only then reviewed new capabilities. The next product should be an adapter evidence matrix and a conformance corpus—not a shared collector runtime or automatic orchestration layer.
