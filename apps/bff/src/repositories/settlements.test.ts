import { describe, expect, it } from "vitest";
import { getSettlementsRepository, seedSettlements } from "./settlements.js";

describe("settlements repository", () => {
  it("seeds the public settlement catalog with real items", () => {
    seedSettlements();

    const repo = getSettlementsRepository();
    const settlements = repo.findAll();

    expect(settlements.length).toBeGreaterThan(0);
    expect(settlements[0]).toMatchObject({
      status: "open",
      proof_needed: expect.any(Boolean),
    });
  });
});
