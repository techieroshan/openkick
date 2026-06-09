import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AuthProvider } from "../features/auth/AuthContext";
import Header from "./Header";

describe("Header", () => {
  it("renders only public-facing navigation links", () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthProvider>,
    );

    expect(screen.getByRole("link", { name: /cases/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /eligibility/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /invest/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();

    expect(screen.queryByRole("link", { name: /privacy/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /terms/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /investor dashboard/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /traceability/i })).not.toBeInTheDocument();
  });
});
