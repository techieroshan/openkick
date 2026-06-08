Title: Vitest and React Testing Library Helpers for Component Level Checks

Setup
* Use Vitest with jsdom
* Include axe for a11y unit checks

vitest dot config dot ts minimal
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/rtl/setup.ts"],
    globals: true,
    css: true
  }
});

tests slash rtl slash setup dot ts

import "@testing-library/jest-dom";
tests slash rtl slash helpers dot tsx

import React from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";

export function render(ui: React.ReactElement, options?: RenderOptions) {
  return rtlRender(ui, options);
}

export function expectHasTestId(container: HTMLElement, id: string) {
  const el = container.querySelector(`[data-testid="${id}"]`);
  expect(el).toBeInTheDocument();
}
Example unit test with trace tags

import React from "react";
import { render, expectHasTestId } from "./helpers";
import { EligibilityResultCard } from "@/features/eligibility/EligibilityResultCard";

test("EligibilityResultCard renders summary US-008 AC-008-1", () => {
  const { container } = render(
<EligibilityResultCard
      result="eligible"
      confidence={0.92}
      dataTestId="ok:eligibility:result:summary:US-008:AC-008-1"
    />
  );
  expectHasTestId(container, "ok:eligibility:result:summary:US-008:AC-008-1");
});
Axe unit example

import React from "react";
import { render } from "./helpers";
import { toHaveNoViolations } from "jest-axe";
import axe from "jest-axe";

expect.extend(toHaveNoViolations);

test("component accessible", async () => {
  const { container } = render(<button data-testid="ok:ui:button:root">Go</button>);
  const results = await axe(container as any);
  expect(results).toHaveNoViolations();
});