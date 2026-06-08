/**
 * @trace US-090..US-107
 * Mock offerings repository
 */
import { Offering, OfferingStatus, OfferingType, InstrumentType } from "@openkick/types";

let offerings: Offering[] = [];

export function getOfferingsRepository() {
  return {
    findAll(filters?: { status?: OfferingStatus; category_id?: string; min_investment?: number }): Offering[] {
      let result = [...offerings];
      if (filters?.status) {
        result = result.filter((o) => o.status === filters.status);
      }
      if (filters?.category_id) {
        result = result.filter((o) => o.category_id === filters.category_id);
      }
      if (filters?.min_investment !== undefined) {
        result = result.filter((o) => o.min_investment <= (filters.min_investment || 0));
      }
      return result;
    },
    findById(id: string): Offering | undefined {
      return offerings.find((o) => o.id === id);
    },
    create(data: Omit<Offering, "id" | "created_at" | "updated_at">): Offering {
      const offering: Offering = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      offerings.push(offering);
      return offering;
    },
    update(id: string, updates: Partial<Offering>): Offering | null {
      const idx = offerings.findIndex((o) => o.id === id);
      if (idx === -1) return null;
      offerings[idx] = { ...offerings[idx], ...updates, updated_at: new Date().toISOString() };
      return offerings[idx];
    },
  };
}

export function seedOfferings() {
  offerings = [
    {
      id: "offering-1",
      case_id: "case-1",
      issuer_id: "issuer-1",
      title: "Data Breach Class Action Funding",
      slug: "data-breach-funding",
      category_id: "cat-privacy",
      type: "reg_cf" as OfferingType,
      instrument: "rev_share" as InstrumentType,
      min_investment: 100,
      target_raise: 500000,
      max_raise: 1000000,
      open_date: new Date().toISOString(),
      close_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      status: "open" as OfferingStatus,
      risk_disclosures: "Investment involves risk. Past performance not indicative of future results.",
      summary: "Funding for class action lawsuit against major tech company for data breach.",
      media_hero_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "offering-2",
      case_id: "case-2",
      issuer_id: "issuer-2",
      title: "Employment Discrimination Case",
      slug: "employment-discrimination",
      category_id: "cat-employment",
      type: "reg_d" as OfferingType,
      instrument: "preferred_equity" as InstrumentType,
      min_investment: 10000,
      target_raise: 2000000,
      max_raise: 5000000,
      open_date: new Date().toISOString(),
      close_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
      status: "funded" as OfferingStatus,
      risk_disclosures: "Accredited investors only. High risk investment.",
      summary: "Seeking funding for employment discrimination class action.",
      media_hero_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
}
