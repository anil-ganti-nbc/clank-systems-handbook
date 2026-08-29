# Clank History Ledger

Canonical human-readable historical spine of the Clank Systems Handbook.
The machine-readable twin is `src/content/history.ts`. If they disagree, treat the TypeScript file as the one content validation checks, then fix this document.

This ledger is **historical evidence**, not a software-requirements specification.
Dead Air University owns mastery. Native DAU Worlds own simulators. This Handbook owns the story of how the fleet was actually built, operated, broken, repaired, and evolved.

## Epistemic rules

Every historical claim is one of:

- **VERIFIED** — backed by a cited artefact (repository, path, SHA, report, date).
- **INFERRED** — interpretation of those artefacts; not a fact.
- **INCOMPLETE** — evidence missing; we do not invent it.
- **ILLUSTRATIVE** — teaching example, not history.

UNKNOWN stays UNKNOWN. A GitHub commit existing is not proof that production is running it.
Archaeology inventory in `clank-architecture` was current through **2026-08-22**. Later repository pushes (including 2026-08-27 Watch QC race and Tablet local QC) are recorded as **repo HEAD**, not as proven Hetzner membership unless a live host artefact says so.

## How to read an entry

Each entry records: date / period, systems, event, before, change, why, evidence, commits, concepts taught, what failed, diagnosis, fix, verification, residual risk, later consequence, confidence.

## Archaeology (this pass)

Inspected via GitHub API and cited documents, not by operating collectors or opening production SQLite:

- **Account:** `anil-ganti-nbc` (created 2026-08-03T08:56:41Z).
- **Governance:** `clank-architecture` (HEAD cited through e9c4a2b; ADRs 0001–0014; `FLEET_LAWS.md`; `DECISION_LEDGER.md`; `GOLDEN_INCIDENT_CORPUS.md`; `AGENT_RULES.md`; `CTW_ONBOARDING_DOGFOOD.md`; `DATA_SURVIVABILITY.md`; `FLEET_CAPABILITY_MATRIX.md`; `audits/CLANK_FLEET_ARCHAEOLOGY_REPORT_2026-08-24.md`; `audits/INCIDENT_IMPACT_MAP_2026-08-23.md`).
- **Control plane:** `diagnostic-clank` (created 2026-08-17; adapter plane; `fleet.yaml`).
- **Supervisor:** `motherclank` (created 2026-08-22; M0–M4; M5 forbidden).
- **Collectors:** `oem-radar`, `free-game-tracker`, `watch-clank`, `smartwatch-clank`, `smartphone-clank`, `feature-phone-clank`, `tablet-clank`, `chinese-tech-wire`, `korean-tech-wire`, `semiconductor-intelligence`.
- **Teaching:** `idle-time-learning-doodad` (DAU), `dau-world-generator`, `clank-systems-handbook`.
- **Adjacent:** `unified-clank-platform` (proposed for supersession, ADR-0001).

**Gaps this ledger will not paper over:**

- Live host SHA / backup posture for most lanes remains UNKNOWN (Law 6).
- Raw syslog for INC-20260822-A is not in this Handbook checkout.
- Motherclank `var/` confirmation of INC-20260823 was BLOCKED in the impact map.
- FGT `REAL_STATE_VALIDATION` BLOCKED until a live copy is probed.
- Windows host state UNKNOWN.
- Durable off-host backups DESIGNED ONLY (ACT-011 verified restore on temporary_scratch for two lanes).
- Promotion freeze still controlling as of 2026-08-27.

## Historical phases

Derived from artefacts. Not a forced textbook structure. The final architecture did not exist on 4 August 2026.

### Origin: independent collectors

- **Id:** `p-origin`
- **Date range:** 2026-08-03 to 2026-08-10
- **Confidence:** VERIFIED
- **Summary:** The GitHub account appears. OEM Radar, Free Game Tracker, unified-clank-platform, and clank-architecture land on 4 August. Consumer-device Clanks and news wires follow within a week. There is no fleet supervisor.
- **Components:** oem-radar; free-game-tracker; watch-clank; smartwatch-clank; smartphone-clank; feature-phone-clank; chinese-tech-wire; korean-tech-wire; semiconductor-intelligence; clank-architecture
- **Responsibilities:** Each Clank collects, stores, and (sometimes) notifies for one domain. Architecture repo is a governance notebook, not a runtime.
- **Data flow:** Source HTML/RSS → parser → SQLite. No shared database.
- **Scheduling:** Local one-shot CLIs plus OS schedulers (Windows Task Scheduler, later cron/systemd). No single fleet clock.
- **Storage:** Per-Clank SQLite. Baseline commits are recoverability checkpoints, not proof of design.
- **Alerting:** Optional Discord webhooks. Several Clanks have no alert path by policy.
- **QC:** None as a fleet function. Editorial judgment is the human reading Discord or a local dashboard.
- **Fleet supervision:** None. Local dashboards and operator memory.
- **Why this layer appeared:** The newsroom needed sensors for OEM hardware, free games, watches, phones, and regional tech wires. Independent Python collectors were the fastest way to start. Unification was not yet a problem because there was not yet a fleet.

### Portability: Docker, NAS, Hetzner

- **Id:** `p-portability`
- **Date range:** 2026-08-08 to 2026-08-19
- **Confidence:** VERIFIED
- **Summary:** Collectors leave the laptop. Docker images, runtime identity, backup scripts, and host-specific handoffs appear. Each Clank becomes a separate runtime with local state.
- **Components:** Docker images; Hetzner host; NAS (FGT/OEM lore); Windows Task Scheduler remnants; per-Clank volumes
- **Responsibilities:** Move collection off the operator's workstation without rewriting collectors.
- **Data flow:** Same pipelines; data now lives in container volumes and host paths. Local checkout databases become stale copies.
- **Scheduling:** Host cron, systemd user timers, leftover Windows tasks. Duplicate authorities start to appear.
- **Storage:** SQLite in named volumes. Backup/restore scripts exist in some repos; scheduling of those scripts is often UNKNOWN.
- **Alerting:** Production Discord webhooks move to Hetzner. Dual-host delivery becomes a real risk.
- **QC:** Still human, still per-Clank.
- **Fleet supervision:** Still none. Field-test launchers become an acceptance gate.
- **Why this layer appeared:** A collector that only runs when the laptop is open cannot be a newsroom sensor. Portability created the first real deployment identity problems: which SHA is running, which database is production, which scheduler is live.

### Expansion, field test, and first scars

- **Id:** `p-expansion`
- **Date range:** 2026-08-10 to 2026-08-21
- **Confidence:** VERIFIED
- **Summary:** Source sets explode. False novelty, empty catalogues, 403s, dual schedulers, and 'green build ≠ owner can launch' show up as named failures. Diagnostic Clank is created as a read-only control-plane prototype.
- **Components:** watch-clank source expansion; smartwatch Stage A–C; KTW editorial sources; oem-radar BANKAI soaks; diagnostic-clank; tablet-clank
- **Responsibilities:** Cover more of the market. Prove recall. Survive field tests.
- **Data flow:** More sources, same SQLite notebooks. Baseline floods and FIRST_SEEN inversions pollute events.
- **Scheduling:** Per-source timers, soak runners, dual lanes. Recurrence is often assumed from a first fire.
- **Storage:** Authoritative SQLite plus experimental volumes that must not mix.
- **Alerting:** Notification paths proliferate and sometimes go silent (casio_multi, FGT subscription blackout).
- **QC:** Watch begins human review dispositions. Others remain dashboard/Discord.
- **Fleet supervision:** Diagnostic Clank inventories the fleet; it does not supervise runtime.
- **Why this layer appeared:** Coverage pressure produced the failure classes the later laws exist to name: FIRST_SEEN ≠ new, HTTP 200 ≠ useful, first fire ≠ cadence, green tests ≠ mission recall.

### Phase 0 freeze and Fleet Laws

- **Id:** `p-phase0`
- **Date range:** 2026-08-21 to 2026-08-22
- **Confidence:** VERIFIED
- **Summary:** Promotion is frozen. Governance is assigned to clank-architecture; inventory to diagnostic-clank. Eight binding Fleet Laws are codified from hostile-audit specimens.
- **Components:** clank-architecture; FLEET_LAWS.md; NO_PROMOTION_POLICY.md; conformance/test_fleet_laws.py; diagnostic-clank fleet.yaml
- **Responsibilities:** Stop promoting until the fleet can tell the truth about itself.
- **Data flow:** Unchanged collectors. New: a written law that events, health, novelty, and delivery are different planes.
- **Scheduling:** Law 5: exactly one enabled scheduler per Clank-lane.
- **Storage:** Law 7: one cross-process lock per SQLite file, dashboards included.
- **Alerting:** Law 4: fail-closed unknown reasons. Law 8: no production source without a promotion record.
- **QC:** Named as a plane, not yet a fleet function.
- **Fleet supervision:** Still missing — laws without a harvester.
- **Why this layer appeared:** The audit showed the same lies in ten dialects. Writing them down as testable invariants was cheaper than rewriting every collector.

### Motherclank M0–M4

- **Id:** `p-motherclank`
- **Date range:** 2026-08-22
- **Confidence:** VERIFIED
- **Summary:** ADR-0002 creates a separate read-only supervisory layer. Motherclank harvests adapter snapshots, synthesizes UNKNOWN-honest health, detects anomalies, and proposes — it never remediates. Diagnostic Clank keeps the adapter plane.
- **Components:** motherclank; diagnostic-clank adapters; fleet.yaml inventory; user systemd harvest timer
- **Responsibilities:** Observe the fleet without becoming a second writer, scheduler, or notifier.
- **Data flow:** Read-only copies of Clank state → adapters → hash-chained JSONL snapshots + Markdown report. Clank SQLite remains authoritative.
- **Scheduling:** One fixed-clock user timer. Dual timers per lane would violate Law 5.
- **Storage:** Derived snapshots only. Disposable. Rollback = disable timer and delete var/.
- **Alerting:** None. Recommendations are text.
- **QC:** M4 may ingest disposition corpora read-only.
- **Fleet supervision:** First fleet-wide single view. M5 mutation is explicitly forbidden.
- **Why this layer appeared:** Local dashboards could not be trusted: timers that fired without starting, 200-with-zero, dual schedulers, soaks with no promotion record. A camera was needed that could not also hold the keys.

### Silent outage and volume loss

- **Id:** `p-scars`
- **Date range:** 2026-08-22 to 2026-08-24
- **Confidence:** VERIFIED
- **Summary:** Two incident families in one window: a stash -u recreation of root-owned logs/ stopped collectors before they started (~36h), then a destructive operator error deleted live volumes. Smartwatch restored with a gap; feature-phone began a new epoch.
- **Components:** oem-radar; smartwatch-clank; feature-phone-clank; cron; Docker volumes; Motherclank continuity seeds
- **Responsibilities:** Survive human/agent destructive error and prove what actually ran.
- **Data flow:** Interrupted. Then rewritten by restore vs new-epoch. Organic recovery narratives are forbidden.
- **Scheduling:** Cron still elapsed during the materialization gap. Invocation was not execution.
- **Storage:** SQLite volumes revealed as irreplaceable observational memory.
- **Alerting:** Silent. No failure records could exist if the process never started.
- **QC:** Unmeasurable on affected lanes; UNKNOWN, not zero.
- **Fleet supervision:** Motherclank could not yet name MATERIALIZATION_GAP; STALE_RUN inference was the wrong shape.
- **Why this layer appeared:** These two days produced continuity, survivability, liveness, and runtime-state-separation ADRs. The architecture after 24 August is a scar map.

### Continuity, liveness, survivability

- **Id:** `p-continuity`
- **Date range:** 2026-08-24
- **Confidence:** VERIFIED
- **Summary:** ADR-0006 (epochs), 0007 (destructive safety), 0008 (execution liveness / MATERIALIZATION_GAP), 0009 (runtime state vs source tree). Golden incidents GIC-01–25. Archaeology report. Canonical architecture v0.2.
- **Components:** motherclank continuity/liveness/survivability modules; G1–G8 fixtures; ACT-011 restore drills; clank-architecture ADRs
- **Responsibilities:** Name states that used to be collapsed: restored vs new-epoch, fired vs started vs useful work, backup present vs restore-verified.
- **Data flow:** Append-only ContinuityEvent registry. Derived claims carry epoch identity.
- **Scheduling:** Six-stage execution-liveness model. INTENTIONALLY_DORMANT is not MISSING_RUN (Tablet).
- **Storage:** Protection classes proposed. Durable off-host copies remain OPEN.
- **Alerting:** Still Motherclank-propose only.
- **QC:** Soak opened as a separate axis from Clank maturity.
- **Fleet supervision:** Observer contract v0.2. Capability is a six-state vocabulary, not a boolean.
- **Why this layer appeared:** Without these names, a restored database looks like a rewind, an empty new epoch looks like a market crash, and a fired timer looks like a healthy collector.

### Human QC, dogfood onboarding, freeze

- **Id:** `p-qc-onboard`
- **Date range:** 2026-08-25 to 2026-08-26
- **Confidence:** VERIFIED
- **Summary:** Watch QC flood teaches that catalogue-pass is an invocation fact. CTW and Semiconductor Intelligence are onboarded as observer adapters and scored against the playbook. Architecture v0.3 is frozen.
- **Components:** watch-clank QC; CTW adapter; SI adapter; ONBOARDING.md; FLEET_CAPABILITY_MATRIX.md
- **Responsibilities:** Prove a new Clank can join as an observer without Motherclank growing Clank-name conditionals.
- **Data flow:** Typed EvidenceEnvelope (ADR-0014). Participant-native confidence preserved verbatim.
- **Scheduling:** Scheduler-trace capability remains supported_unconfigured fleet-wide.
- **Storage:** Unchanged. Survivability still unproven except smartwatch + feature-phone recovery points.
- **Alerting:** Unsupported or undeployed on several lanes, honestly labelled.
- **QC:** Watch queue accounting (639 / 580 / 41). Review mode three-valued.
- **Fleet supervision:** v0.3 frozen 2026-08-25: no speculative core redesign until a real participant proves the contract insufficient.
- **Why this layer appeared:** Onboarding is how the architecture is tested. Dogfooding the playbook on CTW caught a guessed refresh path that review could not see.

### Current mature-ish fleet

- **Id:** `p-current`
- **Date range:** 2026-08-26 to 2026-08-27
- **Confidence:** VERIFIED
- **Summary:** A heterogeneous, law-bound, observer-supervised fleet. Promotion remains frozen. Durable off-host backups are still a blocker. The Clank Systems Handbook is created so the operator can explain the process without collapsing it into 'I pasted one AI output into another.'
- **Components:** active Clanks; Motherclank harvest; Diagnostic Clank adapters; Dead Air University; Clank Systems Handbook
- **Responsibilities:** Keep collecting; keep observing; do not auto-promote; teach the operator the real engineering process.
- **Data flow:** Clank SQLite authoritative → adapter facts → Motherclank derived snapshots. Handbook is historical evidence, not SRS.
- **Scheduling:** Per-Clank single authority, plus one Motherclank harvest timer.
- **Storage:** Per-Clank SQLite. Two lanes have restore-verified recovery points on temporary scratch only.
- **Alerting:** Mixed: some active, some unsupported_by_policy, some supported_undeployed.
- **QC:** Watch live; smartphone writer added; KTW feedback under RunLock; others unsupported or unverified.
- **Fleet supervision:** Motherclank M0–M4. M5 still requires a future ADR.
- **Why this layer appeared:** This is not a finished platform. It is a fleet that can admit UNKNOWN, that remembers some of its scars as fixtures, and that still cannot survive another volume deletion on most lanes.

## Ledger entries

Count: **27**. Confidence: **27 verified**, **0 inferred**, **0 incomplete**.

### 2026-08-03 — GitHub account anil-ganti-nbc is created. Idea becomes a remote that can hold repositories.

- **Id:** `h-github-account`
- **Period:** 2026-08-03
- **Phase:** `p-origin`
- **Systems:** github.com/anil-ganti-nbc
- **Confidence:** VERIFIED

**Event.** GitHub account anil-ganti-nbc is created. Idea becomes a remote that can hold repositories.

**Before.** No hosted Git identity for the fleet.

**Change.** Account created_at 2026-08-03T08:56:41Z (GitHub user API).

**Why.** Collectors needed a shared remote so agent sessions and hosts could push and pull the same history.

**Later consequence.** Every later SHA, PR, and host checkout is relative to this remote.

**Evidence.**

- `ev-gh-me` (repo, VERIFIED) anil-ganti-nbc https://github.com/anil-ganti-nbc — User created_at 2026-08-03T08:56:41Z via GitHub API.

**Commit(s).** None recorded on this row (the evidence may still be a repo creation timestamp or a document without a pinned SHA).

**Concepts taught.** `github`, `repository`, `origin`

**Laws.** (none)

**Incidents.** (none)

### 2026-08-04 — First four Clank-related repositories appear on GitHub the same morning.

- **Id:** `h-first-repos`
- **Period:** 2026-08-04
- **Phase:** `p-origin`
- **Systems:** oem-radar; free-game-tracker; unified-clank-platform; clank-architecture
- **Confidence:** VERIFIED

**Event.** First four Clank-related repositories appear on GitHub the same morning.

**Before.** No versioned project boxes.

**Change.** oem-radar 09:15Z (import/pilot), free-game-tracker 09:17Z, unified-clank-platform 09:19Z, clank-architecture 09:52Z with initial baseline commit b91c156.

**Why.** OEM hardware and free-game detection were the first newsroom sensors. Architecture and a 'unified platform' idea were created the same day — unification was hoped for before it was earned.

**Later consequence.** unified-clank-platform is later proposed for supersession (ADR-0001); collectors remain independent repos.

**Evidence.**

- `ev-oem-created` (repo, VERIFIED) anil-ganti-nbc/oem-radar — created_at 2026-08-04T09:15:02Z. Description: oem radar before discount tracker nad new oems.
- `ev-arch-init` (commit, VERIFIED) anil-ganti-nbc/clank-architecture @b91c156f9eb5fa092892a602a8dba445c2d06b41 — Initial architecture baseline and implementation history, 2026-08-04T09:52:48Z.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `b91c156f9eb5fa092892a602a8dba445c2d06b41` — architecture baseline

**Concepts taught.** `repository`, `commit`, `collector`

**Laws.** (none)

**Incidents.** (none)

### 2026-08-09 — Consumer-device Clanks and regional wires proliferate. Many collectors, not yet a supervisor.

- **Id:** `h-consumer-clanks`
- **Period:** 2026-08-08 to 2026-08-10
- **Phase:** `p-origin`
- **Systems:** watch-clank; smartwatch-clank; smartphone-clank; feature-phone-clank; chinese-tech-wire; semiconductor-intelligence; korean-tech-wire
- **Confidence:** VERIFIED

**Event.** Consumer-device Clanks and regional wires proliferate. Many collectors, not yet a supervisor.

**Before.** Two product sensors (OEM Radar, FGT) plus architecture notes.

**Change.** CTW 14:28Z, watch-clank 14:29Z, smartwatch-clank 14:29Z, smartphone-clank 14:28Z, feature-phone + SemInt 15:00Z on 9 Aug; KTW bootstrapped 10 Aug 07:39Z. Archaeology names Git baselines such as Watch 14712d9 (8 Aug) and Smartwatch 4c115ce (9 Aug).

**Why.** Each product category and language market needed its own source adapters. Copying a working SQLite collector was faster than a platform.

**Later consequence.** Heterogeneous semantics become the reason Motherclank must adapt rather than rewrite.

**Evidence.**

- `ev-archaeology-origin` (report, VERIFIED) anil-ganti-nbc/clank-architecture audits/CLANK_FLEET_ARCHAEOLOGY_REPORT_2026-08-24.md @431ba01efc156729574ffd9a470fb41f0a8aaa62 — §3 Origin/import phase: repos imported or bootstrapped 2026-08-04 through 2026-08-10.

**Commit(s).** None recorded on this row (the evidence may still be a repo creation timestamp or a document without a pinned SHA).

**Concepts taught.** `collector`, `source-adapter`, `database`, `sqlite-authoritative`

**Laws.** (none)

**Incidents.** (none)

### 2026-08-09 — SQLite becomes more than storage: it is the memory of what each collector has already seen.

- **Id:** `h-sqlite-authoritative`
- **Period:** 2026-08-04 to 2026-08-19
- **Phase:** `p-origin`
- **Systems:** all collectors
- **Confidence:** VERIFIED

**Event.** SQLite becomes more than storage: it is the memory of what each collector has already seen.

**Before.** A scraper that printed results could forget yesterday.

**Change.** Every mature Clank persists observations in a local SQLite file. Novelty, baselines, outboxes, and QC all hang off that file. Archaeology: 'independently evolved, mostly SQLite-backed collectors'.

**Why.** Without durable local state, FIRST_SEEN and baseline are impossible, and a restart looks like the birth of the market.

**Later consequence.** Law 7 (writer lock) and ADR-0002 (Motherclank must not write Clank DBs) are the legal form of this decision.

**Evidence.**

- `ev-sqlite-arch` (report, VERIFIED) anil-ganti-nbc/clank-architecture audits/CLANK_FLEET_ARCHAEOLOGY_REPORT_2026-08-24.md — Executive finding: mostly SQLite-backed collectors; Motherclank must not centralize their databases.
- `ev-adr2-sqlite` (doc, VERIFIED) anil-ganti-nbc/clank-architecture adr/0002-motherclank-supervisory-architecture.md @b341b0f0805ff747c6ada55888ce21476fc05386 — Clank SQLite remains authoritative; Motherclank never becomes the source of domain truth.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `b341b0f0805ff747c6ada55888ce21476fc05386`

**Concepts taught.** `sqlite-authoritative`, `database`, `baseline`, `authoritative-state`, `derived-state`

**Laws.** `law-7`

**Incidents.** `inc-writer-lock`

### 2026-08-12 — Collectors gain portable deployment machinery and host handoff support.

- **Id:** `h-portability`
- **Period:** 2026-08-08 to 2026-08-19
- **Phase:** `p-portability`
- **Systems:** Hetzner; NAS; Docker; Windows Task Scheduler
- **Confidence:** VERIFIED (machinery in git) / live deployed SHA UNKNOWN

**Event.** Collectors gain portable deployment machinery and host handoff support.

**Before.** Local Python CLIs and Windows scheduled tasks.

**Change.** Archaeology §3 in the 2026-08-24 report records a portability/deployment phase from 2026-08-08 through 2026-08-19 in which most collector repos gained Docker or external one-shot runners, source/image identity, backup artefacts, scheduler launchers, and host-specific handoff notes. That proves portable deployment machinery entered the git record. It does not prove those exact versions ran on a host then, or run now. FGT 473931e and Watch 12e8d3e / 938cc62 / f0b327a are archaeology-cited commits from that phase, not live deployed SHAs. The 2026-08-22 fleet inventory later recorded Watch f0b327a and FGT cec0346; that is a dated inventory snapshot, not a current runtime probe. Git-resident Docker, unit, and backup templates do not prove timer enablement, a running image, or a live volume. Current deployed SHAs remain UNKNOWN.

**Why.** A newsroom sensor has to run unattended. Moving hosts created the first SHA-vs-runtime and volume-vs-checkout problems.

**What failed.** Container host names, lock semantics, duplicate scheduling, stale local DBs mistaken for production.

**Verification.** Portable deployment machinery in git / archaeology §3: VERIFIED. Named SHAs are archaeology citations, not live deployed SHAs. 2026-08-22 inventory (Watch f0b327a, FGT cec0346) is a dated snapshot, not a current probe. Live deployed SHA, enabled scheduler, and live volume: UNKNOWN.

**Residual risk.** Current deployed SHAs remain UNKNOWN. Do not re-promote FGT 473931e or Watch 12e8d3e / 938cc62 / f0b327a as live. Later repo HEADs (Watch 9d812ed, FGT 45b47a5) stay out of this row.

**Later consequence.** Law 6 provenance and Law 9 (deferred) trailing-checkout metric.

**Evidence.**

- `ev-port-phase` (report, VERIFIED) anil-ganti-nbc/clank-architecture audits/CLANK_FLEET_ARCHAEOLOGY_REPORT_2026-08-24.md — §3 Portability/deployment phase 2026-08-08 through 2026-08-19. Named SHAs in that report are commit citations, not live deployed revisions.

**Commit(s).** None recorded on this row. Archaeology-cited SHAs (FGT 473931e; Watch 12e8d3e / 938cc62 / f0b327a) stay out of `commits[]` — they are report citations, not verified deployments.

**Concepts taught.** `deployment`, `container`, `host`, `volume`, `head-vs-deployed`, `production`, `staging`

**Laws.** `law-6`

**Incidents.** `inc-deployed-sha`

### 2026-08-17 — Diagnostic Clank is created as a deterministic read-only diagnostics, inventory, and adapter plane — not a Motherclank.

- **Id:** `h-diagnostic-clank`
- **Period:** 2026-08-17 to 2026-08-21
- **Phase:** `p-expansion`
- **Systems:** diagnostic-clank
- **Confidence:** VERIFIED

**Event.** Diagnostic Clank is created as a deterministic read-only diagnostics, inventory, and adapter plane — not a Motherclank.

**Before.** No machine-readable fleet inventory. Membership could be guessed from a directory listing.

**Change.** Repo created 2026-08-17T21:01:36Z. Default branch diagnostic-clank-2026-08. Later owns fleet.yaml and the adapter plane Motherclank consumes (ADR-0001, ADR-0002).

**Why.** Someone had to know which Clanks existed, on which host, at which SHA, without taking their locks.

**Later consequence.** L-FLEET-001 (directory sweep omitted Tablet) becomes the membership rule: registry, not filesystem.

**Evidence.**

- `ev-dc-created` (repo, VERIFIED) anil-ganti-nbc/diagnostic-clank — created_at 2026-08-17T21:01:36Z. Description names read-only diagnostics, Agent Output Inbox, dynamic registry.
- `ev-adr1` (doc, VERIFIED) anil-ganti-nbc/clank-architecture adr/0001-authority-and-phase0-freeze.md @515ed4b4c25d90758bd97fe4614ab08cfb38fc17 — Governance in clank-architecture; control plane and inventory in diagnostic-clank.

**Commit(s).** None recorded on this row (the evidence may still be a repo creation timestamp or a document without a pinned SHA).

**Concepts taught.** `diagnostic-clank`, `contract`, `source-adapter`

**Laws.** (none)

**Incidents.** `inc-directory-sweep`

### 2026-08-18 — Source expansion produces the first named failure classes: false novelty, empty-but-200, dual schedulers, recall gaps.

- **Id:** `h-expansion-scars`
- **Period:** 2026-08-10 to 2026-08-21
- **Phase:** `p-expansion`
- **Systems:** watch-clank; oem-radar; smartwatch-clank; korean-tech-wire; smartphone-clank
- **Confidence:** VERIFIED

**Event.** Source expansion produces the first named failure classes: false novelty, empty-but-200, dual schedulers, recall gaps.

**Before.** Collectors that 'worked' on a handful of sources.

**Change.** Watch adds Citizen/Seiko/Timex/specialists. Smartwatch Stages A–C. KTW Korean editorial sources (SK hynix 403 from Hetzner since 10 Aug). OEM Radar BANKAI soaks. DiagnosticBench cases L-WATCH-*, L-OEM-*, L-SMART-001.

**Why.** Coverage without novelty/health/delivery planes produces floods and false confidence.

**Later consequence.** These specimens are copied into Fleet Laws v1 on 21–22 August.

**Evidence.**

- `ev-exp-phase` (report, VERIFIED) anil-ganti-nbc/clank-architecture audits/CLANK_FLEET_ARCHAEOLOGY_REPORT_2026-08-24.md — §3 Expansion, field test, and repair 2026-08-10 through 08-21. High-value failures listed.
- `ev-lw001-hist` (doc, VERIFIED) anil-ganti-nbc/watch-clank WATCH_EXPANSION_FAILURE_CORPUS.md — L-WATCH-001 FIRST_SEEN_BY_CLANK ≠ NEW_TO_MARKET, CONFIRMED FIXED.

**Commit(s).** None recorded on this row (the evidence may still be a repo creation timestamp or a document without a pinned SHA).

**Concepts taught.** `first-seen`, `false-positive`, `health-check`, `mission-fail`, `soak`

**Laws.** `law-1`, `law-2`, `law-3`

**Incidents.** `inc-qc`, `inc-bankai`, `inc-health-honesty`

### 2026-08-21 — Law 5 specimen: smartwatch dual-lane — competing soak timer retired in the 2026-08-21 law/inventory record.

- **Id:** `h-dual-scheduler`
- **Period:** 2026-08-21
- **Phase:** `p-phase0`
- **Systems:** smartwatch-clank; watch-clank; semiconductor-intelligence
- **Confidence:** VERIFIED (failure class + dated recorded retirement) / current scheduler UNKNOWN

**Event.** Law 5 specimen: smartwatch dual-lane — competing soak timer retired in the 2026-08-21 law/inventory record.

**Before.** A Clank-lane could have more than one enabled scheduling mechanism. Experimental soaks could reach production collectors.

**Change.** FLEET_LAWS.md Law 5 (`d046d54`) records dual scheduling as a named failure class and the smartwatch specimen: systemd soak timer retired 2026-08-21T21:06Z, cron kept. That timestamp is law/inventory text (also `fleet.yaml` soak row `observed_at_utc` 2026-08-21T21:06:00Z), not recovered journalctl. The 2026-08-22 inventory lists `smartwatch-hetzner-soak-timer-retired` as DISABLED (`enabled: false`; files retained unscheduled) beside a cron lane RUNNING staging at `d987b66` — a dated snapshot of what Phase 2A recorded, not a current probe. Git-resident soak unit/crontab examples prove competing-scheduler machinery existed; templates do not prove enablement then or now. Sibling specimens (Watch `fcb5e91` ghost cron; SemInt cron bypassing OperationalScheduler) name the class; the SemInt residual was still OPEN in that inventory. Later repo HEADs stay out of this row. Current enabled scheduler per lane remains UNKNOWN.

**Why.** Two clocks on one notebook double-notify, starve each other, or hide which path actually ran.

**What failed.** Failing timer fired hourly with zero observability (Law 3 specimen). Experimental soak ran production Samsung collectors (e9a897c made scope explicit).

**Verification.** Failure class and dated recorded retirement (Law 5 @ d046d54; 2026-08-22 inventory soak row DISABLED at 21:06Z): VERIFIED. 21:06Z is law/inventory text, not recovered journalctl. Current enabled scheduler per lane: UNKNOWN.

**Residual risk.** Do not teach 'cron is the sole scheduler now'. Git templates ≠ enabled. Watch fcb5e91 and SemInt residuals are the class, not this host action; SemInt was still OPEN in the 22 Aug inventory. Later HEADs (smartwatch a717977) stay out. Live scheduler authority remains UNKNOWN.

**Later consequence.** GIC-24 dual scheduler authority. Tablet later encoded as INTENTIONALLY_DORMANT so a stale unit file is not a second authority.

**Evidence.**

- `ev-law5` (doc, VERIFIED) anil-ganti-nbc/clank-architecture FLEET_LAWS.md @d046d54428b1e9dfdb63b8336959df955dd6820a — Law 5: smartwatch dual-lane (cron kept, systemd retired 2026-08-21T21:06Z). Timestamp is law/inventory text, not live journalctl.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `d046d54428b1e9dfdb63b8336959df955dd6820a` — Fleet Laws v1

**Concepts taught.** `scheduler`, `cron`, `systemd`, `configuration-drift`

**Laws.** `law-5`

**Incidents.** `inc-dual-scheduler`

### 2026-08-21 — Phase 0: promotion freeze. Governance vs control-plane authority split (ADR-0001).

- **Id:** `h-phase0-freeze`
- **Period:** 2026-08-21
- **Phase:** `p-phase0`
- **Systems:** clank-architecture; diagnostic-clank; unified-clank-platform
- **Confidence:** VERIFIED

**Event.** Phase 0: promotion freeze. Governance vs control-plane authority split (ADR-0001).

**Before.** Repos could be treated as 'ready' because CI was green or a dashboard existed.

**Change.** NO_PROMOTION_POLICY.md; ADR-0001; Phase 0 remediation merge ac83a2e (Hetzner and NAS untouched). unified-clank-platform proposed for supersession.

**Why.** Deployment truth was UNKNOWN in the fleet ledger. Promoting on repository state would launder guesses into production.

**Later consequence.** As of 2026-08-27 the freeze is still the controlling production rule.

**Evidence.**

- `ev-adr1-full` (doc, VERIFIED) anil-ganti-nbc/clank-architecture adr/0001-authority-and-phase0-freeze.md — clank-architecture = governance; diagnostic-clank = inventory/control plane.
- `ev-p0-merge` (commit, VERIFIED) anil-ganti-nbc/clank-architecture @ac83a2ea7ed01452eb9d7612aec143a6446f41af — Phase 0 remediation merge 2026-08-21T08:56:35Z.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `ac83a2ea7ed01452eb9d7612aec143a6446f41af`
- `anil-ganti-nbc/clank-architecture` `9b1d2ffbcb826e70a713de2e8e12ba22599285db` — activate promotion freeze

**Concepts taught.** `promotion-gate`, `deployment`, `contract`, `operator-role`

**Laws.** `law-8`

**Incidents.** `inc-bankai`

### 2026-08-22 — Fleet Laws v1 codified: eight binding invariants plus deferred Law 9.

- **Id:** `h-fleet-laws`
- **Period:** 2026-08-21 to 2026-08-22
- **Phase:** `p-phase0`
- **Systems:** clank-architecture; all Clanks
- **Confidence:** VERIFIED

**Event.** Fleet Laws v1 codified: eight binding invariants plus deferred Law 9.

**Before.** Failure stories lived in commit messages, handoffs, and DiagnosticBench YAML.

**Change.** FLEET_LAWS.md + conformance/test_fleet_laws.py (d046d54, 2026-08-21T21:27:48Z). Status ACTIVE as of Phase 2A 2026-08-22. Laws 1–8 name reference implementations, violators, exceptions, invariants, specimens.

**Why.** Without a named invariant, a fix is a one-off. Specimens must never re-occur.

**Later consequence.** Every later ADR and GIC is a specialization of these planes.

**Evidence.**

- `ev-laws-commit` (commit, VERIFIED) anil-ganti-nbc/clank-architecture FLEET_LAWS.md @d046d54428b1e9dfdb63b8336959df955dd6820a — Codify Fleet Laws v1 + hermetic conformance suite (Phase 2A).

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `d046d54428b1e9dfdb63b8336959df955dd6820a`

**Concepts taught.** `fleet-law`, `invariant`, `regression-test`, `allowlist`

**Laws.** `law-1`, `law-2`, `law-3`, `law-4`, `law-5`, `law-6`, `law-7`, `law-8`, `law-9`

**Incidents.** (none)

### 2026-08-22 — ADR-0002 and the motherclank repository: a camera, not a janitor.

- **Id:** `h-motherclank-born`
- **Period:** 2026-08-22
- **Phase:** `p-motherclank`
- **Systems:** motherclank; diagnostic-clank; clank-architecture
- **Confidence:** VERIFIED (architectural birth) / live SHA, process, timer, var/ UNKNOWN

**Event.** ADR-0002 and the motherclank repository: a camera, not a janitor.

**Before.** Laws existed. Nobody harvested fleet evidence without taking locks or trusting dashboards.

**Change.** ADR-0002 (b341b0f, 2026-08-22T05:52:04Z) and creation of the motherclank repository shortly afterward established the design for a read-only supervisory layer over the Clank fleet. The ADR defines Motherclank as an observer/reasoner that may recommend but must not mutate production state; M5 mutation is explicitly deferred. The repository itself was initially described as M0, a read-only fleet harvester. That proves the supervisory architecture was created, not that live supervision was already active: Git-resident installer/unit templates do not prove timer enablement, successful harvests, host var/ snapshots, or a deployed SHA. Those runtime facts remain UNKNOWN.

**Why.** A supervisor that can write is a second Clank with blast radius over the whole fleet.

**Later consequence.** ADR-0003 (same day) authorises M3 recommendations into Diagnostic Clank Agent Inbox — still no execution.

**Verification.** Architectural birth (ADR-0002, repo created_at, read-only intent, M5 deferred): VERIFIED. Do not present M1–M4 as proven live stages on 22 Aug. Live Motherclank SHA, process, timer enablement, harvests, and host var/: UNKNOWN.

**Residual risk.** Live Motherclank SHA, process, timer, and host var/ remain UNKNOWN. Git-resident installer/unit templates do not prove enablement. Later repo HEAD (7cee2f8) is not a deployed SHA.

**Evidence.**

- `ev-adr2-commit` (commit, VERIFIED) anil-ganti-nbc/clank-architecture adr/0002-motherclank-supervisory-architecture.md @b341b0f0805ff747c6ada55888ce21476fc05386 — PROPOSED reviewed draft. UNKNOWN-propagation binding. Onboarding = Phase 2C adapter order.
- `ev-mc-created` (repo, VERIFIED) anil-ganti-nbc/motherclank — created_at 2026-08-22T06:02:49Z. Description: Motherclank M0 - read-only fleet harvester per ADR-0002.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `b341b0f0805ff747c6ada55888ce21476fc05386`

**Concepts taught.** `motherclank`, `diagnostic-clank`, `observability`, `derived-state`

**Laws.** `law-3`, `law-6`

**Incidents.** (none)

### 2026-08-22 — DEF-M1.5: smartphone adapter ordered runs by UUID-string id, producing false-STALE (and inverse false-HEALTHY risk).

- **Id:** `h-def-m15`
- **Period:** 2026-08-22
- **Phase:** `p-motherclank`
- **Systems:** smartphone-clank; diagnostic-clank; motherclank
- **Confidence:** VERIFIED

**Event.** DEF-M1.5: smartphone adapter ordered runs by UUID-string id, producing false-STALE (and inverse false-HEALTHY risk).

**Before.** Motherclank M1 first synthesis trusted adapter-mapped run order and a shared status mapper.

**Change.** Fixed in diagnostic-clank 97b07ae with UUID-trap + never-upgrade regressions. Ledger row CLOSED the same day (b300b36).

**Why.** Lexical UUID order is not time. A mapper that upgrades UNKNOWN/PARTIAL into HEALTHY launders a lie.

**Diagnosis.** Motherclank's first synthesis found adapter-truth defects. The supervisor dogfooded itself.

**Later consequence.** Never-upgrade property tests become a Motherclank invariant.

**Evidence.**

- `ev-def-m15` (doc, VERIFIED) anil-ganti-nbc/clank-architecture DECISION_LEDGER.md — DEF-M1.5 CLOSED: UUID-string id ordering; shared mapper lacked fleet vocabularies SUCCESS/PARTIAL/ZERO_ITEMS/BLOCKED.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `b300b36e1f9c257b0c90331f5977ceea58103dfc` — ledger DEF-M1.5 CLOSED

**Concepts taught.** `health-check`, `false-positive`, `runtime-provenance`, `implementation-agent`

**Laws.** `law-3`

**Incidents.** `inc-health-honesty`

### 2026-08-22 — Materialization gap: scheduler activity without a running process.

- **Id:** `h-materialization`
- **Period:** 2026-08-22 to 2026-08-24
- **Phase:** `p-scars`
- **Systems:** oem-radar; smartwatch-clank; feature-phone-clank; cron
- **Confidence:** VERIFIED (mechanism) / INCOMPLETE (raw host chronology)

**Event.** A scheduled Clank outage exposed a materialization gap: scheduler activity was visible, but the collector never successfully became a running process.

**Before.** Health checks that watched the calendar treated elapsed timers as successful work.

**Change.** Preserved decision/architecture records (DECISION_LEDGER INC-20260822-A, ADR-0008) attribute this to a pre-exec logging/permission failure: stash -u recreated untracked logs/ as root:root, so cron redirects failed before the collector started. Codified as MATERIALIZATION_GAP. OEM Radar lost no DB data. The impact map records a ~09:59–10:06Z window and ~36h silence — those host-level timestamps are operator-addendum in that document, not recovered syslog.

**Why.** Untracked runtime directories lived inside source checkouts, so a Git hygiene command became a production outage.

**What failed.** Collectors never became processes. Dashboards that watched invocation stayed calm.

**Diagnosis.** Pre-exec redirect failure, not a collector regression, not a legitimate zero.

**Fix.** Directory ownership; six-stage liveness model; GIC-04; ADR-0009 runtime-state/source-tree separation.

**Verification.** Incident class and mechanism: VERIFIED from DECISION_LEDGER.md, ADR-0008, G1–G8 fixtures (motherclank @3558fab). Exact host chronology and raw syslog: INCOMPLETE — not recovered this campaign, not in the Handbook checkout.

**Residual risk.** Any future redirect, permission, or missing binary reproduces MATERIALIZATION_GAP. Do not re-promote impact-map timestamps as independently re-read journalctl.

**Later consequence.** Law 3's invocation≠commit becomes a first-class detection, not a slogan.

**Evidence.**

- `ev-inc-a` (doc, VERIFIED) anil-ganti-nbc/clank-architecture DECISION_LEDGER.md — INC-20260822-A recorded 2026-08-24. Mechanism: stash -u, logs/ root:root, pre-exec failure. Named MATERIALIZATION_GAP.
- `ev-impact-a` (report, INCOMPLETE) anil-ganti-nbc/clank-architecture audits/INCIDENT_IMPACT_MAP_2026-08-23.md — Family A as recorded in the impact map. Host timestamps (~09:59–10:06Z, ~36h) are not independently recovered syslog.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `cd276689a4055436cd974beb1d3272465e3b4145` — ADR-0008 + ADR-0009

**Concepts taught.** `materialization-gap`, `execution-liveness`, `scheduler`, `cron`, `untracked`

**Laws.** `law-3`

**Incidents.** `inc-materialization`

### 2026-08-23 — INC-20260823: two live volumes deleted — Smartwatch restored with a known gap; Feature Phone began a new epoch.

- **Id:** `h-volume-loss`
- **Period:** 2026-08-23
- **Phase:** `p-scars`
- **Systems:** smartwatch-clank; feature-phone-clank; Docker volumes
- **Confidence:** VERIFIED (loss + two continuity outcomes + irrecoverable windows) / var/ BLOCKED / live path UNKNOWN

**Event.** INC-20260823: two live volumes deleted — Smartwatch restored with a known gap; Feature Phone began a new epoch.

**Before.** Volumes were treated as ordinary containers of files. Feature-phone had no backup. Smartwatch had a 18 Aug backup.

**Change.** Impact map Family B and continuity seeds record `smartwatch_clank_staging_data` destroyed 2026-08-23T21:22:08Z and `feature_phone_clank_staging_data` 21:22:11Z. Those instants are operator-provided evidence, not live logs. Smartwatch was restored 22:09Z from the 2026-08-18T20:50:37Z backup — RESTORED_HISTORY, not a new epoch; observations ≈2026-08-18T20:13Z–2026-08-22T10:00Z (~3d13h) never made it into that backup and are gone. Feature Phone had no backup: fresh DB at 21:36:11Z → NEW_EPOCH `fpc-epoch-2`; pre-incident history is irrecoverable even on the host. ACT-011 (24 Aug, separate row) proved a disposable-volume restore of the remaining recovery points on `temporary_scratch`. That is not rewind, not durable off-host backup, and not proof the volumes are still attached. Motherclank `var/` for states A–E remains BLOCKED. Live path, epoch, and backup state remain UNKNOWN.

**Why.** Human and agent destructive error is an expected failure mode (DATA_SURVIVABILITY R2).

**What failed.** Irreplaceable observational memory. FPC pre-incident history entirely irrecoverable. SW ~3d13h never in the 18 Aug backup.

**Diagnosis.** Two families sharing a window must not be conflated. Restore ≠ rewind. HMD ReadTimeout after FPC repair is an ordinary source failure.

**Fix.** ContinuityEvent registry; DB-LOSS-RESTORE vs DB-LOSS-NEW-EPOCH golden incidents. ACT-011 (24 Aug) is a later scratch drill, not this incident's closing.

**Verification.** Named volume loss, SW RESTORED_HISTORY vs FPC NEW_EPOCH, and the irrecoverable windows: VERIFIED from impact map Family B and continuity seeds. Instants are operator-provided, not live logs. ACT-011 is a later scratch restore of remaining RPs (`h-act011`), not rewind. Motherclank var/ A–E: BLOCKED. Live path/epoch/backup: UNKNOWN.

**Residual risk.** Restore ≠ rewind. Do not teach ACT-011 as closing the gap. Durable off-host is NO (temporary_scratch). Live volume attachment UNKNOWN. Do not re-round 3d13h to 4 days. Seeds ≠ missing var/ batches.

**Later consequence.** ADR-0007 destructive-operation safety: pattern-derived names never authorize deletion.

**Evidence.**

- `ev-inc-23` (doc, VERIFIED) anil-ganti-nbc/clank-architecture DECISION_LEDGER.md — INC-20260823. Seed: motherclank continuity/seeds/INC-20260823-volume-loss.jsonl.
- `ev-impact-b` (report, VERIFIED) anil-ganti-nbc/clank-architecture audits/INCIDENT_IMPACT_MAP_2026-08-23.md — Family B states A–E. Instants are operator-provided evidence, not live logs. Artifact-level Motherclank var/ confirmation BLOCKED.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `7337efc8718552e33452c7e55aca33ed1cc43ae0` — ADR-0006/0007 + impact map

**Concepts taught.** `epoch`, `volume`, `rollback`, `blast-radius`, `authoritative-state`

**Laws.** `law-1`

**Incidents.** `inc-volume-loss`

### 2026-08-23 — DAU World Generator vertical slice: causal seeded diagnostic worlds.

- **Id:** `h-dau-worlds`
- **Period:** 2026-08-23
- **Phase:** `p-continuity`
- **Systems:** dau-world-generator; idle-time-learning-doodad
- **Confidence:** VERIFIED

**Event.** DAU World Generator vertical slice: causal seeded diagnostic worlds.

**Before.** Incident teaching required live fleet evidence or hand-written stories.

**Change.** dau-world-generator created 2026-08-23T19:57:17Z. Later absorbed natively into Dead Air University (commit 5595073 cited in existing Handbook) without deleting the provenance repo.

**Why.** Replayable worlds teach diagnosis without mutating production Clanks.

**Later consequence.** Handbook investigation labs reuse freeze→reveal, but their physics is history, not a simulator.

**Evidence.**

- `ev-dwg-created` (repo, VERIFIED) anil-ganti-nbc/dau-world-generator — created_at 2026-08-23T19:57:17Z.

**Commit(s).** None recorded on this row (the evidence may still be a repo creation timestamp or a document without a pinned SHA).

**Concepts taught.** `deterministic`, `fixtures`, `e2e`

**Laws.** (none)

**Incidents.** (none)

### 2026-08-24 — Fleet Archaeology Report: adapter-first preservation, not collector rewrite.

- **Id:** `h-archaeology`
- **Period:** 2026-08-24
- **Phase:** `p-continuity`
- **Systems:** clank-architecture; ten Clanks in scope
- **Confidence:** VERIFIED

**Event.** Fleet Archaeology Report: adapter-first preservation, not collector rewrite.

**Before.** Oral history and scattered handoffs. Risk of inventing a platform that never existed.

**Change.** audits/CLANK_FLEET_ARCHAEOLOGY_REPORT_2026-08-24.md. Four independent audits ratify it (ADR-0005 ACCEPTED). Canonical v0.2 adds observer-only Phase 1, instance/lane identity, evidence-bearing capability states, golden incidents.

**Why.** The fleet was not built from one platform. Pretending otherwise would destroy local semantics.

**Later consequence.** AGENT_RULES.md binds future agents: preserve historical material; UNKNOWN is not healthy; no auto-promote.

**Evidence.**

- `ev-arch-report` (report, VERIFIED) anil-ganti-nbc/clank-architecture audits/CLANK_FLEET_ARCHAEOLOGY_REPORT_2026-08-24.md @431ba01efc156729574ffd9a470fb41f0a8aaa62 — Evidence-led, not a promotion decision. Inventory current through 2026-08-22.
- `ev-adr5` (doc, VERIFIED) anil-ganti-nbc/clank-architecture DECISION_LEDGER.md — ADR-0005 ACCEPTED 2026-08-24.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `e16d48bfa32ea4693405931961e38b67273ceccc` — Ratify archaeology-derived integration gates
- `anil-ganti-nbc/clank-architecture` `2b872ad56762bbe024f2fe65cb70b2f3c43c2b3c` — Adopt canonical v0.1

**Concepts taught.** `dogfooding`, `contract`, `source-adapter`, `implementation-agent`, `operator-role`

**Laws.** (none)

**Incidents.** `inc-directory-sweep`

### 2026-08-24 — ACT-011: operator-executed live recovery-point verification.

- **Id:** `h-act011`
- **Period:** 2026-08-24
- **Phase:** `p-continuity`
- **Systems:** smartwatch-clank; feature-phone-clank; motherclank
- **Confidence:** VERIFIED

**Event.** ACT-011: operator-executed live recovery-point verification.

**Before.** Restored/new-epoch DBs existed; restorability was a story.

**Change.** Smartwatch RP1: 516 runs, 52,126 observations, integrity_check=ok, disposable-volume restore passed. Feature-phone epoch-2 first RP: integrity ok, restore passed. Off-host copies exist only as temporary_scratch. Durable gate OPEN.

**Why.** A backup that has never been restored is a rumour (GIC-16/17).

**Residual risk.** Durable off-host redundancy DESIGNED ONLY. Least-privilege destructive-capability audit NOT STARTED (ACT-012).

**Later consequence.** Acceptance test 'Claude deletes the volume again' is still DESIGNED for most lanes.

**Evidence.**

- `ev-act011` (doc, VERIFIED) anil-ganti-nbc/clank-architecture DATA_SURVIVABILITY.md — §17.1 ACT-011 LIVE/VERIFIED. Evidence seed survivability-ACT011-verified-live.jsonl.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `cd276689a4055436cd974beb1d3272465e3b4145`

**Concepts taught.** `rollback`, `epoch`, `volume`, `verification`

**Laws.** (none)

**Incidents.** `inc-volume-loss`

### 2026-08-24 — CTW onboarding is the first real v0.3 dogfood of the observer playbook.

- **Id:** `h-ctw-dogfood`
- **Period:** 2026-08-24 to 2026-08-25
- **Phase:** `p-qc-onboard`
- **Systems:** chinese-tech-wire; motherclank; diagnostic-clank
- **Confidence:** VERIFIED

**Event.** CTW onboarding is the first real v0.3 dogfood of the observer playbook.

**Before.** Onboarding.md was a document. No field scorecard.

**Change.** CTW_ONBOARDING_DOGFOOD.md: Motherclank core participant-specific lines 0; 1 generic synthesis passthrough; adapter ~230 LOC. Friction: FGT registry db filename had drifted from live-verified inner name newsroom.db; guessed CTW refresh path never existed.

**Why.** Using the playbook on a real Clank is how you find the playbook's lies.

**Later consequence.** ONBOARDING.md step 8 requires cross-checking registry filename, refresh-script source path, and actual deployed datastore.

**Evidence.**

- `ev-ctw-dog` (doc, VERIFIED) anil-ganti-nbc/clank-architecture CTW_ONBOARDING_DOGFOOD.md @64f92aa42f233ed189c8c6cb10f550b8dfd77b11 — First real v0.3 onboarding. Steps 2 and 11 LIVE_EVIDENCE_REQUIRED.
- `ev-onboard-crosscheck` (commit, VERIFIED) anil-ganti-nbc/clank-architecture @7f977d6bc5d4839a6f89c7dc7b87cf5fdefa89a5 — Anil: codify registry/refresh-path/live-datastore cross-check after CTW guessed path.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `66cef4c89a0f7cd4ddbea10a14149a63835ec4f5` — CTW dogfood scorecard
- `anil-ganti-nbc/clank-architecture` `7f977d6bc5d4839a6f89c7dc7b87cf5fdefa89a5` — human operator follow-up

**Concepts taught.** `dogfooding`, `operator-role`, `implementation-agent`, `source-adapter`

**Laws.** `law-6`

**Incidents.** `inc-deployed-sha`

### 2026-08-24 — oem-radar excludes runtime logs/backups from git so stash -u cannot recreate them with the wrong owner.

- **Id:** `h-gitignore-runtime`
- **Period:** 2026-08-24
- **Phase:** `p-continuity`
- **Systems:** oem-radar
- **Confidence:** VERIFIED

**Event.** oem-radar excludes runtime logs/backups from git so stash -u cannot recreate them with the wrong owner.

**Before.** Untracked runtime directories lived inside source checkouts (ADR-0009 scar).

**Change.** Commit 44ce1ac 2026-08-24T00:12:39Z: 'Prevents a repeat of the 2026-08-22/23 incident pattern where root git stash -u / stash pop against these checkouts recreated untracked runtime directories with wrong ownership and broke cron redirects before collector start.'

**Why.** A Git hygiene command must not be a production outage. Runtime state does not belong in the source tree.

**Later consequence.** ADR-0009 runtime-state/source-tree separation has a per-repo mechanical counterpart.

**Evidence.**

- `ev-oem-gi` (commit, VERIFIED) anil-ganti-nbc/oem-radar @44ce1ac5538ed9f2ddf9b204d9241eaaa571ee18 — chore: exclude runtime logs/backups from git. Direct citation of INC-20260822-A pattern.

**Commit(s).**

- `anil-ganti-nbc/oem-radar` `44ce1ac5538ed9f2ddf9b204d9241eaaa571ee18`

**Concepts taught.** `untracked`, `materialization-gap`, `working-tree`

**Laws.** `law-3`

**Incidents.** `inc-materialization`

### 2026-08-25 — Watch QC flood: smoke counted as catalogue pass; dated snapshot 639/580/41.

- **Id:** `h-watch-qc`
- **Period:** 2026-08-25 to 2026-08-26
- **Phase:** `p-qc-onboard`
- **Systems:** watch-clank; human QC queue
- **Confidence:** VERIFIED (mechanism) / snapshot-dated counts / live queue UNKNOWN

**Event.** Watch QC filled with low-value first-sightings because qualification treated smoke/validation runs as real catalogue passes.

**Before.** Qualification inferred 'real pass' from successful-run count, then from discovered_count > 1.

**Change.** watch-clank `5de5329` (2026-08-26T02:01:27Z) and `ARCHITECTURE_NOTES_QC_VOLUME.md`: catalogue-pass is an invocation fact (persisted max_items), never inferred from output size. Weak FIRST_SEEN (score ≤ 15) auto-deprioritized; useful FS in history scored ≥ 25. Queue accounting in that 2026-08-26 snapshot was 639 raw unreviewed / 580 default FIFO before repair replay / 41 after. Those counts are the incident values in the notes, not a live queue.

**Why.** Human attention is the scarce resource. A filter that treats smoke as harvest hides launches.

**Later consequence.** L-WATCH-009: execution provenance is part of data provenance. Later Watch HEADs are a different story and not this incident.

**Residual risk.** Live Watch QC queue size remains UNKNOWN. Do not teach 639/580/41 as current.

**Evidence.**

- `ev-qc-vol-h` (commit, VERIFIED) anil-ganti-nbc/watch-clank `ARCHITECTURE_NOTES_QC_VOLUME.md` @ `5de5329f43adc3fdad0ee797f0e691427f802641` — 2026-08-26 notes + repair. Snapshot 639/580/41 is in this commit, not a live dashboard.

**Commit(s).**

- `anil-ganti-nbc/watch-clank` `5de5329f43adc3fdad0ee797f0e691427f802641` — QC-volume notes and repair, 2026-08-26T02:01:27Z

**Concepts taught.** `qc-flood`, `runtime-provenance`, `first-seen`, `initial-fill`, `editorial-eligibility`

**Laws.** `law-2`

**Incidents.** `inc-qc`

### 2026-08-25 — Tissot and Timex UK collectors existed in code and in the pipeline registry, but were absent from the production invocation chain — so systemd units could not be rendered.

- **Id:** `h-watch-unwired`
- **Period:** 2026-08-25
- **Phase:** `p-qc-onboard`
- **Systems:** watch-clank
- **Confidence:** VERIFIED

**Event.** Tissot and Timex UK collectors existed in code and in the pipeline registry, but were absent from the production invocation chain — so systemd units could not be rendered.

**Before.** Implementation plus a registry row were treated as 'the collector is in production.'

**Change.** e7eeb3f (2026-08-25T00:18:48Z): KNOWN_COLLECTORS, collector_registry, run_pipeline argparse, and render_units.py wired tissot_sitemap and timex_uk_products. test_production_wiring.py: every EXPERIMENTAL_READY_FOR_HETZNER collector must be mechanically invokable. Delivery-silence canonized as a promotion privilege.

**Why.** A host deployment found the gap. Code on GitHub is not the same as a unit file the timer can start.

**What failed.** Collectors that 'existed' could not be scheduled. Registry membership was not invocation membership.

**Diagnosis.** Three tables had to agree: health.KNOWN_COLLECTORS, collector_registry._CONTROLS, render_units.py/run_pipeline.py. Two of three was not enough.

**Later consequence.** A production-wiring invariant test, not a README checkbox.

**Evidence.**

- `ev-watch-unwired` (commit, VERIFIED) anil-ganti-nbc/watch-clank @e7eeb3fa1f9b19315b985d1ea6c015f8e6df63a8 — Repair: wire tissot + timex_uk into production invocation path; canonize delivery gate. Deployment finding (Claude, Hetzner 2026-08-25).

**Commit(s).**

- `anil-ganti-nbc/watch-clank` `e7eeb3fa1f9b19315b985d1ea6c015f8e6df63a8`

**Concepts taught.** `deployment`, `configuration-drift`, `head-vs-deployed`, `promotion-gate`

**Laws.** `law-6`, `law-8`

**Incidents.** `inc-deployed-sha`

### 2026-08-25 — Architecture v0.3 frozen. No speculative core redesign until a real participant or incident proves the contract insufficient.

- **Id:** `h-v03-freeze`
- **Period:** 2026-08-25
- **Phase:** `p-qc-onboard`
- **Systems:** clank-architecture; motherclank
- **Confidence:** VERIFIED

**Event.** Architecture v0.3 frozen. No speculative core redesign until a real participant or incident proves the contract insufficient.

**Before.** Rapid ADR sequence 0006–0014 in 48 hours.

**Change.** FLEET_CAPABILITY_MATRIX.md freeze marker. Bug fixes, new adapters, new GICs, operational improvements permitted. SI onboarding dogfood the same window (4fb9c44).

**Why.** A contract that changes every afternoon cannot be dogfooded. Freeze is how you find out whether it works.

**Residual risk.** Scheduler-trace still supported_unconfigured on all lanes. Survivability unproven except two recovery points on scratch.

**Evidence.**

- `ev-freeze` (doc, VERIFIED) anil-ganti-nbc/clank-architecture FLEET_CAPABILITY_MATRIX.md — v0.3 FROZEN (2026-08-25).

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `e9c4a2b77f0a484171b01980469eee34971f8ee5` — closure hygiene freeze marker 2026-08-26

**Concepts taught.** `contract`, `fleet-law`, `operator-role`

**Laws.** (none)

**Incidents.** (none)

### 2026-08-26 — Staged AI-assisted engineering is the actual development process: implementation agents draft, reviewer/auditor agents check, the human operator decides.

- **Id:** `h-ai-workflow`
- **Period:** 2026-08-04 to 2026-08-26
- **Phase:** `p-qc-onboard`
- **Systems:** all Clanks; clank-architecture; motherclank
- **Confidence:** VERIFIED

**Event.** Staged AI-assisted engineering is the actual development process: implementation agents draft, reviewer/auditor agents check, the human operator decides.

**Before.** A tempting story: 'I pasted one AI output into another.'

**Change.** Commit metadata on clank-architecture shows two durable roles: ox-alpha@agents.local (ADRs 0006–0014, golden incidents, dogfood scorecards) and Anil / anil-ganti-nbc (account creation, Phase 0 merge, ADR-0002, ONBOARDING.md cross-check 7f977d6, ACT-011). oem-radar commits 1c55834 / 31fc46b / 3a4d0a1 name Co-Authored-By: Claude Sonnet 5. AGENT_RULES.md binds agents: preserve history, UNKNOWN is not healthy, no auto-promote, no silent conflict resolution.

**Why.** The fleet is too heterogeneous for one-shot generation. Requirements had to be carried between sessions, evidence demanded, and mission criteria chosen by a human who is not trying to become a programmer.

**Later consequence.** The Handbook exists so this process can be explained without collapsing it into paste.

**Evidence.**

- `ev-agent-rules` (doc, VERIFIED) anil-ganti-nbc/clank-architecture AGENT_RULES.md @0a80fe6513dbef115044f02ab1dfffe13502f044 — Fifteen binding rules for agents on Clanks, Motherclank, adapters, conformance.
- `ev-anil-onboard` (commit, VERIFIED) anil-ganti-nbc/clank-architecture @7f977d6bc5d4839a6f89c7dc7b87cf5fdefa89a5 — Human operator follow-up after CTW guessed refresh path. Author: Anil, 2026-08-25T00:20:58Z.
- `ev-ox-adr8` (commit, VERIFIED) anil-ganti-nbc/clank-architecture @cd276689a4055436cd974beb1d3272465e3b4145 — ox-alpha authored ADR-0008/0009. Implementation agent, not the operator.

**Commit(s).**

- `anil-ganti-nbc/clank-architecture` `7f977d6bc5d4839a6f89c7dc7b87cf5fdefa89a5` — human operator
- `anil-ganti-nbc/clank-architecture` `cd276689a4055436cd974beb1d3272465e3b4145` — implementation agent

**Concepts taught.** `implementation-agent`, `reviewer-agent`, `operator-role`, `lifecycle`, `dogfooding`

**Laws.** (none)

**Incidents.** `inc-deployed-sha`

### 2026-08-27 — Clank Systems Handbook repository created: evidence-backed literacy, not a programming course.

- **Id:** `h-handbook`
- **Period:** 2026-08-27
- **Phase:** `p-current`
- **Systems:** clank-systems-handbook
- **Confidence:** VERIFIED

**Event.** Clank Systems Handbook repository created: evidence-backed literacy, not a programming course.

**Before.** The operator could point at ADRs and incident files but did not have a course that taught the process in human language.

**Change.** Repo created 2026-08-27T02:02:54Z. Initial content 3374e81; GUI 49ebe3e; standalone build c8198d9. This curriculum expansion is the content phase.

**Why.** The unacceptable explanation of the fleet is 'I pasted one AI output into another.'

**Later consequence.** Handbook owns historical evidence. DAU owns mastery. Worlds own simulators.

**Evidence.**

- `ev-hb-created` (repo, VERIFIED) anil-ganti-nbc/clank-systems-handbook — created_at 2026-08-27T02:02:54Z. Initial SHA 3374e81382163878bf19394236f74649aa366052.

**Commit(s).**

- `anil-ganti-nbc/clank-systems-handbook` `3374e81382163878bf19394236f74649aa366052` — initial content
- `anil-ganti-nbc/clank-systems-handbook` `8c267dea6617eb63adef6aa1bcdb841e48ae94fb` — standalone + CI dispatch (branch point for this work)

**Concepts taught.** `operator-role`, `implementation-agent`, `dogfooding`

**Laws.** (none)

**Incidents.** (none)

### 2026-08-27 — Watch QC recovers from a concurrent double-submit: UNIQUE is not an operator-facing contract.

- **Id:** `h-watch-qc-race`
- **Period:** 2026-08-27
- **Phase:** `p-current`
- **Systems:** watch-clank; human QC queue
- **Confidence:** VERIFIED (mechanism) / lived host 500 not evidenced / live SHA UNKNOWN

**Event.** Watch QC recovers from a concurrent double-submit: UNIQUE is not an operator-facing contract.

**Before.** UNIQUE(event_id) already made a duplicate archive row impossible, but two near-simultaneous POSTs could both read 'no existing review' before either committed.

**Change.** watch-clank ee3f34d (2026-08-27T03:16:34Z): UNIQUE(event_id) is the database guarantee. Two near-simultaneous POSTs could both read 'no existing review' before either committed; the losing insert would raise IntegrityError. The commit catches that violation, rolls back the losing insert, and replays the same verdict as a correction against whichever row won — that is the UI/operator contract. The suite can reproduce the race; '468 passed, 2 skipped/live' is that commit's test run, not a host probe. Those are separate facts from a lived host 500, which is not recorded. Later Watch HEADs (d4fda37, 9d812ed) stay out of this incident. Live deployed SHA remains UNKNOWN.

**Why.** A database uniqueness constraint is not an operator-facing contract. The QC button is a writer (Law 7); races must fail closed into the promised behaviour, not a 500.

**Verification.** Mechanism (UNIQUE ≠ operator contract under concurrent POSTs; catch/rollback/replay in ee3f34d): VERIFIED from the commit. A lived host 500: not evidenced. Live Watch SHA: UNKNOWN.

**Residual risk.** Live Watch deployed SHA remains UNKNOWN. Do not teach ee3f34d, d4fda37, or 9d812ed as production. Green tests on the commit are not a host SHA.

**Later consequence.** The uniqueness constraint remains the last line; the application now speaks the same language as the constraint.

**Evidence.**

- `ev-watch-qc-race` (commit, VERIFIED) anil-ganti-nbc/watch-clank @ee3f34d7eba8715838196d59fbf562818349009b — fix(qc): recover gracefully from a concurrent double-QC submission. Idempotent-by-correction. Git-resident application contract, not a recorded lived host 500.

**Commit(s).**

- `anil-ganti-nbc/watch-clank` `ee3f34d7eba8715838196d59fbf562818349009b` — QC race recovery, 2026-08-27T03:16:34Z

**Concepts taught.** `race-condition`, `lock`, `operator-role`, `implementation-agent`

**Laws.** `law-7`

**Incidents.** `inc-writer-lock`, `inc-qc`

### 2026-08-27 — Tablet Clank repo gains a genuine manual-only QC layer and a Windows local launcher. This is a repository change, not a proven Hetzner membership change.

- **Id:** `h-tablet-local`
- **Period:** 2026-08-27
- **Phase:** `p-current`
- **Systems:** tablet-clank
- **Confidence:** VERIFIED

**Event.** Tablet Clank repo gains a genuine manual-only QC layer and a Windows local launcher. This is a repository change, not a proven Hetzner membership change.

**Before.** 2026-08-22 inventory: disabled experimental checkout, INTENTIONALLY_DORMANT, no production members.

**Change.** a41d1e7 2026-08-27T04:35:52Z (author Anil, Co-Authored-By: Claude Sonnet 5): separate on-disk QCArchive, Run All limited to the production allowlist, Windows launcher that starts HTTP only — no Task Scheduler entry. Wave 2 honor_uk_tablets experimental (b176523, 2026-08-26) remains excluded from PRODUCTION_ALLOWLIST.

**Why.** Local field-test parity with other refreshed Clanks. A first-local baseline stayed silent (no false-novelty flood).

**Residual risk.** Live host membership remains UNKNOWN. Repo HEAD is not a fleet.yaml row. Do not treat this commit as 'Tablet is now production'.

**Later consequence.** Directory sweep is even more dangerous: a richer checkout can look 'alive' while remaining INTENTIONALLY_DORMANT on the host.

**Evidence.**

- `ev-tablet-qc` (commit, VERIFIED) anil-ganti-nbc/tablet-clank @a41d1e7fa58f81cb9f8662d0357e8746f4b192dc — Add QC contract, active queue, Run All, and Windows local launcher. Verified against a genuine first local baseline.

**Commit(s).**

- `anil-ganti-nbc/tablet-clank` `a41d1e7fa58f81cb9f8662d0357e8746f4b192dc`

**Concepts taught.** `diagnostic-clank`, `head-vs-deployed`, `qc-flood`, `baseline`

**Laws.** `law-5`, `law-1`

**Incidents.** `inc-directory-sweep`

### 2026-08-27 — Current-state snapshot: observer-supervised, promotion-frozen, survivability incomplete.

- **Id:** `h-current-gaps`
- **Period:** as of 2026-08-27
- **Phase:** `p-current`
- **Systems:** fleet
- **Confidence:** VERIFIED

**Event.** Current-state snapshot: observer-supervised, promotion-frozen, survivability incomplete.

**Before.** See p-current phase.

**Change.** Capability matrix (motherclank@local / diagnostic-clank@p41-capability-contract) is evidence, not a score. Archaeology inventory was current through 2026-08-22; live host SHA/backup facts remain UNKNOWN where not re-probed. This Handbook must not invent a healthier present than the artefacts support.

**Why.** A current-state map that upgrades UNKNOWN to healthy would repeat Law 3 inside the course itself.

**Residual risk.** Durable off-host backups; Windows UNKNOWN; smartphone Law 2 novelty debt; FGT webhook rotation blocked-on-operator; cross-Clank identity ADR still blocking participant profile.

**Evidence.**

- `ev-matrix` (doc, VERIFIED) anil-ganti-nbc/clank-architecture FLEET_CAPABILITY_MATRIX.md — Evidence snapshot. UNKNOWN stays visible. FGT REAL_STATE_VALIDATION BLOCKED until live copy.
- `ev-arch-limit` (report, VERIFIED) anil-ganti-nbc/clank-architecture audits/CLANK_FLEET_ARCHAEOLOGY_REPORT_2026-08-24.md — Did not operate collectors or inspect production DBs. Host statements only from fleet inventory.

**Commit(s).** None recorded on this row (the evidence may still be a repo creation timestamp or a document without a pinned SHA).

**Concepts taught.** `health-check`, `deployment-drift`, `authoritative-state`

**Laws.** `law-3`, `law-6`, `law-9`

**Incidents.** (none)

### Evidence-preservation campaign hashes git-resident artefacts; live probe INCOMPLETE

- **Id:** `h-evidence-preservation`
- **Date:** 2026-08-27
- **Period:** 2026-08-27
- **Phase:** `p-current`
- **Systems:** clank-systems-handbook; fleet
- **Confidence:** VERIFIED (git-resident copies). Live host cells remain INCOMPLETE.

**Event.** Evidence-preservation campaign: git-resident deployment artefacts hashed into the Handbook; live host re-probe recorded INCOMPLETE.

**Before.** Content-phase ledger (27 rows) cited archaeology and ADRs. Unit files, backup scripts, continuity seeds, and fleet.yaml lived only in collector repos.

**Change.** `docs/preserved/` copies of fleet.yaml, unit/timer/cron templates, compose files, backup/restore scripts, Motherclank continuity seeds, DATA_SURVIVABILITY.md, and the Aug 22–23 impact map, each with SHA-256. Operator re-probe script authored, not executed (no SSH). Google Drive empty of Clank dumps. Durable off-host backup remains DESIGNED. The original 27 ledger rows were queued for human review, not silently rewritten.

**Why.** Templates and seeds can rotate. Syslog and Motherclank var/ already might have. A prettier present must not be invented from GitHub HEAD.

**Residual risk.** Syslog and Motherclank var/ still unpreserved. ACT-011 scratch is not Layer C. Repo HEADs from 2026-08-27 must not be taught as production.

**Evidence.**

- `ev-preserved-fleet-yaml` (file, VERIFIED) diagnostic-clank fleet.yaml @ 3667af0 — preserved sha256:9d8d950b53cdc72ed61cdd477690d938b939a3787b8aeea0023ed53240d71ca5. Inventory as_of 2026-08-22T22:30:00Z.
- `ev-live-probe-incomplete` (deployment, INCOMPLETE) docs/LIVE_PROVENANCE_REPORT.md — this campaign could not SSH to Hetzner.

**Concepts taught.** `provenance`, `runtime-provenance`, `head-vs-deployed`, `untracked`

**Laws.** `law-6`, `law-3`, `law-5`

**Incidents.** `inc-deployed-sha`, `inc-materialization`, `inc-volume-loss`

## Current-state residual (do not upgrade)

As of 2026-08-27:

- Promotion remains frozen (ADR-0001 / NO_PROMOTION_POLICY).
- Motherclank M0–M4 only. M5 mutation still requires a future ADR.
- Durable off-host backups still a blocker except two ACT-011 recovery points on temporary scratch.
- Scheduler-trace capability remains supported_unconfigured fleet-wide.
- Tablet Clank a41d1e7 is a repository change (QC + Windows local launcher). Live host membership remains UNKNOWN / INTENTIONALLY_DORMANT until inventory says otherwise.
- Watch repo HEAD d4fda37 (and earlier ee3f34d QC race, e7eeb3f wiring) are **repo HEAD**. Production SHA UNKNOWN unless re-probed.
- Evidence-preservation campaign preserved git-resident templates; it did **not** close Law 6 live cells.
- This Handbook must not invent a healthier present than the artefacts support.

---

Generated from `src/content/history.ts`. Regeneration: re-run against that file; do not hand-edit facts here without also editing the TypeScript twin.
