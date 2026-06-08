import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactPage from "./ContactPage";

describe("ContactPage", () => {
  it("renders a secure intake form with validation and attachment support", async () => {
    const user = userEvent.setup();
    render(<ContactPage />);

    expect(screen.getByRole("heading", { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contact number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/attachments/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /send request/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/contact number is required/i)).toBeInTheDocument();
  });
});
