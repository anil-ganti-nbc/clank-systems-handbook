import type { ProvenanceCell } from "../../lib/handbook/schema.ts";

/**
 * v0.2 provenance cells for post-v0.1 systems only.
 * Do not duplicate v0.1 collector cells.
 * GitHub HEAD is checkoutHead / originMain. Deployed SHA stays UNKNOWN.
 * This campaign has no SSH. Local Windows paths were not inspected.
 */
const AS_OF = "2026-09-14";
const LIVE =
  "UNKNOWN — live host not reachable from this campaign (no SSH). Do not fill from GitHub HEAD or from COM-001 historical proofs.";

function cell(row: ProvenanceCell): ProvenanceCell {
  return row;
}

export const PROVENANCE_V02: ProvenanceCell[] = [
  cell({
    id: "prov-standards",
    system: "standards-clank",
    checkoutHead: "7c821ea974d8a58e7b049b1bee538a64cca43dc2 (GitHub master 2026-09-05 — M58 closure, 26/26 RATIFIED)",
    originMain: "7c821ea974d8a58e7b049b1bee538a64cca43dc2 (default branch is master, not main)",
    deployedSha: "UNKNOWN — Standards is not a collector runtime. Ratified JSON is git; there is no host process to SHA.",
    runningState: "not a running collector",
    schedulerState: "n/a — operator-ratified standards, not a timer",
    authoritativeDb: "n/a — ratified STD-*.json files in git. Conformance facts are evidence indexes, not observational SQLite.",
    dbEpoch: "n/a",
    hostIdentity: "GitHub anil-ganti-nbc/standards-clank. Not Hetzner.",
    backupState: "git is the copy.",
    confidence: "verified",
    asOf: AS_OF,
    notes:
      "26/26 RATIFIED at 7c821ea. Agents cannot self-ratify. Tests guard the files; they are not the law. This cell is repo-only by design, same class as clank-architecture. deployedSha contains UNKNOWN because there is no collector runtime to probe.",
  }),
  cell({
    id: "prov-cvc",
    system: "cvc-clank",
    checkoutHead: "5328a3cd4e06e1b9fd6ecf56250b4b5d8022d1e4 (GitHub main 2026-08-30 — frozen closeout corpus)",
    originMain: "5328a3cd4e06e1b9fd6ecf56250b4b5d8022d1e4",
    deployedSha: "UNKNOWN — CVC is operator-triggered, unscheduled. No host deploy evidenced this campaign. Local checkout may be ahead of 5328a3c and was not inspected.",
    runningState: LIVE,
    schedulerState: "NONE by charter. Unmerged observer PR #1 is not a scheduler and is not current architecture.",
    authoritativeDb: "Frozen corpus under corpus/ (git). Operator state/ is local working state, not fleet SQLite.",
    dbEpoch: "n/a — frozen historical input. Do not rewrite.",
    hostIdentity: "GitHub anil-ganti-nbc/cvc-clank. Census also lists C:\\Users\\anil\\Desktop\\CVC Clank as NEEDS_RECONSTRUCTION (uninspected).",
    backupState: "git copy of frozen corpus. Local state/ not copied this campaign.",
    confidence: "incomplete",
    asOf: AS_OF,
    notes:
      "CVC validates frozen evidence packages; it does not collect. Do not merge observer PRs (cvc-clank #1, handbook #5) as current architecture. Local-ahead remains a gap.",
  }),
  cell({
    id: "prov-ledger",
    system: "clank-ledger",
    checkoutHead: "2c31787904c270f9423dd22de4c95e669ba26a67 (Jules M0 packaging fix)",
    originMain: "NO-MAIN / Jules branch jules-m0-foundation-9044736841197359665 at 2c31787904c270f9423dd22de4c95e669ba26a67",
    deployedSha: "UNKNOWN — no production deploy. M0 is local SQLite + FastAPI. Do not treat the Jules branch as main.",
    runningState: "UNKNOWN live. Local uvicorn is not Hetzner.",
    schedulerState: "n/a — human/editorial outcome plane, not a collector scheduler",
    authoritativeDb: "Local SQLite via Alembic (M0). Not Clank observational memory. HIT/MISS is editorial usefulness.",
    dbEpoch: "n/a — M0 foundation; no production epoch.",
    hostIdentity: "GitHub anil-ganti-nbc/clank-ledger (Jules default branch). No main.",
    backupState: "git. Operator decision still required for a main line.",
    confidence: "incomplete",
    asOf: AS_OF,
    notes:
      "Jules 2c31787 is the named default, not trunk. HIT/MISS must not be read as collector correctness. Do not invent origin/main.",
  }),
  cell({
    id: "prov-clankops",
    system: "clankops",
    checkoutHead: "4467c137f5c5db1a10ee29484628677bcd3c3284 (GitHub main 2026-09-14 — Foundation 10 merge)",
    originMain: "4467c137f5c5db1a10ee29484628677bcd3c3284",
    deployedSha: "UNKNOWN — ClankOps has no production deploy. Local-first SQLite at %USERPROFILE%\\.clankops\\clankops.db. Repo HEAD is not a running control plane.",
    runningState: LIVE,
    schedulerState: "NONE. No cron. No remote SSH from ClankOps. Process exit is evidence, not a timer.",
    authoritativeDb: "Local events + projections SQLite. Rebuildable from the event log. Not Clank SQLite. Census import is source=RECONSTRUCTED.",
    dbEpoch: "n/a — development ledger, not observational memory.",
    hostIdentity: "GitHub anil-ganti-nbc/clankops plus operator Windows local DB. Not Hetzner.",
    backupState: "git for code. Local clankops.db not copied this campaign.",
    confidence: "incomplete",
    asOf: AS_OF,
    notes:
      "Foundation 10 at 4467c13: process exit ≠ handoff. Census 63/8 is reconstructed. ClankOps observes development; it does not replace Motherclank, Standards, or Quartermaster. Do not collapse it into the fleet camera.",
  }),
  cell({
    id: "prov-quartermaster",
    system: "quartermaster",
    checkoutHead: "LOCAL-ONLY — Windows path C:\\Users\\anil\\Desktop\\Quartermaster Clank not inspected this campaign",
    originMain: "NONE — no GitHub repository. Do not invent one.",
    deployedSha: "UNKNOWN — local-only incomplete. Not a fleet-health runtime.",
    runningState: "UNKNOWN. Census PROBABLE (medium): desktop wrapper around token-stats. Nested token-stats SUPPORT_COMPONENT observed dirty with a 31 August commit; Annihilater/token-stats is not a Clank repo. Quartermaster's own current branch is INCOMPLETE.",
    schedulerState: "UNKNOWN / not a collector scheduler. Recommends model and quota only.",
    authoritativeDb: "n/a — resource recommendation, not observational memory.",
    dbEpoch: "n/a",
    hostIdentity: "Windows desktop LOCAL-ONLY. No GitHub remote evidenced. Nested token-stats is SUPPORT_COMPONENT, not a Clank. Condensed remote `-` / branch `-` is not 'no git'.",
    backupState: "UNKNOWN. Path unavailable.",
    confidence: "incomplete",
    asOf: AS_OF,
    notes:
      "Quartermaster recommends model/quota. It does not score fleet health. LOCAL-ONLY incomplete. No GitHub remote evidenced; nested token-stats was observed as dirty git. Do not invent a GitHub repo. Do not treat token-stats as Quartermaster identity.",
  }),
];
