/**
 * @trace US-090, US-091, US-092
 * Mock investors repository
 */
import { Investor, KYCStatus, AccreditationStatus } from "@openkick/types";

let investors: Investor[] = [];

export function getInvestorsRepository() {
  return {
    findByUserId(userId: string): Investor | undefined {
      return investors.find((i) => i.user_id === userId);
    },
    createOrUpdate(userId: string, data: Partial<Investor>): Investor {
      const existing = investors.find((i) => i.user_id === userId);
      if (existing) {
        Object.assign(existing, data, { updated_at: new Date().toISOString() });
        return existing;
      }
      const investor: Investor = {
        id: crypto.randomUUID(),
        user_id: userId,
        profile: data.profile || { name: "", address: "", dob: "" },
        kyc_status: data.kyc_status || "not_started",
        accreditation_status: data.accreditation_status || "not_required",
        accreditation_expires_at: data.accreditation_expires_at || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      investors.push(investor);
      return investor;
    },
    updateKYC(userId: string, status: KYCStatus): Investor | null {
      const investor = investors.find((i) => i.user_id === userId);
      if (!investor) return null;
      investor.kyc_status = status;
      investor.updated_at = new Date().toISOString();
      return investor;
    },
    updateAccreditation(userId: string, status: AccreditationStatus, expiresAt?: string | null): Investor | null {
      const investor = investors.find((i) => i.user_id === userId);
      if (!investor) return null;
      investor.accreditation_status = status;
      investor.accreditation_expires_at = expiresAt || null;
      investor.updated_at = new Date().toISOString();
      return investor;
    },
  };
}

export function seedInvestors() {
  investors = [];
}
