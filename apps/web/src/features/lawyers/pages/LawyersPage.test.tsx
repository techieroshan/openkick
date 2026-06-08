import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import LawyersPage from "./LawyersPage";

describe("LawyersPage", () => {
  it("explains how to report evidence and find counsel", () => {
    render(
      <MemoryRouter>
        <LawyersPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /find a lawyer/i })).toBeInTheDocument();
    expect(screen.getAllByText(/report possible class action matters/i).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /submit a claim support request/i })).toHaveAttribute("href", "/contact");
  });
});
