Title: Playwright Helpers and Test Templates for Acceptance Criteria Coverage

Setup
* Use Playwright test with TypeScript
* Add custom fixtures for trace tagging and analytics stubs
* Run against Vite preview and the BFF server

tests slash helpers slash test dash utils dot ts
```ts
import { test as base, expect, Page } from "@playwright/test";

type TraceInfo = {
  usId: string; // format US-xxx
  acId?: string; // format AC-xxx-y
};

export const test = base.extend<{
  traceInfo: TraceInfo;
  markCovers: (info: TraceInfo) => void;
  byId: (id: string) => ReturnType<Page["locator"]>;
}>({
  traceInfo: [{ usId: "", acId: undefined }, { option: true }],
  markCovers: async ({}, use) => {
    await use((info: TraceInfo) => {
      (global as any).__ok_trace_current = info;
    });
  },
  byId: async ({ page }, use) => {
    await use((id: string) => page.locator(`[data-testid="${id}"]`));
  },
});

export { expect };

tests slash helpers slash reporting dot ts

import { FullConfig, TestCase, TestResult } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const out = path.join(process.cwd(), "artifacts", "traceability-e2e.json");
const rows: any[] = [];

export async function onTestEnd(test: TestCase, result: TestResult) {
  const info: any = (global as any).__ok_trace_current;
  if (info && info.usId) {
    rows.push({
      test: test.title,
      usId: info.usId,
      acId: info.acId || null,
      status: result.status,
      file: test.location.file,
      line: test.location.line,
    });
  }
}

export async function onEnd(config: FullConfig) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(rows, null, 2));
}
playwright dot config dot ts example hooks

import { defineConfig, devices } from "@playwright/test";
import { onEnd, onTestEnd } from "./tests/helpers/reporting";

export default defineConfig({
  testDir: "./tests",
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4173", trace: "on-first-retry" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // If your runner does not support hooks, move these into a custom reporter
  hooks: {
    async onTestEnd(test, result) {
      await onTestEnd(test, result);
    },
    async onEnd(config) {
      await onEnd(config);
    },
  } as any,
});
Example test template per acceptance criterion

import { test, expect } from "../../helpers/test-utils";

test.describe("Eligibility paste flow US-006", () => {
  test("AC-006-1 paste accepts text and parses", async ({ page, markCovers, byId }) => {
    markCovers({ usId: "US-006", acId: "AC-006-1" });
    await page.goto("/eligibility");
    await (await byId("ok:eligibility:checker:paste:US-006:AC-006-1")).fill(
      "Official Notice of Settlement ... Class Period Jan 1 2020 to Dec 31 2023 ..."
    );
    await (await byId("ok:eligibility:checker:submit:US-006:AC-006-1")).click();
    await expect(
      await byId("ok:eligibility:result:summary:US-006:AC-006-1")
    ).toBeVisible();
  });
});
Accessibility check example using axe playwright

import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "../helpers/test-utils";

test("home page no critical a11y violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(v => v.impact === "critical")).toHaveLength(0);
});