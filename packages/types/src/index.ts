// Core identity types
export type UserRole = "consumer" | "attorney" | "settlement_admin" | "editor" | "compliance_officer" | "support_agent" | "product_analyst" | "website_admin" | "website_owner" | "investor" | "issuer" | "funding_compliance_officer" | "funding_operations_admin";

export type UserStatus = "active" | "suspended" | "deleted";

export interface User {
  id: string;
  email: string;
  email_verified_at: string | null;
  password_hash: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  locale: string;
  two_factor_enabled: boolean;
  two_factor_secret: string | null;
  role_default: string | null;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// Cases and settlements
export type CaseStatus = "open" | "pending" | "closed";
export type SettlementStatus = "open" | "pending" | "closed";

export interface Case {
  id: string;
  title: string;
  slug: string;
  case_number: string | null;
  court: string | null;
  jurisdiction: string | null;
  status: CaseStatus;
  filed_date: string | null;
  closed_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Settlement {
  id: string;
  case_id: string;
  title: string;
  slug: string;
  defendant: string;
  category_id: string;
  deadline: string | null;
  proof_needed: boolean;
  award_type: string | null;
  status: SettlementStatus;
  official_link: string | null;
  created_at: string;
  updated_at: string;
}

// Crowdfunding types
export type OfferingType = "reg_d" | "reg_cf" | "preview";
export type OfferingStatus = "draft" | "under_review" | "open" | "funded" | "closed" | "cancelled";
export type InstrumentType = "rev_share" | "preferred_equity" | "debt" | "other";
export type KYCStatus = "not_started" | "pending" | "approved" | "rejected";
export type AccreditationStatus = "not_required" | "pending" | "approved" | "rejected";
export type InvestmentStatus = "initiated" | "pending_settlement" | "settled" | "failed" | "cancelled" | "refunded";
export type EscrowStatus = "pending" | "settled" | "failed" | "refunded";
export type EscrowType = "ach" | "card" | "wire";
export type UpdateStatus = "draft" | "pending_approval" | "published";
export type AccreditationMethod = "income" | "net_worth" | "third_party_letter";

export interface Offering {
  id: string;
  case_id: string | null;
  issuer_id: string;
  title: string;
  slug: string;
  category_id: string;
  type: OfferingType;
  instrument: InstrumentType;
  min_investment: number;
  target_raise: number;
  max_raise: number;
  open_date: string | null;
  close_date: string | null;
  status: OfferingStatus;
  risk_disclosures: string | null;
  summary: string | null;
  media_hero_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Investor {
  id: string;
  user_id: string;
  profile: {
    name: string;
    address: string;
    dob: string;
    phone: string;
    tax_id?: string;
  };
  kyc_status: KYCStatus;
  accreditation_status: AccreditationStatus;
  accreditation_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Investment {
  id: string;
  offering_id: string;
  investor_id: string;
  amount: number;
  fees: number;
  status: InvestmentStatus;
  escrow_tx_id: string | null;
  created_at: string;
  settled_at: string | null;
}

export interface EscrowTransaction {
  id: string;
  processor: string;
  type: EscrowType;
  status: EscrowStatus;
  reference: string;
  amount: number;
  currency: string;
  raw_event: Record<string, unknown>;
  signature: string | null;
  created_at: string;
  updated_at: string;
}

export interface Distribution {
  id: string;
  offering_id: string;
  gross_amount: number;
  fees_amount: number;
  net_amount: number;
  paid_at: string;
  notes: string | null;
  created_at: string;
}

export interface OfferingUpdate {
  id: string;
  offering_id: string;
  title: string;
  body: string;
  status: UpdateStatus;
  created_by: string;
  created_at: string;
  published_at: string | null;
}

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
}

export interface ApiError {
  error: string;
  message: string;
  details?: Record<string, unknown>;
}
