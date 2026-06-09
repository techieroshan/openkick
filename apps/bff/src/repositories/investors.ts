/**
 * @trace US-090, US-091, US-092
 * Prisma investors repository
 */
import { Investor, KYCStatus, AccreditationStatus } from "@openkick/types";
import { prisma } from "../lib/prisma.js";

interface PrismaInvestorWithUser {
  id: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
  };
  address: string | null;
  dateOfBirth: Date | null;
  phone: string | null;
  taxId: string | null;
  kycStatus: string;
  isAccredited: boolean;
  accreditedExpiry: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

function mapPrismaInvestorToInvestor(p: PrismaInvestorWithUser): Investor {
  return {
    id: p.id,
    user_id: p.userId,
    profile: {
      name: p.user.firstName + " " + p.user.lastName,
      address: p.address || "",
      dob: p.dateOfBirth?.toISOString().split("T")[0] || "",
      phone: p.phone || "",
      tax_id: p.taxId || "",
    },
    kyc_status: p.kycStatus as KYCStatus,
    accreditation_status: (p.isAccredited ? "approved" : "not_required") as AccreditationStatus,
    accreditation_expires_at: p.accreditedExpiry?.toISOString() || null,
    created_at: p.createdAt.toISOString(),
    updated_at: p.updatedAt.toISOString(),
  };
}

export function getInvestorsRepository() {
  return {
    async findByUserId(userId: string): Promise<Investor | undefined> {
        const p = await prisma.investorProfile.findUnique({
            where: { userId },
            include: { user: true }
        });
        return p ? mapPrismaInvestorToInvestor(p) : undefined;
    },
    async createOrUpdate(userId: string, data: Partial<Investor>): Promise<Investor> {
        const existing = await prisma.investorProfile.findUnique({
            where: { userId },
            include: { user: true }
        });

        const profileData: Record<string, unknown> = {};
        if (data.profile) {
            if (data.profile.address) profileData.address = data.profile.address;
            if (data.profile.dob) profileData.dateOfBirth = new Date(data.profile.dob);
            if (data.profile.phone) profileData.phone = data.profile.phone;
            if (data.profile.tax_id) profileData.taxId = data.profile.tax_id;
        }
        if (data.kyc_status) profileData.kycStatus = data.kyc_status;
        if (data.accreditation_status) profileData.isAccredited = data.accreditation_status === "approved";
        if (data.accreditation_expires_at) profileData.accreditedExpiry = new Date(data.accreditation_expires_at);

        if (existing) {
            const p = await prisma.investorProfile.update({
                where: { userId },
                data: profileData,
                include: { user: true }
            });
            return mapPrismaInvestorToInvestor(p);
        } else {
            const p = await prisma.investorProfile.create({
                data: {
                    ...profileData,
                    userId
                },
                include: { user: true }
            });
            return mapPrismaInvestorToInvestor(p);
        }
    },
    async updateKYC(userId: string, status: KYCStatus): Promise<Investor | null> {
        const p = await prisma.investorProfile.update({
            where: { userId },
            data: { kycStatus: status },
            include: { user: true }
        });
        return p ? mapPrismaInvestorToInvestor(p) : null;
    },
    async updateAccreditation(userId: string, status: AccreditationStatus, expiresAt?: string | null): Promise<Investor | null> {
        const p = await prisma.investorProfile.update({
            where: { userId },
            data: { 
                isAccredited: status === "approved",
                accreditedExpiry: expiresAt ? new Date(expiresAt) : null
            },
            include: { user: true }
        });
        return p ? mapPrismaInvestorToInvestor(p) : null;
    },
  };
}

export function seedInvestors() {
  // Database should be seeded via npx prisma db seed
}
