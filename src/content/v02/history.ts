import type { HistoryEntry, HistoryPhase } from "../../lib/handbook/schema.ts";

/**
 * Handbook v0.2 historical phases. APPEND-only relative to v0.1.
 * Do not rewrite p-origin … p-current. v0.1 freeze at 1803f317 was real.
 */
export const PHASES_V02: HistoryPhase[] = [
  {
    id: "p-standards",
    title: "Standards Clank and historical conformance",
    dateRange: "2026-08-28 to 2026-09-05",
    summary:
      "Standards Clank becomes the normative, machine-readable layer: 26 standards, 26 RATIFIED, 0 PROPOSED, five frozen domains (UI, Data/Ontology, Operations, Deployment, Collector UI Design). COM-001 historically proves live deployments for nine applicable systems — point-in-time, not current. M58 STANDARDS_CLANK_COMPLETE_WITH_NON_BLOCKING_DEBT at 7c821ea 2026-09-05. Agents cannot self-ratify. Front-door README still says 12/3.",
    components: [
      "standards-clank",
      "profiles/",
      "exceptions/",
      "STD-DEPLOY-COM-001",
      "STD-DEPLOY-COM-002",
      "feature-phone-clank schema barrier",
      "tablet-clank schema barrier",
      "smartwatch-clank schema barrier",
    ],
    responsibilities:
      "Turn sufficiently supported operational lessons into explicit, versioned MUST/SHOULD/MAY rules with rationale, evidence, exceptions, and an audit trail. Not a collector, scheduler, or remediator.",
    dataFlow:
      "Incident or requirement → PROPOSED JSON standard → review artefact → operator ratification → profile adoption → conformance audit. Clank SQLite is untouched. Historical live-proof SHAs live in COM-001 evidence, never in liveDeployedSha.",
    scheduling:
      "None. Standards Clank is operator-triggered governance, not a fleet clock.",
    storage:
      "One JSON file per standard under standards/<domain>/. Machine-readable profiles bind which standards apply to which class of Clank. Exceptions are recorded deviations, not silent skips.",
    alerting: "None. Non-conformance is an audit finding, not a Discord ping.",
    qc: "Ratification is a human QC act. An agent cannot move a standard to RATIFIED on its own authority.",
    fleetSupervision:
      "Not Motherclank. Standards observe conformance; they do not harvest runtime or propose remediations that execute.",
    whyThisLayer:
      "Ten collectors had independently accumulated the same scars in ten dialects. Fleet Laws named the invariants; Standards Clank made them machine-readable, exception-governed, and historically distinguishable from current live state.",
    before:
      "Fleet Laws lived as markdown. UI ratification on 2026-08-30 was 12 RATIFIED / 3 PROPOSED. Historical live SHAs and current live SHAs were still one column that operators kept collapsing.",
    failurePressure:
      "Without a ratification gate, agents would self-declare the fleet conformant. Without fail-closed schema barriers, a collector could boot on an incompatible notebook and launder old rows as current. Without COM-001 as historical proof, GitHub HEAD would be taught as production.",
    newAbstraction:
      "Standards Clank: normative JSON standards, machine-readable profiles, recorded exceptions, and a third SHA column — historically proven deploy, which is not liveDeployedSha and not repo HEAD.",
    newRule:
      "Agents cannot self-ratify. Schema migrations fail closed on StateCompatibilityError (STD-DEPLOY-COM-002). COM-001 live proofs are point-in-time and must not be copied into liveDeployedSha. Ratification of a standard does not authorize remediating any existing Clank against it.",
    resultingArchitecture:
      "26/26 RATIFIED, 0 PROPOSED, five frozen domains. M58 independent whole-project closure audit 7c821ea974d8a58e7b049b1bee538a64cca43dc2 on 2026-09-05. Fail-closed schema barriers land on FPC, Tablet, and Smartwatch. Front-door README still stale at 12/3.",
    unresolvedLimitations:
      "README 12/3 is non-blocking debt, not a recount. Live host SHA remains UNKNOWN for every collector. Historically proven ≠ currently running. Conformance audits do not restart units.",
    confidence: "verified",
  },
  {
    id: "p-control-planes",
    title: "Control planes split: Ledger, Quartermaster, ClankOps",
    dateRange: "2026-08-31 to 2026-09-14",
    summary:
      "Three new planes appear beside Motherclank, and they are not Motherclank. Clank Ledger M0 (Jules, no main) records HIT/MISS/QC/editorial usefulness. Quartermaster is a census-PROBABLE local-only resource/quota tool — path not inspectable, no GitHub, confidence incomplete. ClankOps Foundations 0–10 end at 4467c137 / PR #11 on 2026-09-14: development missions, sessions, census identity, attention, resume packets, managed-agent exit. Census 2026-09-09 is RECONSTRUCTED.",
    components: [
      "clank-ledger",
      "quartermaster",
      "clankops",
      "Motherclank (not ClankOps)",
      "census 2026-09-09T23:09:03Z",
    ],
    responsibilities:
      "Split questions Motherclank must not own: was the surfaced item editorially useful (Ledger); which model/quota was spent (Quartermaster); which development mission is unfinished (ClankOps).",
    dataFlow:
      "Ledger: operator HIT/MISS/QC/outcome → append-only SQLite/SQLAlchemy/Alembic, AST-guarded. ClankOps: census import source=RECONSTRUCTED → missions/sessions/events on local SQLite; resume packets and attention queues are derived, write zero ledger events. Quartermaster: local-only; this campaign cannot read it.",
    scheduling:
      "None of the three is a collector scheduler. ClankOps has no cron and no remote SSH. Ledger is operator-triggered. Quartermaster scheduling is UNKNOWN.",
    storage:
      "Ledger local SQLite. ClankOps default local SQLite, no production deploy. Quartermaster storage UNKNOWN (local-only, uninspected).",
    alerting: "None as fleet Discord. ClankOps attention is a derived queue, not a notifier.",
    qc: "Ledger QC is human editorial usefulness, not collector catalogue-pass. ClankOps does not score Clank health.",
    fleetSupervision:
      "Motherclank remains the read-only fleet harvester (ADR-0002). ClankOps observes development state. Mixing them would make a janitor with keys.",
    whyThisLayer:
      "A supervisor that also records editorial misses, model spend, and agent sessions is a second Clank with blast radius over the whole fleet. The split is the architecture.",
    before:
      "Motherclank M0–M4 harvested adapter snapshots and proposed. Diagnostic Clank owned inventory. There was no HIT/MISS notebook, no quota plane, and no development-control plane. Membership was still a folder listing plus the 2026-08-22 fleet.yaml.",
    failurePressure:
      "Editorial usefulness is not fleet health. Model quota is not a Fleet Law. An unfinished agent session is not a MATERIALIZATION_GAP. Collapsing those into Motherclank, or treating a second checkout as a second Clank, would launder the wrong plane into the wrong decision.",
    newAbstraction:
      "Three named planes with explicit non-goals: Clank Ledger (HIT/MISS/QC/editorial), Quartermaster (resource/quota, local-only PROBABLE), ClankOps (missions, sessions, census identity, attention, resume packets, managed-agent exit). Census identities are UUIDv7; filesystem paths and GitHub names are references, not identity.",
    newRule:
      "Motherclank is not ClankOps. Process exit is not a handoff. A duplicate checkout is a second ref, not a second Clank. Census facts import as source=RECONSTRUCTED. GitHub HEAD is not deployed HEAD; CI success is not deployment success.",
    resultingArchitecture:
      "Ledger 2c317879 on branch jules-m0-foundation-9044736841197359665, no main. Quartermaster census-PROBABLE at Desktop\\Quartermaster Clank, no GitHub. ClankOps GitHub birth 2026-09-09T23:10:37Z; Foundations 0–10 close at 4467c137f5c5db1a10ee29484628677bcd3c3284 PR #11. Census 63/17/5/13/13/14/1.",
    unresolvedLimitations:
      "Quartermaster path is not inspectable from this campaign; confidence incomplete. ClankOps is local SQLite, no production deploy. Ledger has no main. Eight duplicate identity groups. Live SHA UNKNOWN. Census is a reconstruction artefact, not live ClankOps history.",
    confidence: "verified",
  },
  {
    id: "p-second-act",
    title: "Second act: collectors, admission, freeze lifted",
    dateRange: "2026-08-30 to 2026-09-14",
    summary:
      "Handbook v0.1 was feature-frozen at 1803f317 on 2026-08-30 pending owner study. That freeze was real. Collectors then moved: collector UI family, 2026-09-05 smartphone canary promotion, Discord delivery, Watch casio_multi, SI Reddit pilot (experimental muted — Reddit is not a Clank), CTW DB-race/health UI, schema compatibility barriers, OEM GIT_REVISION runtime identity, KTW The Elec members-only, Tablet GUI qualification. This Handbook v0.2 is a commissioned freeze-lift, not a silent rewrite of v0.1.",
    components: [
      "clank-systems-handbook v0.1 freeze",
      "cvc-clank frozen corpus",
      "collector UI family",
      "smartphone-clank canary promotion",
      "smartwatch-clank Discord outbox",
      "watch-clank casio_multi",
      "semiconductor-intelligence Reddit pilot",
      "chinese-tech-wire health UI",
      "oem-radar GIT_REVISION",
      "korean-tech-wire The Elec",
      "tablet-clank GUI qualification",
    ],
    responsibilities:
      "Keep collecting and admitting sources without pretending the v0.1 Handbook already contained the second act. Distinguish experimental admission from production. Keep live SHA UNKNOWN.",
    dataFlow:
      "Same per-Clank SQLite notebooks. New: schema-compatibility barriers before boot; persist-before-send Discord outbox; GIT_REVISION as runtime identity; Reddit as a source-admission experiment on SI, not a fleet card.",
    scheduling:
      "Unchanged single-authority rule. CTW is manually operated in this window. samsung_support stays soak AND disabled after the 09-05 canary promotion of samsung_us_owners_product.",
    storage:
      "Fail-closed StateCompatibilityError on incompatible persistent state. Smartwatch schema v3→v4 additive. CTW health UI drops stale scheduler claims.",
    alerting:
      "Smartwatch Discord outbox with activation cutoff and editorial gate. Persist-before-send. KTW The Elec members-only filtered (can-the-operator-read-this).",
    qc: "Promotion remains an explicit operator decision. Experimental muted is not production. Qualification epochs are not live deploys.",
    fleetSupervision:
      "Motherclank still cannot see what adapters cannot read. ClankOps is not yet a production camera. CVC does not collect, promote, or enforce.",
    whyThisLayer:
      "A frozen curriculum that silently absorbs later SHAs is a lie about when the operator authorised the story to continue. The second act has to be dated, freeze-lifted, and epistemically fenced.",
    before:
      "v0.1 Handbook frozen 2026-08-30 at 1803f317: nine phases, 12 fleet cards, live provenance incomplete, CVC integrate PR excluded, epistemic rules binding. Promotion freeze from Phase 0 still the controlling production rule as of 2026-08-27.",
    failurePressure:
      "Collectors did not pause for owner study. Schema incompatibilities, collector UIs, a canary promotion, Discord delivery, a Reddit admission experiment, and runtime identity all landed while the Handbook was frozen. Teaching them as if v0.1 already knew them would erase the freeze.",
    newAbstraction:
      "Commissioned freeze-lift. Historical live-proof vs live UNKNOWN vs repo HEAD as three columns. Source admission as a plane (Reddit is not a Clank). Qualification epoch. Runtime identity via GIT_REVISION. Experimental vs production as an operator-visible gate.",
    newRule:
      "v0.1 freeze was real — do not pretend it never happened. This v0.2 update is operator-authorised, not a silent rewrite. UNKNOWN stays UNKNOWN. GitHub HEAD is not deployed. Reddit is not a Clank. CVC unmerged observer PRs are not current architecture. samsung_support stays soak AND disabled.",
    resultingArchitecture:
      "A second-act collector family on top of a frozen v0.1 spine, plus a commissioned Handbook v0.2. Strict counts: v0.1 knew 12 fleet cards; strict post-v0.1 GitHub births 2 (clank-ledger, clankops); logical new systems 3 (Quartermaster, Ledger, ClankOps); major systems absent from v0.1 now incorporated 5 (CVC, Standards, Quartermaster, Ledger, ClankOps).",
    unresolvedLimitations:
      "Live SHA still UNKNOWN on every collector. Census is RECONSTRUCTED. Quartermaster local-only incomplete. CVC Workbench is a separate local tool. CTW manually operated. Watch HEAD is not live. Front-door Standards README still 12/3.",
    confidence: "verified",
  },
];

function e(id: string, rest: Omit<HistoryEntry, "id">): HistoryEntry {
  return { id, ...rest };
}

export const HISTORY_V02: HistoryEntry[] = [
  e("h-v01-freeze", {
    date: "2026-08-30",
    period: "2026-08-30",
    phaseId: "p-second-act",
    systems: ["clank-systems-handbook"],
    event:
      "Handbook v0.1 feature-frozen at 1803f317 pending owner study. This is the v0.1 boundary this campaign is authorised to open.",
    before:
      "Content-phase ledger plus 2026-08-27 evidence-preservation campaign. Nine phases. Live Law 6 cells UNKNOWN. Promotion freeze still controlling.",
    change:
      "clank-systems-handbook 1803f31749dc219d0662085d6e6b2fb3efc03267 (2026-08-30) marks v0.1 as the first usable curriculum and freezes feature development pending owner study and learning validation. Live host provenance remains incomplete by design. PR integrate-cvc-clank (#5) is explicitly excluded and stays open for later rebase; it is not part of v0.1. Epistemic rules stay binding: UNKNOWN stays UNKNOWN; GitHub HEAD is not deployed SHA. Allowed after freeze: bug fixes, evidence/factual corrections, merge-conflict repairs, accessibility, test/CI. Further modules, labs, routes, major UI, and architecture redesign are deferred.",
    why: "A curriculum that keeps moving cannot be studied. Freeze is how you find out whether v0.1 works. Opening it later requires operator authorisation, not a silent rewrite.",
    evidence: [
      {
        id: "ev-v02h-v01-freeze",
        kind: "commit",
        repo: "anil-ganti-nbc/clank-systems-handbook",
        sha: "1803f31749dc219d0662085d6e6b2fb3efc03267",
        path: "README.md",
        note: "v0.1 first usable curriculum, feature-frozen pending owner study. CVC PR #5 excluded. Live provenance incomplete.",
        status: "verified",
      },
    ],
    commits: [
      {
        repo: "anil-ganti-nbc/clank-systems-handbook",
        sha: "1803f31749dc219d0662085d6e6b2fb3efc03267",
        note: "v0.1 freeze",
      },
    ],
    conceptIds: ["frozen-corpus", "head-vs-deployed", "operator-role"],
    lawIds: ["law-6"],
    incidentIds: ["inc-live-deployment-proof"],
    laterConsequence:
      "Handbook v0.2 (h-handbook-v02) is a commissioned freeze-lift of this boundary, not a claim that the freeze never happened.",
    residualRisk:
      "Live SHA still UNKNOWN. Do not teach later collector HEADs as if they were inside v0.1. Do not fold CVC PR #5 into the frozen corpus.",
    verification:
      "Freeze commit and README exclusion of PR #5: VERIFIED. Live host provenance: INCOMPLETE, as the freeze itself recorded.",
    confidence: "verified",
  }),
  e("h-cvc-github", {
    date: "2026-08-30",
    period: "2026-08-30",
    phaseId: "p-second-act",
    systems: ["cvc-clank"],
    event:
      "cvc-clank GitHub HEAD 5328a3cd is a frozen corpus at CVC_MISSION_COMPLETE_WITH_OPEN_EVIDENCE_BLOCKERS. It does not collect, promote, or enforce.",
    before:
      "Institutional memory lived in Diagnostic reports, architecture audits, and operator recollection. CVC was not a Handbook v0.1 fleet card.",
    change:
      "Repo created 2026-08-30T17:22:56Z. GitHub HEAD 5328a3cd4e06e1b9fd6ecf56250b4b5d8022d1e4. Terminal state CVC_MISSION_COMPLETE_WITH_OPEN_EVIDENCE_BLOCKERS: consumes the closeout corpus; does not reopen archaeology, remediate a Clank, change rule text, ingest during publication, or start Standards Clank. 42 migrated artifacts under corpus/ are frozen historical input. Unmerged observer PRs (including the bounded observer surface) are not current architecture. Verifier uses non-portable Windows paths. CVC Workbench is a separate local tool (census-PROBABLE, no git) and is not this repository.",
    why: "Evidence-backed institutional memory has to be a frozen corpus with operator-triggered ingest, not a daemon that rewrites the past while collectors run.",
    evidence: [
      {
        id: "ev-v02h-cvc-head",
        kind: "repo",
        repo: "anil-ganti-nbc/cvc-clank",
        sha: "5328a3cd4e06e1b9fd6ecf56250b4b5d8022d1e4",
        note: "GitHub HEAD 2026-08-30. Frozen corpus. Does not collect/promote/enforce. Explicitly excluded from Handbook v0.1.",
        status: "verified",
      },
      {
        id: "ev-v02h-cvc-readme",
        kind: "doc",
        repo: "anil-ganti-nbc/cvc-clank",
        path: "README.md",
        sha: "5328a3cd4e06e1b9fd6ecf56250b4b5d8022d1e4",
        note: "CVC_MISSION_COMPLETE_WITH_OPEN_EVIDENCE_BLOCKERS. Workbench is a separate future/local tool, not implemented here.",
        status: "verified",
      },
    ],
    commits: [
      {
        repo: "anil-ganti-nbc/cvc-clank",
        sha: "5328a3cd4e06e1b9fd6ecf56250b4b5d8022d1e4",
        note: "frozen GitHub HEAD",
      },
    ],
    conceptIds: ["cvc-clank", "frozen-corpus", "evidence-package", "superseding-evidence"],
    lawIds: [],
    incidentIds: [],
    residualRisk:
      "Unmerged observer PRs are not architecture. Non-portable Windows verifier paths. CVC Workbench local-only is not this SHA. Do not teach CVC as a collector or as a live enforcer.",
    verification:
      "GitHub birth, HEAD, and mission-complete terminal state: VERIFIED from the repo. Workbench and unmerged PRs are out of this row's architecture claim.",
    confidence: "verified",
  }),
  e("h-ledger-m0", {
    date: "2026-08-31",
    period: "2026-08-31",
    phaseId: "p-control-planes",
    systems: ["clank-ledger"],
    event:
      "clank-ledger Jules M0 foundation: HIT/MISS/QC/editorial on SQLite/SQLAlchemy/Alembic, AST-guarded. Branch only — no main.",
    before:
      "Human editorial usefulness lived in Discord, Watch QC queues, and operator memory. Motherclank harvested collector health, not whether a surfaced item was worth writing.",
    change:
      "Repo created 2026-08-31T10:34:46Z. Default (and only) branch jules-m0-foundation-9044736841197359665 at 2c31787904c270f9423dd22de4c95e669ba26a67. There is no main. M0 models HIT, MISS, human QC (USEFUL/NOT_USEFUL/FALSE_POSITIVE/OUT_OF_STOCK), editorial outcomes, and append-only audit history. Explicit non-goals: not Motherclank 2, not Diagnostic 2, not Standards 2, not CVC 2, not ClankOps, not a crawler. AST-guarded. Local FastAPI UI and CLI. Not deployed.",
    why: "Technical health of a collector is not editorial usefulness. A HIT/MISS notebook has to be a separate plane or Motherclank starts scoring journalism.",
    evidence: [
      {
        id: "ev-v02h-ledger-m0",
        kind: "repo",
        repo: "anil-ganti-nbc/clank-ledger",
        sha: "2c31787904c270f9423dd22de4c95e669ba26a67",
        note: "Jules M0. Default branch jules-m0-foundation-9044736841197359665. No main.",
        status: "verified",
      },
      {
        id: "ev-v02h-ledger-readme",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-ledger",
        path: "README.md",
        sha: "2c31787904c270f9423dd22de4c95e669ba26a67",
        note: "HIT/MISS/QC/editorial. SQLite/SQLAlchemy/Alembic. Explicit non-goals vs Motherclank/Diagnostic/Standards/CVC/ClankOps.",
        status: "verified",
      },
    ],
    commits: [
      {
        repo: "anil-ganti-nbc/clank-ledger",
        sha: "2c31787904c270f9423dd22de4c95e669ba26a67",
        note: "Jules M0 foundation",
      },
    ],
    conceptIds: ["clank-ledger", "hit-miss", "editorial-usefulness", "append-only-ledger"],
    lawIds: [],
    incidentIds: ["inc-ledger-usefulness"],
    residualRisk:
      "No main. Not a production deploy. Do not treat Ledger as Motherclank, and do not treat a later ClankOps census row as this repo's runtime.",
    verification:
      "GitHub birth, Jules branch, SHA, and M0 scope: VERIFIED. Production deploy: none. Live SHA: not applicable (no host claim).",
    confidence: "verified",
  }),
  e("h-schema-barrier", {
    date: "2026-09-01",
    period: "2026-09-01 to 2026-09-02",
    phaseId: "p-standards",
    systems: ["feature-phone-clank", "tablet-clank", "smartwatch-clank", "standards-clank"],
    event:
      "Fail-closed persistent-state compatibility barriers land: StateCompatibilityError, STD-DEPLOY-COM-002.",
    before:
      "A collector could boot against an older or foreign notebook and treat whatever parsed as current. Schema drift was a golden-incident class (GIC-14), not yet a boot barrier.",
    change:
      "feature-phone-clank b60e881319b16d36625268d9ba2d66cb8ea8f818 fail-closed StateCompatibilityError. tablet-clank b3088ebc716227b99e1d8aa66942c8a6e87bbfcb. smartwatch-clank a93355480bb11e1bd16ae7837256ce9002fc2aa7 (2026-09-02). STD-DEPLOY-COM-002 names the invariant: incompatible persistent state must refuse to start, not migrate silently. These commits are git-resident barriers, not proof the host is running them.",
    why: "A quiet schema rewrite is a new epoch wearing yesterday's name. Fail-closed is the only honest boot.",
    evidence: [
      {
        id: "ev-v02h-schema-fpc",
        kind: "commit",
        repo: "anil-ganti-nbc/feature-phone-clank",
        sha: "b60e881319b16d36625268d9ba2d66cb8ea8f818",
        note: "Fail-closed StateCompatibilityError. Git-resident barrier, not a live host SHA.",
        status: "verified",
      },
      {
        id: "ev-v02h-schema-tablet",
        kind: "commit",
        repo: "anil-ganti-nbc/tablet-clank",
        sha: "b3088ebc716227b99e1d8aa66942c8a6e87bbfcb",
        note: "Tablet schema-compatibility barrier. Not a live deploy.",
        status: "verified",
      },
      {
        id: "ev-v02h-schema-sw",
        kind: "commit",
        repo: "anil-ganti-nbc/smartwatch-clank",
        sha: "a93355480bb11e1bd16ae7837256ce9002fc2aa7",
        note: "Smartwatch barrier 2026-09-02. Not a live deploy.",
        status: "verified",
      },
    ],
    commits: [
      { repo: "anil-ganti-nbc/feature-phone-clank", sha: "b60e881319b16d36625268d9ba2d66cb8ea8f818", note: "FPC fail-closed" },
      { repo: "anil-ganti-nbc/tablet-clank", sha: "b3088ebc716227b99e1d8aa66942c8a6e87bbfcb", note: "Tablet barrier" },
      { repo: "anil-ganti-nbc/smartwatch-clank", sha: "a93355480bb11e1bd16ae7837256ce9002fc2aa7", note: "Smartwatch 2026-09-02" },
    ],
    conceptIds: ["schema-compatibility", "fail-closed-migration", "schema", "migration"],
    lawIds: ["law-4"],
    incidentIds: ["inc-schema-barrier"],
    whatFailed: "Booting on an incompatible notebook would launder old rows as current observations.",
    diagnosis: "Compatibility is a start-time fact, not a best-effort migration log.",
    laterConsequence: "COM-001 historical live proofs on these SHAs (FPC/Tablet/Smartwatch) are a different column from this barrier and from live UNKNOWN.",
    residualRisk: "Live deployed SHA remains UNKNOWN. Git barrier ≠ enabled on the host.",
    verification:
      "Three git-resident fail-closed commits: VERIFIED. Host running those SHAs: UNKNOWN.",
    confidence: "verified",
  }),
  e("h-collector-ui", {
    date: "2026-09-04",
    period: "2026-09-04",
    phaseId: "p-second-act",
    systems: ["oem-radar", "free-game-tracker", "tablet-clank", "standards-clank"],
    event:
      "Collector UI family converges: OEM operator console, FGT console tests, Collector UI Design System. Tablet GUI qualification is in the same family, not a live membership change.",
    before:
      "Local dashboards and Windows launchers existed per Clank. There was no ratified Collector UI Design domain and no shared operator-console test contract.",
    change:
      "OEM 070914c82516c29be781a49acb77c8d86953f1e2 (2026-09-04) is the collector-UI SHA later cited as COM-001 historical live proof for OEM — that citation is historical, not current HEAD, and not liveDeployedSha. FGT 011b89fc6747ce2bd93e75aba327fd1cffbf3b69 adds operator-console tests. Tablet GUI qualification 7fd69392a89f320a98fee8c046419acb466f98f3 is a qualification epoch, not Hetzner membership. Collector UI Design becomes one of the five frozen Standards domains.",
    why: "An operator console that only exists on one Clank is a dialect. A design system that is not frozen will be rewritten by the next agent session.",
    evidence: [
      {
        id: "ev-v02h-oem-ui",
        kind: "commit",
        repo: "anil-ganti-nbc/oem-radar",
        sha: "070914c82516c29be781a49acb77c8d86953f1e2",
        note: "OEM collector UI 2026-09-04. Also the COM-001 historical proof SHA for OEM — not current HEAD, not liveDeployedSha.",
        status: "verified",
      },
      {
        id: "ev-v02h-fgt-ui",
        kind: "commit",
        repo: "anil-ganti-nbc/free-game-tracker",
        sha: "011b89fc6747ce2bd93e75aba327fd1cffbf3b69",
        note: "FGT operator console tests 2026-09-04.",
        status: "verified",
      },
      {
        id: "ev-v02h-tablet-gui",
        kind: "commit",
        repo: "anil-ganti-nbc/tablet-clank",
        sha: "7fd69392a89f320a98fee8c046419acb466f98f3",
        note: "Tablet GUI qualification epoch. Not a proven Hetzner membership change.",
        status: "verified",
      },
    ],
    commits: [
      { repo: "anil-ganti-nbc/oem-radar", sha: "070914c82516c29be781a49acb77c8d86953f1e2", note: "OEM collector UI / COM-001 historical SHA" },
      { repo: "anil-ganti-nbc/free-game-tracker", sha: "011b89fc6747ce2bd93e75aba327fd1cffbf3b69", note: "FGT operator console tests" },
      { repo: "anil-ganti-nbc/tablet-clank", sha: "7fd69392a89f320a98fee8c046419acb466f98f3", note: "Tablet GUI qualification" },
    ],
    conceptIds: ["qualification-epoch", "normative-spec", "operator-role"],
    lawIds: [],
    incidentIds: [],
    residualRisk:
      "OEM HEAD later moved; 070914c is historical. Tablet qualification ≠ production. Live SHA UNKNOWN.",
    verification:
      "Named UI/qualification commits: VERIFIED. Host running them: UNKNOWN. Do not copy 070914c into liveDeployedSha.",
    confidence: "verified",
  }),
  e("h-standards-ratified", {
    date: "2026-09-05",
    period: "2026-09-05",
    phaseId: "p-standards",
    systems: ["standards-clank"],
    event:
      "M58 independent whole-project closure audit: 26/26 RATIFIED, 0 PROPOSED. Agents cannot self-ratify.",
    before:
      "Front-door README still described Operator Ratification Decision 002 as 12 RATIFIED / 3 PROPOSED under standards/ui/. That sentence was already going stale as other domains froze.",
    change:
      "standards-clank 7c821ea974d8a58e7b049b1bee538a64cca43dc2 (2026-09-05) records M58 STANDARDS_CLANK_COMPLETE_WITH_NON_BLOCKING_DEBT. 26 standards, 26 RATIFIED, 0 PROPOSED, five frozen domains (UI, Data/Ontology, Operations, Deployment, Collector UI Design). Machine-readable profiles and exceptions/governance are in-repo. Agents cannot self-ratify (decisions/0002). Front-door README remaining at 12/3 is the named non-blocking debt, not a recount of the closure.",
    why: "A standard that an agent can ratify is a diary entry. Closure has to be an independent audit the operator can read, including the debt it refuses to hide.",
    evidence: [
      {
        id: "ev-v02h-m58",
        kind: "commit",
        repo: "anil-ganti-nbc/standards-clank",
        sha: "7c821ea974d8a58e7b049b1bee538a64cca43dc2",
        note: "M58 STANDARDS_CLANK_COMPLETE_WITH_NON_BLOCKING_DEBT. 26/26 RATIFIED. 2026-09-05.",
        status: "verified",
      },
      {
        id: "ev-v02h-no-self-ratify",
        kind: "doc",
        repo: "anil-ganti-nbc/standards-clank",
        path: "decisions/0002-no-agent-self-ratification.md",
        note: "Only the human operator may move a standard to RATIFIED.",
        status: "verified",
      },
    ],
    commits: [
      {
        repo: "anil-ganti-nbc/standards-clank",
        sha: "7c821ea974d8a58e7b049b1bee538a64cca43dc2",
        note: "M58 closure",
      },
    ],
    conceptIds: [
      "standards-clank",
      "ratification",
      "conformance",
      "normative-spec",
      "historical-conformance",
      "current-conformance",
    ],
    lawIds: [],
    incidentIds: ["inc-historical-conformance"],
    residualRisk:
      "README 12/3 is still stale. Ratification does not authorize remediating existing Clanks. Live SHA UNKNOWN.",
    verification:
      "M58 SHA and 26/26 closure: VERIFIED from 7c821ea. README 12/3 remaining stale: VERIFIED as non-blocking debt, not as the count.",
    confidence: "verified",
  }),
  e("h-com001-proof", {
    date: "2026-09-05",
    period: "2026-09-05",
    phaseId: "p-standards",
    systems: [
      "watch-clank",
      "korean-tech-wire",
      "tablet-clank",
      "feature-phone-clank",
      "oem-radar",
      "smartwatch-clank",
      "smartphone-clank",
      "chinese-tech-wire",
      "semiconductor-intelligence",
    ],
    event:
      "COM-001 historically proves live deployments for nine applicable systems. Point-in-time, NOT current. Do not copy these SHAs into liveDeployedSha.",
    before:
      "Fleet cards had inventorySha (2026-08-22), repoHead (teaching capture), and liveDeployedSha UNKNOWN. There was no third column for a historically evidenced deploy.",
    change:
      "COM-001 historically proven live deployments (point-in-time, NOT current): watch d03bc4b2f90289686331af0447d5ca4e8cf55822, KTW f49bd02eb214b650a146e9c0f6f348d526285a91, tablet b3088ebc716227b99e1d8aa66942c8a6e87bbfcb, FPC b60e881319b16d36625268d9ba2d66cb8ea8f818, OEM 070914c82516c29be781a49acb77c8d86953f1e2, smartwatch a93355480bb11e1bd16ae7837256ce9002fc2aa7, smartphone e514c45dca4cf966441c27799d98761096dc8c40, CTW cfbd3158a5272aab6e67a2a9005be2c3a45544e6, SemInt 53cb3f1f5358ad28a2d92ebd78efeab9534ddfa1. These belong in historicallyProvenDeployedSha with a note that they are not current live. liveDeployedSha stays UNKNOWN.",
    why: "A proven-once deploy is evidence of a past host state. Teaching it as the running SHA would repeat Law 6 inside the Handbook.",
    evidence: [
      {
        id: "ev-v02h-com001",
        kind: "doc",
        repo: "anil-ganti-nbc/standards-clank",
        path: "standards/",
        sha: "7c821ea974d8a58e7b049b1bee538a64cca43dc2",
        note: "COM-001 9/9 historical live proofs, point-in-time. Not current. Not liveDeployedSha.",
        status: "verified",
      },
    ],
    commits: [
      { repo: "anil-ganti-nbc/watch-clank", sha: "d03bc4b2f90289686331af0447d5ca4e8cf55822", note: "COM-001 historical proof, not live" },
      { repo: "anil-ganti-nbc/korean-tech-wire", sha: "f49bd02eb214b650a146e9c0f6f348d526285a91", note: "COM-001 historical proof, not live" },
      { repo: "anil-ganti-nbc/tablet-clank", sha: "b3088ebc716227b99e1d8aa66942c8a6e87bbfcb", note: "COM-001 historical proof, not live" },
      { repo: "anil-ganti-nbc/feature-phone-clank", sha: "b60e881319b16d36625268d9ba2d66cb8ea8f818", note: "COM-001 historical proof, not live" },
      { repo: "anil-ganti-nbc/oem-radar", sha: "070914c82516c29be781a49acb77c8d86953f1e2", note: "COM-001 historical proof, not live" },
      { repo: "anil-ganti-nbc/smartwatch-clank", sha: "a93355480bb11e1bd16ae7837256ce9002fc2aa7", note: "COM-001 historical proof, not live" },
      { repo: "anil-ganti-nbc/smartphone-clank", sha: "e514c45dca4cf966441c27799d98761096dc8c40", note: "COM-001 historical proof, not live" },
      { repo: "anil-ganti-nbc/chinese-tech-wire", sha: "cfbd3158a5272aab6e67a2a9005be2c3a45544e6", note: "COM-001 historical proof, not live" },
      { repo: "anil-ganti-nbc/semiconductor-intelligence", sha: "53cb3f1f5358ad28a2d92ebd78efeab9534ddfa1", note: "COM-001 historical proof, not live" },
    ],
    conceptIds: ["historically-proven-deploy", "head-vs-deployed", "current-conformance", "historical-conformance"],
    lawIds: ["law-6"],
    incidentIds: ["inc-live-deployment-proof", "inc-historical-conformance"],
    residualRisk:
      "Do not copy these nine SHAs into liveDeployedSha. Later HEADs (Watch 930aef1e, OEM 24d61dd, smartphone 60bc5f5, CTW e7f10f8, SI a9a202ad) stay out of this proof column.",
    verification:
      "Nine named historical live-proof SHAs as COM-001 point-in-time evidence: VERIFIED as historical. Current live SHA: UNKNOWN for all nine.",
    confidence: "verified",
  }),
  e("h-promotions-sep5", {
    date: "2026-09-05",
    period: "2026-09-05",
    phaseId: "p-second-act",
    systems: ["smartphone-clank"],
    event:
      "Smartphone 60bc5f5: operator promotes canary samsung_us_owners_product to production maturity. samsung_support stays soak AND disabled.",
    before:
      "Phase 0 promotion freeze was the controlling production rule as of v0.1. Smartphone catalogue-inventory sources carried Law 2 novelty debt. samsung_support was not a production member.",
    change:
      "smartphone-clank 60bc5f595c79b093abfd084577b9658b197b497e is an explicit operator decision: promote canary samsung_us_owners_product to production maturity. samsung_support stays soak AND disabled. This is a promotion-record event (Law 8), not a live-host SHA. GitHub HEAD is not the running image.",
    why: "A canary that graduates without a named operator decision is an auto-promote. A sibling soak that quietly follows it is a second production source without a record.",
    evidence: [
      {
        id: "ev-v02h-promo-sep5",
        kind: "commit",
        repo: "anil-ganti-nbc/smartphone-clank",
        sha: "60bc5f595c79b093abfd084577b9658b197b497e",
        note: "Promote canary samsung_us_owners_product to production maturity. Explicit operator decision. samsung_support remains soak AND disabled.",
        status: "verified",
      },
    ],
    commits: [
      {
        repo: "anil-ganti-nbc/smartphone-clank",
        sha: "60bc5f595c79b093abfd084577b9658b197b497e",
        note: "canary → production maturity",
      },
    ],
    conceptIds: ["experimental-vs-production", "promotion-gate", "soak", "source-admission"],
    lawIds: ["law-8"],
    incidentIds: [],
    residualRisk:
      "Live deployed SHA UNKNOWN. Do not teach 60bc5f5 as the running image. Do not promote samsung_support by implication.",
    verification:
      "Named operator promotion in git: VERIFIED. Host running 60bc5f5: UNKNOWN. samsung_support still soak+disabled in this commit's record, not a live probe.",
    confidence: "verified",
  }),
  e("h-quartermaster", {
    date: "2026-09-09",
    period: "as of 2026-09-09 census",
    phaseId: "p-control-planes",
    systems: ["quartermaster"],
    event:
      "Census PROBABLE local-only Quartermaster. No GitHub remote evidenced. Nested token-stats observed as dirty git. Path not inspectable. confidence incomplete.",
    before:
      "Model/quota/resource spend was not a named plane. Motherclank did not own it; nothing else claimed it in git.",
    change:
      "ClankOps census 2026-09-09T23:09:03Z source=RECONSTRUCTED lists quartermaster-clank as PROBABLE (medium) at C:\\Users\\anil\\Desktop\\Quartermaster Clank, evidence 'desktop Quartermaster wrapper (launcher + token-stats)'. Condensed census: remote `-`, branch `-` — not 'no git'. Nested token-stats (SUPPORT_COMPONENT, upstream Annihilater/token-stats, not a Clank repo) was observed as a git checkout: dirty=true, dirty_count=4, latest commit 2026-08-31T09:02:30+05:30 'fix: render recommendation fit percentages'. The quartermaster-clank candidate itself records is_git=false at the folder root. This campaign cannot inspect the path. There is no canonical GitHub repository for Quartermaster. Existence is inferred from the reconstructed census only.",
    why: "A resource/quota tool without a GitHub remote is still a plane if the operator uses it — but this Handbook cannot pretend it audited the code, and 'no GitHub remote' is not 'no git'.",
    evidence: [
      {
        id: "ev-v02h-qm-census",
        kind: "report",
        repo: "anil-ganti-nbc/clankops",
        path: "docs/CLANK_CENSUS.md",
        sha: "4467c137f5c5db1a10ee29484628677bcd3c3284",
        note: "PROBABLE local-only Quartermaster Clank. Path not inspectable this campaign. No GitHub remote. Nested token-stats observed as dirty git on 31 August.",
        status: "incomplete",
      },
    ],
    commits: [],
    conceptIds: ["quartermaster", "model-quota"],
    lawIds: [],
    incidentIds: ["inc-quartermaster-boundary"],
    residualRisk:
      "Do not invent a SHA, a GitHub repo, or a production deploy. Do not treat token-stats as a Clank. Quartermaster is not fleet authority and not Motherclank.",
    verification:
      "Census row PROBABLE local-only: VERIFIED as a reconstructed census claim. Code, path, and runtime: INCOMPLETE — not inspectable.",
    confidence: "incomplete",
  }),
  e("h-reddit-pilot", {
    date: "2026-09-09",
    period: "2026-09-09",
    phaseId: "p-second-act",
    systems: ["semiconductor-intelligence"],
    event:
      "SI a9a202ad: r/hardware experimental muted. Reddit is a source-admission experiment, not a Clank.",
    before:
      "Semiconductor Intelligence sources were deterministic plugins plus Signal Radar. No Reddit admission plane. v0.1 fleet cards did not include Reddit.",
    change:
      "semiconductor-intelligence a9a202ad82d6365890d49a34de75dceeac329762 admits r/hardware as an experimental muted source. Muted means it does not exercise production delivery. Reddit is not a top-level Clank identity, not a fleet card, and not a GitHub birth. Census lists _RedditAdmission as SUPPORT_COMPONENT, not as a Clank.",
    why: "A new source that ships with a Discord path is a promotion. Experimental muted is how you admit a source without laundering it into production.",
    evidence: [
      {
        id: "ev-v02h-reddit",
        kind: "commit",
        repo: "anil-ganti-nbc/semiconductor-intelligence",
        sha: "a9a202ad82d6365890d49a34de75dceeac329762",
        note: "r/hardware experimental muted. Source admission, not a Clank identity.",
        status: "verified",
      },
    ],
    commits: [
      {
        repo: "anil-ganti-nbc/semiconductor-intelligence",
        sha: "a9a202ad82d6365890d49a34de75dceeac329762",
        note: "Reddit pilot experimental muted",
      },
    ],
    conceptIds: ["reddit-admission", "source-admission", "experimental-vs-production"],
    lawIds: ["law-8"],
    incidentIds: ["inc-reddit-admission"],
    residualRisk:
      "Do not add a reddit or reddit-clank fleet card. Live SI SHA UNKNOWN. Experimental muted is not production recall.",
    verification:
      "Named SI commit and muted admission: VERIFIED. Reddit-as-Clank: forbidden. Host running a9a202ad: UNKNOWN.",
    confidence: "verified",
  }),
  e("h-clankops-census", {
    date: "2026-09-09",
    period: "2026-09-09T23:09:03Z",
    phaseId: "p-control-planes",
    systems: ["clankops"],
    event:
      "Census 2026-09-09T23:09:03Z source=RECONSTRUCTED: 63 candidates, VERIFIED 17, PROBABLE 5, UNKNOWN 13, SUPPORT_COMPONENT 13, NOT_A_CLANK 14, NEEDS_RECONSTRUCTION 1, local_only 25, 8 duplicate identity groups.",
    before:
      "Fleet membership was fleet.yaml as_of 2026-08-22 plus operator memory and a directory listing. L-FLEET-001 already forbade directory sweep as identity.",
    change:
      "clankops.census read-only scan at 2026-09-09T23:09:03Z, imported source=RECONSTRUCTED. Counts: 63 / 17 / 5 / 13 / 13 / 14 / 1; github_backed 38; local_only 25; dirty 16; duplicate_identity_groups 8. Duplicate checkouts (Documents\\Default Project vs Clanks-root, Desktop Watch clank) are extra refs, not second Clanks. clankops itself is PROBABLE local-only in this artefact; the GitHub repo created_at 2026-09-09T23:10:37Z is ~90s later and is not in the scan. cvc-clank is NEEDS_RECONSTRUCTION (dubious ownership). Quartermaster and CVC Workbench are PROBABLE local-only. Reddit is not a candidate Clank.",
    why: "Filesystem paths and GitHub names are references. Identity has to survive a second checkout and a missing remote.",
    evidence: [
      {
        id: "ev-v02h-census-md",
        kind: "report",
        repo: "anil-ganti-nbc/clankops",
        path: "docs/CLANK_CENSUS.md",
        sha: "4467c137f5c5db1a10ee29484628677bcd3c3284",
        note: "Reconstruction artefact, not live ClankOps history. scanned_at_utc 2026-09-09T23:09:03Z.",
        status: "verified",
      },
      {
        id: "ev-v02h-census-json",
        kind: "file",
        repo: "anil-ganti-nbc/clankops",
        path: "data/bootstrap/clank_census.json",
        note: "census_version 1, source notes: Facts in this artefact predate ClankOps and must be imported as RECONSTRUCTED.",
        status: "verified",
      },
    ],
    commits: [],
    conceptIds: ["census-identity", "checkout-vs-identity", "system-identity", "clankops"],
    lawIds: [],
    incidentIds: ["inc-duplicate-checkout"],
    residualRisk:
      "Do not treat reconstructed classifications as live ClankOps history. Do not promote PROBABLE rows to VERIFIED. UNKNOWN stays UNKNOWN. GitHub birth of clankops is a later fact (h-clankops-f10 window), not this scan.",
    verification:
      "Census artefact and counts: VERIFIED from docs/CLANK_CENSUS.md + JSON. Live identity of any candidate: not upgraded by this row.",
    confidence: "verified",
  }),
  e("h-watch-sentinel", {
    date: "2026-09-10",
    period: "2026-09-10",
    phaseId: "p-second-act",
    systems: ["watch-clank"],
    event:
      "watch-clank 930aef1e: casio_multi JP product component official sitemap lane. Horology Sentinel work in this window. HEAD is not live.",
    before:
      "Watch production wiring and QC-volume repairs were v0.1 history. casio_multi had earlier delivery-silence scars. Live Watch SHA UNKNOWN.",
    change:
      "watch-clank 930aef1e0aac29062600d06537e85a1426ec4e9e adds casio_multi JP product component official sitemap lane. Horology Sentinel work belongs in this window as repo activity, not as a host probe. This SHA is GitHub HEAD-class evidence for the lane, not a live deployed SHA. COM-001 historical proof for Watch remains d03bc4b2, a different column.",
    why: "A new official sitemap lane is a source admission. Teaching HEAD as production would collapse Law 6 again.",
    evidence: [
      {
        id: "ev-v02h-watch-sentinel",
        kind: "commit",
        repo: "anil-ganti-nbc/watch-clank",
        sha: "930aef1e0aac29062600d06537e85a1426ec4e9e",
        note: "casio_multi JP official sitemap lane. HEAD is not live. Not the COM-001 historical proof SHA.",
        status: "verified",
      },
    ],
    commits: [
      {
        repo: "anil-ganti-nbc/watch-clank",
        sha: "930aef1e0aac29062600d06537e85a1426ec4e9e",
        note: "casio_multi JP sitemap lane",
      },
    ],
    conceptIds: ["lane-instance", "source-admission", "head-vs-deployed"],
    lawIds: ["law-6", "law-8"],
    incidentIds: ["inc-live-deployment-proof"],
    residualRisk: "Live Watch SHA UNKNOWN. Do not overwrite COM-001 d03bc4b2 with 930aef1e. Do not teach Horology Sentinel as a host process.",
    verification:
      "Named commit: VERIFIED. Live Watch SHA / timer enablement: UNKNOWN.",
    confidence: "verified",
  }),
  e("h-discord-delivery", {
    date: "2026-09-10",
    period: "2026-09-10",
    phaseId: "p-second-act",
    systems: ["smartwatch-clank"],
    event:
      "smartwatch 9d85f926: Discord outbox, activation cutoff, editorial gate. Schema v3→v4 additive. Persist-before-send.",
    before:
      "Smartwatch delivery was unsupported_by_policy in the v0.1 capability matrix. Dual-lane soak had been retired. Restored volume carried a known gap.",
    change:
      "smartwatch-clank 9d85f926474e55310f3b565782c1c5cc4b7a20ea adds Discord outbox with activation cutoff and editorial gate. Schema v3→v4 is additive. Persist-before-send is the delivery invariant: a row that is not durable is not a send. Git-resident delivery machinery is not proof the webhook is the live authority or that this SHA is running.",
    why: "A send that precedes persist is a notification the notebook can forget. An additive schema is how you avoid a silent epoch.",
    evidence: [
      {
        id: "ev-v02h-sw-discord",
        kind: "commit",
        repo: "anil-ganti-nbc/smartwatch-clank",
        sha: "9d85f926474e55310f3b565782c1c5cc4b7a20ea",
        note: "Discord outbox, activation cutoff, editorial gate. Schema v3→v4 additive. Persist-before-send. Not a live SHA.",
        status: "verified",
      },
    ],
    commits: [
      {
        repo: "anil-ganti-nbc/smartwatch-clank",
        sha: "9d85f926474e55310f3b565782c1c5cc4b7a20ea",
        note: "Discord persist-before-send",
      },
    ],
    conceptIds: ["outbox", "schema-compatibility", "editorial-eligibility"],
    lawIds: [],
    incidentIds: [],
    residualRisk:
      "Live smartwatch SHA UNKNOWN. Additive schema in git ≠ migrated volume on the host. Dual-host Discord risk remains a Law 5/6 question.",
    verification:
      "Named delivery commit: VERIFIED. Host webhook authority and running SHA: UNKNOWN.",
    confidence: "verified",
  }),
  e("h-ctw-manual", {
    date: "2026-09-10",
    period: "2026-09-10",
    phaseId: "p-second-act",
    systems: ["chinese-tech-wire", "korean-tech-wire", "feature-phone-clank"],
    event:
      "CTW e7f10f84: DB races + Health drops stale scheduler UI; CTW manually operated here. KTW The Elec members-only filtered. FPC gitignores compose .env.",
    before:
      "CTW dogfood had already caught a guessed refresh path. Health UIs could still display a scheduler as live from a template. KTW editorial sources included members-only surfaces. FPC compose .env could leak into git.",
    change:
      "chinese-tech-wire e7f10f843e2066a088c45602d47c8cc05d887589 addresses DB races and a Health UI that dropped stale scheduler claims. CTW is manually operated in this window — that is an operator-mode fact, not a cron probe. korean-tech-wire c80a69697ac94d4069c818e015f6c5f10bdb5986 filters The Elec members-only (can-the-operator-read-this). feature-phone-clank c376801cb2cbf59c30c1d7e305ae24ecc4cea0e5 gitignores compose .env. None of these SHAs is liveDeployedSha.",
    why: "A dashboard that paints a stale timer as healthy is Law 3 in the GUI. A members-only source the operator cannot read is not a newsroom sensor. Secrets in git are a different blast radius than untracked logs/.",
    evidence: [
      {
        id: "ev-v02h-ctw-health",
        kind: "commit",
        repo: "anil-ganti-nbc/chinese-tech-wire",
        sha: "e7f10f843e2066a088c45602d47c8cc05d887589",
        note: "DB races + Health drops stale scheduler UI. CTW manually operated in this window. Not live SHA.",
        status: "verified",
      },
      {
        id: "ev-v02h-ktw-elec",
        kind: "commit",
        repo: "anil-ganti-nbc/korean-tech-wire",
        sha: "c80a69697ac94d4069c818e015f6c5f10bdb5986",
        note: "The Elec members-only filtered (can-the-operator-read-this).",
        status: "verified",
      },
      {
        id: "ev-v02h-fpc-env",
        kind: "commit",
        repo: "anil-ganti-nbc/feature-phone-clank",
        sha: "c376801cb2cbf59c30c1d7e305ae24ecc4cea0e5",
        note: "gitignore compose .env.",
        status: "verified",
      },
    ],
    commits: [
      { repo: "anil-ganti-nbc/chinese-tech-wire", sha: "e7f10f843e2066a088c45602d47c8cc05d887589", note: "CTW DB race + health UI" },
      { repo: "anil-ganti-nbc/korean-tech-wire", sha: "c80a69697ac94d4069c818e015f6c5f10bdb5986", note: "The Elec members-only" },
      { repo: "anil-ganti-nbc/feature-phone-clank", sha: "c376801cb2cbf59c30c1d7e305ae24ecc4cea0e5", note: "gitignore compose .env" },
    ],
    conceptIds: ["health-check", "race-condition", "source-admission"],
    lawIds: ["law-3", "law-7"],
    incidentIds: ["inc-writer-lock", "inc-health-honesty"],
    residualRisk:
      "CTW manual operation is this window's mode, not a claim that cron is absent forever. Live SHAs UNKNOWN. Members-only filter is policy, not proof of coverage.",
    verification:
      "Three named commits: VERIFIED. Live CTW/KTW/FPC SHA and scheduler: UNKNOWN. Manual-operation claim is operator-mode, not journalctl.",
    confidence: "verified",
  }),
  e("h-oem-git-revision", {
    date: "2026-09-10",
    period: "2026-09-10",
    phaseId: "p-second-act",
    systems: ["oem-radar"],
    event:
      "OEM 24d61dd: GIT_REVISION as OEM_RADAR_GIT_SHA. Runtime identity in the artefact, still not a live host probe from this campaign.",
    before:
      "OEM inventory SHA was 410313b (2026-08-22). COM-001 historical proof is 070914c. Repo HEAD kept moving. Runtime identity was still a Law 6 UNKNOWN cell.",
    change:
      "oem-radar 24d61dd4238ad03c073ae592c57e2ffa6fbdb488 threads GIT_REVISION through as OEM_RADAR_GIT_SHA so a running process can name its own build. That is git-resident runtime-identity machinery. This Handbook campaign still has no SSH; liveDeployedSha stays UNKNOWN. Do not copy 24d61dd into liveDeployedSha just because the code now has a place to put a SHA.",
    why: "A process that cannot name its own revision forces operators to guess from GitHub. Machinery to carry the SHA is not the same as a probe that reads it.",
    evidence: [
      {
        id: "ev-v02h-oem-rev",
        kind: "commit",
        repo: "anil-ganti-nbc/oem-radar",
        sha: "24d61dd4238ad03c073ae592c57e2ffa6fbdb488",
        note: "GIT_REVISION as OEM_RADAR_GIT_SHA. Runtime-identity machinery in git, not a live probe.",
        status: "verified",
      },
    ],
    commits: [
      {
        repo: "anil-ganti-nbc/oem-radar",
        sha: "24d61dd4238ad03c073ae592c57e2ffa6fbdb488",
        note: "GIT_REVISION runtime identity",
      },
    ],
    conceptIds: ["runtime-identity", "runtime-provenance", "head-vs-deployed", "ci-vs-deployment"],
    lawIds: ["law-6"],
    incidentIds: ["inc-deployed-sha", "inc-live-deployment-proof"],
    residualRisk:
      "liveDeployedSha remains UNKNOWN. 24d61dd is not the COM-001 historical proof (070914c) and is not the 2026-08-22 inventory SHA (410313b).",
    verification:
      "Named runtime-identity commit: VERIFIED. Host-reported OEM_RADAR_GIT_SHA: UNKNOWN (no SSH this campaign).",
    confidence: "verified",
  }),
  e("h-clankops-f10", {
    date: "2026-09-14",
    period: "2026-09-09 to 2026-09-14",
    phaseId: "p-control-planes",
    systems: ["clankops"],
    event:
      "ClankOps Foundation 10 at 4467c137 / PR #11: managed agent exit is evidence, not a handoff. Local SQLite, no production deploy.",
    before:
      "Census reconstruction (h-clankops-census) predates the GitHub repo by ~90 seconds. Foundations 0–9 built missions, sessions, git reconcile, CI evidence, deployment provenance, attention, resume packets, and launcher admission. Child process return was still easy to mistake for a Foundation 1 handoff.",
    change:
      "clankops 4467c137f5c5db1a10ee29484628677bcd3c3284, PR #11 merged 2026-09-14T03:37:53Z. Foundation 10 records AGENT_PROCESS_EXITED / AGENT_PROCESS_START_FAILED. Process exit is not a handoff: Session stays OPEN, Mission is unchanged, no checkpoint or next_action is invented. Missing process evidence stays UNKNOWN, never RUNNING. Local-first Python + SQLite, read-only localhost Terminal, no production deploy, no cron, no remote SSH. Actor and launcher names are provenance, not permission. Resume packets write zero ledger events.",
    why: "A managed child that returns is not a completed mission. Collapsing exit into handoff would invent a next action the operator never wrote.",
    evidence: [
      {
        id: "ev-v02h-f10",
        kind: "commit",
        repo: "anil-ganti-nbc/clankops",
        sha: "4467c137f5c5db1a10ee29484628677bcd3c3284",
        note: "Foundation 10 managed agent exit. PR #11. Local SQLite, no production deploy.",
        status: "verified",
      },
      {
        id: "ev-v02h-f10-pr",
        kind: "doc",
        repo: "anil-ganti-nbc/clankops",
        url: "https://github.com/anil-ganti-nbc/clankops/pull/11",
        note: "PR #11 merged 2026-09-14T03:37:53Z. Process exit is evidence, not handoff.",
        status: "verified",
      },
    ],
    commits: [
      {
        repo: "anil-ganti-nbc/clankops",
        sha: "4467c137f5c5db1a10ee29484628677bcd3c3284",
        note: "Foundation 10 / PR #11",
      },
    ],
    conceptIds: [
      "clankops",
      "process-exit-vs-handoff",
      "mission-lifecycle",
      "resume-packet",
      "attention-queue",
      "launcher-provenance",
      "managed-agent-provenance",
    ],
    lawIds: [],
    incidentIds: ["inc-process-exit-handoff"],
    residualRisk:
      "No production deploy. Local SQLite only. Do not treat ClankOps as Motherclank, Standards, or Quartermaster. CI green on a PR is not a host deploy.",
    verification:
      "PR #11 merge and SHA 4467c137: VERIFIED. Production deploy: none (explicit). Live ClankOps SHA on a host: not claimed.",
    confidence: "verified",
  }),
  e("h-handbook-v02", {
    date: "2026-09-14",
    period: "2026-09-14",
    phaseId: "p-second-act",
    systems: ["clank-systems-handbook"],
    event:
      "Commissioned Handbook v0.2 update. Freeze lifted by operator authorization. Epistemic firewall retained. Live SHA still UNKNOWN.",
    before:
      "v0.1 frozen at 1803f317 (h-v01-freeze). Nine phases, 12 fleet cards, live provenance incomplete, CVC excluded, epistemic rules binding. Collectors and new planes moved for two weeks without a Handbook spine.",
    change:
      "Operator-authorised freeze-lift. v0.1 phases are not rewritten. New phases p-standards, p-control-planes, p-second-act append. Epistemic firewall retained: UNKNOWN stays UNKNOWN; GitHub HEAD ≠ deployed; census is RECONSTRUCTED; Quartermaster local-only incomplete; CVC unmerged PRs are not current architecture; Reddit is not a Clank. Strict counts: v0.1 knew 12 fleet cards; strict post-v0.1 GitHub births 2 (clank-ledger, clankops); logical new systems 3 (Quartermaster, Ledger, ClankOps); major systems absent from v0.1 now incorporated 5 (CVC, Standards, Quartermaster, Ledger, ClankOps).",
    why: "A silent rewrite of v0.1 would erase the freeze the operator actually imposed. A commissioned lift keeps the boundary visible and lets the second act be dated.",
    evidence: [
      {
        id: "ev-v02h-v02-lift",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-systems-handbook",
        path: "src/content/v02/history.ts",
        note: "Commissioned v0.2 append. Does not rewrite v0.1 phases. Live SHA still UNKNOWN.",
        status: "verified",
      },
    ],
    commits: [],
    conceptIds: [
      "frozen-corpus",
      "historical-conformance",
      "current-conformance",
      "operator-role",
      "system-identity",
    ],
    lawIds: ["law-6"],
    incidentIds: ["inc-live-deployment-proof"],
    residualRisk:
      "Live SHA still UNKNOWN. This row does not close host probes. Do not recount the strict counts as 12 GitHub births or as 5 GitHub-only systems — Quartermaster is local-only; CVC and Standards predate some of the GitHub-birth cut.",
    verification:
      "Commissioned freeze-lift and retained epistemic firewall: VERIFIED as this campaign's charter. Live SHA: UNKNOWN. Census: RECONSTRUCTED. Quartermaster: incomplete.",
    laterConsequence:
      "Future Handbook versions append; they do not silently retcon v0.1 or v0.2.",
    confidence: "verified",
  }),
];
