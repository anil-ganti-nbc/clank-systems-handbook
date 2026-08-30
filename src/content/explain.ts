import type { ExplainPrompt } from "../lib/handbook/schema.ts";

export const EXPLAIN_PROMPTS: ExplainPrompt[] = [
  {
    id: "ex-pipeline",
    prompt: "Explain how a Clank goes from a code change to production.",
    modelAnswer:
      "Someone changes files in a working tree (often with an agent). That is not production. A commit freezes a SHA. A push updates GitHub (origin). CI may run tests on that SHA. Deployment is a separate act: a host pulls or an image is built and a systemd unit or timer is installed/restarted. Runtime provenance is whatever that process actually loaded. Motherclank may later harvest evidence of that runtime; it does not deploy.",
    checklist: [
      "Named working tree vs commit vs origin vs deployed artifact",
      "Did not treat push as deploy",
      "Mentioned tests/CI as optional evidence, not as runtime",
      "Left room for drift (HEAD ≠ running code)",
    ],
    conceptIds: ["commit", "push", "deployment", "head-vs-deployed", "ci"],
  },
  {
    id: "ex-sha",
    prompt: "What does a commit SHA prove, and what does it not prove?",
    modelAnswer:
      "It proves that a particular snapshot (tree + parents + message) existed. It does not prove a host has that checkout, that a container digest matches, that tests passed, that a timer is enabled, or that the mission (recall, coverage) succeeded.",
    checklist: [
      "Fingerprint of a snapshot",
      "Not a host checkout",
      "Not a passing test suite",
      "Not mission success",
    ],
    conceptIds: ["sha", "tests-prove", "provenance"],
  },
  {
    id: "ex-sha-not",
    prompt: "What does a SHA not prove?",
    modelAnswer:
      "It does not prove production is running it. Watch tissot/timex_uk existed as SHAs in the registry and still could not be scheduled until the production invocation chain was wired (e7eeb3f). A SHA also does not prove tests passed, that SQLite is that epoch, or that recall is non-zero (BANKAI).",
    checklist: ["Not production", "Not tests", "Not epoch", "Not recall"],
    conceptIds: ["sha", "head-vs-deployed", "recall"],
  },
  {
    id: "ex-head",
    prompt: "What is HEAD? Explain HEAD, origin/main, and deployed code to a non-programmer.",
    modelAnswer:
      "HEAD is the page you have open in your local copy. origin/main is the page the shared library (GitHub) currently calls official, as of the last time you asked. Deployed code is the book actually on the printing press. They can be three different editions on the same afternoon. The code you were looking at was not necessarily the code the server was actually running.",
    checklist: [
      "Three copies",
      "Human metaphor without claiming they stay in sync",
      "Tied to a Clank/host example if possible",
    ],
    conceptIds: ["head", "main", "origin", "deployment-drift"],
  },
  {
    id: "ex-origin-main",
    prompt: "What is origin/main?",
    modelAnswer:
      "origin is the nickname for the GitHub remote. origin/main is the last-seen position of that remote's main branch after fetch. It is not HEAD (your checkout) and not production (the running artifact). Law 9's first specimen: KTW main lagged production until a Phase 2A merge; the host checkout could still trail after GitHub healed.",
    checklist: ["Remote nickname", "Not HEAD", "Not production", "Fetch updates the last-seen pointer"],
    conceptIds: ["origin-main", "origin", "main", "fetch"],
  },
  {
    id: "ex-prov",
    prompt: "What is provenance and why did this ecosystem need it?",
    modelAnswer:
      "Provenance is the footnote: run id, source, code revision. Runtime provenance is how the run was invoked (budget, scheduler, SHA actually loaded). The QC flood happened when people reconstructed intent from result shape. Law 6: missing stays UNKNOWN, it does not become a guessed SHA. CTW dogfood caught a guessed refresh path that review could not see.",
    checklist: [
      "Origin of a fact",
      "Runtime vs repo",
      "UNKNOWN is allowed",
      "Why Clanks specifically (QC flood / CTW / Law 6)",
    ],
    conceptIds: ["provenance", "runtime-provenance"],
  },
  {
    id: "ex-regression",
    prompt: "What is a regression?",
    modelAnswer:
      "A behaviour that used to be correct (or a bug that used to be fixed) and is now wrong again. Fleet Laws name specimens that must never recur: FGT DB eradication, Timex FIRST_SEEN flood, dual scheduler lanes. A regression test is a museum label. Loosening the test deletes the memory.",
    checklist: ["Used to be fixed", "Named a Clank specimen", "Did not confuse it with rollback"],
    conceptIds: ["regression", "regression-test"],
  },
  {
    id: "ex-rollback",
    prompt: "What is a rollback?",
    modelAnswer:
      "Return an environment to a previous known artifact or data epoch. Motherclank rollback: disable the user timer and delete derived snapshots — Clank DBs stay put. Smartwatch volume restore is RESTORED_HISTORY with a known gap, not a rewind of the world. Feature Phone after total loss is NEW_EPOCH, which is not a rollback because there is nothing to roll back to.",
    checklist: ["Previous known state", "Not 'delete the crime scene'", "Restore vs new epoch"],
    conceptIds: ["rollback", "epoch"],
  },
  {
    id: "ex-ci",
    prompt: "What does CI do?",
    modelAnswer:
      "Continuous Integration reruns the project's encoded checks (typecheck, tests, lint, build) on each push or PR so humans do not have to remember. It is a robot exam. It does not deploy, it does not start timers, and it does not prove mission recall. oem-radar adopted the Fleet Laws conformance suite as CI (caf7909) without modifying production collectors.",
    checklist: ["Automated checks on push/PR", "Not deploy", "Only the questions encoded"],
    conceptIds: ["ci", "test-suite"],
  },
  {
    id: "ex-600",
    prompt: "What does a passing test suite prove? How can 600 passing tests coexist with zero useful recall?",
    modelAnswer:
      "Tests prove the assertions they encode. If nobody wrote an assertion that 'the Lenovo soak must recall the story', a green suite is compatible with 6349→0. Health checks that treat HTTP success as HEALTHY make the lie operational. BANKAI is the specimen: machinery ran, mission failed. Watch's 468 passed on 27 August proves those 468 assertions at that SHA, not that Hetzner is running it.",
    checklist: [
      "Tests answer asked questions only",
      "Mission metrics are a different plane",
      "Referenced BANKAI or Law 3",
    ],
    conceptIds: ["tests-prove", "mission-fail", "health-check"],
  },
  {
    id: "ex-healthy-useless",
    prompt: "Why can a system be healthy but useless?",
    modelAnswer:
      "Because health was inferred from the wrong plane: transport success, historical success, or a live PID. FGT 200+0=ok, SK hynix HOST-BLOCKED appearing historically healthy, DEF-M1.5 UUID-ordered false-STALE (and the inverse false-HEALTHY risk), BANKAI 6349→0. Dual-plane health: the engine light is green, the newspaper is still blank. Law 3 exists so empty-but-200 cannot keep the dashboard calm.",
    checklist: ["Wrong plane of health", "Named a Clank specimen", "Did not treat ping as purpose"],
    conceptIds: ["dual-plane-health", "health-check", "mission-fail"],
  },
  {
    id: "ex-dogfood",
    prompt: "What is dogfooding?",
    modelAnswer:
      "Using a system or tool you built as part of building, testing, operating, or improving that same ecosystem. CTW onboarding was the first real v0.3 dogfood of the observer playbook: live host discovery found a guessed refresh path and a drifted FGT filename that review could not see. DEF-M1.5 is Motherclank dogfooding itself. ACT-011 is the operator dogfooding restore.",
    checklist: ["Use your own system on purpose", "Named a Clank example", "Caught something review missed"],
    conceptIds: ["dogfooding", "operator-role"],
  },
  {
    id: "ex-mother",
    prompt: "Why did Motherclank exist? Why did Motherclank become necessary?",
    modelAnswer:
      "Collectors lied in different dialects: timers that fired without starting, HTTP 200 with zero items, dual schedulers, FIRST_SEEN floods, soaks with no promotion record. A read-only harvester (ADR-0002) can photocopy fleet evidence without taking Clank locks, writing DBs, or sending alerts. It exists because local dashboards were not a trustworthy picture of the fleet. M5 mutation is still forbidden.",
    checklist: [
      "Read-only / no remediation",
      "Named at least two failure classes it observes",
      "Did not describe it as a deployer or a chat bot",
    ],
    conceptIds: ["motherclank", "diagnostic-clank", "observability"],
  },
  {
    id: "ex-diagnostic",
    prompt: "What problem did Diagnostic Clank solve?",
    modelAnswer:
      "Someone had to know which Clanks existed, on which host, at which SHA, without taking their locks. A directory listing is not a fleet (GIC-21 / L-FLEET-001 omitted Tablet). Diagnostic Clank owns fleet.yaml and the adapter plane Motherclank consumes. It is not Motherclank, not a collector, and its default branch is still diagnostic-clank-2026-08.",
    checklist: ["Inventory/adapters", "Not Motherclank", "Registry not filesystem"],
    conceptIds: ["diagnostic-clank", "contract"],
  },
  {
    id: "ex-change-to-running",
    prompt: "How does a code change become a running production change?",
    modelAnswer:
      "Edit working tree → stage → commit (SHA) → push to origin → CI → review/PR → merge to main → a human or playbook deploys (pull or image build) → process/timer restarted → the process loads that artifact → you observe it (logs, harvest) → you verify against a named criterion. Stopping after merge leaves production on yesterday's binary. Watch's unwired collectors are the specimen: code and registry without an invocation path.",
    checklist: ["Named the doors in order", "Deploy is a separate act", "Verify is last, not merge"],
    conceptIds: ["lifecycle", "deployment", "runtime-provenance"],
  },
  {
    id: "ex-head-vs-deployed",
    prompt: "Why is deployed code different from repo HEAD?",
    modelAnswer:
      "HEAD is the checkout you are looking at. Deployed code is whatever the running image or process loaded, which changes only when someone builds and restarts. They diverge on merge-without-restart, restart-without-pull, dirty-tree builds, and secret host hotfixes. Law 9 is deferred because the fleet could not yet enforce convergence. Law 6: if you cannot evidence the host SHA, write UNKNOWN.",
    checklist: ["Different objects", "How they diverge", "UNKNOWN not a guessed SHA"],
    conceptIds: ["head-vs-deployed", "deployment-drift"],
  },
  {
    id: "ex-migration",
    prompt: "What is a database migration?",
    modelAnswer:
      "A versioned, usually irreversible change to schema or stored data so old records fit a new form. Watch QC review-mode is three-valued; historical NULL-mode rows stay unspecified — reclassification requires a separately approved migration, not a silent relabel. Feature Phone after volume loss did not 'migrate'; it started NEW_EPOCH. Alembic revisions (smartphone, watch) are how collectors evolve the notebook's form.",
    checklist: ["Schema/data change", "Versioned", "Not the same as epoch loss"],
    conceptIds: ["migration", "schema", "epoch"],
  },
  {
    id: "ex-authoritative",
    prompt: "What does authoritative state mean?",
    modelAnswer:
      "The store whose contents are treated as the truth of a domain. Everything else is a copy or a claim. Clank SQLite is authoritative (ADR-0002). Motherclank snapshots are derived and disposable. Git is the truth of code history, not of what was observed. FGT's checkout newsroom.db is a stale leftover; the container volume is production. If the photocopy disagrees with the notebook, the photocopy is wrong.",
    checklist: ["Original vs copy", "Clank SQLite vs Motherclank", "Git is not observational truth"],
    conceptIds: ["authoritative-state", "derived-state", "sqlite-authoritative"],
  },
  {
    id: "ex-incident",
    prompt: "Explain a Clank incident from symptom to verified repair.",
    modelAnswer:
      "Pick one: (1) MATERIALIZATION_GAP — scheduler activity without a running process, documented as a pre-exec logging/permission failure (GIC-04/ADR-0008); exact host window/syslog remain INCOMPLETE; later oem-radar gitignore 44ce1ac. (2) Watch QC flood — validation runs counted as catalogue passes, FIRST_SEEN ≠ new, 639/580/41 dated 26 Aug at 5de5329. (3) BANKAI — 6349→0 recall with tests/health looking fine, Laws 1 and 8. (4) Volume loss — SW restored with a known gap, FPC NEW_EPOCH; ACT-011 later proved scratch restore, not rewind. Name symptom, competing hypotheses, evidence, root vs contributing, verification, residual risk.",
    checklist: [
      "Symptom",
      "Competing hypotheses",
      "Evidence cited",
      "Root vs contributing",
      "What would count as verification",
    ],
    conceptIds: ["root-cause", "contributing-cause", "verification"],
  },
  {
    id: "ex-ai",
    prompt: "How did AI agents participate in the development process? What was your role?",
    modelAnswer:
      "I used multiple AI agents in a staged engineering workflow. One would implement (ox-alpha drafting ADRs 0006–0014; Claude co-authoring collector repairs), another would audit or review (AGENT_RULES.md: no silent conflict resolution, UNKNOWN is not healthy, no auto-promote), others researched (archaeology/impact maps) or generated tests (Fleet Laws suite, G1–G8), and I acted as the operator and decision-maker. I carried requirements between them, checked evidence, decided whether fixes matched the actual mission, froze promotion, executed ACT-011, and directed testing and deployment. I did not become a programmer; I did not collapse the process into paste.",
    checklist: [
      "Named implementation vs reviewer vs operator",
      "Did not overstate coding",
      "Did not understate decisions/evidence",
      "Tied to a real artefact (ADR, dogfood, ACT-011)",
    ],
    conceptIds: ["implementation-agent", "reviewer-agent", "operator-role"],
  },
  {
    id: "ex-mother-stages",
    prompt: "Walk Motherclank's stages. What does each stage do, and what does the whole camera still not prove?",
    modelAnswer:
      "M0 harvests Diagnostic adapters into hash-chained JSONL (live timer enablement UNKNOWN). M1 synthesizes UNKNOWN-honest health; DEF-M1.5 never-upgrade is the self-dogfood. M2 detects named gaps including MATERIALIZATION_GAP; host var/ for 22–23 Aug was not recovered. M3 recommends into an inbox (ADR-0003), never remediates. M4 may ingest QC dispositions read-only. M5 is forbidden. The camera does not prove collectors are running, that 7cee2f8 is deployed, or that a backup exists. Clank SQLite stays authoritative.",
    checklist: [
      "Named M0–M4 without inventing M5",
      "Read-only / no remediation",
      "Called out at least one UNKNOWN (timer, var/, live SHA)",
      "Did not treat repo HEAD as healthy harvest",
    ],
    conceptIds: ["motherclank", "execution-liveness", "derived-state"],
  },
  {
    id: "ex-diagnostic-vs-mother",
    prompt: "How is Diagnostic Clank different from Motherclank? Why did the fleet need both?",
    modelAnswer:
      "Diagnostic Clank is the membership book and the translation plane: fleet.yaml plus adapters, DiagnosticBench, Agent Inbox. Motherclank is the reader of that language on a clock — a camera that cannot hold the keys. A directory sweep omitted Tablet (L-FLEET-001), so membership had to become a registry. Motherclank growing Clank-name conditionals would eat the architecture. The 3667af0 Tablet adapter is a control-plane commit, not Tablet production. Live Diagnostic deploy SHA is UNKNOWN.",
    checklist: [
      "Inventory/adapters vs harvest",
      "Not the same system",
      "Registry not filesystem",
      "Did not treat Tablet adapter as production",
    ],
    conceptIds: ["diagnostic-clank", "motherclank", "source-adapter"],
  },
  {
    id: "ex-ai-roles",
    prompt: "Name the AI roles that actually existed, and the decisions that stayed with the human.",
    modelAnswer:
      "Implementation agents drafted code and ADRs. Reviewer/auditor agents checked evidence under AGENT_RULES.md. Research agents produced archaeology and impact maps and were allowed to say BLOCKED. Test-generator agents encoded scars as fixtures. Architecture-critic artefacts (v0.3 freeze, deferred Law 9, rejected guessed refresh path) sent drawings back. The operator defined goals, carried requirements across sessions, rejected bad abstractions, requested evidence, compared outputs, chose acceptance criteria, directed deploy, decided when the mission succeeded, and decided when to stop.",
    checklist: [
      "At least three agent roles named",
      "Operator decisions listed, not 'I typed the code'",
      "Neither paste nor hand-coded extreme",
    ],
    conceptIds: ["implementation-agent", "reviewer-agent", "research-agent", "test-generator", "architecture-critic", "operator-role"],
  },
  {
    id: "ex-three-shas",
    prompt: "A Clank card shows an inventory SHA, a repo HEAD, and live UNKNOWN. What is each, and why must you not pick one?",
    modelAnswer:
      "Inventory SHA is what fleet.yaml recorded as deployed_commit_sha on 2026-08-22T22:30:00Z — a dated document, already stale relative to later GitHub pushes. Repo HEAD is what GitHub's default branch points at today; Watch 9d812ed and OEM Radar d720e06 are newer than inventory and still not production. Live deployed SHA is whatever the host process actually loaded, and it stays UNKNOWN until a live probe. Law 6: do not fill live from GitHub. Showing both inventory and HEAD, plus UNKNOWN, is the lesson.",
    checklist: [
      "Three different objects",
      "Inventory is dated",
      "HEAD is not production",
      "UNKNOWN left visible",
    ],
    conceptIds: ["head-vs-deployed", "provenance", "sha"],
  },
  {
    id: "ex-arch-evolution",
    prompt: "Pick one architectural phase and explain it as before → pressure → new abstraction → new rule → result → still unsolved.",
    modelAnswer:
      "Example: Motherclank birth. Before: Fleet Laws on paper, local dashboards as the picture. Pressure: timers firing without starting, 200-with-zero, dual schedulers. Abstraction: a read-only harvester consuming Diagnostic adapters (ADR-0002). Rule: observe/reason/propose, never remediate; Clank SQLite authoritative; M5 forbidden. Result: M0–M4 camera in git. Still unsolved: live timer UNKNOWN, var/ unrecovered, 7cee2f8 is not a health claim. Other valid picks: volume loss → epochs; Phase 0 freeze → laws without a camera; QC flood → catalogue-pass as invocation fact.",
    checklist: [
      "Used the six-part shape",
      "Did not present the layer as fully formed on day one",
      "Left an unresolved limitation",
      "Cited a real artefact or incident",
    ],
    conceptIds: ["motherclank", "fleet-law", "lifecycle"],
  },
];
