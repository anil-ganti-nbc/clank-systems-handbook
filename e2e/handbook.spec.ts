import { expect, test } from "@playwright/test";

async function gotoHydrated(page: import("@playwright/test").Page, path: string) {
  await page.goto(path);
  await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
}

test.describe("Clank Systems Handbook", () => {
  test("lesson navigation across the vertical slice", async ({ page }) => {
    await gotoHydrated(page, "/");
    await expect(page.getByRole("heading", { name: /enough literacy/i })).toBeVisible();

    await page.getByRole("navigation").getByRole("link", { name: "Development" }).click();
    await expect(page.getByRole("heading", { name: "Development basics" })).toBeVisible();
    await expect(page.getByText(/HEAD versus origin/i)).toBeVisible();

    await page.getByRole("navigation").getByRole("link", { name: "Systems" }).click();
    await expect(page.getByRole("heading", { name: "Systems and operations" })).toBeVisible();

    await page.getByRole("navigation").getByRole("link", { name: "Architecture" }).click();
    await expect(page.getByRole("heading", { name: "Architecture", exact: true })).toBeVisible();
    await expect(page.getByRole("img", { name: "Fleet architecture" })).toBeVisible();

    await page.getByRole("navigation").getByRole("link", { name: "How we built it" }).click();
    await expect(page.getByRole("heading", { name: "How we built it", exact: true })).toBeVisible();
    await expect(page.getByText("Historical timeline")).toBeVisible();
  });

  test("investigation freeze then reveal", async ({ page }) => {
    await gotoHydrated(page, "/labs/inc-materialization");
    await expect(
      page.getByRole("heading", { name: "Scheduler fired, work never materialized" }),
    ).toBeVisible();

    const freeze = page.getByRole("button", { name: "Freeze hypothesis" });
    const reveal = page.getByRole("button", { name: "Reveal what the archive says" });
    await expect(freeze).toBeDisabled();
    await expect(reveal).toBeDisabled();

    await page.getByRole("button", { name: /materialization gap/i }).click();
    await expect(freeze).toBeEnabled();

    await freeze.click();
    await expect(page.getByRole("button", { name: "Hypothesis frozen" })).toBeDisabled();
    await expect(reveal).toBeEnabled();

    await reveal.click();
    await expect(page.getByText("What you froze")).toBeVisible();
    await expect(page.getByText("Diagnosis (archive)")).toBeVisible();
    await expect(page.getByText("Codified as MATERIALIZATION_GAP.")).toBeVisible();
  });

  test("evidence browsing in locker and archive", async ({ page }) => {
    await gotoHydrated(page, "/incidents");
    await expect(page.getByRole("heading", { name: "Incident archive" })).toBeVisible();
    await page.getByRole("link", { name: /Scheduler fired, work never materialized/ }).click();
    await expect(page.locator('[data-hydrated="true"]')).toBeVisible();

    await expect(page.getByText("Evidence locker")).toBeVisible();
    await page.getByRole("button", { name: "Did the timer/cron unit fire?" }).click();
    await expect(page.getByText(/elapsed times still looked populated/i)).toBeVisible();
    await page.getByRole("button", { name: "Who owns logs/?" }).click();
    await expect(page.getByText(/root:root/i)).toBeVisible();

    await page.getByRole("button", { name: /materialization gap/i }).click();
    await page.getByRole("button", { name: "Freeze hypothesis" }).click();
    await page.getByRole("button", { name: "Reveal what the archive says" }).click();

    await expect(page.getByRole("heading", { name: "Evidence", exact: true })).toBeVisible();
    await expect(page.getByText(/clank-architecture:DECISION_LEDGER\.md/).first()).toBeVisible();
    await expect(page.getByText(/GOLDEN_INCIDENT_CORPUS\.md/)).toBeVisible();
  });

  test("Explain It Back freeze, model reveal, and self-rating", async ({ page }) => {
    await gotoHydrated(page, "/explain");
    await expect(page.getByRole("heading", { name: "Explain it back" })).toBeVisible();

    const prompt = page.locator("article").first();
    const freeze = prompt.getByRole("button", { name: "Freeze my answer" });
    const show = prompt.getByRole("button", { name: "Show model explanation" });
    await expect(freeze).toBeDisabled();
    await expect(show).toBeDisabled();

    await prompt.locator("textarea").fill(
      "A SHA is a fingerprint of the exact tree you named. HEAD is a pointer, not the running host.",
    );
    await expect(freeze).toBeEnabled();
    await freeze.click();
    await expect(prompt.locator("textarea")).toBeDisabled();
    await expect(show).toBeEnabled();

    await show.click();
    await expect(prompt.getByText("What I said")).toBeVisible();
    await expect(prompt.getByText(/Model explanation \(not an LLM grade\)/)).toBeVisible();
    await prompt.getByRole("button", { name: /Save self-rating/ }).click();
  });

  test("historical ledger phases and UNKNOWN-honest current fleet", async ({ page }) => {
    await gotoHydrated(page, "/");
    await page.getByRole("navigation").getByRole("link", { name: "History" }).click();
    await expect(page.getByRole("heading", { name: "Historical ledger" })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Origin: independent collectors/i })).toBeVisible();
    await expect(page.getByText("GitHub account anil-ganti-nbc is created").first()).toBeVisible();
    await expect(page.getByText("verified historical fact").first()).toBeVisible();

    await page.getByRole("navigation").getByRole("link", { name: "Fleet" }).click();
    await expect(page.getByRole("heading", { name: "Current fleet" })).toBeVisible();
    await expect(page.getByText(/UNKNOWN is left visible/i)).toBeVisible();
    await expect(page.getByText(/INTENTIONALLY_DORMANT/i).first()).toBeVisible();
    await expect(page.getByText("Inventory SHA (2026-08-22)")).toBeVisible();
    await expect(page.getByText("Live deployed").first()).toBeVisible();
    await expect(page.getByText("UNKNOWN", { exact: true }).first()).toBeVisible();
  });

  test("architecture law lineage maps a scar to a fleet law", async ({ page }) => {
    await gotoHydrated(page, "/architecture");
    await expect(page.getByRole("heading", { name: "Law lineage", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Law 3/ })).toBeVisible();
    await expect(page.getByText(/HTTP 200 without useful output/i).first()).toBeVisible();
    await expect(page.getByText(/candidate, not binding/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Evolution — before, pressure, rule, leftover/i })).toBeVisible();
    await expect(page.getByText("Failure / pressure").first()).toBeVisible();
    await expect(page.getByText("Still unsolved").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: /Motherclank M0–M4/i })).toBeVisible();
    await expect(page.getByRole("img", { name: "Second-act control planes" })).toBeVisible();
  });

  test("confidence audit exposes gaps and keeps live UNKNOWN", async ({ page }) => {
    await gotoHydrated(page, "/evidence");
    await expect(page.getByRole("heading", { name: "Confidence audit", exact: true })).toBeVisible();
    await expect(page.getByText(/Live host re-probe this campaign/i)).toBeVisible();
    await expect(page.getByText("INCOMPLETE").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Unresolved evidence gaps" })).toBeVisible();
    await expect(page.getByText(/No SSH to Hetzner/i)).toBeVisible();

    await page.getByRole("button", { name: "incomplete", exact: true }).click();
    await expect(page.getByText(/Law 6 forbids filling deployed SHA/i)).toBeVisible();

    await page.getByRole("navigation").getByRole("link", { name: "History" }).click();
    await expect(page.getByRole("heading", { name: "Historical ledger" })).toBeVisible();
    await expect(page.getByLabel("Search ledger")).toBeVisible();
    await expect(page.getByLabel("Epistemic status")).toBeVisible();
    await expect(page.getByLabel("Failure class")).toBeVisible();
  });

  test("then vs now and responsibilities teaching surfaces", async ({ page }) => {
    await gotoHydrated(page, "/");
    await page.getByRole("navigation").getByRole("link", { name: "Then vs now" }).click();
    await expect(page.getByRole("heading", { name: "Then vs now" })).toBeVisible();
    await expect(page.getByText(/strict post-v0.1 logical births/i)).toBeVisible();
    await expect(page.getByText(/Reddit is a source-admission/i)).toBeVisible();

    await page.getByRole("navigation").getByRole("link", { name: "Responsibilities" }).click();
    await expect(page.getByRole("heading", { name: "System responsibilities" })).toBeVisible();
    await expect(page.getByText(/Federated, not a pyramid/i)).toBeVisible();
    await expect(page.getByText(/ClankOps/i).first()).toBeVisible();
  });
});
