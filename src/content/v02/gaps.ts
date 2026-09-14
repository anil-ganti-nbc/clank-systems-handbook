import type { EvidenceGap } from "../../lib/handbook/schema.ts";

export const GAPS_V02: EvidenceGap[] = [
  {
    id: "gap-v02-live-sha",
    title: "Live deployed SHA still UNKNOWN — no SSH this campaign",
    kind: "live-unknown",
    status: "incomplete",
    relatedHistoryIds: ["h-current-gaps", "h-handbook-v02"],
    relatedIncidentIds: ["inc-live-deployment-proof"],
    relatedLawIds: ["law-6"],
    whyItMatters:
      "v0.2 did not close the Law 6 cell. GitHub HEAD, inventory 2026-08-22, and COM-001 historical proofs are all the wrong objects.",
    whatWouldCloseIt:
      "Operator runs docs/scripts/operator-reprobe.sh on the host and commits the redacted transcript. Do not fill from HEAD.",
  },
  {
    id: "gap-v02-quartermaster-local",
    title: "Quartermaster Windows checkout unavailable to this campaign",
    kind: "missing-artefact",
    status: "incomplete",
    relatedHistoryIds: ["h-quartermaster"],
    relatedIncidentIds: ["inc-quartermaster-boundary"],
    relatedLawIds: [],
    whyItMatters:
      "Census lists Quartermaster PROBABLE at C:\\Users\\anil\\Desktop\\Quartermaster Clank, local-only, no GitHub remote. Nested token-stats was observed as dirty git; the folder-root candidate records is_git=false. Without a read of that path we cannot record Quartermaster's own checkout SHA, only LOCAL-ONLY / INCOMPLETE.",
    whatWouldCloseIt:
      "Operator listing of that directory (HEAD if git, README purpose, token-stats relationship) copied off-host. Do not invent a GitHub remote.",
  },
  {
    id: "gap-v02-ledger-no-main",
    title: "Clank Ledger has no main — Jules branch is the default",
    kind: "awaiting-review",
    status: "incomplete",
    relatedHistoryIds: ["h-ledger-m0"],
    relatedIncidentIds: ["inc-ledger-usefulness"],
    relatedLawIds: [],
    whyItMatters:
      "origin/main does not exist. Teaching 2c31787 as trunk would invent a branch the operator never named. HIT/MISS usefulness must not be misread as collector correctness while the default branch is still a Jules working line.",
    whatWouldCloseIt:
      "Operator decision: create main, rename the default, or keep NO-MAIN explicit in provenance.",
  },
  {
    id: "gap-v02-cvc-local-ahead",
    title: "Local CVC may be ahead of GitHub 5328a3c; not inspected",
    kind: "missing-artefact",
    status: "incomplete",
    relatedHistoryIds: ["h-cvc-github"],
    relatedIncidentIds: [],
    relatedLawIds: ["law-6"],
    whyItMatters:
      "GitHub main 5328a3c is the published frozen corpus. Census flags Desktop CVC as NEEDS_RECONSTRUCTION (dubious ownership). Observer PRs are unmerged and are not current architecture. A quieter local tree is not a secret newer canon.",
    whatWouldCloseIt:
      "Read-only diff of the Windows CVC checkout against 5328a3c, or a record that the path is unreadable. Do not merge observer PRs to close this gap.",
  },
  {
    id: "gap-v02-com001-not-current",
    title: "COM-001 historical live proofs are not a 2026-09-14 live probe",
    kind: "live-unknown",
    status: "incomplete",
    relatedHistoryIds: ["h-com001-proof", "h-current-gaps"],
    relatedIncidentIds: ["inc-historical-conformance", "inc-live-deployment-proof"],
    relatedLawIds: ["law-6"],
    whyItMatters:
      "Nine COM-001 closures (Watch d03bc4b on 2026-09-01, FPC b60e881, and peers) prove dated, scoped runtime. Copying them into liveDeployedSha would launder history into the present.",
    whatWouldCloseIt:
      "A new live probe with its own date, target, and SHA. Until then live stays UNKNOWN and the proofs stay in historicallyProvenDeployedSha.",
  },
  {
    id: "gap-v02-clankops-no-prod",
    title: "ClankOps has no production deploy",
    kind: "live-unknown",
    status: "incomplete",
    relatedHistoryIds: ["h-clankops-f10", "h-clankops-census"],
    relatedIncidentIds: ["inc-process-exit-handoff"],
    relatedLawIds: ["law-6"],
    whyItMatters:
      "Foundation 10 at 4467c13 is git. Default DB is a local SQLite file. There is no Hetzner unit, no cron, no remote SSH from ClankOps. Treating repo HEAD as a running control plane would repeat HEAD≠deployed inside the development ledger.",
    whatWouldCloseIt:
      "Either an explicit production deploy with host-evidenced SHA, or a standing note that ClankOps is local-first and deployedSha stays UNKNOWN.",
  },
];
