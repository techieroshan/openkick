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

    expect(screen.getByText(/activism portal/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /investigative intake/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit for investigation/i })).toBeInTheDocument();
  });
});
