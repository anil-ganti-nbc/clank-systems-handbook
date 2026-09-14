import type { LedgerReview } from "../../lib/handbook/schema.ts";

/** Human-review queue for the 17 v0.2 history rows. Git/document-backed walk complete; live probe still deferred. */
function r(row: LedgerReview): LedgerReview {
  return row;
}

export const REVIEWS_V02: LedgerReview[] = [
  r({
    historyId: "h-v01-freeze",
    currentConfidence: "verified",
    supportingArtefacts: [
      "clank-systems-handbook@1803f317 README v0.1 freeze",
      "PR integrate-cvc-clank (#5) exclusion note",
    ],
    verifiedClaims: [
      "v0.1 was feature-frozen at 1803f31749dc219d0662085d6e6b2fb3efc03267 pending owner study.",
      "CVC PR #5 was explicitly excluded from the frozen corpus.",
      "Epistemic rules (UNKNOWN stays UNKNOWN; GitHub HEAD is not deployed SHA) were binding at the freeze.",
    ],
    inferredClaims: [
      "Owner study completed before this v0.2 lift (the lift is commissioned; the study artefact is not in this row).",
    ],
    overreadRisk:
      "Do not treat the freeze as never having happened. Do not fold later collector HEADs into v0.1. Live provenance was incomplete at freeze and remains incomplete.",
    openQuestions: ["Live host SHA/scheduler/backup cells still UNKNOWN — this freeze did not close them."],
    recommendedAction: "await-host-probe",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-cvc-github",
    currentConfidence: "verified",
    supportingArtefacts: [
      "cvc-clank created_at 2026-08-30T17:22:56Z",
      "HEAD 5328a3cd4e06e1b9fd6ecf56250b4b5d8022d1e4",
      "README CVC_MISSION_COMPLETE_WITH_OPEN_EVIDENCE_BLOCKERS",
    ],
    verifiedClaims: [
      "GitHub HEAD 5328a3cd is a frozen corpus that does not collect, promote, or enforce.",
      "Explicitly excluded from Handbook v0.1.",
      "Unmerged observer PRs are not current architecture.",
      "CVC Workbench is a separate local tool, not this repository.",
    ],
    inferredClaims: [
      "Verifier non-portable Windows paths block a portable integrity check from this campaign's Linux workspace.",
    ],
    overreadRisk:
      "Do not teach unmerged observer PRs as the running CVC. Do not merge Workbench into this identity. Frozen corpus ≠ live institutional memory daemon.",
    openQuestions: ["Will the bounded observer PR ever merge, or stay excluded?"],
    recommendedAction: "keep",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-ledger-m0",
    currentConfidence: "verified",
    supportingArtefacts: [
      "clank-ledger@2c317879",
      "default branch jules-m0-foundation-9044736841197359665",
      "README M0 non-goals",
    ],
    verifiedClaims: [
      "Jules M0 exists on that branch at 2c31787904c270f9423dd22de4c95e669ba26a67.",
      "No main branch.",
      "HIT/MISS/QC/editorial, SQLite/SQLAlchemy/Alembic, AST-guarded.",
      "Explicitly not Motherclank, Diagnostic, Standards, CVC, or ClankOps.",
    ],
    inferredClaims: ["A later agent session might open a main; this row must not invent one."],
    overreadRisk:
      "No production deploy. Do not treat Ledger as a fleet health score. Census listing clank-ledger as github-only VERIFIED is identity, not runtime.",
    openQuestions: ["Has anyone recorded a real HIT/MISS against a live Clank, or is the DB still empty?"],
    recommendedAction: "keep",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-schema-barrier",
    currentConfidence: "verified",
    supportingArtefacts: [
      "feature-phone-clank@b60e8813 StateCompatibilityError",
      "tablet-clank@b3088ebc",
      "smartwatch-clank@a9335548 2026-09-02",
      "STD-DEPLOY-COM-002",
    ],
    verifiedClaims: [
      "Fail-closed schema-compatibility barriers exist in those three repos on the cited SHAs.",
      "STD-DEPLOY-COM-002 names the invariant.",
    ],
    inferredClaims: [
      "Those SHAs are running on the host.",
      "Every other collector has the same barrier.",
    ],
    overreadRisk:
      "Git-resident barrier ≠ enabled runtime. Do not copy these SHAs into liveDeployedSha even though two of them reappear as COM-001 historical proofs.",
    openQuestions: ["Which host volume actually fails closed today?"],
    recommendedAction: "keep",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-collector-ui",
    currentConfidence: "verified",
    supportingArtefacts: [
      "oem-radar@070914c8 collector UI",
      "free-game-tracker@011b89fc operator console tests",
      "tablet-clank@7fd69392 GUI qualification",
    ],
    verifiedClaims: [
      "Named UI/qualification commits exist on 2026-09-04 (OEM/FGT) and as Tablet qualification epoch.",
      "070914c is also the COM-001 historical proof SHA for OEM — a different column.",
    ],
    inferredClaims: [
      "A frozen Collector UI Design domain means every Clank console now matches.",
      "Tablet GUI qualification changed Hetzner membership.",
    ],
    overreadRisk:
      "OEM HEAD later moved. Qualification epoch ≠ production. Live SHA UNKNOWN. Do not copy 070914c into liveDeployedSha.",
    openQuestions: ["Which operator consoles are actually being used on the host?"],
    recommendedAction: "keep",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-standards-ratified",
    currentConfidence: "verified",
    supportingArtefacts: [
      "standards-clank@7c821ea9 M58",
      "decisions/0002-no-agent-self-ratification.md",
      "front-door README still 12/3",
    ],
    verifiedClaims: [
      "M58 STANDARDS_CLANK_COMPLETE_WITH_NON_BLOCKING_DEBT at 7c821ea974d8a58e7b049b1bee538a64cca43dc2.",
      "26/26 RATIFIED, 0 PROPOSED, five frozen domains.",
      "Agents cannot self-ratify.",
      "README remaining at 12 RATIFIED / 3 PROPOSED is the named non-blocking debt.",
    ],
    inferredClaims: ["Existing Clanks have been remediated against the 26 standards."],
    overreadRisk:
      "Ratification ≠ remediating the fleet. Do not treat the stale README as the count. Do not let an agent close the debt by editing the README without an operator recount.",
    openQuestions: ["When will the front-door README be allowed to catch up?"],
    recommendedAction: "keep",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-com001-proof",
    currentConfidence: "verified",
    supportingArtefacts: [
      "COM-001 9/9 historical live proofs listed in h-com001-proof",
      "standards-clank@7c821ea9 closure window",
    ],
    verifiedClaims: [
      "Nine named SHAs were historically proven as live deployments (point-in-time).",
      "The list is Watch d03bc4b2, KTW f49bd02e, Tablet b3088ebc, FPC b60e8813, OEM 070914c8, Smartwatch a9335548, Smartphone e514c45d, CTW cfbd3158, SemInt 53cb3f1f.",
    ],
    inferredClaims: [
      "Any of those nine is the SHA running now.",
      "A later HEAD supersedes the proof as current live.",
    ],
    overreadRisk:
      "Do not copy these into liveDeployedSha. Historically proven ≠ currently running. Later HEADs (930aef1e, 24d61dd4, 60bc5f59, e7f10f84, a9a202ad) are different rows.",
    openQuestions: ["What is each lane's live SHA right now?"],
    recommendedAction: "await-host-probe",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-promotions-sep5",
    currentConfidence: "verified",
    supportingArtefacts: ["smartphone-clank@60bc5f59"],
    verifiedClaims: [
      "60bc5f595c79b093abfd084577b9658b197b497e records an explicit operator decision to promote canary samsung_us_owners_product to production maturity.",
      "samsung_support stays soak AND disabled in that record.",
    ],
    inferredClaims: [
      "Hetzner is running 60bc5f59.",
      "samsung_support was promoted by implication.",
    ],
    overreadRisk:
      "Promotion record in git is not a live SHA. Do not auto-promote the sibling soak. Law 8 still wants a record per production source.",
    openQuestions: ["Is samsung_us_owners_product the live production source on the host?"],
    recommendedAction: "await-host-probe",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-quartermaster",
    currentConfidence: "incomplete",
    supportingArtefacts: [
      "clankops docs/CLANK_CENSUS.md PROBABLE quartermaster-clank",
      "Desktop\\Quartermaster Clank path (uninspected)",
    ],
    verifiedClaims: [
      "The reconstructed census lists quartermaster-clank as PROBABLE local-only with no git remote.",
      "Nested token-stats is SUPPORT_COMPONENT (Annihilater/token-stats), not a Clank.",
    ],
    inferredClaims: [
      "The desktop wrapper is a functioning resource/quota plane.",
      "A GitHub repo exists under another name.",
    ],
    overreadRisk:
      "Path not inspectable. No GitHub. Do not invent a SHA or a production deploy. Do not treat Quartermaster as fleet authority. Census is RECONSTRUCTED.",
    openQuestions: [
      "Can the operator produce the local path, a README, or a git remote?",
      "Does Quartermaster recommend, or does it act?",
    ],
    recommendedAction: "await-human",
    recommendedConfidence: "incomplete",
  }),
  r({
    historyId: "h-reddit-pilot",
    currentConfidence: "verified",
    supportingArtefacts: ["semiconductor-intelligence@a9a202ad r/hardware experimental muted"],
    verifiedClaims: [
      "a9a202ad82d6365890d49a34de75dceeac329762 admits r/hardware as experimental muted.",
      "Reddit is a source-admission experiment, not a Clank identity.",
    ],
    inferredClaims: [
      "Muted means zero items ever leave SI toward Discord.",
      "The census _RedditAdmission folder is the same artefact as this commit.",
    ],
    overreadRisk:
      "Do not add reddit or reddit-clank to the fleet map. Experimental muted is not production. Live SI SHA UNKNOWN.",
    openQuestions: ["Is the muted gate still the live SI config?"],
    recommendedAction: "keep",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-clankops-census",
    currentConfidence: "verified",
    supportingArtefacts: [
      "docs/CLANK_CENSUS.md scanned_at_utc 2026-09-09T23:09:03Z",
      "data/bootstrap/clank_census.json census_version 1",
    ],
    verifiedClaims: [
      "Reconstruction artefact with counts 63 / 17 / 5 / 13 / 13 / 14 / 1, local_only 25, 8 duplicate identity groups.",
      "source=RECONSTRUCTED is the import rule.",
      "Duplicate checkouts are extra refs, not second Clanks.",
    ],
    inferredClaims: [
      "PROBABLE rows (Quartermaster, CVC Workbench, editorial-assist, project-anilwriter, then-local clankops) are confirmed systems.",
      "UNKNOWN 13 are Clanks waiting to be named.",
    ],
    overreadRisk:
      "Census is RECONSTRUCTED, not live ClankOps history. Do not upgrade PROBABLE or UNKNOWN. GitHub birth of clankops (~90s later) is not in this scan. Reddit is not a candidate Clank.",
    openQuestions: ["Which duplicate checkout is the operator's working tree today?"],
    recommendedAction: "keep",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-watch-sentinel",
    currentConfidence: "verified",
    supportingArtefacts: ["watch-clank@930aef1e casio_multi JP official sitemap lane"],
    verifiedClaims: [
      "930aef1e0aac29062600d06537e85a1426ec4e9e adds the casio_multi JP product component official sitemap lane.",
      "HEAD is not live.",
    ],
    inferredClaims: [
      "Horology Sentinel is a running host process.",
      "930aef1e superseded COM-001 historical proof d03bc4b2 as current live.",
    ],
    overreadRisk:
      "HEAD ≠ live. Do not overwrite the COM-001 column. Live Watch SHA UNKNOWN.",
    openQuestions: ["Is casio_multi enabled on the host timer set?"],
    recommendedAction: "await-host-probe",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-discord-delivery",
    currentConfidence: "verified",
    supportingArtefacts: ["smartwatch-clank@9d85f926 Discord outbox persist-before-send"],
    verifiedClaims: [
      "9d85f926474e55310f3b565782c1c5cc4b7a20ea adds Discord outbox, activation cutoff, editorial gate, additive schema v3→v4, persist-before-send.",
    ],
    inferredClaims: [
      "The restored smartwatch volume has been migrated to v4.",
      "This SHA is the live Discord authority.",
    ],
    overreadRisk:
      "Git-resident delivery machinery ≠ live webhook authority. Additive schema in git ≠ migrated volume. Live SHA UNKNOWN.",
    openQuestions: ["Which SHA is sending, if any? Is persist-before-send the running path?"],
    recommendedAction: "await-host-probe",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-ctw-manual",
    currentConfidence: "verified",
    supportingArtefacts: [
      "chinese-tech-wire@e7f10f84",
      "korean-tech-wire@c80a6969 The Elec members-only",
      "feature-phone-clank@c376801c gitignore compose .env",
    ],
    verifiedClaims: [
      "Named commits exist for CTW DB-race/health UI, KTW The Elec members-only filter, and FPC compose .env gitignore.",
      "CTW is recorded as manually operated in this window.",
    ],
    inferredClaims: [
      "CTW cron is disabled on the host.",
      "The Elec filter is the live KTW source set.",
    ],
    overreadRisk:
      "Manual-operation is operator-mode, not journalctl. Live SHAs UNKNOWN. Health UI dropping stale scheduler claims in git is not a live dashboard probe.",
    openQuestions: ["Is CTW still manual? What is the live CTW/KTW/FPC SHA?"],
    recommendedAction: "await-host-probe",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-oem-git-revision",
    currentConfidence: "verified",
    supportingArtefacts: ["oem-radar@24d61dd4 GIT_REVISION as OEM_RADAR_GIT_SHA"],
    verifiedClaims: [
      "24d61dd4238ad03c073ae592c57e2ffa6fbdb488 threads GIT_REVISION through as OEM_RADAR_GIT_SHA.",
      "That is runtime-identity machinery in git.",
    ],
    inferredClaims: [
      "The host process reports 24d61dd4 as OEM_RADAR_GIT_SHA.",
      "This SHA replaces COM-001 070914c8 as current live.",
    ],
    overreadRisk:
      "Machinery to carry a SHA is not a probe that reads it. liveDeployedSha stays UNKNOWN. Three OEM columns remain distinct: inventory 410313b, COM-001 070914c, this HEAD-class 24d61dd.",
    openQuestions: ["What does the running OEM process report for OEM_RADAR_GIT_SHA?"],
    recommendedAction: "await-host-probe",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-clankops-f10",
    currentConfidence: "verified",
    supportingArtefacts: [
      "clankops@4467c137 Foundation 10",
      "PR #11 merged 2026-09-14T03:37:53Z",
      "README: local SQLite, no production deploy",
    ],
    verifiedClaims: [
      "PR #11 merged at 4467c137f5c5db1a10ee29484628677bcd3c3284.",
      "Process exit is recorded as evidence, not a handoff.",
      "No production deploy, no cron, no remote SSH.",
    ],
    inferredClaims: [
      "A host somewhere is running ClankOps as a service.",
      "Foundation 10 closed every open Session that had a child exit.",
    ],
    overreadRisk:
      "Local SQLite only. CI green ≠ deploy. ClankOps is not Motherclank. Actor/launcher names are provenance, not permission. Census PROBABLE row is earlier than this GitHub SHA.",
    openQuestions: ["Is anyone's ~/.clankops/clankops.db the operator's working ledger?"],
    recommendedAction: "keep",
    recommendedConfidence: "verified",
  }),
  r({
    historyId: "h-handbook-v02",
    currentConfidence: "verified",
    supportingArtefacts: [
      "src/content/v02/history.ts commissioned append",
      "h-v01-freeze boundary 1803f317",
      "strict counts in the row",
    ],
    verifiedClaims: [
      "This update is a commissioned freeze-lift, not a silent rewrite of v0.1.",
      "Epistemic firewall retained: UNKNOWN stays UNKNOWN; HEAD ≠ deployed; census RECONSTRUCTED; Quartermaster incomplete; CVC unmerged PRs not architecture; Reddit is not a Clank.",
      "Strict counts: v0.1 knew 12 fleet cards; strict post-v0.1 GitHub births 2 (clank-ledger, clankops); logical new systems 3 (Quartermaster, Ledger, ClankOps); major systems absent from v0.1 now incorporated 5 (CVC, Standards, Quartermaster, Ledger, ClankOps).",
    ],
    inferredClaims: ["Owner study of v0.1 is complete because the lift was commissioned."],
    overreadRisk:
      "Do not retcon v0.1 phases. Do not treat the 5 incorporated systems as 5 GitHub births (Quartermaster is local-only; CVC and Standards are not post-v0.1 GitHub-only births). Live SHA still UNKNOWN.",
    openQuestions: ["Live SHA still UNKNOWN — this lift does not close host probes."],
    recommendedAction: "await-host-probe",
    recommendedConfidence: "verified",
  }),
];
