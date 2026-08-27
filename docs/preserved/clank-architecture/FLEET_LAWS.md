# FLEET LAWS v1 — binding invariants for every Clank

Status: **ACTIVE** (codified Phase 2A, 2026-08-22, by operator instruction; supersedes the PROPOSED status of the Phase 1.5 preflight)
Evidence basis: Phase 1 hostile audit (11 deliverables), Phase 1.5 Truth Convergence, DEPLOYMENT_TRUTH_MANIFEST.md.
Conformance: mechanical tests live in `conformance/`; per-repo CI adoption is the Phase 2B exit criterion.

Every law names: the rule · its reference implementation · known violators at codification time · domain exceptions · minimum testable invariant · regression specimens that must never re-occur.

## Law 1 — Initialization / no-flood
A collector's first run against an existing database MUST NOT emit notifications for pre-existing entities; genuine freshness must survive initialization via evidence-dated rescue (per-source baseline epochs or equivalent).
- **Reference:** watch-clank epochs (`app/services/epoch.py`) + 72h freshness classifier (`freshness.py`); smartphone wave1_baseline_state.
- **Violators at codification:** free-game-tracker (fresh-DB notifies all); tablet one-shot fragile baseline; oem-radar staging runs pre-bankai main.
- **Exceptions:** news Clanks satisfy via silent first ingest (no alert path).
- **Invariant:** seed N entities → run returns N+1 evidence-dated new item → exactly 0 notifications for N.
- **Specimens:** FGT fresh-DB burst; watch Timex Weekender cluster; smartphone Samsung legacy rows; OEM bankai Lenovo 6349→0 blind soak.

## Law 2 — Observation ≠ novelty
First local sighting is UNCONFIRMED novelty unless source-published evidence proves recency within policy window. Ambiguity surfaces; it is never suppressed.
- **Reference:** watch editorial.py FIRST_SEEN_BY_CLANK inversion + classify_baseline_product_freshness.
- **Violators:** smartphone catalogue-only sources fire new_model on first sight; tablet reappearance refires; FGT expired-deal reappearance resets history.
- **Exceptions:** news domain satisfies via preserved source timestamps without fabrication.
- **Invariant:** first-sighting of a reference whose source-dated age exceeds policy → event class ∈ {UNCONFIRMED, BASELINE_CATCHUP}, never plain NEW.
- **Specimens:** Timex 22-second launch cluster; Apple IN 48 false positives; FGT expiring-and-returning giveaway.

## Law 3 — Health honesty
HTTP success without useful output is not healthy after policy cycles. Blocked sources surface BLOCKED. Scheduler invocation ≠ successful work; a failing scheduled unit must be observable in one query.
- **Reference:** semiconductor-intelligence invocation≠commit heartbeat columns; watch ZERO_ITEMS degradation counter.
- **Violators:** KTW dashboard HEALTHY-iff-ever-succeeded; FGT 200+0=ok; smartphone dormant maintenance-alerting; smartwatch failing timer lane (retired Phase 2A) fired hourly with zero observability.
- **Exceptions:** none.
- **Invariant:** (a) N empty-but-200 cycles ⇒ not HEALTHY; (b) M fires with zero successful commits ⇒ unhealthy state queryable.
- **Specimens:** SK hynix HOST-BLOCKED matrix; smartwatch-soak exit-code journal 2026-08-21T20:12:44Z; Google consent-wall degraded.

## Law 4 — Explicit event capability
emit_events/notify are explicit per-path contracts with fail-closed defaults; unknown reasons/categories never send.
- **Reference:** post-casio_multi watch contract; smartphone eligibility allowlist fail-closed.
- **Violators:** smartwatch NotImplementedError latent transport; feature-phone zero delivery on deployed revision; tablet absolute constant (honest).
- **Exceptions:** repos declaring zero notification (KTW/CTW-host/FPC-today) satisfy by documented absence.
- **Invariant:** every pipeline entrypoint declares (emit_events, notify); unknown reason ⇒ no send.
- **Specimens:** casio_multi silent period; FGT subscription blackout.

## Law 5 — Single notification AND scheduler authority per environment/lane
Exactly one enabled scheduling mechanism per Clank-lane; exactly one production notification channel set; experimental lanes structurally cannot reach production channels.
- **Reference:** watch single Hetzner Discord authority + annotated-disabled legacy crons; smartphone systemd-only cutover.
- **Violators repaired/codified:** smartwatch dual-lane (cron kept, systemd retired 2026-08-21T21:06Z); feature-phone three-authority fragmentation (documented split lanes are compliant because disjoint); oem-radar dashboard auto_crawl shares prod webhook authority (open).
- **Exceptions:** deliberate multi-host isolation when DB+lock+volume disjoint and proven (feature-phone model).
- **Invariant:** enumerate schedulable units per host → each Clank-lane has exactly one enabled mechanism; experimental lanes reference non-production credential sets (presence-check only).
- **Specimens:** watch fcb5e91 ghost cron; smartwatch 2026-08-21 dual-lane journals; SemInt wrong-app installer.

## Law 6 — Provenance
Every event carries run/source/code-revision; every deployment row carries exact SHA or artifact digest evidenced on host; missing evidence stays literal UNKNOWN.
- **Reference:** FGT append-only deployment ledger + OCI digests; watch three-way SHA match; smartwatch per-run provenance columns.
- **Violators:** tablet run rows lack code version; KTW deployed-SHA env-fallback; CTW/SemInt/oem-radar staging checkouts pinned to SHAs absent from branch tips until Phase 2A convergence propagates to hosts.
- **Exceptions:** none.
- **Invariant:** persisted events have non-null (run_id, source_id, code_revision); fleet.yaml rows carry host-evidenced SHAs.
- **Specimens:** FGT pre-cec0346 hashed snapshots; SemInt d43481f claim-vs-ledger contradiction.

## Law 7 — Writer coordination
All writers of one SQLite database share one cross-process lock — dashboard paths included.
- **Reference:** watch run_lock (stale reclaim); smartphone kernel lock serializing one-shots.
- **Violators:** FGT /api/run threading.Lock bypass; KTW feedback POST bypasses RunLock; smartphone local_collection path unverified.
- **Exceptions:** single-writer-by-construction (oem-radar WAL discipline).
- **Invariant:** static: every write-path acquires canonical lock; dynamic: concurrent writer vs scheduled run → serialized, neither corrupts.
- **Specimens:** FGT "DB Eradication" purge incident.

## Law 8 — Promotion gates
No source reaches production scheduling without soak evidence, an explicit promotion record, and rollback state; conversely every production-scheduled source appears in a promotion record.
- **Reference:** korean-tech-wire written policy + per-source yield log (now VERIFIED as the deployed standard).
- **Violators:** tablet approved-never-scheduled promotion theater; smartwatch stage-c merged-but-undeployed latent notify; oem-radar bankai soaks operated outside any record until Phase 2A landed them.
- **Exceptions:** operator-run diagnostic probes outside promotion scope by design.
- **Invariant:** bidirectional config↔record consistency check.
- **Specimens:** The Elec/ETNews promotions; LG Display CONTINUE-EXPERIMENTAL; Xiaomi KEEP_STAGING; Apple-IN retirement.

## Deferred candidate — Law 9 (deployment convergence)
A repository's default branch must never trail its own production checkout longer than one review cycle. Enforcement requires inventory machinery; recorded now, proposed at Phase 2B exit. First violations already on record: KTW main-behind-production (healed in Phase 2A by merge; host checkout still trails), SemInt host pre-heartbeat-fix.
