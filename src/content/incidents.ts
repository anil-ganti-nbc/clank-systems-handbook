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
    conceptIds: ["scheduler", "systemd", "root-cause", "contributing-cause", "health-check", "schedule-latency", "observability"],
    probes: [
      { id: "p-timer", label: "Did the timer/cron unit fire?", finding: "Yes — elapsed times still looked populated.", status: "verified" },
      { id: "p-proc", label: "Did a collector process start?", finding: "No. Pre-exec redirect failure. This is GIC-04, not GIC-12.", status: "verified" },
      { id: "p-logs", label: "Who owns logs/?", finding: "Recreated by stash -u as root:root, breaking cron redirects.", status: "verified" },
      { id: "p-zero", label: "Was this a legitimate zero?", finding: "No. Work never started, so ZERO_ITEMS would have been a lie.", status: "inferred" },
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
    conceptIds: ["first-seen", "qc-flood", "runtime-provenance", "baseline", "false-positive", "backpressure", "region-gap"],
    probes: [
      { id: "p-budget", label: "What max_items did the run persist?", finding: "Validation runs were bounded; qualification ignored that and used counts.", status: "verified" },
      { id: "p-fs", label: "Do FIRST_SEEN events carry recency evidence?", finding: "Flood class scored 15; every useful FS in history scored ≥ 25.", status: "verified" },
      { id: "p-queue", label: "Which queue are we counting?", finding: "Raw 639 ≠ default FIFO 580 ≠ post-repair 41.", status: "verified" },
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
    conceptIds: ["mission-fail", "tests-prove", "false-negative", "health-check", "source-gap", "baseline"],
    probes: [
      { id: "p-tests", label: "Did the unit/soak tests pass?", finding: "Passing tests are the wrong success criterion for recall. They do not prove Lenovo would have been caught.", status: "inferred" },
      { id: "p-recall", label: "What was useful recall on the named case?", finding: "Law 1 specimen: 6349→0.", status: "verified" },
      { id: "p-promo", label: "Is there a promotion record for the soak?", finding: "Not until Phase 2A (Law 8).", status: "verified" },
    ],
  },
];
