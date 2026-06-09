import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the public homepage with real guidance and navigation", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByTestId("ok:home:page:root:US-001")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /justice for all/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /browse settlements/i })).toHaveAttribute("href", "/cases");
  });
});
