import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { HANDBOOK, HANDBOOK_ISSUES, CONCEPTS, INCIDENTS } from "../../content/catalog.ts";
import { validateHandbook } from "./validate.ts";

describe("handbook content integrity", () => {
  it("has zero dangling or duplicate ids", () => {
    assert.deepEqual(HANDBOOK_ISSUES, []);
  });

  it("ships the vertical-slice minima", () => {
    assert.ok(CONCEPTS.length >= 40, "enough concepts for literacy");
    assert.equal(INCIDENTS.length, 3);
    assert.ok(INCIDENTS.some((i) => i.complexity === "simple-operational"));
    assert.ok(INCIDENTS.some((i) => i.complexity === "multi-layer"));
    assert.ok(INCIDENTS.some((i) => i.complexity === "mission-level"));
    assert.ok(HANDBOOK.prompts.length >= 6);
    assert.ok(HANDBOOK.timeline.length >= 6);
  });

  it("every incident evidence row has a repo or path", () => {
    for (const inc of INCIDENTS) {
      assert.ok(inc.evidence.length >= 2);
      for (const e of inc.evidence) {
        assert.ok(e.repo || e.path || e.url, `${inc.id} ${e.id} missing locator`);
        assert.notEqual(e.status, "illustrative");
      }
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
