import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ActivismPortalPage from "./ActivismPortalPage";

describe("ActivismPortalPage", () => {
  it("explains how to submit potential class-action funding matters", () => {
    render(
      <MemoryRouter>
        <ActivismPortalPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /activism portal/i })).toBeInTheDocument();
    expect(screen.getByText(/submit a potential class action to fund/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start your intake/i })).toHaveAttribute("href", "/contact");
  });
});
