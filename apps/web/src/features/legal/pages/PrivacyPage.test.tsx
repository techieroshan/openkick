import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PrivacyPage from "./PrivacyPage";

describe("PrivacyPage", () => {
  it("shows privacy guidance and no placeholder content", () => {
    render(<PrivacyPage />);

    expect(screen.getByRole("heading", { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getAllByText(/data minimization/i).length).toBeGreaterThan(0);
  });
});
