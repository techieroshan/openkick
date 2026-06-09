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

    expect(screen.getByText(/find a lawyer/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /report harm and find/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start secure intake/i })).toHaveAttribute("href", "/contact");
  });
});
