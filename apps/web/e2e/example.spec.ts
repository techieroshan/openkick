import { test, expect } from "@playwright/test";

test("US-001: Home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("ok:home:page:root:US-001")).toBeVisible();
});

test("US-093: Browse offerings", async ({ page }) => {
  await page.goto("/invest");
  await expect(page.getByTestId("ok:invest:page:root:US-093")).toBeVisible();
  // Check for empty state or offerings list
  const emptyState = page.getByTestId("ok:invest:offerings:empty:US-093:AC-093-3");
  const offeringsList = page.locator('[data-testid^="ok:invest:offerings:item:"]');
  const hasContent = (await emptyState.count()) > 0 || (await offeringsList.count()) > 0;
  expect(hasContent).toBeTruthy();
});

test("US-094: View offering details", async ({ page }) => {
  await page.goto("/invest");
  // Click first offering if available
  const firstOffering = page.locator('[data-testid^="ok:invest:offerings:item:"]').first();
  if (await firstOffering.count() > 0) {
    await firstOffering.click();
    await expect(page.getByTestId("ok:invest:offering:page:root:US-094")).toBeVisible();
    await expect(page.getByTestId("ok:invest:offering:risk-banner:US-106:AC-106-2")).toBeVisible();
  }
});
