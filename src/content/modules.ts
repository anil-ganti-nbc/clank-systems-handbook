import type { Module } from "../lib/handbook/schema.ts";

export const MODULES: Module[] = [
  {
    id: "mod-pipeline",
    area: "built",
    title: "How a Clank goes from idea to running software",
    summary:
      "The real path is idea → repository → implementation → tests → commit → push → review → merge → deployment → runtime → observation → audit → remediation → architecture. Skipping a step is how drift is born. 'I pasted one AI output into another' names none of those doors.",
    conceptIds: ["repository", "commit", "push", "deployment", "runtime-provenance", "motherclank", "lifecycle", "operator-role"],
    sections: [
      {
        heading: "The pipeline is not a chat transcript",
        body: "Agents write code. Git records snapshots. CI reruns tests. A human (or a timer) deploys an artifact. A process runs. A database remembers. Motherclank may later observe. If you collapse that into paste, you cannot explain a failure, because you no longer know which of those layers moved.",
        conceptIds: ["git", "ci", "deployment", "lifecycle"],
      },
      {
        heading: "Why Motherclank exists",
        body: "After enough silent timers, dual schedulers, and 'healthy' zeros, the fleet needed a read-only supervisor that could harvest evidence without taking locks or sending alerts. ADR-0002 (b341b0f, 2026-08-22): observe, reason, propose — never remediate in M0–M4.",
        conceptIds: ["motherclank", "diagnostic-clank"],
      },
      {
        heading: "What a SHA moving through the pipeline actually means",
        body: "Committed is a snapshot. Pushed is GitHub. Reviewed is a second pair of eyes. Merged is trunk. Deployed is a host or image. Running is a process. Observed is Motherclank/adapter evidence. Verified is a named criterion that held. Watch's tissot/timex_uk collectors existed in the registry on 25 August and still could not be scheduled until the production invocation chain was wired (e7eeb3f).",
        conceptIds: ["sha", "head-vs-deployed", "lifecycle"],
      },
    ],
  },
  {
    id: "mod-story",
    area: "built",
    title: "How we built it — chronological",
    summary:
      "Independent collectors, then SQLite as memory, then Docker/NAS/Hetzner, then scars, then laws, then a camera that cannot hold the keys. The final architecture did not exist on day one.",
    conceptIds: ["collector", "sqlite-authoritative", "fleet-law", "motherclank", "dogfooding", "operator-role"],
    sections: [
      {
        heading: "1–4. Why Clanks, and what the earliest collectors looked like",
        body: "The newsroom needed sensors for OEM hardware, free games, watches, phones, and regional tech wires. GitHub account anil-ganti-nbc appears 2026-08-03. On 4 August: oem-radar, free-game-tracker, unified-clank-platform, clank-architecture. Consumer-device Clanks and wires follow 8–10 August. Each Clank is its own Python collector with its own SQLite. There is no fleet supervisor. Unification is hoped for (unified-clank-platform) before it is earned — ADR-0001 later proposes that repo for supersession.",
        conceptIds: ["collector", "repository", "github"],
      },
      {
        heading: "5–8. How AI agents and Git actually moved work",
        body: "Implementation agents (ox-alpha@agents.local, Claude Sonnet 5 as Co-Authored-By) drafted ADRs, fixtures, and collector repairs. Reviewer/auditor sessions checked evidence and were forbidden to silently resolve architecture conflicts (AGENT_RULES.md). Anil defined goals, froze promotion, executed ACT-011, and wrote the ONBOARDING.md cross-check after CTW's guessed path (7f977d6). Changes moved as commits on feature branches, then PRs, then (sometimes) a host pull. Pushing never restarted a timer.",
        conceptIds: ["implementation-agent", "reviewer-agent", "operator-role", "pull-request"],
      },
      {
        heading: "9–12. Deploy, schedule, SQLite, and the first named lies",
        body: "Collectors left the laptop (Docker, Hetzner, NAS, leftover Windows tasks). SQLite became the memory of what had already been seen — without it, a restart looks like the birth of the market. Then the scars: FIRST_SEEN ≠ new, HTTP 200 ≠ useful, first fire ≠ cadence, green tests ≠ recall (BANKAI 6349→0), two clocks on one notebook.",
        conceptIds: ["deployment", "scheduler", "sqlite-authoritative", "first-seen", "recall"],
      },
      {
        heading: "13–17. Soaks, QC, Motherclank, Diagnostic Clank, provenance",
        body: "BANKAI soaks ran outside any promotion record until Law 8. Human QC on Watch showed that catalogue-pass is an invocation fact, not an output count. Diagnostic Clank (17 Aug) owns inventory and adapters so membership is a registry, not a folder listing. Motherclank (22 Aug) photocopies; it does not write Clank DBs. Law 6: missing SHA stays UNKNOWN.",
        conceptIds: ["soak", "qc-flood", "diagnostic-clank", "motherclank", "provenance"],
      },
      {
        heading: "18–20. Hosts, current architecture, what is still unsolved",
        body: "The fleet is heterogeneous and law-bound. Promotion remains frozen. Two lanes have restore-verified recovery points on temporary scratch; durable off-host backups are still OPEN. Scheduler-trace is supported_unconfigured fleet-wide. Live host SHA/backup cells remain UNKNOWN where not re-probed. This Handbook is historical evidence, not a claim that the present is healthier than the artefacts.",
        conceptIds: ["host", "epoch", "health-check"],
      },
    ],
  },
  {
    id: "mod-ai",
    area: "built",
    title: "AI-assisted development: what the agents did, what the operator decided",
    summary:
      "Multiple AI agents in a staged engineering workflow. One implements, another audits, a third researches or generates tests, and the human carries requirements, demands evidence, and decides whether a fix matches the mission. Neither 'I wrote all the code' nor 'I pasted one model into another' is the true sentence.",
    conceptIds: [
      "implementation-agent",
      "reviewer-agent",
      "research-agent",
      "test-generator",
      "architecture-critic",
      "operator-role",
      "lifecycle",
      "dogfooding",
    ],
    sections: [
      {
        heading: "Avoid both extremes",
        body: "The operator did not hand-code the collectors, ADRs, adapters, or this Handbook. The operator also did not collapse the process into a paste between chat windows. Work moved as commits on feature branches, pull requests, CI, host deploys, and named acceptance criteria. An agent session that is not a commit is a draft. A commit that is not deployed is not production. A deploy that is not observed is not verified.",
        conceptIds: ["lifecycle", "commit", "deployment", "operator-role"],
      },
      {
        heading: "Implementation agent",
        body: "ox-alpha@agents.local drafted ADRs 0006–0014, golden incidents, Motherclank continuity modules, and the Tablet observer adapter (diagnostic-clank 3667af0). Claude Sonnet 5 appears as Co-Authored-By on collector repairs (watch-clank ee3f34d, tablet-clank a41d1e7, oem-radar 1c55834/31fc46b/3a4d0a1) and later Windows-launcher work. The implementation agent's job is to write against a specification. It does not choose editorial usefulness, freeze promotion, or declare the mission succeeded.",
        conceptIds: ["implementation-agent"],
      },
      {
        heading: "Reviewer / auditor agent",
        body: "A separate session checks evidence, names conflicts, and refuses silent resolution. AGENT_RULES.md: preserve historical material, UNKNOWN is not healthy, no auto-promote, no silent conflict resolution. ADR-0004/0005: multi-model review findings are secondary rules only when congruent; conflicts require an explicit ADR. The reviewer is a second pair of eyes with no permission to quietly rewrite the minutes.",
        conceptIds: ["reviewer-agent"],
      },
      {
        heading: "Research agent",
        body: "Archaeology and impact-map sessions produced CLANK_FLEET_ARCHAEOLOGY_REPORT_2026-08-24.md and INCIDENT_IMPACT_MAP_2026-08-23.md — git-resident evidence, not live probes. A research agent is allowed to say BLOCKED. It is not allowed to fill a missing SHA to make the report prettier. The 2026-08-22 fleet.yaml is a dated document this Handbook still treats as inventory, not as today's host.",
        conceptIds: ["research-agent", "provenance"],
      },
      {
        heading: "Test generator",
        body: "Hermetic Fleet Laws conformance (test_fleet_laws.py), G1–G8 fixtures, Motherclank never-upgrade property tests after DEF-M1.5, CTW 38 golden-corpus tests. A generated test is a question the project agrees to keep asking. Loosening it deletes a memory. Green tests still do not prove recall (BANKAI) or that Hetzner is running the SHA.",
        conceptIds: ["test-generator", "tests-prove", "fixtures"],
      },
      {
        heading: "Architecture critic",
        body: "ADRs, the v0.3 freeze (2026-08-25), and Law 9's deferral are critic artefacts: they name what the current machinery cannot yet enforce. The critic's job is to reject bad abstractions (a supervisor that writes, a dashboard that is a second scheduler, inferred catalogue-pass, guessed refresh paths) before they become load-bearing. Freeze is how you find out whether the contract is sufficient.",
        conceptIds: ["architecture-critic", "promotion-gate"],
      },
      {
        heading: "The human operator's job",
        body: "Anil created the GitHub account, defined the newsroom mission, preserved requirements across agent sessions, decided editorial usefulness, rejected guessed abstractions (7f977d6 after CTW dogfood), requested evidence, compared outputs, chose acceptance criteria, directed deployment, froze promotion (Phase 0), executed ACT-011 live restore drills, and decided when to stop redesigning (v0.3 freeze). The operator is not 'the person who typed the code'. The operator is the person who decided what counted as done — and when to change direction.",
        conceptIds: ["operator-role", "verification"],
      },
      {
        heading: "The sentence this course exists to support",
        body: "I used multiple AI agents in a staged engineering workflow. One would implement, another would review or audit, and I acted as the operator and decision-maker. I carried requirements across them, checked evidence, decided whether fixes matched the mission, and directed testing and deployment.",
        conceptIds: ["operator-role", "lifecycle"],
      },
    ],
  },
  {
    id: "mod-git",
    area: "basics",
    title: "Git, GitHub, HEAD, and the working tree",
    summary: "Literacy for the person who directed the agents: what a SHA proves, what HEAD is, and why origin/main is not production.",
    conceptIds: [
      "repository", "git", "github", "commit", "sha", "short-sha", "head", "main", "branch", "feature-branch",
      "working-tree", "clean-dirty", "staged", "untracked", "committed-not-pushed", "origin", "origin-main",
      "local-vs-remote", "fetch", "pull", "push", "merge", "checkout", "rebase", "cherry-pick", "merge-conflict",
      "pull-request", "tag", "detached-head", "provenance",
    ],
    sections: [
      {
        heading: "The copies that are not the same object",
        body: "There is the working tree (files on disk), HEAD (the commit those files are supposed to match), origin/main (GitHub's official line as of last fetch), and the deployed artifact (not Git at all). A fifth copy — the SQLite volume — is observational memory. People get hurt when they treat any two as the same object. Law 6: missing stays UNKNOWN.",
        conceptIds: ["working-tree", "head", "origin-main", "head-vs-deployed", "local-vs-remote"],
      },
      {
        heading: "What a SHA proves — and what a short SHA is for",
        body: "A commit SHA proves that a particular tree, parent, and message existed. A short SHA (d046d54) is a nickname for talking; the ledger uses the full object (d046d54428b1e9dfdb63b8336959df955dd6820a). Neither proves that a host checked it out, that a container was built from it, that tests passed on it, or that a timer is running it.",
        conceptIds: ["sha", "short-sha", "tests-prove", "deployment"],
      },
      {
        heading: "Dirty, staged, untracked, detached",
        body: "Dirty means the folder differs from HEAD. Staged means 'this is what I intend to save next'. Untracked means Git does not know the file — stash -u can still pick it up, which is how INC-20260822-A recreated logs/ as root:root. Detached HEAD is opening an old page without a bookmark: useful for inspecting a soak SHA, not a rollback of production.",
        conceptIds: ["clean-dirty", "staged", "untracked", "detached-head"],
      },
      {
        heading: "Branches, PRs, cherry-picks, conflicts",
        body: "Work happens on a feature branch, then a pull request asks to braid it into main. Cherry-pick photocopies one commit onto another line and mints a new SHA — a hotfix cherry-picked on a host and never pushed is a secret fork. Merge conflicts stop the notebook; AGENT_RULES.md forbids silently resolving architecture conflicts by changing wording.",
        conceptIds: ["feature-branch", "pull-request", "cherry-pick", "merge-conflict"],
      },
    ],
  },
  {
    id: "mod-lifecycle",
    area: "basics",
    title: "The development lifecycle — these words are not synonyms",
    summary: "Idea, spec, implementation, local test, regression, committed, pushed, reviewed, merged, deployed, running, observed, verified. Each is a different doorway.",
    conceptIds: ["lifecycle", "commit", "push", "pull-request", "deployment", "runtime-provenance", "verification"],
    sections: [
      {
        heading: "Doorways that look alike",
        body: "A green CI badge is not a deploy. A deploy is not a running timer. A running timer is not useful work (MATERIALIZATION_GAP). Useful work is not mission recall (BANKAI). Observed-by-Motherclank is not verified-on-host. ACT-011 verified a restore; it did not create durable off-host backups. Merging Fleet Laws did not change Hetzner.",
        conceptIds: ["ci", "deployment", "materialization-gap", "recall"],
      },
      {
        heading: "Who stands at which door",
        body: "Agents implement and review. CI reruns the encoded questions. The operator chooses acceptance criteria and directs deploy. The scheduler (if exactly one per lane) attempts work. The database remembers. Motherclank photocopies. Nobody is allowed to skip a door by speaking a later word early.",
        conceptIds: ["operator-role", "scheduler", "motherclank"],
      },
    ],
  },
  {
    id: "mod-tests",
    area: "basics",
    title: "Tests, fixtures, and what a green suite does not mean",
    summary: "CI, regression specimens, golden fixtures, smoke, e2e — and the BANKAI lesson that 600 passing tests can coexist with zero useful recall.",
    conceptIds: ["ci", "test-suite", "unit-test", "integration-test", "regression-test", "fixtures", "smoke-test", "tests-prove", "e2e", "deterministic", "recall"],
    sections: [
      {
        heading: "Kinds of questions",
        body: "Unit tests ask one instrument if it still ticks (Motherclank never-upgrade after DEF-M1.5). Integration tests ask whether translators still agree (CTW 38 golden-corpus tests — not a live cron confirmation). Regression tests are museum labels for scars (Fleet Laws specimens). Smoke asks if the building is on fire. E2E puts a robot in front of the actual door. Soak is a trial shift. None of these is recall.",
        conceptIds: ["unit-test", "integration-test", "regression-test", "soak"],
      },
      {
        heading: "Fixtures are contracts with the past",
        body: "Golden Worlds must regenerate byte-identically. Motherclank golden incidents are executable or explicitly pending — never faked. If you 'fix' a test by loosening it, you delete a memory.",
        conceptIds: ["fixtures", "regression-test"],
      },
      {
        heading: "The number on the badge",
        body: "'621 passed, 1 skipped' proves those 621 assertions. Watch's 468 passed on 27 August proves the QC race repair's suite, not that Hetzner is running ee3f34d. Law 3 exists because HTTP success without useful output fooled dashboards. BANKAI: 6349→0 with machinery that 'worked'.",
        conceptIds: ["tests-prove", "mission-fail", "recall"],
      },
    ],
  },
  {
    id: "mod-deploy",
    area: "systems",
    title: "Deployment, drift, and runtime state",
    summary: "Checkout is not deploy. HEAD is not the container digest. A hotfix that is not pushed is a secret fork. The volume is a fifth copy.",
    conceptIds: ["deployment", "head-vs-deployed", "deployment-drift", "drift", "hotfix", "rollback", "committed-not-pushed", "checkout", "container", "volume", "env-var"],
    sections: [
      {
        heading: "Two clocks, four identities",
        body: "Repository time (what main points at) and runtime time (what the process loaded) diverge whenever someone merges without restarting, restarts without pulling, or builds from a dirty tree. Checkout HEAD, origin/main, deployed image digest, and DB epoch are four realities. Law 6 requires host-evidenced SHAs; an env var claiming a SHA is a sticky note, not evidence (KTW deployed-SHA env-fallback).",
        conceptIds: ["provenance", "runtime-provenance", "env-var"],
      },
      {
        heading: "Containers, volumes, hosts",
        body: "A container is a sealed lunchbox; the recipe (Git) and the lunchbox (image) can disagree. A volume is the filing cabinet — INC-20260823 emptied two of them in three seconds. Production is the press that prints; staging is the rehearsal room and must not share the production megaphone (Law 5).",
        conceptIds: ["container", "volume", "production", "staging", "host"],
      },
    ],
  },
  {
    id: "mod-ops",
    area: "systems",
    title: "Processes, timers, and honest health",
    summary: "systemd units, user timers, cron, PID, invocation versus work, dual-plane health, observability.",
    conceptIds: ["process", "systemd", "cron", "scheduler", "pid", "schedule-latency", "observability", "telemetry", "health-check", "dual-plane-health", "execution-liveness", "materialization-gap"],
    sections: [
      {
        heading: "Invocation is not execution",
        body: "GIC-04 and INC-20260822-A: a scheduler can fire, and the process still never start. ADR-0008 names six stages: SCHEDULE_EXPECTED → SCHEDULER_FIRED → PROCESS_STARTED → RUN_MATERIALIZED → RUN_COMPLETED → OUTCOME_RECORDED. A PID is proof someone got out of bed, not proof they did the job. A health check that only asks 'did the timer elapse?' will report green through a silent outage.",
        conceptIds: ["scheduler", "execution-liveness", "pid", "materialization-gap"],
      },
      {
        heading: "One clock per notebook",
        body: "Law 5: exactly one enabled scheduling mechanism per Clank-lane. Smartwatch dual-lane retired the failing systemd soak timer 2026-08-21T21:06Z; cron kept. A leftover Tablet soak.service is INTENTIONALLY_DORMANT, not a second authority. Two clocks are two authors of history.",
        conceptIds: ["cron", "systemd", "configuration-drift"],
      },
      {
        heading: "Dual-plane health",
        body: "Operational health (process/HTTP) and mission health (useful output, recall, coverage) must not imply each other. FGT 200+0=ok, SK hynix HOST-BLOCKED since 10 August, KTW HEALTHY-iff-ever-succeeded, DEF-M1.5 UUID-ordered false-STALE: different mechanics, one lie. UNKNOWN stays UNKNOWN.",
        conceptIds: ["dual-plane-health", "health-check", "attestation"],
      },
    ],
  },
  {
    id: "mod-data",
    area: "systems",
    title: "SQLite, locks, schema, outbox, epochs",
    summary: "Why Clank state lives in per-Clank SQLite, how writers coordinate, why delivery is not generation, and why a restored file is not a rewind of the world.",
    conceptIds: ["database", "sqlite", "sqlite-authoritative", "lock", "schema", "migration", "transaction", "outbox", "idempotency", "dedup", "epoch", "authoritative-state", "derived-state", "race-condition"],
    sections: [
      {
        heading: "Why SQLite became more than storage",
        body: "A scraper that printed results could forget yesterday. Novelty, baselines, outboxes, and QC all hang off the local file. Archaeology: independently evolved, mostly SQLite-backed collectors. ADR-0002: Clank SQLite remains authoritative; Motherclank snapshots are derived and disposable. Everyone keeps their own notebook. The supervisor may photocopy, never scribble in it.",
        conceptIds: ["sqlite-authoritative", "authoritative-state", "derived-state"],
      },
      {
        heading: "One stick per notebook",
        body: "Law 7: every writer of one SQLite file — including a dashboard POST — takes the same cross-process lock. threading.Lock does not coordinate with another process. The FGT 'DB Eradication' specimen is the scar. Watch's 27 August QC race repair (ee3f34d) is the same physics: a UNIQUE constraint is not an operator-facing contract until the application catches the race.",
        conceptIds: ["lock", "race-condition", "transaction"],
      },
      {
        heading: "Epochs, outbox, schema",
        body: "A restored database is RESTORED_HISTORY + GAP_KNOWN (Smartwatch). A blank new file after total loss is NEW_EPOCH (Feature Phone fpc-epoch-2 at 2026-08-23T21:36:11Z). Organic recovery narratives are forbidden. Outbox: producing an event is not notifying (GIC-13). Schema drift is GIC-14 — a different plane from locks.",
        conceptIds: ["epoch", "outbox", "schema", "migration"],
      },
    ],
  },
  {
    id: "mod-arch",
    area: "architecture",
    title: "Why the architecture looks like this",
    summary: "Motherclank, Diagnostic Clank, fleet laws, contracts, allowlists, blast radius — laws that were written in blood, not taste. The final diagram did not exist on 4 August.",
    conceptIds: [
      "motherclank", "diagnostic-clank", "invariant", "contract", "allowlist", "dogfooding",
      "blast-radius", "graceful-degradation", "sqlite-authoritative", "fleet-law", "promotion-gate",
    ],
    sections: [
      {
        heading: "Separation is a safety device",
        body: "Clanks own mutable state. Diagnostic Clank owns adapters and fleet.yaml. Motherclank photocopies. DAU owns mastery. Worlds own simulators. The Clank Systems Handbook owns historical evidence, not SRS. Mixing those on purpose is how a QC flood or a false mastery score happens.",
        conceptIds: ["contract", "blast-radius"],
      },
      {
        heading: "Why each new layer appeared",
        body: "Collectors: the newsroom needed sensors. SQLite: a restart must not look like the birth of the market. Docker/Hetzner: a laptop is not a newsroom sensor. Diagnostic Clank: membership was being guessed from directories. Fleet Laws: the same lies in ten dialects. Motherclank: local dashboards were not a trustworthy picture and a supervisor that can write is a second Clank. Continuity/liveness ADRs: 22–23 August destroyed the collapsed words (fired=ran, restore=rewind, empty=crash).",
        conceptIds: ["fleet-law", "motherclank", "execution-liveness"],
      },
    ],
  },
  {
    id: "mod-laws",
    area: "architecture",
    title: "Motherclank law lineage — scars with names",
    summary: "Each Fleet Law is a named invariant with specimens that must never recur. This is the map from incident to rule. Law 9 is deferred because the inventory machinery to enforce it did not exist at codification.",
    conceptIds: ["fleet-law", "invariant", "regression-test", "allowlist", "promotion-gate"],
    sections: [
      {
        heading: "Laws 1–4: novelty, health, delivery",
        body: "Law 1 (no-flood): first run against an existing world must not announce every tin. Specimens: FGT fresh-DB burst, BANKAI Lenovo 6349→0, Timex Weekender. Law 2: FIRST_SEEN_BY_CLANK ≠ NEW_TO_MARKET (L-WATCH-001 CONFIRMED FIXED). Law 3: HTTP 200 without useful output is not healthy; invocation ≠ work; DEF-M1.5 never-upgrade. Law 4: unknown reasons never send (casio_multi silent period, FGT subscription blackout).",
        conceptIds: ["baseline", "first-seen", "health-check", "allowlist"],
      },
      {
        heading: "Laws 5–8 and deferred 9: clocks, footnotes, locks, paper trails",
        body: "Law 5: one scheduler and one megaphone per lane (smartwatch dual-lane 21 Aug). Law 6: provenance, UNKNOWN allowed, guessed SHA forbidden (CTW guessed path, SemInt d43481f). Law 7: one cross-process lock per SQLite file, dashboards included. Law 8: no production source without soak + promotion record + rollback (oem-radar bankai soaks had none until Phase 2A). Law 9 deferred: default branch trailing production — needs inventory machinery.",
        conceptIds: ["scheduler", "provenance", "lock", "promotion-gate", "deployment-drift"],
      },
    ],
  },
  {
    id: "mod-dogfood",
    area: "architecture",
    title: "Dogfooding: using the playbook on a real Clank",
    summary: "Eat your own cooking while it is still hot enough to burn you. CTW onboarding is the first real v0.3 field scorecard. Watch QC and Motherclank DEF-M1.5 are the same idea in other rooms.",
    conceptIds: ["dogfooding", "operator-role", "implementation-agent", "source-adapter"],
    sections: [
      {
        heading: "What dogfooding meant here",
        body: "Using a system you built as part of building, testing, operating, or improving that same ecosystem. CTW_ONBOARDING_DOGFOOD.md: Motherclank core participant-specific lines 0; adapter ~230 LOC. Friction the playbook could not see until live host discovery: FGT registry db filename had drifted from newsroom.db; a guessed CTW refresh path never existed (live store was a differently-named Docker volume). Refresh silently SKIPped. Anil's follow-up 7f977d6 made the cross-check a playbook step.",
        conceptIds: ["dogfooding", "head-vs-deployed"],
      },
      {
        heading: "Other times the fleet ate its cooking",
        body: "DEF-M1.5: Motherclank's first synthesis found adapter-truth defects in its own pipeline (UUID order, never-upgrade). Watch QC: the human queue was the customer of the collector, and the flood taught invocation provenance. ACT-011: a backup that has never been restored is a rumour — the operator executed the drill. Onboarding is how the architecture is tested; freeze (v0.3, 25 Aug) is how you find out whether it works.",
        conceptIds: ["health-check", "qc-flood", "verification"],
      },
    ],
  },
  {
    id: "mod-history",
    area: "history",
    title: "Historical phases of the fleet",
    summary: "Nine phases derived from artefacts, not a forced textbook structure. Each layer exists because the previous one got hurt.",
    conceptIds: ["collector", "sqlite-authoritative", "fleet-law", "motherclank", "materialization-gap", "epoch"],
    sections: [
      {
        heading: "Read the ledger, not a myth",
        body: "The machine-readable spine is src/content/history.ts; the human spine is docs/CLANK_HISTORY_LEDGER.md. Every entry is VERIFIED, INFERRED, INCOMPLETE, or ILLUSTRATIVE. This course will not upgrade UNKNOWN to healthy to make a prettier present. Archaeology inventory was current through 2026-08-22; later repo pushes are labelled as repo HEAD, not as production.",
        conceptIds: ["provenance", "health-check"],
      },
    ],
  },
  {
    id: "mod-motherclank-stages",
    area: "architecture",
    title: "Motherclank M0–M4 — a camera that cannot hold the keys",
    summary:
      "Motherclank was not born fully formed. Fleet Laws on 21 August named the lies; a read-only harvester on 22 August was the camera those laws still lacked. Stages M0–M4 are git-resident. Live harvest, timer enablement, and var/ batches are UNKNOWN or missing. Do not teach 'Motherclank is healthy' from repo HEAD 7cee2f8.",
    conceptIds: [
      "motherclank",
      "diagnostic-clank",
      "observability",
      "derived-state",
      "execution-liveness",
      "dual-plane-health",
      "promotion-gate",
      "provenance",
      "epoch",
      "head-vs-deployed",
    ],
    sections: [
      {
        heading: "Incident → lesson → rule → implementation",
        body: "By 21 August the same lies had names (Laws 1–8) and still no fleet-wide reader. Local dashboards reported green through silent outages, 200-with-zero, dual schedulers, and soaks with no promotion record. The lesson: a supervisor that can write is a second Clank with blast radius over every notebook. The rule (ADR-0002, b341b0f, 2026-08-22): observe, synthesize, detect, recommend, learn — never remediate in M0–M4. The implementation is a separate repository consuming Diagnostic Clank adapters unchanged. M5 mutation is explicitly forbidden until a future ADR with authn, fencing, authorization, and rollback.",
        conceptIds: ["motherclank", "blast-radius", "sqlite-authoritative"],
      },
      {
        heading: "What fleet-level supervision actually solved",
        body: "Not 'make the collectors better'. Not 'restart the timers'. Supervision solved the missing picture: one dated snapshot of adapter facts across Clanks, hash-chained, UNKNOWN-honest, without taking Clank locks or sharing a database with them. Clank SQLite remains authoritative (ADR-0002). Snapshots in var/ are derived and disposable. Rollback = disable the user timer and delete snapshots. Collectors keep their own notebooks.",
        conceptIds: ["observability", "derived-state", "authoritative-state"],
      },
      {
        heading: "M0 harvest — photocopy, do not edit",
        body: "M0 reads Diagnostic-owned adapters and writes append-only dated JSONL plus a derived Markdown report. install-user-timer.sh and host-harvest.sh exist in git as the intended one-clock path (Law 5). Live timer enablement is UNKNOWN — unit templates are not proof a timer is enabled. Hash-chaining is how a later reader tells whether a snapshot was tampered with. Adapter failure is isolated to that Clank block; the fleet snapshot is supposed to complete anyway, with UNKNOWN preserved.",
        conceptIds: ["source-adapter", "graceful-degradation", "systemd"],
      },
      {
        heading: "M1 synthesis — DEF-M1.5 is the first self-dogfood",
        body: "Synthesis turns adapter facts into UNKNOWN-honest health. DEF-M1.5 (UUID order, never-upgrade) is Motherclank finding adapter-truth defects in its own pipeline: a UUID-ordered walk produced false-STALE, and the inverse false-HEALTHY risk is why never-upgrade is a property test. A mapper that promotes UNKNOWN to HEALTHY is a Law 3 violator wearing a supervisor badge. The never-upgrade tests prove the mapper; they do not prove a host is healthy.",
        conceptIds: ["dual-plane-health", "health-check", "dogfooding"],
      },
      {
        heading: "M2 detect — name the gap, do not diagnose the collector",
        body: "M2 is where MATERIALIZATION_GAP and continuity states live. ADR-0008's six stages (SCHEDULE_EXPECTED → SCHEDULER_FIRED → PROCESS_STARTED → RUN_MATERIALIZED → RUN_COMPLETED → OUTCOME_RECORDED) are the vocabulary. Absence of evidence is UNKNOWN, never NO. Continuity seeds INC-20260822-23 and INC-20260823 encode the 22–23 August window; recovered host var/ batches for that window remain BLOCKED. Do not reconstruct syslog from the seed.",
        conceptIds: ["execution-liveness", "materialization-gap", "epoch"],
      },
      {
        heading: "M3 recommend — inbox, not hands",
        body: "ADR-0003 authorises inbox proposals, not execution. Diagnostic Clank's Agent Output Inbox may receive M3 text. Motherclank does not restart timers, does not take locks, does not send Discord, does not write Clank DBs. A recommendation is a sentence an operator can refuse. Treating M3 as auto-remediation would be M5 by another name.",
        conceptIds: ["diagnostic-clank", "operator-role"],
      },
      {
        heading: "M4 QC ingest — read dispositions, do not grade the newsroom",
        body: "M4 may ingest QC disposition corpora read-only (Watch queue accounting is the specimen). Catalogue-pass is an invocation fact; Motherclank must not infer pass quality from output size. Participant-native confidence is preserved verbatim (ADR-0014 EvidenceEnvelope). Motherclank does not recompute smartphone alias/family/decay, does not relabel Watch NULL-mode rows, and does not assign DAU mastery.",
        conceptIds: ["qc-flood", "runtime-provenance"],
      },
      {
        heading: "Laws the camera is bound by",
        body: "Law 3: dual-plane health — operational ping is not mission health; ZERO_ITEMS is not HEALTHY; DEF-M1.5 never-upgrade. Law 5: one harvest timer, not a second clock per lane. Law 6: missing SHA stays UNKNOWN; an env var is a sticky note. Law 8: soaks without promotion records are visible as a gap, not silently promoted. Continuity/survivability: RESTORED_HISTORY ≠ rewind; NEW_EPOCH ≠ market crash; ACT-011 scratch ≠ Layer C.",
        conceptIds: ["fleet-law", "provenance", "promotion-gate"],
      },
      {
        heading: "What Motherclank does not prove",
        body: "It does not prove collectors are running. It does not prove the harvest timer is enabled. It does not prove var/ on the host still holds 22–23 August batches. It does not prove a GitHub HEAD (7cee2f8, operator sanity-check script) is the deployed harvest. It cannot see what adapters cannot read. It cannot survive another volume deletion of a Clank it only photocopies. It is not Diagnostic Clank, not a deployer, not a chat bot, and not healthy-by-existence.",
        conceptIds: ["head-vs-deployed", "runtime-provenance"],
      },
      {
        heading: "Relationship to collectors and Diagnostic Clank",
        body: "Collectors own mutable state. Diagnostic Clank owns fleet.yaml and the adapter plane (sibling checkout or --adapters-src). Motherclank is the consumer, not the successor. Onboarding a Clank is adding an adapter plus a registry row that survives a live-datastore cross-check — CTW dogfood (7f977d6) is the scar that guessed path never existed. Motherclank growing Clank-name conditionals would be the architecture eating itself.",
        conceptIds: ["collector", "diagnostic-clank", "contract"],
      },
      {
        heading: "What this campaign could and could not preserve",
        body: "Preserved: continuity seeds (INC-20260822-23, INC-20260823, ACT-011, execution-expectations), the timer installer, DATA_SURVIVABILITY.md. Not preserved: host var/, last harvest timestamp, whether the 06:15 UTC timer is enabled, syslog/journal for the outage window. Teaching from git-resident evidence is allowed. Teaching live health from that evidence is not.",
        conceptIds: ["runtime-provenance", "head-vs-deployed"],
      },
    ],
  },
  {
    id: "mod-diagnostic-inventory",
    area: "architecture",
    title: "Diagnostic Clank — registry, not a folder listing",
    summary:
      "Diagnostic Clank exists because someone had to know which Clanks existed, on which host, at which SHA, without taking their locks. fleet.yaml is a dated inventory (as_of 2026-08-22T22:30:00Z), not today's host. A directory sweep omitted Tablet (L-FLEET-001). Adapters are the translation plane Motherclank consumes. Live Diagnostic deployment remains UNKNOWN.",
    conceptIds: [
      "diagnostic-clank",
      "motherclank",
      "contract",
      "source-adapter",
      "head-vs-deployed",
      "miss",
      "source-gap",
      "region-gap",
      "provenance",
    ],
    sections: [
      {
        heading: "Why Diagnostic Clank became necessary",
        body: "Independent collectors plus operator memory is not an inventory. After expansion, membership was being guessed from directories and from whoever remembered Tablet. GIC-21 / L-FLEET-001: a directory sweep omitted Tablet. The lesson: membership is a registry. The implementation (from 17 August) is a read-only control-plane prototype that owns fleet.yaml, adapters, DiagnosticBench cases, and an Agent Output Inbox. It is not a collector, not Motherclank, and its default branch is still diagnostic-clank-2026-08 — not main.",
        conceptIds: ["diagnostic-clank", "blast-radius"],
      },
      {
        heading: "fleet.yaml is a document with a date",
        body: "Preserved copy: schema 2.0, as_of 2026-08-22T22:30:00Z, inventory_status INVENTORY_INCOMPLETE, promotion frozen, host ubuntu-4gb-hel1-1. Deployed SHAs in that file are 2026-08-22 inventory, not a 2026-08-27 probe. Two deployment_facts rows leave instance_id and deployed_commit_sha UNKNOWN (likely Diagnostic/Motherclank themselves). Archaeology inventory through 22 August is the last dated fleet picture; later GitHub pushes are repo HEAD.",
        conceptIds: ["provenance", "head-vs-deployed"],
      },
      {
        heading: "Adapters are the translation plane",
        body: "Diagnostic Clank owns adapters; Motherclank consumes them unchanged (sibling checkout or --adapters-src). CTW's first v0.3 adapter was ~230 LOC and added zero Motherclank core participant-specific lines — that is the contract working. The 2026-08-27 Tablet observer adapter (3667af0) is a control-plane commit. It does not make Tablet production. INTENTIONALLY_DORMANT remains the controlling liveness output for a stale soak unit.",
        conceptIds: ["source-adapter", "contract"],
      },
      {
        heading: "Miss, source gap, region gap",
        body: "A miss is 'we looked at the shelf and still did not see the tin' (BANKAI Lenovo 6349→0; L-OEM-004 Beelink miss stays UNKNOWN — do not invent parser fault). A source gap is 'the shop was locked' (SK hynix HOST-BLOCKED from Hetzner since 2026-08-10). A region gap is 'we only sent someone to London' (L-WATCH-006 still OPEN). Diagnostic classification has to keep those three apart or Motherclank will report a healthy zero for a locked door.",
        conceptIds: ["miss", "source-gap", "region-gap"],
      },
      {
        heading: "Evidence capture and the diagnostic corpus",
        body: "DiagnosticBench cases, golden-incident fixtures, and owner-supplied Watch corpus in diagnostic.db are how postmortems become repeatable. Motherclank golden incidents are executable or explicitly pending — never faked. Report ingestion and the Agent Inbox are how an operator files a finding without Motherclank growing a write path. The corpus is not the live host.",
        conceptIds: ["fixtures", "regression-test"],
      },
      {
        heading: "Incident lifecycle and operator workflow",
        body: "Classify (miss / source-gap / region-gap / materialization / lock / provenance) → capture evidence without taking Clank locks → freeze a hypothesis → compare to the corpus → write a recommendation into the inbox if needed → the operator decides. Diagnostic Clank does not remediate. Promotion remains frozen. Onboarding a new Clank is adapter + registry row + live-datastore cross-check (7f977d6 after CTW's guessed refresh path).",
        conceptIds: ["operator-role", "root-cause"],
      },
      {
        heading: "How it differs from Motherclank",
        body: "Diagnostic Clank is the shared language and the membership book. Motherclank is the reader of that language on a clock. Diagnostic does not harvest the fleet; Motherclank does not own adapters. Mixing them is how a QC flood or a false inventory happens. README still branded 'Unified Clank Platform' / Stage 1A is historical naming, not a production claim.",
        conceptIds: ["motherclank", "diagnostic-clank"],
      },
      {
        heading: "What remains incomplete",
        body: "Live Diagnostic deployment SHA UNKNOWN. Fresh host verification of fleet.yaml still required. Cross-Clank identity ADR still blocking participant profile. Tablet adapter exists in git and does not change INTENTIONALLY_DORMANT. Two inventory instance_ids UNKNOWN. This module teaches membership-as-registry from git evidence; it does not teach that the control plane is running.",
        conceptIds: ["head-vs-deployed", "runtime-provenance"],
      },
    ],
  },
];
