/**
 * @trace US-001
 * Mock settlements repository
 */
import { Settlement, SettlementStatus } from "@openkick/types";

let settlements: Settlement[] = [];

export function getSettlementsRepository() {
  return {
    findAll(): Settlement[] {
      return settlements;
    },
    findById(id: string): Settlement | undefined {
      return settlements.find((s) => s.id === id);
    },
    create(data: Omit<Settlement, "id" | "created_at" | "updated_at">): Settlement {
      const settlement: Settlement = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      settlements.push(settlement);
      return settlement;
    },
  };
}

export function seedSettlements() {
  settlements = [
    {
      id: "1",
      case_id: "case-1",
      title: "Example Settlement",
      slug: "example-settlement",
      defendant: "Example Corp",
      category_id: "cat-1",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      proof_needed: true,
      award_type: "cash",
      status: "open" as SettlementStatus,
      official_link: "https://example.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}
