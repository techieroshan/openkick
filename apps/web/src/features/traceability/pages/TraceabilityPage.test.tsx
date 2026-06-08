import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import TraceabilityPage from "./TraceabilityPage";

describe("TraceabilityPage", () => {
  it("does not expose technical build instructions on the page", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <TraceabilityPage />
      </QueryClientProvider>,
    );

    expect(screen.queryByText(/build:ac/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/build:traceability/i)).not.toBeInTheDocument();
  });
});
