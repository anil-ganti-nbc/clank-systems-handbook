import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { HANDBOOK, HANDBOOK_ISSUES, CONCEPTS, INCIDENTS, HISTORY, LAWS, PHASES, FLEET } from "../../content/catalog.ts";
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
    assert.equal(PHASES.length, 9);
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
});
