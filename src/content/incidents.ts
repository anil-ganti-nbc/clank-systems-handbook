import type { Incident } from "../lib/handbook/schema.ts";

export const INCIDENTS: Incident[] = [
  {
    id: "inc-materialization",
    title: "Scheduler fired, work never materialized",
    dateRange: "2026-08-22 to 2026-08-24",
    systems: ["oem-radar", "smartwatch-clank", "feature-phone-clank", "systemd/cron", "motherclank"],
    complexity: "simple-operational",
    epistemic: "verified",
    context:
      "Several Clanks are supposed to run on a host schedule (cron or systemd timers). Operators believed 'the timer fired' meant 'the collector ran'. Golden incident GIC-04 exists specifically for this class.",
    symptom:
      "About 36 hours of silence on oem-radar, smartwatch, and feature-phone even though scheduling still looked populated. Diagnostic incident id 62b03383… is cited in the decision ledger.",
    competingHypotheses: [
      "The collectors ran and found nothing (legitimate NO_WORK_DUE / ZERO_ITEMS).",
      "The timer unit is disabled — scheduling is the root cause.",
      "The process started and then crashed after a successful start (GIC-12).",
      "The scheduler fired but the process never started — a materialization gap (GIC-04 / ADR-0008).",
    ],
    diagnosis:
      "Execution-liveness family. Root stash -u recreated logs/ owned root:root; cron redirects failed pre-exec; the scheduled command never became a running collector. Codified as MATERIALIZATION_GAP.",
    rootCause:
      "Pre-exec failure: cron redirected through a logs/ directory recreated with the wrong owner, so the job died before the process under supervision existed.",
    contributingCauses: [
      "Health checks that treated scheduler invocation as successful work (Law 3).",
      "No single query that showed 'fired but never started'.",
      "Multiple Clanks sharing the same host logging layout, widening blast radius.",
    ],
    causalChain: [
      "Operator or tooling ran stash -u.",
      "logs/ reappeared as root:root.",
      "cron redirect could not write; command failed before exec of the collector.",
      "Timers still elapsed, so dashboards that watched the calendar stayed calm.",
      "No useful work for ~36 hours.",
    ],
    blastRadius:
      "oem-radar, smartwatch-clank, and feature-phone-clank on that host. Not a logic bug inside any one collector.",
    remediation:
      "Fix directory ownership/redirects; introduce an execution-liveness model with six evidence-backed stages (ADR-0008); GIC-04 fixture in Motherclank so 'fired but never started' is a first-class detection.",
    verification:
      "Decision ledger INC-20260822-A recorded; ADR-0008 proposed with Motherclank implementation on f6-continuity-f2 @3558fab and G1–G8 fixtures. Exact host log excerpts are not in this Handbook checkout — labelled incomplete if you need the raw syslog.",
    residualRisk:
      "Any future redirect, permission, or missing binary can reproduce MATERIALIZATION_GAP. Detection depends on Motherclank/liveness fixtures actually being harvested on the host.",
    architecturalLesson:
      "Scheduler invocation ≠ process start ≠ useful work. Observability must distinguish those stages or the fleet will look scheduled while it is dead.",
    evidence: [
      {
        id: "ev-ledger-a",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "DECISION_LEDGER.md",
        note: "INC-20260822-A: stash -u, logs/ root:root, cron redirects failed pre-exec, ~36h silent outage, MATERIALIZATION_GAP.",
        status: "verified",
      },
      {
        id: "ev-gic-04",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "GOLDEN_INCIDENT_CORPUS.md",
        note: "GIC-04 scheduler fired, process never started — executable golden incident, execution-liveness plane.",
        status: "verified",
      },
      {
        id: "ev-adr-0008",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "DECISION_LEDGER.md",
        note: "ADR-0008 execution-liveness model; implementation cited motherclank @3558fab.",
        status: "verified",
      },
    ],
    conceptIds: ["scheduler", "systemd", "root-cause", "contributing-cause", "health-check", "schedule-latency", "observability", "materialization-gap", "execution-liveness", "untracked", "cron"],
    lawIds: ["law-3"],
    historyIds: ["h-materialization", "h-gitignore-runtime"],
    lab: true,
    probes: [
      { id: "p-timer", label: "Did the timer/cron unit fire?", finding: "Yes — elapsed times still looked populated.", status: "verified" },
      { id: "p-proc", label: "Did a collector process start?", finding: "No. Pre-exec redirect failure. This is GIC-04, not GIC-12.", status: "verified" },
      { id: "p-logs", label: "Who owns logs/?", finding: "Recreated by stash -u as root:root, breaking cron redirects.", status: "verified" },
      { id: "p-zero", label: "Was this a legitimate zero?", finding: "No. Work never started, so ZERO_ITEMS would have been a lie.", status: "inferred" },
      { id: "p-db", label: "Did oem-radar lose SQLite data?", finding: "No. Family A is execution-liveness, not volume loss. OEM Radar lost no DB data.", status: "verified" },
    ],
  },
  {
    id: "inc-qc",
    title: "Watch QC flood and FIRST_SEEN inversion",
    dateRange: "2026-08-25 to 2026-08-26 (with lineage to L-WATCH-001)",
    systems: ["watch-clank", "human QC queue", "initial_fill / catalogue-pass qualification"],
    complexity: "multi-layer",
    epistemic: "verified",
    context:
      "Watch Clank discovers products and stories, then a human QC queue decides what is editorially useful. Novelty, health, and catalogue-pass status are different planes (Laws 1–3, GIC-01).",
    symptom:
      "The default human-QC FIFO filled with low-value first-sightings and validation runs treated as real catalogue passes. 2026-08-26 accounting: 639 raw unreviewed events; default queue 580 before repair replay, 41 after.",
    competingHypotheses: [
      "Sources suddenly published hundreds of genuinely new watches.",
      "Baseline was empty so first run legally notified everything (Law 1 violator class).",
      "Qualification inferred 'real catalogue pass' from output cardinality / successful-run count (invocation vs result).",
      "FIRST_SEEN_BY_CLANK was being treated as NEW_TO_MARKET (L-WATCH-001 / Law 2).",
    ],
    diagnosis:
      "Both the qualification bug and the novelty inversion. Catalogue-pass must be an invocation fact (persisted max_items), never inferred from discovered_count. Weak FIRST_SEEN (story_score ≤ 15) is not affirmative novelty.",
    rootCause:
      "Run behaviour depended on reconstructed intent from result shape (successful-run count, then discovered_count > 1) instead of the persisted invocation budget.",
    contributingCauses: [
      "FIRST_SEEN semantics leaking into 'new to market'.",
      "Queue accounting that conflated raw unreviewed, default FIFO, and background availability events.",
      "Validation/smoke runs sharing the same INITIAL_FILL_RUNS budget as unbounded catalogue passes.",
    ],
    causalChain: [
      "Deployment-validation runs executed with a tiny item budget.",
      "Qualification counted them as catalogue passes because something succeeded or returned >1 row.",
      "INITIAL_FILL_RUNS exhausted; baseline/QC state advanced on smoke.",
      "Weak first-sightings entered the default FIFO.",
      "Editors saw a flood; useful FIRST_SEEN in history had actually scored ≥ 25.",
    ],
    blastRadius:
      "Human QC attention on Watch Clank; risk of promoting junk and burying real launches. Not a corruption of the SQLite lock (writers still used RunLock).",
    remediation:
      "Qualify catalogue-pass from summary_metadata.max_items (null or ≥ registry default). Weak FIRST_SEEN auto-flagged human_qc_deprioritized. Queue reports now name raw vs default vs background tiers. Review mode is three-valued (individual/bulk/absent).",
    verification:
      "ARCHITECTURE_NOTES_QC_VOLUME.md (2026-08-26) records the incident values and the _is_catalogue_pass implementation. L-WATCH-001 is CONFIRMED FIXED in the expansion failure corpus. Re-running a bounded validation run must not increment INITIAL_FILL_RUNS — that test lives in watch-clank, not in this Handbook.",
    residualRisk:
      "Any new collector that infers pass quality from output size will reproduce the flood. Region gaps (L-WATCH-006) remain a separate open class.",
    architecturalLesson:
      "When behaviour depends on how a run was invoked, persist the invocation fact. Never reconstruct intent from result shapes. Observation ≠ novelty ≠ health ≠ QC queue.",
    evidence: [
      {
        id: "ev-qc-vol",
        kind: "doc",
        repo: "anil-ganti-nbc/watch-clank",
        path: "ARCHITECTURE_NOTES_QC_VOLUME.md",
        note: "2026-08-26 notes: catalogue-pass is invocation fact; 639/580/41 queue numbers; weak FIRST_SEEN threshold 15 vs useful ≥ 25.",
        status: "verified",
      },
      {
        id: "ev-lw001",
        kind: "doc",
        repo: "anil-ganti-nbc/watch-clank",
        path: "WATCH_EXPANSION_FAILURE_CORPUS.md",
        note: "L-WATCH-001 FIRST_SEEN_BY_CLANK ≠ NEW_TO_MARKET, CONFIRMED FIXED / canonical regression class.",
        status: "verified",
      },
      {
        id: "ev-law2",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "FLEET_LAWS.md",
        note: "Law 2 Observation ≠ novelty. Specimens: Timex 22-second launch cluster; Apple IN 48 false positives.",
        status: "verified",
      },
    ],
    conceptIds: ["first-seen", "qc-flood", "runtime-provenance", "baseline", "false-positive", "backpressure", "region-gap", "initial-fill", "editorial-eligibility"],
    lawIds: ["law-1", "law-2"],
    historyIds: ["h-watch-qc", "h-expansion-scars", "h-watch-qc-race"],
    lab: true,
    probes: [
      { id: "p-budget", label: "What max_items did the run persist?", finding: "Validation runs were bounded; qualification ignored that and used counts.", status: "verified" },
      { id: "p-fs", label: "Do FIRST_SEEN events carry recency evidence?", finding: "Flood class scored 15; every useful FS in history scored ≥ 25.", status: "verified" },
      { id: "p-queue", label: "Which queue are we counting?", finding: "Raw 639 ≠ default FIFO 580 ≠ post-repair 41.", status: "verified" },
      { id: "p-second", label: "Did the first repair (discovered_count > 1) actually fix it?", finding: "No. Output cardinality again. A bounded run that found 2+ items would have re-exhausted INITIAL_FILL.", status: "verified" },
    ],
  },
  {
    id: "inc-bankai",
    title: "BANKAI soak: machinery healthy, recall zero",
    dateRange: "Phase 2A codification window (recorded 2026-08-22); OEM Radar bankai soaks",
    systems: ["oem-radar", "soak / promotion records", "fleet laws"],
    complexity: "mission-level",
    epistemic: "verified",
    context:
      "OEM Radar ran 'bankai' soaks intended to prove that the collector could notice real OEM news (the Lenovo case is the named specimen). Tests and HTTP fetches can be green while the editorial mission — useful recall — is empty.",
    symptom:
      "Lenovo 6349→0 blind soak: a large candidate set collapsed to zero useful recall. Law 1 lists this specimen beside other initialization floods. Promotion records were missing until Phase 2A landed them (Law 8).",
    competingHypotheses: [
      "The source truly published nothing (legitimate zero).",
      "HOST-BLOCKED / parser identity failure (L-WATCH-002 class) — fetch succeeded, identity did not.",
      "Baselining/novelty policy discarded everything as already-seen, including the thing the soak was meant to catch.",
      "The soak ran against a different code SHA or config than the one people reviewed.",
    ],
    diagnosis:
      "Mission-level failure: local components could be 'correct' (requests, tests, scheduler) while the system failed its purpose (useful OEM recall). Law 8 additionally records that bankai soaks operated outside any promotion record until Phase 2A.",
    rootCause:
      "The soak's success criterion was not wired to mission recall. Green tests and fetches were allowed to stand in for 'we would have caught Lenovo'.",
    contributingCauses: [
      "No bidirectional config↔promotion record (Law 8) at the time of the soak.",
      "Health honesty not yet universal (Law 3) — empty-but-200 can look fine.",
      "Possible deployment/checkout disagreement (Law 6 / Law 9 deferred) — not proven for this soak in the Handbook's evidence set, so left inferred.",
    ],
    causalChain: [
      "A soak is scheduled to prove recall on a known OEM story.",
      "Collector runs; tests elsewhere pass.",
      "Useful recall for the named case is 0 (6349→0).",
      "Without a promotion record, the failure is not even a first-class object in the architecture.",
      "Phase 2A writes Law 1 and Law 8 so this class has a name and a paper trail.",
    ],
    blastRadius:
      "Editorial: false confidence that OEM Radar would catch launches. Architectural: soaks without records cannot be rolled back or compared.",
    remediation:
      "Fleet Law 1 (initialization/no-flood) and Law 8 (promotion gates) codified 2026-08-22. Soaks must appear in a promotion record with rollback state. Health must not treat empty-200 as success after policy cycles.",
    verification:
      "FLEET_LAWS.md names 'OEM bankai Lenovo 6349→0 blind soak' as a Law 1 specimen and 'oem-radar bankai soaks operated outside any record until Phase 2A' as a Law 8 specimen. This Handbook does not contain the raw soak database; claims beyond those documents are marked inferred.",
    residualRisk:
      "Any new Clank that reports HEALTHY on HTTP success can hide zero recall. Mission tests are still easy to forget because they do not look like unit tests.",
    architecturalLesson:
      "Software can be correct while the mission fails. A test suite answers the questions it was asked. Recall, region coverage, and editorial usefulness are different questions — write them down or they will be silently skipped.",
    evidence: [
      {
        id: "ev-law1",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "FLEET_LAWS.md",
        note: "Law 1 specimens include OEM bankai Lenovo 6349→0 blind soak.",
        status: "verified",
      },
      {
        id: "ev-law8",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "FLEET_LAWS.md",
        note: "Law 8: oem-radar bankai soaks operated outside any promotion record until Phase 2A.",
        status: "verified",
      },
      {
        id: "ev-law3",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "FLEET_LAWS.md",
        note: "Law 3 health honesty: HTTP success without useful output is not healthy. Related specimens: FGT 200+0=ok; SK hynix HOST-BLOCKED.",
        status: "verified",
      },
    ],
    conceptIds: ["mission-fail", "tests-prove", "false-negative", "health-check", "source-gap", "baseline", "recall", "soak", "promotion-gate"],
    lawIds: ["law-1", "law-8", "law-3"],
    historyIds: ["h-expansion-scars", "h-phase0-freeze", "h-fleet-laws"],
    lab: true,
    probes: [
      { id: "p-tests", label: "Did the unit/soak tests pass?", finding: "Passing tests are the wrong success criterion for recall. They do not prove Lenovo would have been caught.", status: "inferred" },
      { id: "p-recall", label: "What was useful recall on the named case?", finding: "Law 1 specimen: 6349→0. BANKAI merge 410313b cites a 0/50 editorial recall benchmark as D-01 evidence.", status: "verified" },
      { id: "p-promo", label: "Is there a promotion record for the soak?", finding: "Not until Phase 2A (Law 8).", status: "verified" },
      { id: "p-health", label: "Could HTTP success have stood in for recall?", finding: "Law 3: empty-but-200 is not healthy. L-OEM-003 names operational health ≠ newsroom recall.", status: "verified" },
    ],
  },
  {
    id: "inc-volume-loss",
    title: "Live volumes deleted: restore vs new epoch",
    dateRange: "2026-08-23",
    systems: ["smartwatch-clank", "feature-phone-clank", "Docker volumes", "motherclank continuity"],
    complexity: "multi-layer",
    epistemic: "verified",
    context:
      "Two incident families share the 22–23 August window. Family A is MATERIALIZATION_GAP. Family B is storage destruction. They must not be conflated. Continuity (ADR-0006) is orthogonal to health and to liveness.",
    symptom:
      "smartwatch_clank_staging_data destroyed 2026-08-23T21:22:08Z; feature_phone_clank_staging_data 21:22:11Z. Smartwatch restored 22:09Z from 2026-08-18T20:50:37Z backup. Feature-phone: no backup → NEW_EPOCH at 21:36:11Z.",
    competingHypotheses: [
      "Both Clanks suffered the same failure and should be described the same way (one 'outage').",
      "The restored Smartwatch database is a new epoch because the file is new on disk.",
      "Feature Phone's later HMD ReadTimeout is part of the volume-loss incident.",
      "Two families: SW = RESTORED_HISTORY + GAP_KNOWN; FPC = NEW_EPOCH. Organic recovery narratives are forbidden.",
    ],
    diagnosis:
      "Destructive operator error (DATA_SURVIVABILITY R2). Smartwatch kept lineage with a ~3 day 13 hour gap (impact-map correction; earlier '4 days' was rounded). Feature Phone pre-incident history is irrecoverable. Motherclank must qualify any HEALTHY/recovery reading in the window.",
    rootCause:
      "Live volumes were deleted. Pattern-derived names and ordinary container hygiene were treated as sufficient authorization (the gap ADR-0007 later names).",
    contributingCauses: [
      "Feature Phone had no backup. Smartwatch's backup was 18 August — restorable, not current.",
      "Off-host copies, where they later existed, were temporary_scratch (GIC-18).",
      "Family A silence in the same window made it tempting to tell one story instead of two.",
    ],
    causalChain: [
      "Volumes treated as ordinary files.",
      "Destructive command removes staging data for two Clanks within three seconds.",
      "FPC collector creates a fresh DB → NEW_EPOCH, baseline must suppress novelty.",
      "SW restored from older backup → apparent rewind if read organically.",
      "Without ContinuityEvent records, Motherclank would narrate a market crash then a miracle recovery.",
    ],
    blastRadius:
      "Irreplaceable observational memory on two lanes. QC on affected lanes unmeasurable (UNKNOWN, not zero). Other lanes' backup posture remained UNKNOWN.",
    remediation:
      "ADR-0006 ContinuityEvent registry; ADR-0007 destructive-operation safety; golden incidents DB-LOSS-RESTORE / DB-LOSS-NEW-EPOCH; ACT-011 live restore drills 24 August.",
    verification:
      "ACT-011 LIVE/VERIFIED: Smartwatch RP1 516 runs, 52,126 observations, integrity_check=ok, disposable-volume restore passed. Feature-phone epoch-2 first RP: integrity ok, restore passed. Durable off-host still NO.",
    residualRisk:
      "Most other lanes still have UNKNOWN backup posture. Feature Phone new epoch has no durable off-host copy. Acceptance test 'Claude deletes the volume again' remains DESIGNED for most lanes.",
    architecturalLesson:
      "A restored database is not a rewind of the world. A blank new epoch is not a market crash. Continuity is a first-class dimension, not a story you infer from row counts.",
    evidence: [
      {
        id: "ev-inc-23-vol",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "DECISION_LEDGER.md",
        note: "INC-20260823. Seed: motherclank continuity/seeds/INC-20260823-volume-loss.jsonl.",
        status: "verified",
      },
      {
        id: "ev-impact-b-vol",
        kind: "report",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "audits/INCIDENT_IMPACT_MAP_2026-08-23.md",
        sha: "3369cf7ec04a2daa4c1814f571fa9d972e9a5851",
        note: "Family B states A–E. SW loss ≈ 3d 13h. Tablet INTENTIONALLY_DORMANT correction. Host var/ confirmation BLOCKED.",
        status: "verified",
      },
      {
        id: "ev-act011-vol",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "DATA_SURVIVABILITY.md",
        note: "§17.1 ACT-011 LIVE/VERIFIED. Off-host copies temporary_scratch. Durable gate OPEN.",
        status: "verified",
      },
    ],
    conceptIds: ["epoch", "volume", "rollback", "blast-radius", "authoritative-state", "verification", "baseline"],
    lawIds: ["law-1"],
    historyIds: ["h-volume-loss", "h-act011"],
    lab: true,
    probes: [
      { id: "p-same", label: "Is this the same incident as the 36-hour silence?", finding: "No. Family A is pre-exec; Family B is storage destruction. Shared window, different physics.", status: "verified" },
      { id: "p-sw-epoch", label: "Did Smartwatch start a new epoch?", finding: "No. Restored lineage, GAP_KNOWN. Treating restore as NEW_EPOCH would invent a second birth.", status: "verified" },
      { id: "p-fpc", label: "What happened to Feature Phone history?", finding: "Entirely irrecoverable. Epoch fpc-epoch-2 begins 2026-08-23T21:36:11Z.", status: "verified" },
      { id: "p-hmd", label: "Is the later HMD ReadTimeout part of this?", finding: "No. Ordinary source failure after repair. Do not fold it into volume loss.", status: "verified" },
    ],
  },
  {
    id: "inc-dual-scheduler",
    title: "Two clocks on one notebook",
    dateRange: "2026-08-21 (codified); lineage through Law 5 specimens",
    systems: ["smartwatch-clank", "watch-clank", "semiconductor-intelligence"],
    complexity: "simple-operational",
    epistemic: "verified",
    context:
      "Law 5: exactly one enabled scheduling mechanism per Clank-lane; experimental lanes must not reach production channels. A second timer is not a backup — it is a second author of history.",
    symptom:
      "Smartwatch dual-lane: a failing systemd soak timer fired hourly with zero observability (journal 2026-08-21T20:12:44Z) while cron also scheduled the collector. Retired 2026-08-21T21:06Z; cron kept as sole scheduler.",
    competingHypotheses: [
      "The failing timer is harmless because cron is the 'real' scheduler.",
      "A second timer is useful redundancy if one clock dies.",
      "The experimental soak was isolated because it lived in a different unit file.",
      "Two enabled mechanisms on one lane double-notify, starve each other, or hide which path actually ran.",
    ],
    diagnosis:
      "Dual scheduler authority. The failing timer was unobservable (Law 3 specimen) and the experimental soak could reach production Samsung collectors until e9a897c made scope explicit. Watch fcb5e91 ghost cron and SemInt wrong-app installer / cron bypassing OperationalScheduler are the sibling specimens.",
    rootCause:
      "More than one enabled scheduling mechanism was allowed to target the same lane without a structural fence.",
    contributingCauses: [
      "Health checks that watched either clock, not 'exactly one'.",
      "Soak and production sharing collectors (scope not explicit).",
      "Stale unit files that look like authority (Tablet later encoded as INTENTIONALLY_DORMANT so a leftover soak.service is not a second clock).",
    ],
    causalChain: [
      "A soak timer is installed beside production cron.",
      "The soak timer starts failing; nobody has a single query that shows it.",
      "Both mechanisms can still invoke collectors.",
      "Experimental work reaches production paths.",
      "Phase 2A retires the systemd timer 2026-08-21T21:06Z and writes Law 5.",
    ],
    blastRadius:
      "Smartwatch lane (dual invocation, unobservable failure). Pattern repeats on Watch (ghost cron) and SemInt (cron bypassing the registered scheduler).",
    remediation:
      "Law 5 + GIC-24. Smartwatch: cron sole scheduler. Tablet: stale unit file ⇒ INTENTIONALLY_DORMANT, never MISSING_RUN. Feature-phone multi-host is compliant only because DB+lock+volume are proven disjoint.",
    verification:
      "FLEET_LAWS.md Law 5 names the 2026-08-21T21:06Z retirement. Golden incident GIC-24 dual scheduler authority is executable.",
    residualRisk:
      "A single authorized scheduler whose pre-exec fails is a different incident (MATERIALIZATION_GAP). Dashboard auto-crawl that shares a production webhook is a Law 5 cousin (oem-radar 4e585ac fail-closed the default).",
    architecturalLesson:
      "Redundant clocks are not safety. They are two authors. Count enabled mechanisms per lane, not unit files on disk.",
    evidence: [
      {
        id: "ev-law5-dual",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "FLEET_LAWS.md",
        sha: "d046d54428b1e9dfdb63b8336959df955dd6820a",
        note: "Law 5: smartwatch dual-lane (cron kept, systemd retired 2026-08-21T21:06Z). Specimens: watch fcb5e91 ghost cron; SemInt wrong-app installer.",
        status: "verified",
      },
      {
        id: "ev-gic24",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "GOLDEN_INCIDENT_CORPUS.md",
        note: "GIC-24 dual scheduler authority per lane — executable.",
        status: "verified",
      },
    ],
    conceptIds: ["scheduler", "cron", "systemd", "configuration-drift"],
    lawIds: ["law-5", "law-3"],
    historyIds: ["h-dual-scheduler", "h-fleet-laws"],
    lab: true,
    probes: [
      { id: "p-count", label: "How many enabled schedulers did the Smartwatch lane have?", finding: "Two: cron plus a failing systemd soak timer, until 21:06Z 21 Aug.", status: "verified" },
      { id: "p-obs", label: "Was the failing timer visible in one query?", finding: "No. Law 3 specimen: hourly fire, zero observability, journal 2026-08-21T20:12:44Z.", status: "verified" },
      { id: "p-tablet", label: "Does a leftover unit file always count as a second scheduler?", finding: "No. Tablet soak.service is stale; policy=RETIRED ⇒ INTENTIONALLY_DORMANT, never MISSING_RUN.", status: "verified" },
    ],
  },
  {
    id: "inc-health-honesty",
    title: "HTTP 200, zero useful output, dashboard green",
    dateRange: "Codified 2026-08-22; SK hynix blocked since 2026-08-10; DEF-M1.5 2026-08-22",
    systems: ["korean-tech-wire", "free-game-tracker", "smartphone-clank", "diagnostic-clank", "motherclank"],
    complexity: "multi-layer",
    epistemic: "verified",
    context:
      "Law 3: HTTP success without useful output is not healthy after policy cycles. Blocked sources surface BLOCKED. A mapper that upgrades UNKNOWN/PARTIAL into HEALTHY launders a lie. Motherclank's first synthesis found this in its own adapters (DEF-M1.5).",
    symptom:
      "Several dialects of the same lie: KTW dashboard HEALTHY-iff-ever-succeeded; FGT 200+0=ok; SK hynix RSS 403 from Hetzner since 2026-08-10 (host block, not parser defect); smartphone adapter ordered runs by UUID-string id producing false-STALE.",
    competingHypotheses: [
      "The source is empty, so HEALTHY is correct (legitimate zero / GIC-02).",
      "HTTP 200 means the collector did useful work.",
      "If the process is up, the mission is up (single-plane health).",
      "Empty-but-200, HOST-BLOCKED, and UUID-ordered 'latest run' are different mechanics that all violate health honesty.",
    ],
    diagnosis:
      "Health was being inferred from the wrong plane: transport success, historical success, or lexical run order. DEF-M1.5 is the dogfood: Motherclank trusted adapter-mapped run order and a shared status mapper that lacked SUCCESS/PARTIAL/ZERO_ITEMS/BLOCKED.",
    rootCause:
      "No invariant that empty-but-200, blocked, and UNKNOWN cannot be displayed as HEALTHY. Run order was not time.",
    contributingCauses: [
      "Dashboards that remembered a past success (HEALTHY-iff-ever-succeeded).",
      "Lexical UUID ordering is not recency.",
      "A mapper allowed to upgrade a weaker status into a stronger one.",
    ],
    causalChain: [
      "A fetch returns 200 with no usable items, or 403 from the host, or runs sorted by id.",
      "Dashboard or adapter classifies HEALTHY / STALE incorrectly.",
      "Operators stop looking. Mission recall can be zero while the light is green.",
      "Phase 2A writes Law 3. DEF-M1.5 adds UUID-trap + never-upgrade regressions the same day Motherclank first synthesised.",
    ],
    blastRadius:
      "Any Clank whose health UI treats ping as purpose. Specifically KTW blocked SK hynix appearing historically healthy; FGT empty-ok; smartphone false-STALE (and the inverse false-HEALTHY risk).",
    remediation:
      "Law 3. diagnostic-clank 97b07ae UUID-trap + never-upgrade. Adapter must not display blocked streaks as healthy by history. ZERO_ITEMS is not HEALTHY.",
    verification:
      "DECISION_LEDGER DEF-M1.5 CLOSED. FLEET_LAWS.md Law 3 specimens. Never-upgrade property tests become a Motherclank invariant.",
    residualRisk:
      "A legitimate zero (GIC-02) and NO_WORK_DUE (GIC-06) must remain distinguishable from MATERIALIZATION_GAP and from BLOCKED. L-SMART-001 (traversal success, extraction zero) remains OPEN with unknown root cause.",
    architecturalLesson:
      "Health is a claim about useful work, not about sockets. A supervisor that cannot keep UNKNOWN as UNKNOWN will invent a healthier fleet than exists.",
    evidence: [
      {
        id: "ev-law3-hh",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "FLEET_LAWS.md",
        note: "Law 3 specimens: SK hynix HOST-BLOCKED; FGT 200+0=ok; KTW HEALTHY-iff-ever-succeeded; smartwatch failing timer lane.",
        status: "verified",
      },
      {
        id: "ev-def-m15-hh",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "DECISION_LEDGER.md",
        sha: "b300b36e1f9c257b0c90331f5977ceea58103dfc",
        note: "DEF-M1.5 CLOSED: UUID-string id ordering; shared mapper lacked fleet vocabularies.",
        status: "verified",
      },
    ],
    conceptIds: ["health-check", "dual-plane-health", "false-positive", "runtime-provenance", "source-gap"],
    lawIds: ["law-3"],
    historyIds: ["h-def-m15", "h-expansion-scars"],
    lab: true,
    probes: [
      { id: "p-200", label: "Does HTTP 200 prove useful output?", finding: "No. FGT 200+0=ok is a Law 3 specimen. Empty-but-200 is a blank page.", status: "verified" },
      { id: "p-blocked", label: "Is SK hynix a parser bug?", finding: "No. RSS 403 from Hetzner since 2026-08-10. Host block. Must surface BLOCKED, not a healthy zero.", status: "verified" },
      { id: "p-uuid", label: "Why was smartphone called STALE when it wasn't?", finding: "Adapter ordered runs by UUID-string id. Lexical order ≠ time. Inverse risk: false-HEALTHY.", status: "verified" },
    ],
  },
  {
    id: "inc-deployed-sha",
    title: "Repo HEAD is not the running host",
    dateRange: "Portability phase 2026-08-08–19; Law 6/9 codified 2026-08-22; CTW dogfood 2026-08-24",
    systems: ["korean-tech-wire", "semiconductor-intelligence", "chinese-tech-wire", "free-game-tracker"],
    complexity: "simple-operational",
    epistemic: "verified",
    context:
      "Law 6: every deployment row carries exact SHA or artifact digest evidenced on host; missing stays UNKNOWN. Law 9 (deferred): default branch must not trail production longer than one review cycle. CTW dogfood caught a guessed refresh path that review could not see.",
    symptom:
      "People treated GitHub main, host HEAD, and the running image as one object. Specimens: KTW main-behind-production (healed on GitHub by merge; host may still trail); SemInt d43481f claim-vs-ledger contradiction; CTW checkout-relative refresh path never existed — live store was a differently-named Docker volume.",
    competingHypotheses: [
      "If CI is green on main, production is that SHA.",
      "If I pull on the host, the container is updated.",
      "The database filename in the registry is the live datastore.",
      "Three copies (origin/main, host checkout, running artifact/volume) can disagree on the same afternoon, and UNKNOWN is the honest cell.",
    ],
    diagnosis:
      "Provenance was optional. Guessing the SHA because 'it is probably main' is a lie. CTW additionally showed that a refresh script which silently SKIPs a missing path will hide drift from review.",
    rootCause:
      "No requirement that a deployment row carry host-evidenced identity. Registry filenames were allowed to drift from live inner names.",
    contributingCauses: [
      "Portability (laptop → NAS → Hetzner → Docker) multiplied copies.",
      "Law 9 still deferred because inventory machinery to enforce convergence did not exist at codification.",
      "Refresh scripts that skip instead of fail.",
    ],
    causalChain: [
      "A collector is copied onto a host and into a volume.",
      "GitHub moves. The host may not. The volume almost certainly does not.",
      "An agent or operator reports 'we're on main'.",
      "CTW dogfood: guessed path, silent SKIP, live volume has another name.",
      "Anil's follow-up commit 7f977d6 makes the cross-check a playbook step.",
    ],
    blastRadius:
      "Any claim about 'current production behaviour' that cites only a GitHub SHA. FGT local checkout newsroom.db mistaken for the container volume (STALE-STORE).",
    remediation:
      "Law 6. ONBOARDING.md step 8: cross-check registry filename, refresh-script source path, and actual deployed datastore. UNKNOWN is allowed.",
    verification:
      "CTW_ONBOARDING_DOGFOOD.md + Anil commit 7f977d6. FLEET_LAWS.md Law 6/9 specimens. This Handbook still treats live host SHA as UNKNOWN where not re-probed.",
    residualRisk:
      "Windows UNKNOWN. Law 9 unenforced. A SHA that is real but whose mission failed (BANKAI) is still a failed mission.",
    architecturalLesson:
      "A commit existing in Git does not prove production is running it. Checkout HEAD, remote main, deployed image, and DB epoch are four realities.",
    evidence: [
      {
        id: "ev-law6-sha",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "FLEET_LAWS.md",
        note: "Law 6 specimens: FGT pre-cec0346 hashed snapshots; SemInt d43481f claim-vs-ledger; KTW deployed-SHA env-fallback.",
        status: "verified",
      },
      {
        id: "ev-ctw-path",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "CTW_ONBOARDING_DOGFOOD.md",
        sha: "64f92aa42f233ed189c8c6cb10f550b8dfd77b11",
        note: "Friction: FGT registry db filename drifted; guessed CTW refresh path never existed.",
        status: "verified",
      },
      {
        id: "ev-anil-cross",
        kind: "commit",
        repo: "anil-ganti-nbc/clank-architecture",
        sha: "7f977d6bc5d4839a6f89c7dc7b87cf5fdefa89a5",
        note: "Anil: codify registry/refresh-path/live-datastore cross-check after CTW guessed path.",
        status: "verified",
      },
    ],
    conceptIds: ["head-vs-deployed", "provenance", "origin-main", "env-var", "deployment-drift", "dogfooding"],
    lawIds: ["law-6", "law-9"],
    historyIds: ["h-portability", "h-ctw-dogfood", "h-current-gaps", "h-watch-unwired"],
    lab: true,
    probes: [
      { id: "p-three", label: "Which copy are we talking about?", finding: "origin/main, host HEAD, and running image/volume are three objects. Law 6: missing stays UNKNOWN.", status: "verified" },
      { id: "p-skip", label: "Would review have seen the guessed CTW path?", finding: "No. Refresh silently SKIPs a missing source. Caught only by live host discovery.", status: "verified" },
      { id: "p-fgt", label: "Is newsroom.db in the git checkout production?", finding: "No. STALE-STORE: container volume is production. Local file is a leftover.", status: "verified" },
    ],
  },
  {
    id: "inc-writer-lock",
    title: "Dashboard thread vs collector: one SQLite, two speakers",
    dateRange: "Codified 2026-08-22 as Law 7 specimen (FGT DB Eradication)",
    systems: ["free-game-tracker", "korean-tech-wire", "watch-clank"],
    complexity: "simple-operational",
    epistemic: "verified",
    context:
      "Law 7: all writers of one SQLite database share one cross-process lock — dashboard paths included. A web button is a writer. SQLite became authoritative state, which made the lock a safety device rather than a nicety.",
    symptom:
      "FGT 'DB Eradication' purge incident. Violators at codification: FGT /api/run threading.Lock bypass; KTW feedback POST bypasses RunLock (later repaired in M4.5-ACT / 6e95c29). DiagnosticBench L-WATCH-001 is shared SQLite writer contention.",
    competingHypotheses: [
      "The dashboard is read-only, so it does not need the collector's lock.",
      "A Python threading.Lock is enough because everything is one process.",
      "QC feedback writes are tiny, so they cannot race the collector.",
      "Any path that writes the file — including a browser POST — must take the same cross-process lock.",
    ],
    diagnosis:
      "Writer coordination was per-process or per-feature, not per-file. threading.Lock does not coordinate with another process (the scheduled collector). A feedback POST is a writer even if the human thinks they are 'just clicking'.",
    rootCause:
      "Dashboard and scheduled runs did not share one cross-process lock on the same SQLite file.",
    contributingCauses: [
      "SQLite's convenience (a file you can write from anywhere) without the corresponding discipline.",
      "QC activation (M4.5) adding new write paths after the original collector lock existed.",
    ],
    causalChain: [
      "Collector holds (or should hold) a file lock during a run.",
      "A dashboard or feedback POST writes without that lock.",
      "SQLite sees two writers. Pages tear. The 'DB Eradication' specimen is the named scar.",
      "Law 7 + later KTW RunLock on feedback writes.",
    ],
    blastRadius:
      "The authoritative notebook for that Clank. Not 'just a cache'. FGT facts and KTW dispositions.",
    remediation:
      "Law 7. KTW feedback writes take RunLock (M4.5-ACT). Watch run_lock with stale reclaim is the reference. OEM Radar WAL single-writer-by-construction is an allowed exception.",
    verification:
      "FLEET_LAWS.md Law 7. M4.5-ACT ledger row. Exact FGT purge logs are not in this Handbook checkout — claims beyond the named specimen stay at the law text (verified as a specimen, incomplete as a blow-by-blow).",
    residualRisk:
      "A single writer deleting the volume is survivability, not Law 7. Schema drift (GIC-14) is a different plane. New dashboard buttons will reproduce this if they skip the lock.",
    architecturalLesson:
      "When SQLite is memory, the lock is the talking stick. A web request is a speaker.",
    evidence: [
      {
        id: "ev-law7-lock",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "FLEET_LAWS.md",
        note: "Law 7 specimen: FGT DB Eradication. Violators: FGT /api/run threading.Lock bypass; KTW feedback POST bypasses RunLock.",
        status: "verified",
      },
      {
        id: "ev-m45-lock",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "DECISION_LEDGER.md",
        note: "M4.5-ACT: KTW feedback writes now take the collector RunLock.",
        status: "verified",
      },
    ],
    conceptIds: ["lock", "database", "race-condition", "sqlite-authoritative", "sqlite"],
    lawIds: ["law-7"],
    historyIds: ["h-sqlite-authoritative", "h-fleet-laws", "h-watch-qc-race"],
    lab: true,
    probes: [
      { id: "p-thread", label: "Is threading.Lock enough?", finding: "No. It does not coordinate with another process. The scheduled collector is another process.", status: "verified" },
      { id: "p-click", label: "Is a QC click a writer?", finding: "Yes. KTW feedback POST was a Law 7 violator until M4.5-ACT.", status: "verified" },
      { id: "p-wal", label: "Is every Clank required to use the same lock library?", finding: "No. OEM Radar WAL single-writer-by-construction is an allowed exception. The invariant is one authority per file.", status: "verified" },
    ],
  },
  {
    id: "inc-directory-sweep",
    title: "A folder listing is not a fleet",
    dateRange: "Archaeology / ADR-0005 2026-08-24; GIC-21",
    systems: ["tablet-clank", "diagnostic-clank", "motherclank"],
    complexity: "simple-operational",
    epistemic: "verified",
    context:
      "L-FLEET-001 / GIC-21: directory sweep mistaken for inventory. Membership must come from a registry/manifest, not from whatever checkouts happen to sit on disk. Tablet Clank has no production members and no alerts by original design.",
    symptom:
      "A filesystem walk that looked for Clank checkouts omitted Tablet — or, inversely, a stale tablet-clank-soak.service could be read as a live member. Both errors come from treating presence-on-disk as membership.",
    competingHypotheses: [
      "If the repo is on the host, it is in the fleet.",
      "If a systemd unit file exists, the Clank is scheduled.",
      "Omission from a directory listing means the Clank does not exist.",
      "Fleet membership is a declared registry row. Stale artifacts prove nothing. Retired policy is INTENTIONALLY_DORMANT, never MISSING_RUN.",
    ],
    diagnosis:
      "Inventory was being inferred from filesystem shape. Tablet is the specimen that breaks both directions: it can be omitted from a sweep, and its leftover unit file can be mistaken for a live scheduler.",
    rootCause:
      "No mandatory distinction between 'files exist' and 'this instance is a registered lane'.",
    contributingCauses: [
      "Heterogeneous checkouts accumulated during the origin week (9–12 Aug).",
      "Diagnostic Clank did not yet own fleet.yaml as the membership authority (it later does, ADR-0001).",
    ],
    causalChain: [
      "Someone lists directories to answer 'which Clanks do we have?'.",
      "Tablet is missing, or a soak unit file is present.",
      "The list is treated as inventory.",
      "GIC-21 / L-FLEET-001: registry, not filesystem. Impact-map Tablet correction: INTENTIONALLY_DORMANT.",
    ],
    blastRadius:
      "Wrong fleet picture. Motherclank would harvest a ghost or skip a real (if dormant) participant. Promotion decisions could be made on a partial set.",
    remediation:
      "fleet.yaml / instance-lane identity (canonical v0.2). GIC-21 executable. Onboarding is a playbook that registers a lane, not a copy into a folder.",
    verification:
      "GOLDEN_INCIDENT_CORPUS GIC-21. conformance GOLDEN_INCIDENTS L-FLEET-001. Impact-map Tablet correction. Diagnostic Clank default branch still named diagnostic-clank-2026-08 — inventory owner, not a collector.",
    residualRisk:
      "Cross-Clank identity ADR still blocking participant profile. A new checkout that is never registered is invisible; a registered lane whose host is gone is a different UNKNOWN.",
    architecturalLesson:
      "The fleet is a declared set of instances, not a pile of folders. Diagnostic Clank exists so membership is a document, not a guess.",
    evidence: [
      {
        id: "ev-gic21",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "GOLDEN_INCIDENT_CORPUS.md",
        note: "GIC-21 directory sweep mistaken for inventory — executable.",
        status: "verified",
      },
      {
        id: "ev-lfleet001",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "conformance/GOLDEN_INCIDENTS.md",
        note: "L-FLEET-001 directory sweep omits Tablet. Required invariant: registry/manifest is fleet membership.",
        status: "verified",
      },
      {
        id: "ev-tablet-dorm",
        kind: "report",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "audits/INCIDENT_IMPACT_MAP_2026-08-23.md",
        note: "Tablet correction: no active scheduler by design. Stale soak.service ⇒ INTENTIONALLY_DORMANT, never MISSING_RUN.",
        status: "verified",
      },
    ],
    conceptIds: ["diagnostic-clank", "contract", "configuration-drift", "host"],
    lawIds: ["law-5"],
    historyIds: ["h-diagnostic-clank", "h-archaeology", "h-tablet-local"],
    lab: true,
    probes: [
      { id: "p-ls", label: "Does ls of the host prove membership?", finding: "No. L-FLEET-001: directory sweep omitted Tablet. Registry is membership.", status: "verified" },
      { id: "p-unit", label: "Does a unit file prove the Clank is scheduled?", finding: "No. Tablet soak.service is leftover. Application refuses retired config.", status: "verified" },
      { id: "p-why-dc", label: "Why Diagnostic Clank exists", finding: "Someone had to know which Clanks existed, on which host, at which SHA, without taking their locks.", status: "verified" },
    ],
  },
];
