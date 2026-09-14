import type { Incident } from "../../lib/handbook/schema.ts";

export const INCIDENTS_V02: Incident[] = [
  {
    id: "inc-historical-conformance",
    title: "A historical proof stays true after canon moves",
    dateRange: "2026-09-05 (COM-001) vs later source HEADs",
    systems: ["standards-clank", "watch-clank"],
    complexity: "multi-layer",
    epistemic: "verified",
    context:
      "STD-DEPLOY-COM-001 is point-in-time and scope-bound. A LIVE_PROOF_CONFIRMED fact at source S on target X at time T asserts that S was materially running at X at T. It does not assert that the newest GitHub HEAD is running later. Standards Clank closed 26/26 RATIFIED at 7c821ea (2026-09-05). Watch was the named Cat A historical exact-target live proof.",
    symptom:
      "Watch GitHub HEAD later moved to 930aef1e0aac29062600d06537e85a1426ec4e9e (casio_multi, 2026-09-10). Operators were tempted to treat the COM-001 proof as erased, or to copy the new HEAD — or the old proof SHA — into 'current live'.",
    competingHypotheses: [
      "Once origin/main moves, the COM-001 proof is void and must be deleted.",
      "The new GitHub HEAD is now the live deployed SHA.",
      "This Handbook may fill liveDeployedSha from the historically proven COM-001 SHA.",
      "The 2026-09-01/05 Watch proof remains a valid historical conformance fact for d03bc4b2f90289686331af0447d5ca4e8cf55822. HEAD is source canon. Live this campaign is UNKNOWN.",
    ],
    diagnosis:
      "Historical conformance and current conformance are different cells. Superseding source canon does not rewrite a dated live-proof row. Filling live from COM-001, or from HEAD, is Law 6 overread.",
    rootCause:
      "A completion claim was being read as a standing property of the repository tip instead of a scoped, dated observation.",
    contributingCauses: [
      "GitHub HEAD is the easiest SHA to copy into a dashboard.",
      "Standards ratification (26/26) looks like 'the fleet is currently conforming'.",
      "No live host probe in this Handbook campaign, so the honest live cell is empty.",
    ],
    causalChain: [
      "Watch COM-001 live proof confirmed at d03bc4b2f90289686331af0447d5ca4e8cf55822 (2026-09-01; M56 reconciled 2026-09-05).",
      "Standards Clank 7c821ea (2026-09-05) records 26/26 RATIFIED. That is canon of the standards corpus, not a live Watch deploy.",
      "Watch origin/main later points at 930aef1e0aac29062600d06537e85a1426ec4e9e (casio_multi, 2026-09-10).",
      "The dated proof is still true of d03bc4b. It is not a claim about 930aef1e, and it is not current live.",
      "Handbook liveDeployedSha stays UNKNOWN. Historically proven deploy is a separate column.",
    ],
    blastRadius:
      "Any Clank whose COM-001 row is copy-pasted into 'what production runs today'. Wrong rollback target. False current-conformance.",
    remediation:
      "Keep historical proof, current source HEAD, and live deployed SHA as three named facts. Law 6: missing live evidence stays UNKNOWN. Do not erase Cat A rows when canon moves.",
    verification:
      "audits/watch-clank-deploy-live-proof-2026-09-01-confirmed.md and M56: Watch admitted proof SHA d03bc4b, category A historical exact-target; category B current canonical live state asserted for no target. M58: 26/26 RATIFIED at standards 7c821ea. This campaign did not re-probe Hetzner; live remains UNKNOWN.",
    residualRisk:
      "A later HEAD can be green in CI and still not be deployed. A historically proven SHA can still be running, but this Handbook will not guess that.",
    architecturalLesson:
      "A historical proof stays true after canon moves. That is not current live. HEAD is not a live probe. COM-001 is not a fill-in for UNKNOWN.",
    evidence: [
      {
        id: "ev-v02-hc-watch-proof",
        kind: "report",
        repo: "anil-ganti-nbc/standards-clank",
        path: "audits/watch-clank-deploy-live-proof-2026-09-01-confirmed.md",
        sha: "d03bc4b2f90289686331af0447d5ca4e8cf55822",
        note: "LIVE_PROOF_CONFIRMED Watch d03bc4b at hetzner user-systemd-docker, 2026-09-01. Historical exact-source scope. Not a current-live claim.",
        status: "verified",
      },
      {
        id: "ev-v02-hc-m56",
        kind: "report",
        repo: "anil-ganti-nbc/standards-clank",
        path: "audits/fleet-deploy-com-001-reconciliation-m56-2026-09-05.md",
        note: "M56 2026-09-05: COM-001 is point-in-time. Cat A Watch d03bc4b. Cat B current canonical live state asserted for no target. Proof SHA is not rewritten when canon moves.",
        status: "verified",
      },
      {
        id: "ev-v02-hc-m58",
        kind: "report",
        repo: "anil-ganti-nbc/standards-clank",
        path: "audits/standards-clank-final-closure-m58-2026-09-05.md",
        sha: "7c821ea974d8a58e7b049b1bee538a64cca43dc2",
        note: "Standards 7c821ea 2026-09-05: 26/26 RATIFIED, 0 PROPOSED. Corpus ratification, not Watch live deploy.",
        status: "verified",
      },
      {
        id: "ev-v02-hc-watch-head",
        kind: "commit",
        repo: "anil-ganti-nbc/watch-clank",
        sha: "930aef1e0aac29062600d06537e85a1426ec4e9e",
        note: "GitHub HEAD (casio_multi, 2026-09-10). Source canon after the COM-001 proof SHA. Not live deployed. Not a reason to erase d03bc4b.",
        status: "verified",
      },
    ],
    conceptIds: [
      "historical-conformance",
      "current-conformance",
      "historically-proven-deploy",
      "superseding-evidence",
      "standards-clank",
    ],
    lawIds: ["law-6"],
    historyIds: ["h-standards-ratified", "h-com001-proof"],
    lab: true,
    probes: [
      {
        id: "p-hc-erased",
        label: "Is the historical COM-001 proof erased when HEAD moves?",
        finding:
          "No. d03bc4b remains a valid historical conformance fact for the 2026-09-01/05 evidence point. M56 forbids rewriting admitted proofs.",
        status: "verified",
      },
      {
        id: "p-hc-head-live",
        label: "Is GitHub HEAD 930aef1e now the live SHA?",
        finding:
          "No. HEAD is source canon (casio_multi, 2026-09-10). Live deployed SHA this campaign: UNKNOWN.",
        status: "verified",
      },
      {
        id: "p-hc-fill-live",
        label: "Can the Handbook fill liveDeployedSha from COM-001?",
        finding:
          "No. Historically proven ≠ current live. Law 6: missing stays UNKNOWN. Copying d03bc4b or 930aef1e into live is overread.",
        status: "verified",
      },
    ],
  },
  {
    id: "inc-live-deployment-proof",
    title: "CI green and GitHub HEAD are not a live probe",
    dateRange: "2026-09-05 COM-001 vs later container bake; this campaign live SHA UNKNOWN",
    systems: ["oem-radar"],
    complexity: "simple-operational",
    epistemic: "verified",
    context:
      "Law 6: every deployment row carries exact SHA or artifact digest evidenced on host; missing stays UNKNOWN. OEM Radar containers have no .git. discord_runtime therefore logged git_sha=unknown unless the image baked GIT_REVISION in as OEM_RADAR_GIT_SHA. CI green and origin/main are different objects from that bake, and from a COM-001 live proof.",
    symptom:
      "People treated GitHub HEAD, CI, the historically proven COM-001 SHA, and the container-baked revision as one identity. Inside the container, git was unknown until bake-time GIT_REVISION.",
    competingHypotheses: [
      "If CI is green on main, production is that SHA.",
      "GitHub HEAD is the live probe.",
      "The COM-001 historically proven SHA 070914c82516c29be781a49acb77c8d86953f1e2 is the container identity, so it may be copied into live.",
      "Baked OEM_RADAR_GIT_SHA 24d61dd4238ad03c073ae592c57e2ffa6fbdb488, COM-001 SHA 070914c, GitHub HEAD, and live deploy are four objects. Live this campaign: UNKNOWN.",
    ],
    diagnosis:
      "Runtime identity was being inferred from source or CI. A container without .git cannot self-report a git SHA. Baking GIT_REVISION is how the image learns its name — it is not proof the host is still running that image today, and it is not the COM-001 object.",
    rootCause:
      "No requirement that 'what is running' be a host-evidenced identity separate from CI, HEAD, and a prior live-proof SHA.",
    contributingCauses: [
      "discord_runtime logged git_sha=unknown with no .git in the image.",
      "GIT_REVISION compose build-arg defaults to 'unknown' if unset.",
      "COM-001 070914c is a tempting fill-in because it was once proven live.",
    ],
    causalChain: [
      "OEM Radar image built with GIT_REVISION baked as OEM_RADAR_GIT_SHA 24d61dd4238ad03c073ae592c57e2ffa6fbdb488 so runtime identity is not 'unknown'.",
      "A separate COM-001 live proof admitted 070914c82516c29be781a49acb77c8d86953f1e2 on hetzner:/home/deploy/staging/oem-radar (2026-09-05 M46).",
      "Those two SHAs are different objects. Neither is GitHub HEAD. Neither is CI.",
      "This Handbook campaign has no live host probe. liveDeployedSha stays UNKNOWN.",
    ],
    blastRadius:
      "Any 'current OEM Radar behaviour' claim that cites only CI, HEAD, the bake SHA, or the COM-001 SHA. Wrong incident attribution. Discord identity lies if bake is skipped.",
    remediation:
      "Law 6. Name four cells: source HEAD, CI artifact, historically proven deploy, live probe. Bake GIT_REVISION so containers can speak; do not treat the bake as a live probe later. UNKNOWN is allowed.",
    verification:
      "M46 COM-001 at 070914c (three-way git/OCI/runtime match on that day). Compose GIT_REVISION bake documented. ClankOps Foundation 6: source HEAD is not deployed HEAD; CI success is not deployment success. This campaign did not SSH; live remains UNKNOWN.",
    residualRisk:
      "A later rebuild can bake a different SHA. A bake that happened is not proof the scheduled one-shot still uses that image. Windows/host UNKNOWN.",
    architecturalLesson:
      "CI green and GitHub HEAD are not a live probe. A baked container SHA is runtime identity of an image, not current host state. Historically proven deploy is a third column. Live stays UNKNOWN until re-probed.",
    evidence: [
      {
        id: "ev-v02-live-com001",
        kind: "report",
        repo: "anil-ganti-nbc/standards-clank",
        path: "audits/oem-radar-deployment-proof-m46-2026-09-05.md",
        sha: "070914c82516c29be781a49acb77c8d86953f1e2",
        note: "LIVE_PROOF_CONFIRMED OEM Radar 070914c on hetzner:/home/deploy/staging/oem-radar, 2026-09-05. Historically proven. Not this campaign's live SHA.",
        status: "verified",
      },
      {
        id: "ev-v02-live-git-revision",
        kind: "file",
        repo: "anil-ganti-nbc/oem-radar",
        path: "docker-compose.yml",
        note: "GIT_REVISION build-arg baked into the image (default unknown). Containers have no .git; discord_runtime logged git_sha=unknown unless this bake exists. Distinct from COM-001 SHA 070914c.",
        status: "verified",
      },
      {
        id: "ev-v02-live-bake-sha",
        kind: "commit",
        repo: "anil-ganti-nbc/oem-radar",
        sha: "24d61dd4238ad03c073ae592c57e2ffa6fbdb488",
        note: "Named container-bake identity (OEM_RADAR_GIT_SHA / GIT_REVISION). Different object from COM-001 070914c. Not current live; this campaign live SHA is UNKNOWN.",
        status: "verified",
      },
      {
        id: "ev-v02-live-f6",
        kind: "doc",
        repo: "anil-ganti-nbc/clankops",
        path: "docs/FOUNDATION_6.md",
        note: "Foundation 6: source HEAD is not deployed HEAD; CI success is not deployment success; running is not authoritative; unknown stays unknown. Capture is not live SSH.",
        status: "verified",
      },
    ],
    conceptIds: [
      "runtime-identity",
      "ci-vs-deployment",
      "head-vs-deployed",
      "historically-proven-deploy",
      "provenance",
    ],
    lawIds: ["law-6"],
    historyIds: ["h-oem-git-revision"],
    lab: true,
    probes: [
      {
        id: "p-live-ci",
        label: "Does CI green on main prove the host is that SHA?",
        finding: "No. CI is a check on a commit. Law 6 wants host-evidenced identity. Missing stays UNKNOWN.",
        status: "verified",
      },
      {
        id: "p-live-same-sha",
        label: "Is the baked OEM_RADAR_GIT_SHA the COM-001 SHA?",
        finding:
          "No. Bake 24d61dd ≠ historically proven 070914c. Different objects. Neither fills live this campaign.",
        status: "verified",
      },
      {
        id: "p-live-unknown",
        label: "What is the live deployed SHA for this campaign?",
        finding: "UNKNOWN. No live host probe. Do not copy HEAD, CI, bake, or COM-001 into that cell.",
        status: "verified",
      },
    ],
  },
  {
    id: "inc-process-exit-handoff",
    title: "Process exit is not a session handoff",
    dateRange: "2026-09-14 (ClankOps Foundation 10, PR #11)",
    systems: ["clankops"],
    complexity: "multi-layer",
    epistemic: "verified",
    context:
      "ClankOps Foundation 10 at 4467c137f5c5db1a10ee29484628677bcd3c3284 (PR #11) adds managed-agent exit observability. Foundation 9 already proved which agent launched, which Mission, which Session, and which resume context. Exit must not collapse those planes.",
    symptom:
      "A managed child returns 0 — or crashes — and operators treat the Session as closed, the Mission as completed or failed, and the resume packet as a substitute for an explicit handoff.",
    competingHypotheses: [
      "Process exit 0 means the agent handed off and the Mission completed.",
      "A crashed agent is a completed (failed) handoff; close the Session automatically.",
      "The resume packet is an LLM summary of the session, so it can stand in for handoff.",
      "Process exit is evidence. Process exit is not handoff. Mission ≠ Session. Resume packet ≠ LLM summary. Foundation 1 handoff remains the only close of work.",
    ],
    diagnosis:
      "Process lifecycle, Session lifecycle, and Mission lifecycle were being treated as one clock. Foundation 10 forbids auto-close, auto-complete, invented next_action, and LLM summarisation on child exit.",
    rootCause:
      "No structural fence between observing that a subprocess returned and declaring that work was handed off.",
    contributingCauses: [
      "Exit code 0 looks like success of the Mission, not of the process.",
      "Missing process evidence looks like 'still running' unless UNKNOWN is kept.",
      "Resume packets are easy to misread as a narrative of what the agent 'did'.",
    ],
    causalChain: [
      "Managed agent is admitted and launched (Foundation 9). SESSION_STARTED is Session authority.",
      "Child returns. ClankOps records AGENT_PROCESS_EXITED (or START_FAILED — never both).",
      "Session remains OPEN. Mission is not completed or failed from the exit code.",
      "Attention may raise MANAGED_PROCESS_EXITED_WITH_OPEN_SESSION. That writes zero ledger events.",
      "Only Foundation 1 handoff / session end closes work. Resume packet stays derived, not a summary.",
    ],
    blastRadius:
      "False 'mission complete' after a crash or a clean process exit. Lost work because nobody handed off. Invented next_action. A health score for agents that ClankOps explicitly refuses.",
    remediation:
      "Foundation 10 law: process exit is evidence, not handoff. Surfaces show process: EXITED, handoff: MISSING, session: OPEN. clankctl resume-packet remains observational.",
    verification:
      "docs/FOUNDATION_10.md and tests/test_foundation10.py at 4467c137 (PR #11). Zero-conflation table: Session open ≠ process running; exit 0 ≠ Mission completed; exit non-zero ≠ Mission failed; missing process evidence is UNKNOWN.",
    residualRisk:
      "Operators will still read 'exit 0' as done. Auto-complete remains a tempting later feature and is out of scope on purpose. LLM summaries are forbidden here for a reason.",
    architecturalLesson:
      "A crashed agent is not a completed handoff. Process ≠ Session ≠ Mission. A resume packet is a derived fact sheet, not a story the model told itself.",
    evidence: [
      {
        id: "ev-v02-exit-f10",
        kind: "doc",
        repo: "anil-ganti-nbc/clankops",
        path: "docs/FOUNDATION_10.md",
        sha: "4467c137f5c5db1a10ee29484628677bcd3c3284",
        note: "Foundation 10 / PR #11: process exit is evidence, not handoff. AGENT_PROCESS_EXITED vs START_FAILED. No auto-close, no LLM summary, no Clank health score.",
        status: "verified",
      },
      {
        id: "ev-v02-exit-f8",
        kind: "doc",
        repo: "anil-ganti-nbc/clankops",
        path: "docs/FOUNDATION_8.md",
        note: "Resume packet is derived, not authoritative, not an LLM summary. Unknown stays unknown. Packet generation writes zero ledger events.",
        status: "verified",
      },
      {
        id: "ev-v02-exit-readme",
        kind: "doc",
        repo: "anil-ganti-nbc/clankops",
        path: "README.md",
        sha: "4467c137f5c5db1a10ee29484628677bcd3c3284",
        note: "README: Foundation 10 records managed process exit as immutable evidence. An open Session after the child returns still needs Foundation 1 handoff.",
        status: "verified",
      },
    ],
    conceptIds: [
      "process-exit-vs-handoff",
      "mission-lifecycle",
      "session-lifecycle",
      "process-vs-session",
      "resume-packet",
      "clankops",
      "managed-agent-provenance",
    ],
    lawIds: [],
    historyIds: ["h-clankops-f10"],
    lab: true,
    probes: [
      {
        id: "p-exit-zero",
        label: "Does process exit 0 close the Session or complete the Mission?",
        finding: "No. EXITED; Session remains OPEN; Mission is not completed. Handoff is explicit.",
        status: "verified",
      },
      {
        id: "p-exit-crash",
        label: "Is a crashed agent a completed (failed) handoff?",
        finding: "No. Non-zero exit is not Mission failed. Start-failure is START_FAILED, never PROCESS_EXITED.",
        status: "verified",
      },
      {
        id: "p-exit-packet",
        label: "Is the resume packet an LLM summary of the session?",
        finding: "No. Derived observational packet. Not a summary. Not a handoff. Writes zero events.",
        status: "verified",
      },
    ],
  },
  {
    id: "inc-duplicate-checkout",
    title: "Duplicate folders are not duplicate Clanks",
    dateRange: "2026-09-09T23:09:03Z (ClankOps census, source=RECONSTRUCTED)",
    systems: ["clankops", "diagnostic-clank"],
    complexity: "simple-operational",
    epistemic: "verified",
    context:
      "Handbook v0.1 already had L-FLEET-001: directory sweep mistaken for inventory, omitting Tablet. This is the second act, with census vocabulary: VERIFIED / PROBABLE / UNKNOWN / SUPPORT_COMPONENT / NOT_A_CLANK. Census is a reconstruction artefact, not live ClankOps history.",
    symptom:
      "A filesystem walk produced 63 candidates, 8 duplicate identity groups, 25 local_only. Operators were tempted to count folders as Clanks, or to treat a Documents/Default Project copy as a second fleet member.",
    competingHypotheses: [
      "63 candidates means 63 Clanks.",
      "Two folders with the same GitHub remote are two Clanks.",
      "Omission from a directory listing, or presence of a leftover unit file, is membership (L-FLEET-001 again).",
      "Identity is declared. Duplicate checkouts are usually SUPPORT_COMPONENT when a primary exists. Census classifications are evidence, not a second fleet.",
    ],
    diagnosis:
      "Checkout ≠ identity. The census scanner is read-only discovery. Duplicate identity groups name one GitHub repo at two paths. Secondary Default Project / Desktop copies are not new Clanks.",
    rootCause:
      "Inventory inferred from filesystem shape instead of from identity (remote + declared membership), repeating L-FLEET-001 with more folders.",
    contributingCauses: [
      "Windows work accumulated extra checkouts under Documents\\Default Project and Desktop.",
      "Dirty trees and local-only folders look like extra products.",
      "Census source=RECONSTRUCTED is easy to promote into live history if the label is ignored.",
    ],
    causalChain: [
      "clankops.census scans Clanks, Desktop, Documents, dau-ecosystem, Clank Base, chudbox at 2026-09-09T23:09:03Z.",
      "63 candidates; 8 duplicate identity groups (architecture, feature-phone, KTW, smartphone, smartwatch, tablet, watch, chudbox).",
      "Secondaries classified SUPPORT_COMPONENT. 25 local_only. 14 NOT_A_CLANK. 13 UNKNOWN kept, not dropped.",
      "Import must stay source=RECONSTRUCTED. Membership remains a registry/census identity, not ls.",
    ],
    blastRadius:
      "Double-counting fleet size. Motherclank or ClankOps treating a lagged Documents copy as production. Repeating Tablet omission in the other direction (ghost members).",
    remediation:
      "Census vocabulary + duplicate-identity groups. Primary vs SUPPORT_COMPONENT. Do not import reconstruction as USER/GITHUB. L-FLEET-001 still binds: registry, not filesystem.",
    verification:
      "docs/CLANK_CENSUS.md and data/bootstrap/clank_census.json: counts 63 / 8 duplicate groups / local_only 25. Tablet is present as a VERIFIED primary plus a SUPPORT_COMPONENT copy — the v0.1 omission is not repeated as a count error here.",
    residualRisk:
      "A new unregistered checkout is still invisible to a registry that is never updated. UNKNOWN folders must stay UNKNOWN. Census is a snapshot, not live.",
    architecturalLesson:
      "Duplicate folders ≠ duplicate Clanks. A census classifies candidates. It does not birth identities. Directory sweep is still not a fleet.",
    evidence: [
      {
        id: "ev-v02-census-doc",
        kind: "doc",
        repo: "anil-ganti-nbc/clankops",
        path: "docs/CLANK_CENSUS.md",
        note: "Scanned 2026-09-09T23:09:03Z, source=RECONSTRUCTED. 63 candidates, 8 duplicate identity groups, local_only 25. Vocabulary VERIFIED/PROBABLE/UNKNOWN/SUPPORT_COMPONENT/NOT_A_CLANK.",
        status: "verified",
      },
      {
        id: "ev-v02-census-json",
        kind: "file",
        repo: "anil-ganti-nbc/clankops",
        path: "data/bootstrap/clank_census.json",
        note: "Machine-readable census. duplicates[] lists one GitHub identity at two paths. Facts predate ClankOps; import as RECONSTRUCTED.",
        status: "verified",
      },
      {
        id: "ev-v02-census-lfleet",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "conformance/GOLDEN_INCIDENTS.md",
        note: "L-FLEET-001 directory sweep omits Tablet. This census is the second-act version: same failure class, census vocabulary, Tablet now listed as primary + SUPPORT_COMPONENT copy.",
        status: "verified",
      },
    ],
    conceptIds: ["census-identity", "checkout-vs-identity", "system-identity", "diagnostic-clank"],
    lawIds: ["law-5"],
    historyIds: ["h-clankops-census"],
    lab: true,
    probes: [
      {
        id: "p-dup-count",
        label: "Are 63 candidates 63 Clanks?",
        finding:
          "No. 17 VERIFIED, 5 PROBABLE, 13 UNKNOWN, 13 SUPPORT_COMPONENT, 14 NOT_A_CLANK, 1 NEEDS_RECONSTRUCTION. Folders are candidates.",
        status: "verified",
      },
      {
        id: "p-dup-groups",
        label: "Do two checkouts of watch-clank mean two Watch Clanks?",
        finding:
          "No. One identity anil-ganti-nbc/watch-clank; Desktop copy is SUPPORT_COMPONENT. Duplicate folders ≠ duplicate Clanks.",
        status: "verified",
      },
      {
        id: "p-dup-recon",
        label: "Is this live ClankOps history?",
        finding: "No. source=RECONSTRUCTED bootstrap. Dirty trees observed, not cleaned. Not a live inventory probe.",
        status: "verified",
      },
    ],
  },
  {
    id: "inc-reddit-admission",
    title: "Reddit is a source-admission experiment, not a Clank",
    dateRange: "2026-09-09 (semiconductor-intelligence a9a202ad, reddit-pilot-m0-hardware)",
    systems: ["semiconductor-intelligence"],
    complexity: "multi-layer",
    epistemic: "verified",
    context:
      "Law 8: no source reaches production scheduling without soak evidence, an explicit promotion record, and rollback state. Semiconductor Intelligence grew a silent experimental Reddit RSS pilot, r/hardware only. Census later parked _RedditAdmission as SUPPORT_COMPONENT.",
    symptom:
      "A Reddit collector-shaped branch existed. Temptation: register Reddit as a Clank, unmute it into production, or let Motherclank harvest Reddit directly so 'someone is collecting it'.",
    competingHypotheses: [
      "Reddit is a new top-level Clank identity.",
      "Unmute is enough to deliver; polling can be turned on in production without a promotion record.",
      "Motherclank should become the Reddit collector so the experiment has a home.",
      "Silent r/hardware RSS pilot, muted, polling off by default. admit_source_for_delivery is the only authority grant. Unmute alone fails closed. Reddit is a source, not a Clank.",
    ],
    diagnosis:
      "Source admission and Clank identity were being collapsed. The pilot is experimental, not production: no schema migration, no production registration, no deployment. Authority to deliver is a named grant, not a mute bit.",
    rootCause:
      "Presence of Reddit-shaped code and a branch name was treated as membership and as promotion.",
    contributingCauses: [
      "r/hardware looks like a semiconductor-adjacent beat, so SemInt is a tempting owner.",
      "_RedditAdmission on disk looks like a product.",
      "Motherclank harvest is the wrong kind of 'collection' — observer, not collector.",
    ],
    causalChain: [
      "SemInt a9a202ad82d6365890d49a34de75dceeac329762 (2026-09-09) adds a muted r/hardware-only RSS pilot; polling off by default.",
      "admit_source_for_delivery is the only authority grant. Unmute without that grant fails closed.",
      "No schema migration, no production registration, no deployment.",
      "Census lists _RedditAdmission as SUPPORT_COMPONENT, not a Clank. Reddit must not appear as fleet identity.",
      "Motherclank remains observer-tier and must not become the Reddit collector.",
    ],
    blastRadius:
      "A mute-bit flip notifying production. A fake 'Reddit Clank' in inventory. Motherclank growing a collector mouth. Law 8 soak/promotion skipped.",
    remediation:
      "Keep Reddit off the fleet map. Promotion record + soak before any production schedule. fail-closed unmute. Motherclank does not collect.",
    verification:
      "Assigned source SHA a9a202ad on 2026-09-09. Census 2026-09-09T23:09:03Z: SemInt branch reddit-pilot-m0-hardware; _RedditAdmission SUPPORT_COMPONENT. validate.ts forbids fleet ids reddit / reddit-clank.",
    residualRisk:
      "A later unmute that forgets admit_source_for_delivery. Copying the pilot into another collector without Law 8. Treating census SUPPORT_COMPONENT as VERIFIED identity.",
    architecturalLesson:
      "Experimental ≠ production. A source is not a Clank. Unmute is not a promotion gate. Motherclank watches collectors; it does not become one.",
    evidence: [
      {
        id: "ev-v02-reddit-sha",
        kind: "commit",
        repo: "anil-ganti-nbc/semiconductor-intelligence",
        sha: "a9a202ad82d6365890d49a34de75dceeac329762",
        note: "2026-09-09 silent experimental Reddit RSS pilot: r/hardware-only, muted, polling off by default. admit_source_for_delivery is the only authority grant; unmute alone fails closed. No schema migration, no production registration, no deployment.",
        status: "verified",
      },
      {
        id: "ev-v02-reddit-census",
        kind: "doc",
        repo: "anil-ganti-nbc/clankops",
        path: "docs/CLANK_CENSUS.md",
        note: "Census: semiconductor-intelligence on reddit-pilot-m0-hardware. _RedditAdmission classified SUPPORT_COMPONENT, not a Clank.",
        status: "verified",
      },
      {
        id: "ev-v02-reddit-law8",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-architecture",
        path: "FLEET_LAWS.md",
        note: "Law 8 promotion gates: no source reaches production scheduling without soak evidence, promotion record, and rollback state.",
        status: "verified",
      },
    ],
    conceptIds: [
      "reddit-admission",
      "source-admission",
      "experimental-vs-production",
      "soak",
      "promotion-gate",
    ],
    lawIds: ["law-8"],
    historyIds: ["h-reddit-pilot"],
    lab: true,
    probes: [
      {
        id: "p-reddit-clank",
        label: "Is Reddit a Clank?",
        finding: "No. It is a source-admission experiment on SemInt. Census SUPPORT_COMPONENT. Not fleet identity.",
        status: "verified",
      },
      {
        id: "p-reddit-unmute",
        label: "Does unmute grant delivery?",
        finding: "No. admit_source_for_delivery is the only authority grant. Unmute alone fails closed. Polling off by default.",
        status: "verified",
      },
      {
        id: "p-reddit-mother",
        label: "Should Motherclank become the Reddit collector?",
        finding: "No. Motherclank is observer-tier. Collecting Reddit would cross the supervisory boundary.",
        status: "verified",
      },
    ],
  },
  {
    id: "inc-ledger-usefulness",
    title: "A healthy collector can still produce useless output",
    dateRange: "2026-08-31 (Clank Ledger M0, Jules branch; no main)",
    systems: ["clank-ledger"],
    complexity: "simple-operational",
    epistemic: "verified",
    context:
      "Clank Ledger M0 at 2c31787904c270f9423dd22de4c95e669ba26a67 on Jules branch jules-m0-foundation-9044736841197359665. There is no main. Ledger owns HIT/MISS, human QC (USEFUL/NOT_USEFUL/FALSE_POSITIVE/OUT_OF_STOCK), and editorial outcomes (PENDING/WROTE/DID_NOT_WRITE). AST-guarded against other Clanks. Law 3 already forbids HTTP-success-as-health; Ledger is the editorial plane of the same split.",
    symptom:
      "A collector run is technically healthy (process, HTTP, schema) while editors receive nothing they can use — or a useful lead arrives from a noisy, imperfect source. Operators wanted a single green/red that mixed those planes.",
    competingHypotheses: [
      "Collector HEALTHY means the output was editorially useful.",
      "A NOT_USEFUL HIT means the collector is broken and should be scored unhealthy.",
      "Ledger should emit a fleet health or ClankOps quality score so the two planes become one number.",
      "HIT/MISS/QC/editorial are a different plane from operational health. Technically healthy ≠ useful. A useful lead can come from an imperfect source.",
    ],
    diagnosis:
      "Dual-plane health: operational health and editorial usefulness must not imply each other. Ledger M0 exists so usefulness is recorded without collapsing into Motherclank liveness or ClankOps development state.",
    rootCause:
      "Mission success was being inferred from collector health (or the reverse: useless QC implying a broken collector).",
    contributingCauses: [
      "No main branch — easy to treat M0 as unfinished and therefore ignorable.",
      "Temptation to rank Clanks by useful_rate as if it were uptime.",
      "BANKAI/Law 3 scars already showed green machinery with zero recall; Ledger names the human half.",
    ],
    causalChain: [
      "Jules lands M0 foundation 2c317879 on jules-m0-foundation-9044736841197359665, 2026-08-31. Default branch is that Jules branch, not main.",
      "HIT and MISS are separate. QC dispositions uncollapsed. Editorial outcomes distinct from QC.",
      "Architecture guards forbid imports/HTTP/DB from Motherclank, Diagnostic, CVC, Standards, ClankOps.",
      "A healthy collector can still log NOT_USEFUL. A MISS with SOURCE_GAP is an operator hint, not Diagnostic root cause.",
    ],
    blastRadius:
      "False confidence that 'HEALTHY' means the newsroom was served. Punishing a collector for honest useless output. Invented fleet scores that Ledger explicitly refuses.",
    remediation:
      "Keep Ledger standalone in M0. Record HIT/MISS/QC/editorial. useful_rate is USEFUL/reviewed HITs, not a health score. Law 3 still owns operational honesty.",
    verification:
      "docs/M0_ACCEPTANCE.md, CHARTER.md, AGENTS.md, tests/test_architecture_guards.py. Census: GitHub-only, default branch the Jules branch, github_updated_at 2026-08-31T11:50:34Z. No main.",
    residualRisk:
      "A later integration pass that fetches other foundations and starts scoring them. Collapsing unreviewed into NOT_USEFUL. Treating operator MISS hints as Diagnostic root cause.",
    architecturalLesson:
      "A collector can be technically healthy and produce useless output. A useful lead can come from an imperfect source. Editorial usefulness is not fleet health.",
    evidence: [
      {
        id: "ev-v02-ledger-m0",
        kind: "commit",
        repo: "anil-ganti-nbc/clank-ledger",
        sha: "2c31787904c270f9423dd22de4c95e669ba26a67",
        note: "Clank Ledger M0 on Jules branch jules-m0-foundation-9044736841197359665, 2026-08-31. No main. HIT/MISS/QC/editorial outcomes.",
        status: "verified",
      },
      {
        id: "ev-v02-ledger-charter",
        kind: "doc",
        repo: "anil-ganti-nbc/clank-ledger",
        path: "docs/CHARTER.md",
        note: "Human/editorial outcome evidence plane. Does not own Motherclank liveness, Diagnostic root cause, Standards, or ClankOps fleet scoring.",
        status: "verified",
      },
      {
        id: "ev-v02-ledger-guards",
        kind: "file",
        repo: "anil-ganti-nbc/clank-ledger",
        path: "tests/test_architecture_guards.py",
        note: "AST-guarded isolation: forbidden motherclank, diagnostic_clank, cvc_clank, standards_clank, clankops. Zero fleet health scores.",
        status: "verified",
      },
    ],
    conceptIds: ["hit-miss", "editorial-usefulness", "clank-ledger", "dual-plane-health", "mission-fail"],
    lawIds: ["law-3"],
    historyIds: ["h-ledger-m0"],
    lab: true,
    probes: [
      {
        id: "p-led-healthy",
        label: "Does collector HEALTHY imply editorially useful output?",
        finding: "No. Law 3 + Ledger: operational health ≠ usefulness. A NOT_USEFUL HIT can come from a healthy run.",
        status: "verified",
      },
      {
        id: "p-led-useless",
        label: "Does a useless HIT mean the collector is broken?",
        finding: "No. Useless is a QC disposition. Mission-fail can be correct software. A useful lead can still come from an imperfect source.",
        status: "verified",
      },
      {
        id: "p-led-score",
        label: "Should Ledger emit a Clank health score?",
        finding: "No. M0 forbids fleet health scores, weighted rankings, and ClankOps causal claims. AST guards enforce isolation.",
        status: "verified",
      },
    ],
  },
  {
    id: "inc-schema-barrier",
    title: "An existing DB without a version marker is UNKNOWN, never fresh",
    dateRange: "2026-09-01 to 2026-09-02 (STD-DEPLOY-COM-002 closures)",
    systems: ["feature-phone-clank", "smartwatch-clank", "tablet-clank", "standards-clank"],
    complexity: "multi-layer",
    epistemic: "verified",
    context:
      "STD-DEPLOY-COM-002: where deployed code depends on an independently evolvable persistent-state contract, compatibility is determined at a barrier before normal incompatible work, and known incompatibility fails closed. This is not a requirement to migrate before deploy.",
    symptom:
      "Constructing the store used to run migrations. An existing file without a version marker looked 'fresh'. Newer/partial/corrupt state could be opened or silently upgraded. Operators saw 'it opened' and inferred compatible.",
    competingHypotheses: [
      "If the SQLite file opens, it is compatible.",
      "An existing database without a version marker is a fresh install and may be bootstrapped.",
      "Auto-migrate on SqliteStore construction is safety — refuse to start only if migration throws.",
      "Construction is the barrier. FRESH may bootstrap; known-older/COMPATIBLE may migrate or open; NEWER/UNKNOWN/CORRUPT/PARTIAL raise StateCompatibilityError and leave the file byte-identical.",
    ],
    diagnosis:
      "Compatibility was being inferred from 'file exists' or from 'migrations remaining to run'. COM-002 requires a fail-closed admission barrier before mutation. UNKNOWN ≠ FRESH.",
    rootCause:
      "Store construction performed migration (or marker stamp) before classifying compatibility, so ordinary open was admission.",
    contributingCauses: [
      "A missing schema_migrations / schema_version table looks empty, like a new epoch.",
      "Monotonic markers without a maximum supported version let older code proceed on newer state (Smartwatch pre-M18).",
      "QC archives were unversioned extra files with no gate.",
    ],
    causalChain: [
      "Pre-fix: Feature Phone SqliteStore.__init__ invoked migration; missing marker could be treated as fresh; v6+ could proceed under v5 software.",
      "M14 Feature Phone b60e881319b16d36625268d9ba2d66cb8ea8f818 (recorded 2026-09-02, canonical SHA named 2026-09-01 lineage): read-only-first barrier; FRESH ≠ UNKNOWN.",
      "M18 Smartwatch a93355480bb11e1bd16ae7837256ce9002fc2aa7: marker-without-barrier replaced by inspect-then-admit; marker-less existing state is UNKNOWN.",
      "M13 Tablet b3088ebc716227b99e1d8aa66942c8a6e87bbfcb: main/campaign v3 and QC v1 each fail closed. Refused files remain byte-identical.",
    ],
    blastRadius:
      "Silent schema upgrade of production memory. Older code mutating newer state. A PARTIAL database treated as COMPATIBLE. Irreversible bootstrap of an UNKNOWN file.",
    remediation:
      "COM-002 closures: inspect mode=ro first; admit only FRESH or known-older/COMPATIBLE; NEWER/UNKNOWN/CORRUPT/PARTIAL raise StateCompatibilityError; no write on refusal.",
    verification:
      "feature-phone-persistent-state-remediation-m14, smartwatch M18, tablet M13. Refusal tests: refused file byte-identical. 'DB EXISTS ≠ COMPATIBLE'. Source-level closures; not live production-DB proof.",
    residualRisk:
      "A new store path (dashboard, QC archive, campaign preflight) that skips the barrier. Treating these source closures as live deployed schema proof (they are not). GIC-14 schema drift remains a related but distinct plane.",
    architecturalLesson:
      "Opening is not admission. Fresh is a classified empty contract, not 'we did not see a marker'. Fail closed and leave the bytes alone.",
    evidence: [
      {
        id: "ev-v02-schema-fp",
        kind: "report",
        repo: "anil-ganti-nbc/standards-clank",
        path: "audits/feature-phone-persistent-state-remediation-m14-2026-09-02.md",
        sha: "b60e881319b16d36625268d9ba2d66cb8ea8f818",
        note: "Feature Phone COM-002 CLOSED at b60e881. SqliteStore construction is the barrier. FRESH ≠ UNKNOWN. NEWER/UNKNOWN/CORRUPT/PARTIAL fail closed; refused file byte-identical.",
        status: "verified",
      },
      {
        id: "ev-v02-schema-sw",
        kind: "report",
        repo: "anil-ganti-nbc/standards-clank",
        path: "audits/smartwatch-persistent-state-remediation-m18-2026-09-02.md",
        sha: "a93355480bb11e1bd16ae7837256ce9002fc2aa7",
        note: "Smartwatch COM-002 CLOSED at a933554. Marker-without-barrier was the defect. Arbitrary marker-less state is UNKNOWN and fails closed.",
        status: "verified",
      },
      {
        id: "ev-v02-schema-tab",
        kind: "report",
        repo: "anil-ganti-nbc/standards-clank",
        path: "audits/tablet-persistent-state-remediation-m13-2026-09-02.md",
        sha: "b3088ebc716227b99e1d8aa66942c8a6e87bbfcb",
        note: "Tablet COM-002 CLOSED at b3088eb. Main/campaign v3 and QC v1 fail-closed barriers. Unknown/corrupt/partial/newer refused.",
        status: "verified",
      },
    ],
    conceptIds: [
      "schema-compatibility",
      "fail-closed-migration",
      "epoch",
      "schema",
      "migration",
      "sqlite",
    ],
    lawIds: ["law-7"],
    historyIds: ["h-schema-barrier"],
    lab: true,
    probes: [
      {
        id: "p-schema-fresh",
        label: "Is an existing DB without a version marker fresh?",
        finding: "No. It is UNKNOWN, never fresh. Only a classified empty contract bootstraps. FRESH ≠ UNKNOWN.",
        status: "verified",
      },
      {
        id: "p-schema-open",
        label: "Does opening the file prove compatibility?",
        finding: "No. DB EXISTS ≠ COMPATIBLE. DB OPENED ≠ COMPATIBLE. Construction inspects read-only first.",
        status: "verified",
      },
      {
        id: "p-schema-refuse",
        label: "What happens on NEWER/UNKNOWN/CORRUPT/PARTIAL?",
        finding:
          "StateCompatibilityError (fail closed). File left byte-identical. No silent migrate, delete, or reconstruct.",
        status: "verified",
      },
    ],
  },
  {
    id: "inc-quartermaster-boundary",
    title: "Resource recommendation is not fleet health",
    dateRange: "post-v0.1 local-only PROBABLE; census 2026-09-09; this Linux campaign could not inspect",
    systems: ["quartermaster-clank", "clankops", "motherclank"],
    complexity: "simple-operational",
    epistemic: "incomplete",
    context:
      "Quartermaster Clank is a post-v0.1 local-only PROBABLE system. ClankOps architecture assigns it model/resource/quota decisions and forbids ClankOps from absorbing that plane. This Handbook campaign ran on Linux and could not open the Windows desktop path.",
    symptom:
      "A desktop folder named Quartermaster Clank exists. Temptation: invent a complete architecture, put quota advice inside ClankOps or Motherclank, or treat the wrapper as a verified fleet member.",
    competingHypotheses: [
      "The folder name plus token-stats means we can document a complete Quartermaster architecture.",
      "Model/quota recommendations belong in ClankOps (development state) or Motherclank (fleet harvest).",
      "This campaign inspected C:\\Users\\anil\\Desktop\\Quartermaster Clank and found a GitHub SHA.",
      "Census listed it PROBABLE, local-only, no git, wrapper around Annihilater/token-stats. No GitHub repo found. Incomplete. Resource recommendation ≠ fleet health ≠ development state.",
    ],
    diagnosis:
      "Authority boundaries were being collapsed across three planes. Evidence for Quartermaster internals is local-Windows and unavailable here. Honesty is PROBABLE + incomplete, not a invented design.",
    rootCause:
      "A named desktop wrapper was treated as a specified, inspectable Clank without path access or a remote.",
    contributingCauses: [
      "token-stats is a real upstream checkout (Annihilater/token-stats) sitting inside the wrapper, which looks like a product repo.",
      "ClankOps FUTURE_SCOPE already mentions Quartermaster integration, which can be misread as present tense.",
      "Linux campaign cannot read that NTFS path; guessing fills the gap.",
    ],
    causalChain: [
      "Census 2026-09-09T23:09:03Z lists C:\\Users\\anil\\Desktop\\Quartermaster Clank, classification PROBABLE, is_git false, no remote, evidence 'desktop Quartermaster wrapper (launcher + token-stats)'.",
      "Nested token-stats is SUPPORT_COMPONENT; remote Annihilater/token-stats, not a Clank repo.",
      "This Linux campaign could not inspect that Windows path. No anil-ganti-nbc GitHub repo found.",
      "Do not invent completeness. Model/quota stays outside ClankOps and Motherclank.",
    ],
    blastRadius:
      "Fake architecture in the Handbook. ClankOps growing a quota brain. Motherclank recommending models. Treating a missing local path as a verified system.",
    remediation:
      "Keep Quartermaster PROBABLE/local-only/incomplete. Census as the evidence. token-stats as support substrate. Resource recommendation remains its own layer.",
    verification:
      "CLANK_CENSUS.md quartermaster-clank PROBABLE (medium), no git. token-stats SUPPORT_COMPONENT. ClankOps ARCHITECTURE.md / README.md / FUTURE_SCOPE.md name the boundary. Path contents: not inspected this campaign.",
    residualRisk:
      "A later Windows probe may confirm, split, or reject the identity. Until then UNKNOWN internals. Do not backfill SHAs.",
    architecturalLesson:
      "Do not invent architecture completeness from a folder name. Resource recommendation ≠ fleet health ≠ development state. Unavailable local evidence stays incomplete.",
    evidence: [
      {
        id: "ev-v02-qm-census",
        kind: "doc",
        repo: "anil-ganti-nbc/clankops",
        path: "docs/CLANK_CENSUS.md",
        note: "quartermaster-clank PROBABLE (medium), path C:\\Users\\anil\\Desktop\\Quartermaster Clank, no git, wrapper around launcher + token-stats. Nested token-stats SUPPORT_COMPONENT (Annihilater/token-stats).",
        status: "verified",
      },
      {
        id: "ev-v02-qm-arch",
        kind: "doc",
        repo: "anil-ganti-nbc/clankops",
        path: "docs/ARCHITECTURE.md",
        note: "Authority table: Quartermaster owns model/resource/quota decisions. ClankOps owns development state. Must not absorb the others.",
        status: "verified",
      },
      {
        id: "ev-v02-qm-scope",
        kind: "doc",
        repo: "anil-ganti-nbc/clankops",
        path: "docs/FUTURE_SCOPE.md",
        note: "Quartermaster integration is future work. Current desktop Quartermaster is a wrapper around token-stats (upstream Annihilater) — support substrate, not Clank identity. This Linux campaign did not inspect the Windows path.",
        status: "incomplete",
      },
    ],
    conceptIds: ["quartermaster", "model-quota", "clankops", "motherclank"],
    lawIds: [],
    historyIds: ["h-quartermaster"],
    lab: true,
    probes: [
      {
        id: "p-qm-inspect",
        label: "Did this campaign inspect the Windows Quartermaster path?",
        finding:
          "No. C:\\Users\\anil\\Desktop\\Quartermaster Clank is local-only. Linux campaign could not open it. Internals remain incomplete.",
        status: "incomplete",
      },
      {
        id: "p-qm-github",
        label: "Is there a GitHub repo to treat as canon?",
        finding: "No GitHub repo found for Quartermaster Clank. Nested token-stats is Annihilater/token-stats, not a Clank. Do not invent a SHA.",
        status: "verified",
      },
      {
        id: "p-qm-home",
        label: "Do model/quota recommendations belong in ClankOps or Motherclank?",
        finding:
          "No. ClankOps is development state. Motherclank is fleet observation. Resource recommendation is a different layer. Wrapper ≠ verified architecture.",
        status: "verified",
      },
    ],
  },
];
