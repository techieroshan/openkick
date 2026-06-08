# Testing Guide

## Test Structure

- **Unit Tests**: `*.test.ts` or `*.test.tsx` in component directories
- **Integration Tests**: `*.integration.test.ts`
- **E2E Tests**: `e2e/**/*.spec.ts` (Playwright)

## Running Tests

```bash
# Unit tests
pnpm test:unit

# E2E tests (requires dev servers running)
pnpm test:e2e

# Watch mode
pnpm --filter @openkick/web test:unit --watch
```

## Test IDs

All interactive elements must have `data-testid` following the format:
```
ok:area:component:purpose[:US-XXX[:AC-XXX-Y]]
```

ESLint rules enforce this format.

## Writing E2E Tests

```typescript
import { test, expect } from "@playwright/test";

test("US-093: Browse offerings", async ({ page }) => {
  await page.goto("/invest");
  await expect(page.getByTestId("ok:invest:page:root:US-093")).toBeVisible();
  // ... more assertions
});
```

## Traceability

Each test should cover at least one acceptance criterion. The traceability check ensures all AC have coverage.
