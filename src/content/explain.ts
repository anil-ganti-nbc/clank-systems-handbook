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
    id: "ex-head",
    prompt: "Explain HEAD, origin/main, and deployed code to a non-programmer.",
    modelAnswer:
      "HEAD is the page you have open in your local copy. origin/main is the page the shared library (GitHub) currently calls official. Deployed code is the book actually on the printing press. They can be three different editions on the same afternoon.",
    checklist: [
      "Three copies",
      "Human metaphor without claiming they stay in sync",
      "Tied to a Clank/host example if possible",
    ],
    conceptIds: ["head", "main", "origin", "deployment-drift"],
  },
  {
    id: "ex-mother",
    prompt: "Why did Motherclank become necessary?",
    modelAnswer:
      "Collectors lied in different dialects: timers that fired without starting, HTTP 200 with zero items, dual schedulers, FIRST_SEEN floods, soaks with no promotion record. A read-only harvester (ADR-0002) can photocopy fleet evidence without taking Clank locks, writing DBs, or sending alerts. It exists because local dashboards were not a trustworthy picture of the fleet.",
    checklist: [
      "Read-only / no remediation",
      "Named at least two failure classes it observes",
      "Did not describe it as a deployer or a chat bot",
    ],
    conceptIds: ["motherclank", "diagnostic-clank", "observability"],
  },
  {
    id: "ex-600",
    prompt: "How can 600 passing tests coexist with zero useful recall?",
    modelAnswer:
      "Tests prove the assertions they encode. If nobody wrote an assertion that 'the Lenovo soak must recall the story', a green suite is compatible with 6349→0. Health checks that treat HTTP success as HEALTHY make the lie operational. BANKAI is the specimen: machinery ran, mission failed.",
    checklist: [
      "Tests answer asked questions only",
      "Mission metrics are a different plane",
      "Referenced BANKAI or Law 3",
    ],
    conceptIds: ["tests-prove", "mission-fail", "health-check"],
  },
  {
    id: "ex-prov",
    prompt: "What is provenance and why did this ecosystem need it?",
    modelAnswer:
      "Provenance is the footnote: run id, source, code revision. Runtime provenance is how the run was invoked (budget, scheduler, SHA actually loaded). The QC flood happened when people reconstructed intent from result shape. Law 6: missing stays UNKNOWN, it does not become a guessed SHA.",
    checklist: [
      "Origin of a fact",
      "Runtime vs repo",
      "UNKNOWN is allowed",
    ],
    conceptIds: ["provenance", "runtime-provenance"],
  },
  {
    id: "ex-incident",
    prompt: "Describe one incident from symptom through verified repair.",
    modelAnswer:
      "Pick one: (1) MATERIALIZATION_GAP — timers elapsed, processes never started, root-owned logs/, ~36h silence, GIC-04/ADR-0008. (2) Watch QC flood — validation runs counted as catalogue passes, FIRST_SEEN ≠ new, 639/580/41. (3) BANKAI — 6349→0 recall with tests/health looking fine, Laws 1 and 8.",
    checklist: [
      "Symptom",
      "Competing hypotheses",
      "Evidence cited",
      "Root vs contributing",
      "What would count as verification",
    ],
    conceptIds: ["root-cause", "contributing-cause"],
  },
];
