import type { Module } from "../../lib/handbook/schema.ts";

export const MODULES_V02: Module[] = [
  {
    id: "mod-standards",
    area: "architecture",
    title: "Standards Clank — law is not the common implementation",
    summary:
      "A ratified MUST/SHOULD is law. A common implementation, a green suite, and a README sentence are not. 26/26 RATIFIED across 5 frozen domains at master 7c821ea (2026-09-05). COM-001 9/9 is historical live proof, not current-canon live. Agents cannot self-ratify. Front-door README 12/3 is stale. M58 verdict STANDARDS_CLANK_COMPLETE_WITH_NON_BLOCKING_DEBT. Handbook teaches; it does not ratify.",
    conceptIds: [
      "standards-clank",
      "normative-spec",
      "ratification",
      "conformance",
      "historical-conformance",
      "current-conformance",
      "superseding-evidence",
      "historically-proven-deploy",
      "schema-compatibility",
      "fail-closed-migration",
      "operator-role",
      "contract",
    ],
    sections: [
      {
        heading: "Normative vs implementation",
        body: "A standard is a named, versioned MUST/SHOULD/MAY with rationale, evidence references, and a lifecycle (PROPOSED → REVIEWED → RATIFIED). An implementation that happens to be common — three collectors refusing a mismatched schema, a Discord runtime logging a SHA — is evidence that a rule might be ready, not the rule itself. Tests that pass at a SHA prove those assertions, not that the assertion is law. README prose is a door sign; the JSON under standards/<domain>/STD-*.json is the artefact. Charter section C places fleet control and deployment operation outside Standards Clank. This Handbook is teaching, not a twelfth ratification path.",
        conceptIds: ["normative-spec", "contract", "tests-prove"],
      },
      {
        heading: "Only the operator can ratify",
        body: "Decision 0002: an agent cannot self-ratify. Agents draft JSON, write reviews, rebuild evidence indexes, and run the suite. Status moves to RATIFIED only on explicit operator sign-off. M58 at 7c821ea recorded STANDARDS_CLANK_COMPLETE_WITH_NON_BLOCKING_DEBT as a recording artefact — it 'ratifies nothing, admits no fact, creates no obligation'. M57 independently re-verified Watch and Smartphone COM-002 barriers and did not self-ratify those standards. Exceptions are equally gated: agents may propose; only a human approves. Treating a closure audit as a silent promotion of remaining PROPOSED files would be self-ratification by another name.",
        conceptIds: ["ratification", "operator-role", "standards-clank"],
      },
      {
        heading: "Conformance is a fact at a named SHA",
        body: "Conformance is 'this subject, this standard, this exact 40-hex SHA, this verdict, this evidence locator'. It is not 'the code looks similar' and not 'CI is green'. Deployment known-evidence-index at 7c821ea carries 18 facts: 9 COM-001 + 9 COM-002 over the same 9-subject set, no duplicate keys, no contradictory verdicts, every source_reference resolving. COM-001 is live-proof shaped (materially running). COM-002 is a property of deployed code behaviour — can the running application distinguish compatible from known-incompatible persistent state — and source-level proof can close it. Mixing those fact kinds is how a historical live proof gets laundered into 'currently running newest canon'.",
        conceptIds: ["conformance", "verification", "sha"],
      },
      {
        heading: "Historical conformance is not erased by later movement",
        body: "COM-001 live proofs around 2026-09-05 closed 9/9 named targets: Watch, KTW, Tablet, Feature Phone, OEM Radar, Smartwatch, Smartphone, CTW, Semiconductor. M55 admitted semiconductor-intelligence LIVE_PROOF_CONFIRMED at 53cb3f1 on Hetzner staging under cron → deploy_run.sh → Docker one-shot, delivery OFF. M52 admitted CTW at cfbd315 on NAS. Those receipts remain true as history. M56's verdict named the distinction: FLEET_DEPLOY_COM_001_CLOSED_HISTORICALLY_BUT_CURRENT_DRIFT_EXISTS. SOURCE_CANON_MOVED (5 linear ancestors behind) is not ADMITTED_DEPLOYMENT_FACT_INVALIDATED (0). Later evidence supersedes a current claim without burning the earlier photo.",
        conceptIds: ["historical-conformance", "historically-proven-deploy", "superseding-evidence"],
      },
      {
        heading: "Current conformance is UNKNOWN without a new audit",
        body: "Whether TODAY's source and runtime still match CURRENT canon is a new question. GitHub HEAD is not deployed SHA. M56 current-canon reconciliation (read-only ls-remote + compare): 4 EXACT_CURRENT (oem-radar 070914c, smartphone e514c45, ctw cfbd315, semiconductor 53cb3f1) and 5 BEHIND_CURRENT (watch +9, feature-phone +4, ktw +3, smartwatch +3, tablet +2). Charter section F does not require continuous newest-canon deployment congruence; M56's five-repo drift is OPERATIONAL_REVALIDATION, not a Standards blocker. This Handbook does not fill liveDeployedSha from those 2026-09-05 proofs. A new host probe, or a new source audit against current canon, is the only thing that would.",
        conceptIds: ["current-conformance", "head-vs-deployed", "historically-proven-deploy"],
      },
      {
        heading: "Evidence index vs current source revision",
        body: "The evidence index is a graph of admitted facts. Current source revision is whatever origin/main (or master) points at this morning. They diverge on purpose. UI ledger: 150 facts, 141 CURRENT / 9 HISTORICAL, all historical NONCONFORMING with resolving supersession — no duplicate CURRENT pairs. M57 added Watch and Smartphone COM-002 facts and left the M56 16/9/7 snapshot unedited. Frozen integrity at 7c821ea: 5/5 tags unmoved, 26/26 normative STD-*.json byte-identical, every post-freeze addition an evidence-layer file. An index that silently bumped historical COUNTS to look current would be the lie this module exists to teach against.",
        conceptIds: ["superseding-evidence", "conformance", "provenance"],
      },
      {
        heading: "26/26, five frozen domains, stale 12/3 door",
        body: "At 7c821ea the frozen set is 26 RATIFIED, 0 PROPOSED, five domains: UI, Data/Ontology, Operations, Deployment, Collector UI Design. Ten empty scaffold directories (collectors, sources, classification, events, evidence, health, delivery, soak, security, operator-workflow) are explicitly not gaps under charter sections B/F — the domain list is a work list, not a debt. Front-door README.md and standards/README.md still say 12 RATIFIED / 3 PROPOSED from Operator Ratification Decisions 001/002 (2026-08-30). That is documentation debt D12, not a second official count and not a reversion of later ratifications. Do not teach 12/3 as current law. Do not teach 26/26 as 'the README was updated'.",
        conceptIds: ["standards-clank", "ratification", "normative-spec"],
      },
      {
        heading: "Schema compatibility is fail-closed, not a migration story",
        body: "STD-DEPLOY-COM-002: refuse unsafe startup when persistent state is UNKNOWN, CORRUPT, NEWER, or otherwise unproven. Feature-phone b60e881, smartwatch a933554, tablet b3088ebc are named source closures. M57 re-verified Watch run_pipeline.py:97 returning EXIT_SCHEMA_MISMATCH=3 and Smartphone ensure_schema_or_refuse refusing unstamped (l.234) and any current != head (l.240) before normal work at run_once.py:216. Neither rests on prose inheritance or on M48's 0007→0008 migration success. A successful migration at one DB state does not demonstrate the refusal invariant. COM-002 closed 9/9 applicable at source; live host behaviour today stays UNKNOWN.",
        conceptIds: ["schema-compatibility", "fail-closed-migration", "migration"],
      },
      {
        heading: "M58 closure and non-blocking debt",
        body: "M58 whole-project closure audit at 7c821ea: STANDARDS_CLANK_COMPLETE_WITH_NON_BLOCKING_DEBT. Independent reconstruction: all three evidence graphs rebuilt (deployment 18/18, operations 7/7, UI 0/0 drift). Self-ratification audit clean: all 26 standards trace to Accepted operator decisions; no implementation treated as law; no historical UNKNOWN laundered into CONFORMS; no 'tests pass' as sole normative proof. 13-entry debt register, zero BLOCKING — historical, documentation, source-test, evidence-model, operational. 1196 tests passed, unpiped. Closure is assessed against local HEAD of that day; it is not a claim that every collector is currently deployed at newest canon, and it is not this Handbook becoming law.",
        conceptIds: ["standards-clank", "ratification", "tests-prove"],
      },
    ],
  },
  {
    id: "mod-clankops",
    area: "architecture",
    title: "ClankOps — the development control plane (Foundations 0–10)",
    summary:
      "ClankOps answers what exists, what was being developed, and how a future agent resumes without the original chat. Foundations 0–10. main 4467c13 2026-09-14 (PR #11). Python 3.14+, local SQLite, no production deploy, no cron, no remote SSH. Census 2026-09-09 is reconstructed, not live history. Mission≠Session, Session≠process, process exit≠handoff, CI≠deployment, HEAD≠deployed, observation≠permission, attention≠health, resume≠LLM summary, launcher≠authority.",
    conceptIds: [
      "clankops",
      "append-only-ledger",
      "census-identity",
      "system-identity",
      "checkout-vs-identity",
      "lane-instance",
      "mission-lifecycle",
      "session-lifecycle",
      "process-vs-session",
      "process-exit-vs-handoff",
      "context-recovery",
      "resumable-development",
      "ci-vs-deployment",
      "runtime-identity",
      "attention-queue",
      "resume-packet",
      "managed-agent-provenance",
      "launcher-provenance",
    ],
    sections: [
      {
        heading: "Why ClankOps exists even though the others exist",
        body: "Motherclank answers what the fleet is doing (derived snapshots; never remediates). Diagnostic answers what failed and how to classify it. Standards answers what is law. Quartermaster answers model/resource/quota. Ledger answers whether editors found the output useful. None of them store development state: which Clank you were in the middle of changing, which Mission is unfinished, where the last checkpoint stopped, whether CI at a SHA was captured, whether a managed agent process exited with the Session still open. Development jumps, gets interrupted, and is resumed months later by a different agent with no original chat. ClankOps is that logbook. It must not absorb the others. Integration is future work; absorbing them would recreate a supervisor that writes. Foundation numbers below are ClankOps' own (ARCHITECTURE.md = Foundation 0; docs/FOUNDATION_1.md through FOUNDATION_10.md). Census is Foundation 0 bootstrap, not a separate Foundation. Mission, Session, and handoff live inside Foundation 1. This Handbook does not keep a parallel F-sequence.",
        conceptIds: ["clankops", "motherclank", "diagnostic-clank", "standards-clank", "quartermaster"],
      },
      {
        heading: "Foundation 0 — append-only development ledger",
        body: "Current state is a projection of immutable history. Mutations append events; corrections append compensating events. Projection tables exist only for query convenience and must be rebuildable from events ordered by ledger_seq. Primary keys are UUIDv7 (Python 3.14+; UUID4 fallback forbidden). Mission display ids (COPS-000123) are reseeded from MISSION_CREATED events on rebuild. Event source is typed: USER, AGENT_REPORT, LOCAL_GIT, GITHUB, CI, DEPLOYMENT, SYSTEM, RECONSTRUCTED. An agent claiming a push that GitHub cannot corroborate stays AGENT_REPORT; it is not rewritten as GITHUB. Default DB: %USERPROFILE%\\.clankops\\clankops.db. No production deployment. No Kafka, no cloud database, no LLM summaries in Foundation 0.",
        conceptIds: ["append-only-ledger", "clankops", "authoritative-state", "derived-state"],
      },
      {
        heading: "Foundation 0.1 — ledger hardening",
        body: "events has SQL triggers forbidding UPDATE and DELETE. WAL + foreign_keys=ON + busy_timeout. SQLite must not live on a network share with concurrent remote writers. Projection rebuild is an acceptance test: a fresh database containing only the event rows must reconstruct identical projection state. Unknown timestamps stay unknown; event ts_utc is when ClankOps recorded the fact, not a fabricated historical time. Reconstructed census facts must remain RECONSTRUCTED. Hardening is how the logbook refuses to become a CRUD app that quietly edits yesterday.",
        conceptIds: ["append-only-ledger", "sqlite", "lock"],
      },
      {
        heading: "Foundation 0 census — identity bootstrap",
        body: "Census is Foundation 0 bootstrap (docs/CLANK_CENSUS.md), not Foundation 1. It discovers candidates. It never mutates other repositories. Dirty trees are evidence. The 2026-09-09T23:09:03Z artefact scanned Windows roots (Clanks, Desktop, Documents\\Default Project, dau-ecosystem, Clank Base, chudbox) and is a reconstruction, not live ClankOps history — import with source=RECONSTRUCTED. Counts: 63 candidates, VERIFIED 17, PROBABLE 5, UNKNOWN 13, SUPPORT_COMPONENT 13, NOT_A_CLANK 14, NEEDS_RECONSTRUCTION 1; local_only 25; 8 duplicate identity groups. Logical identity ≠ repo ≠ checkout ≠ deploy lane. Duplicate folders (Documents copies lagging Clanks-root HEAD; Desktop\\Watch clank on a different branch) are extra refs, not extra Clanks. DAU/chudbox are NOT_A_CLANK. Quartermaster is PROBABLE. Local CVC is NEEDS_RECONSTRUCTION.",
        conceptIds: ["census-identity", "system-identity", "checkout-vs-identity"],
      },
      {
        heading: "Foundation 1 — Mission, Session, checkpoint, handoff",
        body: "Foundation 1 is the adoption / Mission-Session-handoff foundation. A Mission is a coherent development objective that survives handoff. work resume reuses an unfinished Mission; it does not invent a new COPS id by launching software. Admission never creates a Mission. clankctl brief oem-radar should answer what this Clank is, which mission is unfinished, where development stopped, what remains, and — only if someone recorded it — what to do next. A Session is one actor working a Mission. Checkpoint + git capture + Mission state is a handoff. sessions stale --older-than 24h is an observation, not a close. An open Session after a managed child returns still needs handoff — Foundation 10 is explicit. Session ≠ process: a running python is PROCESS_STARTED evidence, not a development Session. Collapsing those words is how 'the agent is still running' gets mistaken for 'we handed the work over'. A Mission is not a chat transcript, not a Session, and not a running process.",
        conceptIds: ["mission-lifecycle", "session-lifecycle", "process-vs-session", "process-exit-vs-handoff", "resumable-development", "lifecycle"],
      },
      {
        heading: "Foundation 2 — fleet coverage + read-only Terminal",
        body: "Foundation 2 puts VERIFIED census identities into the ledger and puts a read-only Terminal in front of the projections. fleet-adopt-verified reads the census file and registers VERIFIED identities. Duplicate checkouts become extra refs, not second Clanks. Coverage is a query over adopted identities, not a health score. ClankOps does not replace fleet.yaml (Diagnostic) or Motherclank harvest. Adoption is 'this logical Clank is in the development ledger'; it is not 'this Clank is production', not 'this checkout is the running image', and not a promotion decision. PROBABLE and UNKNOWN stay classified; they are not auto-promoted to VERIFIED to make coverage prettier. The Terminal is localhost-only and read-only. It does not schedule collection, deploy anything, take Clank locks, or send Discord. Dossier views (text plus icon/shape) may show process facts once Foundation 10 records them. Display age does not churn context_fingerprint; a real new observation does. A GUI that can only look is the same safety idea as Motherclank's camera: a supervisor that can write is a second Clank. ClankOps Terminal is not Motherclank harvest and not DiagnosticBench.",
        conceptIds: ["census-identity", "checkout-vs-identity", "system-identity", "clankops", "operator-role"],
      },
      {
        heading: "Foundation 3 — Git / GitHub reconciliation",
        body: "Foundation 3 observes what is actually on disk and on GitHub, then compares. Reconcile stays read-only. Local git inspection is stored as git_evidence.source=LOCAL_GIT on a checkpoint; it does not convert surrounding development claims into LOCAL_GIT. GitHub corroboration is its own source. Agent statements are not automatically GitHub facts. Dirty repositories observed during census were not cleaned. Source HEAD is not deployed HEAD — that sentence is the hinge into Foundation 6. ClankOps observing that origin/main moved is not a host pull and not a restart.",
        conceptIds: ["git", "github", "head-vs-deployed", "origin"],
      },
      {
        heading: "Foundation 4 — GitHub CI evidence",
        body: "Foundation 4 observes GitHub check-runs and status contexts for a SHA. CI green ≠ deployed. Observer ok=True is not git corroboration and does not rewrite Foundation 3 aligned/partial/drift. Exact-head Actions on PR #11 (run 34797842854, head f62e85f) proved that PR's 297 tests — not that ClankOps is running in production (it has no production deploy), not that oem-radar's drain restarted, and not that a host SHA changed. Empty CI is none only when both observers succeeded and returned no check-runs and no status contexts. Unknown stays unknown. Foundation 4 does not write that observation into the ledger; that write is Foundation 5.",
        conceptIds: ["ci-vs-deployment", "ci", "tests-prove"],
      },
      {
        heading: "Foundation 5 — CI artefacts attached to Mission",
        body: "Foundation 5 is the explicit write: clankctl ci capture attaches the current GitHub CI observation to an unfinished Mission as an artefact (kind=github_ci, source=CI). Reconcile stays read-only. Capture is a separate command. Attaching a CI artefact is ledger evidence. It is not a deployment, not a host pull, and not a timer restart. It does not rewrite checkpoints or Foundation 3 git comparison. A later reader can explain the stored CI state from artefact metadata without a live GitHub fetch.",
        conceptIds: ["ci-vs-deployment", "ci", "tests-prove"],
      },
      {
        heading: "Foundation 6 — deployment / runtime provenance",
        body: "Foundation 6 records deployed/runtime observations as their own evidence. Source HEAD is not deployed HEAD. CI success is not deployment success. Running is not authoritative. Capture is explicit; Foundation 6 does not live-SSH. OEM Radar 24d61dd is the specimen outside ClankOps: GIT_REVISION baked in as OEM_RADAR_GIT_SHA because discord_runtime showed git_sha=unknown inside containers (no .git in the image; build-arg never reached the environment). ClankOps can record that someone captured a runtime identity; it cannot invent a live SHA for this Handbook.",
        conceptIds: ["runtime-identity", "runtime-provenance", "ci-vs-deployment", "head-vs-deployed"],
      },
      {
        heading: "Foundation 7 — attention queue / freshness",
        body: "Foundation 7 derives an attention queue of what you are in danger of forgetting, and why. Freshness is metadata, not truth. Attention writes zero ledger events. It is not a health score, not Motherclank synthesis, not Ledger usefulness. clankctl attention / attention --no-github ask the logbook without pretending GitHub is the host. MANAGED_PROCESS_EXITED_WITH_OPEN_SESSION is derived only while that Session remains open; Foundation 1 handoff/end removes it.",
        conceptIds: ["attention-queue", "clankops"],
      },
      {
        heading: "Foundation 8 — resume packets",
        body: "Foundation 8 emits a derived resume packet so any development agent can enter an existing Clank without the original chat. Admission never creates a Mission. The packet is not an LLM summary. If next_action was not recorded, the packet must not invent one. Display age does not churn context_fingerprint; a real new observation does. clankctl resume-packet --no-github is how you ask the logbook. Packet generation writes zero ledger events.",
        conceptIds: ["resume-packet", "context-recovery", "resumable-development"],
      },
      {
        heading: "Foundation 9 — launcher admission",
        body: "Foundation 9 makes the prepare/admit contract the managed agent launch gate. Prepare, admit, then spawn. Actor and launcher names are provenance, not permission. Observation of a Cursor launch does not authorize writing Clank DBs or ratifying a standard. --actor cursor --launcher cursor are provenance fields. Fail closed before spawning when prepare fails, admission is AMBIGUOUS without an explicit Mission, or there is no unfinished Mission.",
        conceptIds: ["managed-agent-provenance", "launcher-provenance", "operator-role"],
      },
      {
        heading: "Foundation 10 — managed process-exit observability",
        body: "Foundation 10 records managed process exit as immutable evidence. PR #11 merged to main 4467c13 (2026-09-14): AGENT_PROCESS_EXITED after a managed Foundation 9 child returns; AGENT_PROCESS_START_FAILED when the subprocess cannot be created. Process exit is evidence, not handoff: Session stays OPEN, Mission unchanged, no invented checkpoint/next_action. An open Session after the child returns still needs Foundation 1 handoff. Missing process evidence stays UNKNOWN, never RUNNING. launch_agent() exposes executable / argv_count / argv_redacted — raw child argv is execution input, not output evidence.",
        conceptIds: ["process-exit-vs-handoff", "process-vs-session", "managed-agent-provenance"],
      },
      {
        heading: "Distinctions that must not collapse",
        body: "Mission ≠ Session. Session ≠ process. Process exit ≠ handoff. Handoff ≠ deployment. Source HEAD ≠ deployed. CI ≠ deployment. Running ≠ authoritative. Observation ≠ permission. Freshness ≠ truth. Attention ≠ health. Resume ≠ LLM summary. Launcher ≠ authority. Duplicate checkout ≠ duplicate Clank. Lane ≠ logical product. Reconstructed census ≠ live history. GitHub HEAD of clankops (4467c13) is not a production SHA — there is no production deploy to confuse it with, and that is the point, not a gap to fill.",
        conceptIds: ["mission-lifecycle", "session-lifecycle", "process-exit-vs-handoff", "ci-vs-deployment"],
      },
    ],
  },
  {
    id: "mod-ledger",
    area: "systems",
    title: "Clank Ledger — HIT/MISS is not fleet health",
    summary:
      "M0 editorial outcome plane. Jules branch IS the product (2c31787, no main). HIT vs MISS vs QC vs editorial outcome vs article performance are five questions. Technical health ≠ usefulness. SQLite/SQLAlchemy/Alembic, CLI, server-rendered review UI, AST-guarded against other Clanks. Append-only history with derived current state.",
    conceptIds: [
      "clank-ledger",
      "hit-miss",
      "editorial-usefulness",
      "append-only-ledger",
      "miss",
      "recall",
      "mission-fail",
    ],
    sections: [
      {
        heading: "What Ledger owns",
        body: "Clank Ledger answers: was the thing the Clank surfaced actually useful; what did it miss; what did the operator do with the result; what editorial value (if any) did it produce; what provenance exists for each human judgement. It is the standalone human/editorial outcome evidence plane, kept isolated from Motherclank, Diagnostic, Standards, CVC, and ClankOps during M0. Census lists it VERIFIED as github-only; default branch is jules-m0-foundation-9044736841197359665. There is no main. Teaching 'Ledger lives on main' would be inventing a trunk that does not exist.",
        conceptIds: ["clank-ledger", "editorial-usefulness"],
      },
      {
        heading: "HIT vs MISS vs QC vs editorial vs performance",
        body: "A HIT is 'surfaced'. A MISS is 'not surfaced', with an operator reason hint (DISCOVERY_GAP and kin). Human QC is a later append-only judgement on a HIT: USEFUL, NOT_USEFUL, FALSE_POSITIVE, OUT_OF_STOCK. Editorial outcome is later still: PENDING, WROTE, DID_NOT_WRITE. Article performance is later again: BANGER, GOOD, MEH, FLOP. useful_rate = USEFUL / reviewed HITs — the denominator is reviewed HITs, not all rows, not all collector events, not Motherclank HEALTHY counts. BANKAI 6349→0 is a recall miss in the collector plane; it does not automatically become a Ledger MISS row. Do not collapse the five ticks.",
        conceptIds: ["hit-miss", "miss", "recall"],
      },
      {
        heading: "Technical health is not usefulness",
        body: "A collector can be CURRENT and HEALTHY on ping, CI can be green, COM-001 can be historically proven, and the editor can still have nothing they wanted to write. That is the dual-plane lesson applied to humans: operational success ≠ newsroom usefulness. Ledger is where that second plane is supposed to live as durable evidence rather than as chat memory. M0 does not crawl, does not notify, does not compute a unified Clank health score, and does not promote sources. A dashboard of USEFUL rates is not Motherclank synthesis.",
        conceptIds: ["editorial-usefulness", "mission-fail", "dual-plane-health"],
      },
      {
        heading: "M0 shape: SQLite, CLI, server-rendered UI, AST-guard",
        body: "Standalone relational schema on SQLite + SQLAlchemy 2.x + Alembic. CLI: ledger add-hit / add-miss / list / show / qc / outcome / stats. Local FastAPI server-rendered UI with a rapid review queue and keyboard shortcuts. Append-only audit history for QC decisions and editorial outcomes; current state is derived. Seam for future external evidence references (external_system, external_id, external_ref_type) is reserved, not implemented as a live bus. AST-guarded against other Clanks: Ledger must not grow Motherclank harvest, Diagnostic diagnose(), Standards ratification, or ClankOps mission logic by 'just importing'. Explicit non-goals in the README are the fence.",
        conceptIds: ["clank-ledger", "append-only-ledger", "sqlite"],
      },
      {
        heading: "What this campaign does not claim",
        body: "Jules 2c31787 is git-resident M0. Whether anyone is running the UI, whether Alembic has been applied on a host, whether any HIT rows exist in a live DB: UNKNOWN. This Linux campaign did not treat GitHub HEAD as a deployed ledger. Do not invent a production Ledger, a main-branch cutover, or a feed from Motherclank. A later usefulness ingest from Reddit admission would still be Ledger usefulness, not source health.",
        conceptIds: ["head-vs-deployed", "clank-ledger"],
      },
    ],
  },
  {
    id: "mod-quartermaster",
    area: "systems",
    title: "Quartermaster — pantry math, not fleet authority",
    summary:
      "LOCAL-ONLY PROBABLE resource/quota awareness. Wrapper around Annihilater/token-stats. Does not decide fleet health, conformance, deployment, or editorial usefulness. No GitHub repo found. Windows path unavailable in this Linux campaign — say so, do not invent a runtime.",
    conceptIds: ["quartermaster", "model-quota", "census-identity", "operator-role"],
    sections: [
      {
        heading: "What the census actually saw",
        body: "ClankOps census 2026-09-09 classified quartermaster-clank PROBABLE (medium) at C:\\Users\\anil\\Desktop\\Quartermaster Clank, evidence 'desktop Quartermaster wrapper (launcher + token-stats)'. Condensed census lists remote `-` and branch `-`; that is not 'no git'. Nested token-stats is SUPPORT_COMPONENT with remote https://github.com/Annihilater/token-stats.git — not a Clank repo, not anil-ganti-nbc — and the census observed it as a git checkout: dirty=true, dirty_count=4, latest commit 2026-08-31T09:02:30+05:30 'fix: render recommendation fit percentages'. The quartermaster-clank candidate itself records is_git=false at the folder root. No GitHub repository named Quartermaster was found under the operator account. This campaign did not inspect the Windows checkout, so Quartermaster's own current branch, architecture and runtime remain INCOMPLETE. ClankOps ARCHITECTURE.md lists Quartermaster as the owner of model/resource/quota decisions in the authority table. That is a boundary claim, not a deployment claim.",
        conceptIds: ["quartermaster", "census-identity"],
      },
      {
        heading: "This campaign could not inspect the Windows path",
        body: "The teaching host for this Handbook pass is Linux. Desktop\\Quartermaster Clank was not mounted, not cloned, not executed. Schema, CLI, whether token-stats is wrapped or vendored, whether any quota recommendation was ever applied: UNKNOWN. Inventing a GitHub remote, a production deploy, a health dashboard, or a 'Quartermaster complete' verdict would be the exact over-read the census classification PROBABLE exists to prevent. UNKNOWN stays UNKNOWN.",
        conceptIds: ["quartermaster", "research-agent"],
      },
      {
        heading: "Owns recommendations, not fleet health",
        body: "Model choice, token spend, local resource budget: Quartermaster's plane. Motherclank still owns observation of collectors. Standards still owns conformance. ClankOps still owns development state. Ledger still owns usefulness. Diagnostic still owns failure classification. A quota warning is not ZERO_ITEMS, not MATERIALIZATION_GAP, not a COM-001 failure, not a MISS. Collapsing resource awareness into 'the fleet is unhealthy' is how a token bill becomes a fake outage.",
        conceptIds: ["model-quota", "dual-plane-health", "operator-role"],
      },
      {
        heading: "Do not invent the rest",
        body: "No production Quartermaster. No cron. No Discord. No GitHub Actions until a repo exists. No claim that token-stats upstream is a Clank. No claim that ClankOps already integrates it — ARCHITECTURE.md says integration is future work. If a later campaign inspects the Windows tree, it must date the inspection and keep this module's UNKNOWN for the earlier window.",
        conceptIds: ["quartermaster", "head-vs-deployed"],
      },
    ],
  },
  {
    id: "mod-cvc",
    area: "architecture",
    title: "CVC Clank — sealed corpus, not a patrol",
    summary:
      "Frozen 42 artefacts. Terminal state CVC_MISSION_COMPLETE_WITH_OPEN_EVIDENCE_BLOCKERS. Does not collect, promote, enforce, or auto-ingest. GitHub 5328a3c 2026-08-30 is what this campaign has. Local Desktop CVC may be ahead and could not be inspected. Unmerged observer PRs are not current architecture. CVC Workbench is a separate local journalist tool.",
    conceptIds: [
      "cvc-clank",
      "frozen-corpus",
      "evidence-package",
      "verification",
      "provenance",
    ],
    sections: [
      {
        heading: "What CVC is for",
        body: "CVC is operator-triggered institutional evidence memory. It records and evaluates lessons from incidents, successful patterns, migrations/restores, diagnostic findings, and ratification support history. Scheduling is NONE. It is not a collector, not a scheduler, not a remediation engine, not Diagnostic Clank, not Standards Clank, and not the daily Context/Verification/Coverage journalism workbench. Diagnostic answers 'what failed and why?'; CVC answers 'what does this teach the fleet?' Operator approval is required. CVC does not automatically ingest every incident, monitor the fleet, or send findings to another Clank.",
        conceptIds: ["cvc-clank", "diagnostic-clank"],
      },
      {
        heading: "Frozen corpus and support packages",
        body: "42 migrated artifacts under corpus/; source and destination hashes in CVC_CORPUS_MIGRATION_MANIFEST_V0.1.json. Frozen files are versioned and must not be rewritten by normal runtime. state/ is mutable, append-only working state, local by default. cvc verify checks migration hashes, JSON/JSONL validity, rule counts, E0–E4 distribution, and the ratified E4 set. ingest hashes and classifies a supplied artefact; check-triggers writes a reviewable check; review writes recommendations only. None of those commands can modify the frozen corpus, support matrix, maturity, ratification, or historical verdicts. That is the museum rule.",
        conceptIds: ["frozen-corpus", "evidence-package", "verification"],
      },
      {
        heading: "Unmerged PRs are not the architecture",
        body: "motherclank#1 (Wire CVC into registry-driven observation) and diagnostic-clank#9 exist and were explicitly not treated as current architecture in the 2026-08-31 boundary audit, and were not merged. A later cvc#1 observer PR, if still unmerged, is the same class: a proposal, not the running design. Teaching CVC as a live observer bus from those PRs would be teaching a branch as production. CVC remains operator-triggered ingest of packages Diagnostic may produce — Diagnostic must not auto-push every incident.",
        conceptIds: ["cvc-clank", "contract"],
      },
      {
        heading: "GitHub 5328a3c vs the Windows tree this campaign could not see",
        body: "Canonical GitHub HEAD captured for teaching: 5328a3c (2026-08-30). Verifier depends on non-portable Windows paths. Census 2026-09-09: local C:\\Users\\anil\\Desktop\\CVC Clank is NEEDS_RECONSTRUCTION (git inspect blocked by dubious ownership). Local CVC may be ahead of GitHub; this campaign could not inspect it. Do not fill that gap from 5328a3c. Do not claim the frozen corpus on GitHub is the live Desktop state. Handbook v0.1 excluded CVC on purpose; v0.2 teaches the GitHub artefact and names the inspection hole.",
        conceptIds: ["cvc-clank", "head-vs-deployed", "census-identity"],
      },
      {
        heading: "CVC Workbench is not CVC Clank",
        body: "Census PROBABLE: C:\\Users\\anil\\Desktop\\CVC Workbench, local project with README and pyproject, no git, heading CVC Workbench. CVC's own README: the planned CVC Workbench for post-selection editorial research is a separate future tool and is not implemented in cvc-clank. Do not merge the journalist GUI into the frozen-corpus Clank. Do not treat a Desktop folder without a remote as GitHub 5328a3c.",
        conceptIds: ["cvc-clank", "census-identity"],
      },
    ],
  },
  {
    id: "mod-reddit-admission",
    area: "systems",
    title: "Reddit admission — a source lifecycle, not a Clank",
    summary:
      "Reddit is not a Clank. Adapter-first, participant-owned. SI a9a202a r/hardware experimental muted RSS; admit_source_for_delivery is the only authority grant. Unmute ≠ admit. r/hardware is VERIFIED in SI; other subreddit names may be INFERRED from worktree names. No generic Reddit Clank, no webhook per subreddit.",
    conceptIds: [
      "reddit-admission",
      "source-admission",
      "experimental-vs-production",
      "qualification-epoch",
      "soak",
      "promotion-gate",
      "collector",
    ],
    sections: [
      {
        heading: "Reddit is not a Clank identity",
        body: "No top-level reddit or reddit-clank belongs in the fleet map. Reddit is a family of sources a participant Clank may admit. A webhook per subreddit, a generic Reddit Clank, or a Discord megaphone that fires because RSS was unmuted would collapse source admission into a new collector identity. ClankOps census lists _RedditAdmission as SUPPORT_COMPONENT (underscore-prefixed directory), not as a VERIFIED Clank. This Handbook will not grow a fleet row for Reddit.",
        conceptIds: ["reddit-admission", "system-identity", "collector"],
      },
      {
        heading: "The admission lifecycle",
        body: "experimental → soak → baseline freeze → admission. First seen is not novelty; silent first-success baseline is restart-safe. Unmute is not admit. Fail-closed watermarks keep notification authority and auto-promotion from consuming each other's membership. Cold (no-snapshot) admission-controlled evaluations fail closed. Law 8 still applies: a soak without a promotion record cannot be compared or rolled back. Qualification provenance matters — Tablet 7fd6939 stamps MANUAL on GUI collect so a click cannot later be read as cadence.",
        conceptIds: ["source-admission", "experimental-vs-production", "qualification-epoch", "soak"],
      },
      {
        heading: "SI r/hardware is the VERIFIED specimen",
        body: "semiconductor-intelligence a9a202a (2026-09-09): M0 Reddit pilot, r/hardware-only RSS (provider=rss, platform=reddit), registered experimentally and muted, polling off by default. Sticky delivery_admission_required; admit_source_for_delivery is the only authority grant; unmute alone and malformed watermarks fail closed. Reddit-specific Atom normalisation; ordinary RSS normalisation byte-identical to pre-M0. No schema migration, no production registration, no deployment in that commit. Motherclank may later observe the resulting participant state through adapters; it does not grant admission. Diagnostic may expose observer surfaces. CVC may validate frozen soak evidence if an operator packages it. Ledger may later receive usefulness without becoming source health.",
        conceptIds: ["reddit-admission", "source-admission", "motherclank"],
      },
      {
        heading: "Other subreddits: claim only what evidence supports",
        body: "FGT/OEM worktrees on feat/reddit-discovery-admission are named architecture for a discovery-admission experiment, not live production webhooks. Subreddit names r/GamingLeaksAndRumours, r/FreeGameFindings, r/GamingLaptops, r/MiniPCs appear as intended architecture in worktree/brief material. Treat them as INFERRED unless a later dated artefact shows registration, mute state, and an admit_source_for_delivery grant. Do not teach a fleet of Reddit sources as VERIFIED. Do not invent per-subreddit Discord routes.",
        conceptIds: ["reddit-admission", "experimental-vs-production", "provenance"],
      },
      {
        heading: "Hands-off to other planes",
        body: "Motherclank observes resulting participant state; it does not unmute. Diagnostic classifies misses/source-gaps on whatever the adapter can read. Standards may later grow a sources-domain standard — that directory is still an empty scaffold at 7c821ea, not a gap under charter B/F. CVC does not auto-ingest a Reddit soak. Ledger usefulness, if it ever lands, is editorial evidence, not 'r/hardware is healthy'. ClankOps may track a Mission that implements admission; that Mission is not itself admission.",
        conceptIds: ["reddit-admission", "diagnostic-clank", "clank-ledger"],
      },
    ],
  },
  {
    id: "mod-second-act",
    area: "history",
    title: "Second act — after the 30 August freeze",
    summary:
      "Handbook v0.1 freeze was real. v0.2 is a commissioned update, not a rewrite of August. After 30 Aug: Standards closure, Ledger M0, ClankOps Foundations 0–10, Quartermaster local-only, collector UI family, 2026-09-05 COM-001 historical proofs, schema-compatibility barriers, Discord-delivery discipline, Horology Sentinel/casio_multi work, Reddit admission experiment, CTW translation/topology. GitHub HEAD is still not deployed SHA.",
    conceptIds: [
      "standards-clank",
      "clankops",
      "clank-ledger",
      "historically-proven-deploy",
      "reddit-admission",
      "schema-compatibility",
      "runtime-identity",
      "qualification-epoch",
      "cvc-clank",
      "quartermaster",
    ],
    sections: [
      {
        heading: "The v0.1 freeze was a real freeze",
        body: "v0.1 taught collectors, SQLite authority, Fleet Laws, Motherclank M0–M4, Diagnostic inventory, 22–23 August scars, and UNKNOWN-honest live cells from git-resident evidence dated through late August. It did not include Standards Clank as a closed 26/26 layer, ClankOps, Ledger M0, Quartermaster, CVC as a frozen corpus, or Reddit admission. Those absences were scope, not ignorance to be back-filled into v0.1 modules. v0.2 is additive teaching. It does not promote August inventory SHAs into September live SHAs.",
        conceptIds: ["head-vs-deployed", "provenance"],
      },
      {
        heading: "Standards closed as law; README did not catch up",
        body: "30 Aug Operator Ratification Decisions 001/002 put 12 UI standards RATIFIED (3 PROPOSED). By 5 Sep master 7c821ea: 26/26 RATIFIED, five frozen domains, M58 STANDARDS_CLANK_COMPLETE_WITH_NON_BLOCKING_DEBT. Front-door README still says 12/3. That stale door is itself a second-act lesson: documentation drift is not de-ratification. Agents still cannot self-ratify. COM-001 9/9 historical live proofs landed in the same window and were immediately distinguished from current-canon live by M56.",
        conceptIds: ["standards-clank", "ratification", "historically-proven-deploy"],
      },
      {
        heading: "Ledger M0 and ClankOps Foundations 0–10",
        body: "31 Aug: clank-ledger Jules branch 2c31787 ships M0 HIT/MISS/QC/outcome — no main. 9 Sep: ClankOps census reconstruction (63 candidates, not live history) and GitHub repo created. 14 Sep: main 4467c13 after PR #11 Foundation 10 managed-agent exit observability. Python 3.14+, local SQLite, no production deploy. The development control plane arrived because unfinished work was being resumed from chat memory, which is not a ledger.",
        conceptIds: ["clank-ledger", "clankops", "process-exit-vs-handoff"],
      },
      {
        heading: "Quartermaster local, CVC frozen, collector UI family",
        body: "Quartermaster remains LOCAL-ONLY PROBABLE wrapping token-stats; this campaign did not see the Windows tree. CVC GitHub 5328a3c froze 42 artefacts on 30 Aug with CVC_MISSION_COMPLETE_WITH_OPEN_EVIDENCE_BLOCKERS; unmerged observer PRs stayed unmerged. Collector UI work continued under the UI and Collector UI Design domains (CUD facts are source_verification, not proof the UI is materially running). Horology Sentinel / casio_multi appear as named post-freeze collector/horology work; live SHA and whether casio_multi's silent-period Law 4 specimen still holds on a host are UNKNOWN without a new probe. Do not invent a Horology production row from the name.",
        conceptIds: ["quartermaster", "cvc-clank", "runtime-identity"],
      },
      {
        heading: "5 September proofs, schema barriers, Discord discipline",
        body: "COM-001 historical proofs for nine systems around 2026-09-05 (Watch, KTW, Tablet, Feature Phone, OEM Radar, Smartwatch, Smartphone, CTW, Semiconductor) are point-in-time live receipts — several with delivery OFF. Source canon moved the same day for five of them. Schema-compatibility barriers (COM-002) closed 9/9 at source (FPC b60e881, smartwatch a933554, tablet b3088ebc among them; Watch and Smartphone admitted in M57). Discord delivery remaining OFF in those proofs is discipline, not a claim that Discord is gone. OEM Radar later baked GIT_REVISION as OEM_RADAR_GIT_SHA (24d61dd, 11 Sep) because container git_sha=unknown — runtime identity still has to be earned after a live proof.",
        conceptIds: ["historically-proven-deploy", "schema-compatibility", "runtime-identity"],
      },
      {
        heading: "Reddit experiment, CTW topology, what is still UNKNOWN",
        body: "SI a9a202a (9 Sep) muted r/hardware RSS behind admit_source_for_delivery. FGT/OEM feat/reddit-discovery-admission worktrees are named, not proven live. CTW translation/topology work is a named post-freeze thread; M52's NAS COM-001 at cfbd315 is the historical deploy receipt, not today's NAS probe. Live host SHA/backup cells remain UNKNOWN. Quartermaster Windows tree UNKNOWN. Local CVC UNKNOWN. Ledger live DB UNKNOWN. v0.2 teaches that these systems now exist in git and in dated artefacts. It does not teach that the present is healthier than the artefacts.",
        conceptIds: ["reddit-admission", "head-vs-deployed", "current-conformance"],
      },
    ],
  },
  {
    id: "mod-responsibilities",
    area: "architecture",
    title: "Federated responsibilities — who answers the new agent",
    summary:
      "The fleet is federated, not hierarchical. No system is 'in charge of everything'. A brand-new agent with no original chat must know which plane to ask: what exists, what is law, what was being developed, what is running, what failed, what resources are available, what editorial outcomes mattered. Observation is not permission. Teaching is not law.",
    conceptIds: [
      "clankops",
      "standards-clank",
      "motherclank",
      "diagnostic-clank",
      "quartermaster",
      "clank-ledger",
      "cvc-clank",
      "census-identity",
      "resume-packet",
      "operator-role",
    ],
    sections: [
      {
        heading: "Federated, not a pyramid",
        body: "There is no Clank-of-Clanks that owns identity, law, development, runtime, failure, quota, and usefulness at once. Motherclank that wrote would be a second collector with blast radius over every notebook (ADR-0002). Standards that deployed would be a silent operator. ClankOps that harvested production DBs would be Motherclank with extra steps. Ledger that scored fleet health would launder usefulness into ping. CVC that auto-ingested would be an unattended prosecutor. Quartermaster that restarted timers would be M5. Federation is a safety device, not an org chart taste.",
        conceptIds: ["clankops", "motherclank", "standards-clank"],
      },
      {
        heading: "The question a brand-new agent must ask",
        body: "Tomorrow an agent opens with no original chat. Which system tells it: what exists; what is law; what was being developed; what is running; what failed; what resources are available; what editorial outcomes mattered. If the answer is 'one dashboard', the architecture has already collapsed. The rest of this module is the split. Resume packet (ClankOps) is how the agent enters development context without a storyteller. It is not how it learns live host SHA (UNKNOWN until probed), not how it ratifies, and not how it grades editors.",
        conceptIds: ["resume-packet", "resumable-development", "operator-role"],
      },
      {
        heading: "What exists — ClankOps census / identity",
        body: "ClankOps census (reconstructed 2026-09-09, source=RECONSTRUCTED) is the dated roll-call of candidate folders and remotes: 63 / 17 VERIFIED / 8 duplicate groups. Diagnostic fleet.yaml (as_of 2026-08-22) is a different dated membership book for harvest, not today's host. Duplicate checkouts are not duplicate Clanks. Reddit is not a Clank. Quartermaster is PROBABLE local-only. Local CVC is NEEDS_RECONSTRUCTION. Asking ClankOps 'what exists' does not answer 'what is running' or 'what is law'.",
        conceptIds: ["census-identity", "system-identity", "checkout-vs-identity", "clankops"],
      },
      {
        heading: "What is law — Standards Clank",
        body: "26/26 RATIFIED at 7c821ea. Agents cannot self-ratify. Historical COM-001 proofs are law-adjacent evidence, not current live. The Handbook teaches those distinctions; it does not add a 27th standard. Motherclank Fleet Laws remain binding in their scope; they are not replaced by Standards JSON, and Standards JSON is not a Motherclank harvest. A new agent that treats README 12/3 as current law has already failed the first literacy test of v0.2.",
        conceptIds: ["standards-clank", "normative-spec", "ratification", "fleet-law"],
      },
      {
        heading: "What was being developed — ClankOps Mission / Session / resume",
        body: "Open Mission, last checkpoint, git evidence, stale Session, managed process-exit with Session still OPEN: ClankOps. work resume reuses the unfinished Mission. Process exit is not handoff. Launcher name is provenance, not permission. CI artefacts attached to a Mission are not deploys. A new agent that starts a fresh COPS id because python is running has mistaken a process for a Session and a Session for a Mission.",
        conceptIds: ["mission-lifecycle", "session-lifecycle", "process-exit-vs-handoff", "resume-packet"],
      },
      {
        heading: "What is running — runtime provenance, not HEAD",
        body: "Host-evidenced SHA, image digest, baked GIT_REVISION (OEM Radar OEM_RADAR_GIT_SHA after 24d61dd). Motherclank may later photocopy adapter identity if harvest actually ran — live harvest remains UNKNOWN. ClankOps Foundation 6 can record an explicit deployment capture; it does not SSH. GitHub HEAD is not the answer. COM-001 9/9 is historical. Live deployed SHA in this Handbook stays UNKNOWN. A new agent that copies origin/main into the live cell has repeated Law 6's forbidden guess.",
        conceptIds: ["runtime-identity", "head-vs-deployed", "historically-proven-deploy", "motherclank"],
      },
      {
        heading: "What failed — Diagnostic Clank (and CVC for 'what it taught')",
        body: "Diagnostic owns classification, adapters, inventory, inbox. Motherclank may recommend into that inbox; it does not diagnose. CVC, given an operator-triggered evidence package, answers what the failure taught the frozen corpus — it does not collect, promote, or enforce. Unmerged CVC observer PRs are not a live failure bus. A new agent that asks CVC 'is oem-radar down?' is in the wrong building.",
        conceptIds: ["diagnostic-clank", "cvc-clank", "evidence-package", "miss"],
      },
      {
        heading: "What resources are available — Quartermaster; what mattered to editors — Ledger",
        body: "Quartermaster (PROBABLE, local-only, unseen on this Linux campaign) owns model/quota/resource recommendations. It does not own fleet health. Clank Ledger (Jules 2c31787, no main) owns HIT/MISS/QC/editorial/performance. Technical health ≠ usefulness. A new agent that treats a token-stats wrapper as Motherclank, or a USEFUL rate as COM-001, has crossed a fence this module exists to keep up.",
        conceptIds: ["quartermaster", "model-quota", "clank-ledger", "editorial-usefulness"],
      },
      {
        heading: "Forbidden collapses",
        body: "Observation ≠ permission. Census ≠ health. Attention ≠ truth. Resume packet ≠ LLM summary. Launcher ≠ authority. Ratification ≠ agent closeout. Historical proof ≠ current live. Unmute ≠ admit. CI ≠ deploy. Process exit ≠ handoff. Frozen corpus ≠ live fleet. README ≠ current count. Handbook ≠ law. The operator still decides when to stop.",
        conceptIds: ["operator-role", "launcher-provenance", "current-conformance", "experimental-vs-production"],
      },
    ],
  },
];
