import type { ExplainPrompt } from "../../lib/handbook/schema.ts";

export const EXPLAIN_V02: ExplainPrompt[] = [
  {
    id: "ex-standards-not-tests",
    prompt:
      "Standards Clank has a large test suite and 26 RATIFIED standards. Why is that not the same as 'a pile of tests is the law'?",
    modelAnswer:
      "Standards Clank is ratified law plus conformance facts, not a green CI run. At 7c821ea974d8a58e7b049b1bee538a64cca43dc2 the charter closure recorded 26/26 RATIFIED and 0 PROPOSED across five frozen domains. The tests guard the files, the indexes, and the 'do not self-ratify' rules; they do not create obligations. An agent can propose and review; only the operator can move status to RATIFIED (decision 0002). A passing suite that nobody ratified is still not fleet law. M58 recorded STANDARDS_CLANK_COMPLETE_WITH_NON_BLOCKING_DEBT and explicitly ratifies nothing. Ratifying a standard also does not by itself authorize remediating a live Clank against it.",
    checklist: [
      "Named ratified law + conformance facts, not 'the tests are the law'",
      "Cited 7c821ea and 26/26 RATIFIED",
      "Agents cannot self-ratify",
      "Did not treat CI green as a runtime or a promotion",
    ],
    conceptIds: ["standards-clank", "ratification", "normative-spec", "tests-prove", "operator-role"],
  },
  {
    id: "ex-mother-vs-clankops",
    prompt: "How is Motherclank different from ClankOps? Why does the fleet need both?",
    modelAnswer:
      "They answer different questions. Motherclank is the read-only camera over fleet runtime: adapters, harvest JSONL, dual-plane health, MATERIALIZATION_GAP — what was last observed running on a host, without taking Clank locks or remediating (M5 still forbidden). ClankOps is the development-control ledger: missions, sessions, CI capture, deploy evidence, census identities, managed-agent launch and exit (main 4467c13). It does not score fleet health, does not replace Fleet Laws, and has no production deploy. Collapsing them would make a development pause look like a collector outage, or a harvest UNKNOWN look like a forgotten mission.",
    checklist: [
      "Motherclank = fleet runtime observation",
      "ClankOps = development missions / sessions / CI / deploy evidence",
      "Named at least one thing each does not own",
      "Did not treat them as the same supervisor",
    ],
    conceptIds: ["motherclank", "clankops", "mission-lifecycle", "observability", "dual-plane-health"],
  },
  {
    id: "ex-historical-vs-current",
    prompt:
      "COM-001 recorded live SHAs in early September. Why is liveDeployedSha still UNKNOWN on 2026-09-14?",
    modelAnswer:
      "A COM-001 closure is a point-in-time, scope-bound proof that a named SHA was materially running at a named target. Watch's 2026-09-01 live proof (d03bc4b at user-systemd-docker) is historical evidence, not a 2026-09-14 probe. M56 already recorded FLEET_DEPLOY_COM_001_CLOSED_HISTORICALLY_BUT_CURRENT_DRIFT_EXISTS. HEAD is still not deployed. This campaign has no SSH. Filling liveDeployedSha from those proofs would launder a dated receipt into a current health claim — the Law 6 failure the Handbook was built to refuse. Historical live ≠ current live. UNKNOWN is the honest present.",
    checklist: [
      "COM-001 is historical, scoped, dated",
      "Did not copy a September proof into liveDeployedSha",
      "HEAD ≠ deployed",
      "Live remains UNKNOWN this campaign (no SSH)",
    ],
    conceptIds: [
      "historical-conformance",
      "current-conformance",
      "historically-proven-deploy",
      "head-vs-deployed",
    ],
  },
  {
    id: "ex-process-exit",
    prompt: "An agent process returned exit code 0. Did the work hand off?",
    modelAnswer:
      "No. ClankOps Foundation 10 (4467c137f5c5db1a10ee29484628677bcd3c3284) records managed process exit as immutable evidence. Process exit is not handoff. Exit 0 is not Mission completed. Exit non-zero is not Mission failed. An open Session after the child returns still needs Foundation 1 `handoff`. Missing process evidence is UNKNOWN, not 'still running'. ClankOps never auto-closes a Session because a subprocess returned.",
    checklist: [
      "Process exit ≠ handoff",
      "Cited ClankOps F10 / 4467c13",
      "Exit code is not Mission success or failure",
      "Did not invent a health score from the exit",
    ],
    conceptIds: ["process-exit-vs-handoff", "process-vs-session", "session-lifecycle", "clankops"],
  },
  {
    id: "ex-quartermaster-not-health",
    prompt: "What does Quartermaster decide, and what must it never be mistaken for?",
    modelAnswer:
      "Quartermaster recommends model, resource, and quota — which LLM, how much budget, which local wrapper around token-stats. It does not score fleet health, does not own Fleet Laws, and does not say whether a collector is CURRENT. The census lists it PROBABLE at C:\\Users\\anil\\Desktop\\Quartermaster Clank, local-only, no GitHub repo. Do not invent one. This campaign did not inspect that Windows path, so its checkout remains LOCAL-ONLY / incomplete. A quota recommendation is not a Motherclank harvest.",
    checklist: [
      "Model / quota / resource only",
      "Does not score fleet health",
      "LOCAL-ONLY — no GitHub repo",
      "Did not treat token-stats as a Clank identity",
    ],
    conceptIds: ["quartermaster", "model-quota", "health-check", "dual-plane-health"],
  },
  {
    id: "ex-ledger-usefulness",
    prompt: "Ledger marks a HIT USEFUL and another a MISS. What did that prove about the collector?",
    modelAnswer:
      "Nothing about collector correctness. Clank Ledger HIT/MISS is editorial usefulness — did a human actually want the thing, did they write, was it a BANGER or a FLOP. That is a different plane from 'the parser was right' and from Motherclank health. Jules landed M0 at 2c31787904c270f9423dd22de4c95e669ba26a67 on branch jules-m0-foundation-…; there is no main. Do not treat that branch as trunk, and do not fold Ledger numbers into a fleet score. A useful HIT can come from a Clank whose tests are red; a MISS can come from a Clank whose harvest is HEALTHY.",
    checklist: [
      "Editorial usefulness, not collector correctness",
      "Cited Jules 2c31787 and no main",
      "Did not collapse Ledger into Motherclank or tests",
      "HIT/MISS ≠ CONFORMS / HEALTHY",
    ],
    conceptIds: ["clank-ledger", "editorial-usefulness", "hit-miss", "miss"],
  },
  {
    id: "ex-cvc-not-collector",
    prompt: "CVC has a GitHub repo and a frozen corpus. Why is it not a collector, and why are its open PRs not the architecture?",
    modelAnswer:
      "CVC validates frozen evidence packages. It does not collect, schedule, remediate, or auto-ingest the fleet. GitHub main is 5328a3cd4e06e1b9fd6ecf56250b4b5d8022d1e4 — the published closeout corpus (CVC_MISSION_COMPLETE_WITH_OPEN_EVIDENCE_BLOCKERS). Operator-triggered, unscheduled. Observer PRs (cvc-clank #1, handbook integrate-cvc-clank #5, and peers) are unmerged proposals, not current architecture. Local CVC on the Windows desktop may be ahead of 5328a3c; that checkout was not inspected this campaign. Do not teach the PR diff as the running system.",
    checklist: [
      "Validates frozen packages; does not collect",
      "Cited 5328a3c as GitHub main",
      "Unmerged observer PRs ≠ current architecture",
      "Local-ahead remains UNKNOWN / uninspected",
    ],
    conceptIds: ["cvc-clank", "frozen-corpus", "evidence-package", "collector"],
  },
  {
    id: "ex-reddit-not-clank",
    prompt: "Semiconductor Intelligence added a Reddit source. Is Reddit a Clank now?",
    modelAnswer:
      "No. Reddit is an admission experiment into an owner Clank, not a top-level identity. SI a9a202ad82d6365890d49a34de75dceeac329762 registered r/hardware as an experimental, muted RSS source: polling off by default, unmute-alone fails closed, first-seen is not novelty, no production registration, no deployment. Census classifies `_RedditAdmission` as SUPPORT_COMPONENT. A source is not a Clank. Counting Reddit as a fleet member would repeat the directory-sweep error with a feed URL.",
    checklist: [
      "Admission into an owner Clank, not a Clank",
      "Cited SI a9a202a / r/hardware muted",
      "Did not add reddit to the fleet list",
      "Fail-closed unmute / no production registration",
    ],
    conceptIds: ["reddit-admission", "source-admission", "experimental-vs-production", "collector"],
  },
  {
    id: "ex-schema-barrier",
    prompt: "What is the persistent-state compatibility barrier, and what happens when it fails?",
    modelAnswer:
      "Fail-closed. Feature Phone b60e881319b16d36625268d9ba2d66cb8ea8f818 (M14 / STD-DEPLOY-COM-002) adjudicates store state read-only before any mutation: FRESH / COMPATIBLE / MIGRATION_REQUIRED / INCOMPATIBLE_NEWER / UNKNOWN / PARTIAL / CORRUPT. Newer, unknown, corrupt, partial, and failed-migration raise StateCompatibilityError and leave the file byte-identical. An existing database without a version marker is UNKNOWN, never assumed fresh. Table existence is not compatibility proof. CLI exit 3, dashboard 503 — the work does not proceed. This is a barrier, not a silent migrate-on-start.",
    checklist: [
      "Fail-closed before normal work",
      "Cited FPC b60e881 / COM-002",
      "UNKNOWN marker ≠ fresh",
      "Did not describe it as an automatic migration",
    ],
    conceptIds: ["schema-compatibility", "fail-closed-migration", "schema", "contract"],
  },
  {
    id: "ex-duplicate-folders",
    prompt: "The census found 63 candidates and 8 duplicate groups. Are those 63 Clanks?",
    modelAnswer:
      "No. Duplicate folders are not duplicate identities. ClankOps census (reconstructed 2026-09-09, source=RECONSTRUCTED) scanned 63 candidates: 17 VERIFIED, 8 duplicate-identity groups (watch-clank on Desktop vs Clanks-root, Documents/Default Project copies, and so on). The second checkout is a ref, not a second Clank. A directory listing is not a fleet — that was already L-FLEET-001 / Tablet. Census vocabulary (VERIFIED / PROBABLE / UNKNOWN / SUPPORT_COMPONENT / NOT_A_CLANK) is how you stop counting folders as members. Reddit is not a Clank; token-stats is not a Clank; DAU labs are NOT_A_CLANK.",
    checklist: [
      "Folders ≠ identities",
      "Cited 63 candidates / 8 duplicate groups",
      "Census is reconstructed, not live ClankOps history",
      "Did not treat every folder as a fleet member",
    ],
    conceptIds: ["checkout-vs-identity", "census-identity", "system-identity", "clankops"],
  },
  {
    id: "ex-unknown-is-information",
    prompt: "The live SHA cells still say UNKNOWN. Is that a documentation failure?",
    modelAnswer:
      "No. UNKNOWN is information (Law 6), not a hole to fill with GitHub HEAD, a COM-001 historical proof, or a hopeful inventory date. Writing a guessed SHA would be the documentation failure. v0.1 froze with live UNKNOWN; v0.2 still has no SSH. The honesty did not 'get fixed' because the probe did not happen. A cell that stays UNKNOWN after a real campaign is a successful refusal, the same refusal Motherclank encodes as never-upgrade after DEF-M1.5.",
    checklist: [
      "UNKNOWN is information (Law 6)",
      "Not a documentation failure",
      "Did not fill from HEAD or historical COM-001",
      "v0.1 and v0.2 both still UNKNOWN — that is the lesson",
    ],
    conceptIds: ["provenance", "current-conformance", "historically-proven-deploy", "head-vs-deployed"],
  },
  {
    id: "ex-new-agent-morning",
    prompt:
      "You are a brand-new agent with no original chat. Which system tells you what exists, what is law, what was being developed, what was last observed running, what editors marked useful, what resources you may spend, and what evidence packages exist — and why none of them is the others?",
    modelAnswer:
      "Diagnostic Clank and the reconstructed census say what identities exist (registry and folder roll-call, not a live health score). Standards say what is ratified law and which conformance facts were admitted — not what is running. ClankOps says what missions/sessions/CI/deploy evidence were recorded in development, including a resume packet; process exit is not that handoff. Motherclank and the dated inventory say what was last observed running — still UNKNOWN live this campaign. Ledger says what editors marked HIT/MISS/useful, which is not collector correctness. Quartermaster says model/quota, local-only and incomplete. CVC says which frozen evidence packages exist; it does not collect. None of these planes is a substitute for another. If one is silent, write UNKNOWN; do not copy an answer across the boundary.",
    checklist: [
      "Named Diagnostic/census, Standards, ClankOps, Motherclank/inventory, Ledger, Quartermaster, CVC",
      "Each answers a different question",
      "None of them is the others",
      "UNKNOWN stays on the silent plane",
    ],
    conceptIds: [
      "resume-packet",
      "census-identity",
      "standards-clank",
      "clankops",
      "motherclank",
      "clank-ledger",
      "quartermaster",
      "cvc-clank",
    ],
  },
];
