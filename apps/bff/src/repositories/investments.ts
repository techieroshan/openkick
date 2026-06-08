/**
 * @trace US-095, US-096
 * Mock investments repository
 */
import { Investment, InvestmentStatus } from "@openkick/types";

let investments: Investment[] = [];

export function getInvestmentsRepository() {
  return {
    findByInvestorId(investorId: string): Investment[] {
      return investments.filter((i) => i.investor_id === investorId);
    },
    findByOfferingId(offeringId: string): Investment[] {
      return investments.filter((i) => i.offering_id === offeringId);
    },
    create(data: Omit<Investment, "id" | "created_at" | "settled_at">): Investment {
      const investment: Investment = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        settled_at: null,
      };
      investments.push(investment);
      return investment;
    },
    updateStatus(id: string, status: InvestmentStatus): Investment | null {
      const idx = investments.findIndex((i) => i.id === id);
      if (idx === -1) return null;
      investments[idx].status = status;
      if (status === "settled") {
        investments[idx].settled_at = new Date().toISOString();
      }
      return investments[idx];
    },
  };
}

export function seedInvestments() {
  investments = [];
}
