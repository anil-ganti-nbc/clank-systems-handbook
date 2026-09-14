import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import {
  HANDBOOK,
  HANDBOOK_ISSUES,
  CONCEPTS,
  INCIDENTS,
  HISTORY,
  LAWS,
  PHASES,
  FLEET,
  ARTEFACTS,
  EVIDENCE_GAPS,
  PROVENANCE,
  LEDGER_REVIEWS,
  LIVE_HOST_PROBE,
  V01_PHASE_IDS,
  RESPONSIBILITIES,
  THEN_NOW,
} from "../../content/catalog.ts";
import { validateHandbook } from "./validate.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

describe("handbook content integrity", () => {
  it("has zero dangling or duplicate ids", () => {
    assert.deepEqual(HANDBOOK_ISSUES, []);
  });

  it("ships the curriculum minima", () => {
    assert.ok(CONCEPTS.length >= 100, `enough concepts for literacy, got ${CONCEPTS.length}`);
    assert.ok(INCIDENTS.length >= 9, `incident archive expanded, got ${INCIDENTS.length}`);
    assert.ok(INCIDENTS.some((i) => i.complexity === "simple-operational"));
    assert.ok(INCIDENTS.some((i) => i.complexity === "multi-layer"));
    assert.ok(INCIDENTS.some((i) => i.complexity === "mission-level"));
    assert.ok(HANDBOOK.prompts.length >= 18, `explain-it-back expanded, got ${HANDBOOK.prompts.length}`);
    assert.ok(HANDBOOK.timeline.length >= 10);
    assert.ok(HISTORY.length >= 20, `ledger entries, got ${HISTORY.length}`);
    assert.ok(PHASES.length >= 12, `second-act phases appended, got ${PHASES.length}`);
    for (const id of V01_PHASE_IDS) {
      assert.ok(PHASES.some((p) => p.id === id), `v0.1 phase ${id} must remain`);
    }
    assert.equal(LAWS.length, 9);
    assert.ok(LAWS.some((l) => l.deferred));
    assert.ok(FLEET.length >= 10);
    assert.ok(HANDBOOK.modules.length >= 12);
  });

  it("history and timeline are non-decreasing by date", () => {
    for (let i = 1; i < HISTORY.length; i++) {
      assert.ok(HISTORY[i].date >= HISTORY[i - 1].date, `${HISTORY[i].id} precedes ${HISTORY[i - 1].id}`);
    }
    for (let i = 1; i < HANDBOOK.timeline.length; i++) {
      assert.ok(
        HANDBOOK.timeline[i].date >= HANDBOOK.timeline[i - 1].date,
        `${HANDBOOK.timeline[i].id} precedes ${HANDBOOK.timeline[i - 1].id}`,
      );
    }
  });

  it("every incident evidence row has a repo or path and is not illustrative", () => {
    for (const inc of INCIDENTS) {
      assert.ok(inc.evidence.length >= 2, `${inc.id} needs evidence`);
      for (const e of inc.evidence) {
        assert.ok(e.repo || e.path || e.url, `${inc.id} ${e.id} missing locator`);
        assert.notEqual(e.status, "illustrative");
      }
      assert.ok(inc.lab, `${inc.id} should be an investigation lab`);
      assert.ok(inc.probes.length >= 3, `${inc.id} needs competing probes`);
    }
  });

  it("every history entry cites at least one artefact", () => {
    for (const h of HISTORY) {
      assert.ok(h.evidence.length >= 1, `${h.id} missing evidence`);
      assert.ok(["verified", "inferred", "incomplete"].includes(h.confidence), `${h.id} confidence`);
      for (const c of h.commits) {
        assert.ok(c.sha.length >= 7, `${h.id} short sha`);
      }
    }
  });

  it("human ledger document names every machine-readable history id", () => {
    const ledger = readFileSync(join(root, "docs/CLANK_HISTORY_LEDGER.md"), "utf8");
    assert.match(ledger, /# Clank History Ledger/);
    for (const h of HISTORY) {
      assert.ok(ledger.includes(`\`${h.id}\``), `ledger missing ${h.id}`);
    }
    for (const p of PHASES) {
      assert.ok(ledger.includes(`\`${p.id}\``), `ledger missing phase ${p.id}`);
    }
  });

  it("rejects a dangling concept link", () => {
    const issues = validateHandbook({
      ...HANDBOOK,
      modules: [
        ...HANDBOOK.modules,
        {
          id: "mod-bogus",
          area: "basics",
          title: "x",
          summary: "x",
          conceptIds: ["not-a-real-concept"],
          sections: [{ heading: "h", body: "b" }],
        },
      ],
    });
    assert.ok(issues.some((i) => i.code === "dangling"));
  });

  it("evidence artefacts have unique ids, required fields, and valid epistemic states", () => {
    const ids = new Set<string>();
    const allowed = new Set(["verified", "inferred", "incomplete", "illustrative"]);
    assert.ok(ARTEFACTS.length >= 40, `manifest too small: ${ARTEFACTS.length}`);
    for (const a of ARTEFACTS) {
      assert.ok(a.id && a.system && a.artefact && a.artefactType && a.sourceLocation && a.preservedLocation && a.captureAt && a.notes);
      assert.ok(allowed.has(a.verification), `${a.id} bad verification`);
      assert.equal(ids.has(a.id), false, `duplicate artefact ${a.id}`);
      ids.add(a.id);
      if (a.hash) assert.match(a.hash, /^[0-9a-f]{64}$/);
    }
    for (const g of EVIDENCE_GAPS) {
      assert.ok(allowed.has(g.status), `${g.id} bad status`);
      assert.ok(g.whyItMatters.length > 10);
    }
  });

  it("ledger review queue covers every history row and does not invent ids", () => {
    const reviewIds = new Set(LEDGER_REVIEWS.map((r) => r.historyId));
    assert.equal(LEDGER_REVIEWS.length, HISTORY.length);
    for (const h of HISTORY) {
      assert.ok(reviewIds.has(h.id), `missing review ${h.id}`);
    }
    for (const r of LEDGER_REVIEWS) {
      assert.ok(["keep", "downgrade", "split", "await-host-probe", "await-human"].includes(r.recommendedAction));
    }
  });

  it("live provenance cells keep deployed SHA UNKNOWN for collectors", () => {
    const collectors = new Set([
      "watch-clank",
      "smartwatch-clank",
      "smartphone-clank",
      "feature-phone-clank",
      "tablet-clank",
      "oem-radar",
      "free-game-tracker",
      "chinese-tech-wire",
      "korean-tech-wire",
      "semiconductor-intelligence",
      "motherclank",
      "diagnostic-clank",
    ]);
    for (const p of PROVENANCE) {
      if (!collectors.has(p.system)) continue;
      assert.match(p.deployedSha, /UNKNOWN/i, `${p.id} filled a live SHA`);
      assert.notEqual(p.confidence, "verified", `${p.id} must not claim live verification`);
    }
    assert.equal(LIVE_HOST_PROBE, "INCOMPLETE");
  });

  it("preserved copies match recorded sha256", () => {
    let checked = 0;
    for (const a of ARTEFACTS) {
      if (!a.hash) continue;
      if (!a.preservedLocation.startsWith("docs/preserved/")) continue;
      const fp = join(root, a.preservedLocation);
      assert.ok(existsSync(fp), `missing preserved file ${a.preservedLocation}`);
      const digest = createHash("sha256").update(readFileSync(fp)).digest("hex");
      assert.equal(digest, a.hash, `hash mismatch ${a.id}`);
      checked += 1;
    }
    assert.ok(checked >= 40, `too few hashed copies: ${checked}`);
  });

  it("confidence-audit view has gaps, reviews, and a live-incomplete marker", () => {
    assert.ok(EVIDENCE_GAPS.some((g) => g.kind === "live-unknown"));
    assert.ok(EVIDENCE_GAPS.some((g) => g.kind === "irrecoverable"));
    assert.ok(EVIDENCE_GAPS.some((g) => g.kind === "awaiting-review"));
    assert.ok(LEDGER_REVIEWS.some((r) => r.recommendedAction !== "keep"));
    assert.ok(HANDBOOK.modules.some((m) => m.id === "mod-motherclank-stages"));
    assert.ok(HANDBOOK.modules.some((m) => m.id === "mod-diagnostic-inventory"));
  });

  it("architecture phases carry before/pressure/abstraction/rule/result/unresolved", () => {
    for (const p of PHASES) {
      assert.ok((p.before ?? "").length > 20, `${p.id} before`);
      assert.ok((p.failurePressure ?? "").length > 20, `${p.id} pressure`);
      assert.ok((p.newAbstraction ?? "").length > 20, `${p.id} abstraction`);
      assert.ok((p.newRule ?? "").length > 20, `${p.id} rule`);
      assert.ok((p.resultingArchitecture ?? "").length > 20, `${p.id} result`);
      assert.ok((p.unresolvedLimitations ?? "").length > 20, `${p.id} unresolved`);
    }
  });

  it("fleet teaching snapshot keeps live SHA UNKNOWN and does not copy repo HEAD", () => {
    for (const cl of FLEET) {
      assert.ok(cl.inventorySha, `${cl.id} inventorySha`);
      assert.ok(cl.repoHead, `${cl.id} repoHead`);
      assert.match(cl.liveDeployedSha, /UNKNOWN/i, `${cl.id} live SHA filled`);
      assert.notEqual(cl.liveDeployedSha, cl.repoHead, `${cl.id} copied HEAD into live`);
      assert.ok(cl.inventoryAsOf.startsWith("2026-08-22"), `${cl.id} inventory date`);
      if (cl.historicallyProvenDeployedSha) {
        assert.notEqual(
          cl.historicallyProvenDeployedSha,
          cl.liveDeployedSha,
          `${cl.id} copied historically proven SHA into live`,
        );
        assert.ok(
          (cl.historicallyProvenDeployedNote ?? "").length > 20,
          `${cl.id} historically proven SHA needs a not-current note`,
        );
      }
    }
    assert.ok(FLEET.some((c) => c.inventorySha !== c.repoHead && c.inventorySha !== "UNKNOWN"));
  });

  it("deep teaching modules and explain prompts cover Motherclank, Diagnostic, and AI roles", () => {
    const mother = HANDBOOK.modules.find((m) => m.id === "mod-motherclank-stages");
    const diag = HANDBOOK.modules.find((m) => m.id === "mod-diagnostic-inventory");
    const ai = HANDBOOK.modules.find((m) => m.id === "mod-ai");
    assert.ok(mother && mother.sections.length >= 8, "motherclank module still thin");
    assert.ok(diag && diag.sections.length >= 6, "diagnostic module still thin");
    assert.ok(ai && ai.sections.length >= 6, "AI module still thin");
    const promptIds = new Set(HANDBOOK.prompts.map((p) => p.id));
    for (const id of ["ex-mother-stages", "ex-diagnostic-vs-mother", "ex-ai-roles", "ex-three-shas", "ex-arch-evolution"]) {
      assert.ok(promptIds.has(id), `missing prompt ${id}`);
    }
    assert.ok(CONCEPTS.some((c) => c.id === "research-agent"));
    assert.ok(CONCEPTS.some((c) => c.id === "miss"));
  });

  it("v0.2 second-act systems, counts, and teaching surfaces", () => {
    const fleetIds = new Set(FLEET.map((c) => c.id));
    for (const id of ["standards-clank", "cvc-clank", "clank-ledger", "clankops", "quartermaster"]) {
      assert.ok(fleetIds.has(id), `missing fleet card ${id}`);
    }
    assert.equal(fleetIds.has("reddit"), false, "Reddit must not be a top-level Clank");
    assert.equal(fleetIds.has("reddit-clank"), false);

    const births = ["clank-ledger", "clankops", "quartermaster"];
    assert.equal(births.filter((id) => fleetIds.has(id)).length, 3, "strict post-v0.1 logical births");
    assert.ok(FLEET.find((c) => c.id === "clank-ledger")?.repoHeadNote.includes("no main") || FLEET.find((c) => c.id === "clank-ledger")?.repoHeadNote.includes("Jules"));
    assert.equal(FLEET.find((c) => c.id === "quartermaster")?.presence, "local-only");
    assert.equal(FLEET.find((c) => c.id === "quartermaster")?.confidence, "incomplete");

    const moduleIds = new Set(HANDBOOK.modules.map((m) => m.id));
    for (const id of ["mod-standards", "mod-clankops", "mod-ledger", "mod-quartermaster", "mod-cvc", "mod-reddit-admission"]) {
      assert.ok(moduleIds.has(id), `missing module ${id}`);
    }
    const mother = HANDBOOK.modules.find((m) => m.id === "mod-standards");
    const ops = HANDBOOK.modules.find((m) => m.id === "mod-clankops");
    assert.ok(mother && mother.sections.length >= 8, "standards module still thin");
    assert.ok(ops && ops.sections.length >= 8, "clankops module still thin");

    const incidentIds = new Set(INCIDENTS.map((i) => i.id));
    for (const id of [
      "inc-historical-conformance",
      "inc-live-deployment-proof",
      "inc-process-exit-handoff",
      "inc-duplicate-checkout",
      "inc-reddit-admission",
      "inc-ledger-usefulness",
      "inc-schema-barrier",
      "inc-quartermaster-boundary",
    ]) {
      assert.ok(incidentIds.has(id), `missing lab ${id}`);
    }

    const promptIds = new Set(HANDBOOK.prompts.map((p) => p.id));
    for (const id of ["ex-mother-vs-clankops", "ex-historical-vs-current", "ex-reddit-not-clank", "ex-unknown-is-information"]) {
      assert.ok(promptIds.has(id), `missing prompt ${id}`);
    }

    assert.ok(RESPONSIBILITIES.length >= 10, `responsibility map too small: ${RESPONSIBILITIES.length}`);
    assert.ok(THEN_NOW.length >= 7, `then-now too small: ${THEN_NOW.length}`);
    assert.ok(PHASES.some((p) => p.id === "p-standards"));
    assert.ok(PHASES.some((p) => p.id === "p-control-planes"));
    assert.ok(PHASES.some((p) => p.id === "p-second-act"));
    assert.ok(CONCEPTS.some((c) => c.id === "standards-clank"));
    assert.ok(CONCEPTS.some((c) => c.id === "historically-proven-deploy"));
    assert.ok(CONCEPTS.some((c) => c.id === "process-exit-vs-handoff"));
  });
});
