import type { Module } from "../lib/handbook/schema.ts";

export const MODULES: Module[] = [
  {
    id: "mod-pipeline",
    area: "built",
    title: "How a Clank goes from idea to running software",
    summary: "The real path is idea → repository → implementation → tests → commit → push → deployment → runtime → monitoring → audit → remediation → architecture. Skipping a step is how drift is born.",
    conceptIds: ["repository", "commit", "push", "deployment", "runtime-provenance", "motherclank"],
    sections: [
      {
        heading: "The pipeline is not a chat transcript",
        body: "Agents write code. Git records snapshots. CI reruns tests. A human (or a timer) deploys an artifact. A process runs. A database remembers. Motherclank may later observe. If you collapse that into 'I pasted one model output into another', you cannot explain a failure, because you no longer know which of those layers moved.",
        conceptIds: ["git", "ci", "deployment"],
      },
      {
        heading: "Why Motherclank exists",
        body: "After enough silent timers, dual schedulers, and 'healthy' zeros, the fleet needed a read-only supervisor that could harvest evidence without taking locks or sending alerts. ADR-0002: observe, reason, propose — never remediate in M0–M4.",
        conceptIds: ["motherclank", "diagnostic-clank"],
      },
    ],
  },
  {
    id: "mod-git",
    area: "basics",
    title: "Git, GitHub, HEAD, and the working tree",
    summary: "Literacy for the person who directed the agents: what a SHA proves, what HEAD is, and why origin/main is not production.",
    conceptIds: [
      "repository", "git", "github", "commit", "sha", "head", "main", "branch", "feature-branch",
      "working-tree", "clean-dirty", "committed-not-pushed", "origin", "fetch", "pull", "push",
      "merge", "checkout", "rebase", "pull-request", "provenance",
    ],
    sections: [
      {
        heading: "The three copies",
        body: "There is the working tree (files on disk), HEAD (the commit those files are supposed to match), and origin (usually GitHub). A fourth copy — the deployed artifact — is not Git at all. People get hurt when they treat any two as the same object.",
        conceptIds: ["working-tree", "head", "origin", "head-vs-deployed"],
      },
      {
        heading: "What a SHA proves",
        body: "A commit SHA proves that a particular tree, parent, and message existed. It does not prove that a host checked it out, that a container was built from it, that tests passed on it, or that a timer is running it.",
        conceptIds: ["sha", "tests-prove", "deployment"],
      },
    ],
  },
  {
    id: "mod-tests",
    area: "basics",
    title: "Tests, fixtures, and what a green suite does not mean",
    summary: "CI, regression specimens, golden fixtures, smoke, e2e — and the BANKAI lesson that 600 passing tests can coexist with zero useful recall.",
    conceptIds: ["ci", "test-suite", "regression-test", "fixtures", "smoke-test", "tests-prove", "e2e", "deterministic"],
    sections: [
      {
        heading: "Fixtures are contracts with the past",
        body: "Golden Worlds must regenerate byte-identically. Motherclank golden incidents are executable or explicitly pending — never faked. If you 'fix' a test by loosening it, you delete a memory.",
        conceptIds: ["fixtures", "regression-test"],
      },
      {
        heading: "The number on the badge",
        body: "'621 passed, 1 skipped' proves those 621 assertions. It does not prove region coverage, editorial usefulness, or that production is that SHA. Law 3 exists because HTTP success without useful output fooled dashboards.",
        conceptIds: ["tests-prove", "mission-fail"],
      },
    ],
  },
  {
    id: "mod-deploy",
    area: "systems",
    title: "Deployment, drift, and runtime state",
    summary: "Checkout is not deploy. HEAD is not the container digest. A hotfix that is not pushed is a secret fork.",
    conceptIds: ["deployment", "head-vs-deployed", "deployment-drift", "drift", "hotfix", "rollback", "committed-not-pushed", "checkout"],
    sections: [
      {
        heading: "Two clocks",
        body: "Repository time (what main points at) and runtime time (what the process loaded) diverge whenever someone merges without restarting, restarts without pulling, or builds from a dirty tree. Law 6 requires host-evidenced SHAs; UNKNOWN is allowed, lying is not.",
        conceptIds: ["provenance", "runtime-provenance"],
      },
    ],
  },
  {
    id: "mod-ops",
    area: "systems",
    title: "Processes, timers, and honest health",
    summary: "systemd units, user timers, scheduler invocation versus work, observability.",
    conceptIds: ["process", "systemd", "scheduler", "schedule-latency", "observability", "telemetry", "health-check"],
    sections: [
      {
        heading: "Invocation is not execution",
        body: "GIC-04 and INC-20260822-A: a scheduler can fire, and the process still never start. A health check that only asks 'did the timer elapse?' will report green through a silent outage.",
        conceptIds: ["scheduler", "health-check"],
      },
    ],
  },
  {
    id: "mod-data",
    area: "systems",
    title: "SQLite, locks, schema, outbox",
    summary: "Why Clank state lives in per-Clank SQLite, how writers coordinate, and why delivery is not generation.",
    conceptIds: ["database", "sqlite-authoritative", "lock", "schema", "migration", "outbox", "idempotency", "dedup"],
    sections: [
      {
        heading: "One stick per notebook",
        body: "Law 7: every writer of one SQLite file — including a dashboard POST — takes the same cross-process lock. The FGT 'DB Eradication' incident is the specimen for what happens when a web thread bypasses it.",
        conceptIds: ["lock", "database"],
      },
    ],
  },
  {
    id: "mod-arch",
    area: "architecture",
    title: "Why the architecture looks like this",
    summary: "Motherclank, Diagnostic Clank, fleet laws, contracts, allowlists, blast radius — laws that were written in blood, not taste.",
    conceptIds: [
      "motherclank", "diagnostic-clank", "cvc-clank", "invariant", "contract", "allowlist", "dogfooding",
      "blast-radius", "graceful-degradation", "sqlite-authoritative",
    ],
    sections: [
      {
        heading: "Separation is a safety device",
        body: "Clanks own mutable state. Diagnostic Clank owns adapters. Motherclank photocopies. DAU owns mastery. Worlds own simulators. The Clank Systems Handbook owns historical evidence, not SRS. Mixing those on purpose is how a QC flood or a false mastery score happens.",
        conceptIds: ["contract", "blast-radius"],
      },
    ],
  },
];
