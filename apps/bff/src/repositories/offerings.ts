/**
 * @trace US-090..US-107
 * Prisma offerings repository
 */
import { Offering, OfferingStatus, OfferingType, InstrumentType } from "@openkick/types";
import { prisma } from "../lib/prisma.js";

interface PrismaOfferingWithCategory {
  id: string;
  caseId: string;
  issuerId: string;
  title: string;
  slug: string;
  category: {
    slug: string;
  };
  type: string;
  instrument: string;
  minInvestment: number;
  targetRaise: number;
  maxRaise: number;
  openDate: Date | null;
  closeDate: Date | null;
  status: string;
  riskDisclosures: string | null;
  summary: string | null;
  mediaHeroUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

function mapPrismaOfferingToOffering(o: PrismaOfferingWithCategory): Offering {
  return {
    id: o.id,
    case_id: o.caseId,
    issuer_id: o.issuerId,
    title: o.title,
    slug: o.slug,
    category_id: o.category.slug,
    type: o.type as OfferingType,
    instrument: o.instrument as InstrumentType,
    min_investment: o.minInvestment,
    target_raise: o.targetRaise,
    max_raise: o.maxRaise,
    open_date: o.openDate?.toISOString() || null,
    close_date: o.closeDate?.toISOString() || null,
    status: o.status as OfferingStatus,
    risk_disclosures: o.riskDisclosures || "",
    summary: o.summary || "",
    media_hero_url: o.mediaHeroUrl,
    created_at: o.createdAt.toISOString(),
    updated_at: o.updatedAt.toISOString(),
  };
}

export function getOfferingsRepository() {
  return {
    async findAll(filters?: { status?: OfferingStatus; category_id?: string; min_investment?: number }): Promise<Offering[]> {
      const where: Record<string, unknown> = {};
      if (filters?.status) {
        where.status = filters.status;
      }
      if (filters?.category_id) {
        where.category = { slug: filters.category_id };
      }
      if (filters?.min_investment !== undefined) {
        where.minInvestment = { lte: filters.min_investment };
      }

      const offerings = await prisma.offering.findMany({
        where,
        include: {
          category: true,
        },
      });
      return offerings.map((o: any) => mapPrismaOfferingToOffering(o as any));
    },
    async findById(id: string): Promise<Offering | undefined> {
      const o = await prisma.offering.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
      return o ? mapPrismaOfferingToOffering(o as any) : undefined;
    },
    async create(data: Omit<Offering, "id" | "created_at" | "updated_at">): Promise<Offering> {
      const category = await prisma.category.findUnique({
        where: { slug: data.category_id }
      });

      if (!category) {
        throw new Error(`Category ${data.category_id} not found`);
      }

      const o = await prisma.offering.create({
        data: {
          caseId: data.case_id as any,
          issuerId: data.issuer_id as any,
          title: data.title as any,
          slug: data.slug as any,
          categoryId: category.id,
          type: data.type as any,
          instrument: data.instrument as any,
          minInvestment: data.min_investment,
          targetRaise: data.target_raise,
          maxRaise: data.max_raise,
          openDate: data.open_date ? new Date(data.open_date) : null,
          closeDate: data.close_date ? new Date(data.close_date) : null,
          status: data.status as any,
          riskDisclosures: data.risk_disclosures || null,
          summary: data.summary || null,
          mediaHeroUrl: data.media_hero_url || null,
        },
        include: {
          category: true,
        },
      });
      return mapPrismaOfferingToOffering(o as any);
    },
    async update(id: string, updates: Partial<Offering>): Promise<Offering | null> {
      const data: Record<string, unknown> = { ...updates };
      
      // Handle special fields
      if (updates.category_id) {
        const category = await prisma.category.findUnique({
          where: { slug: updates.category_id }
        });
        if (category) {
          data.categoryId = category.id;
          delete data.category_id;
        }
      }

      const o = await prisma.offering.update({
        where: { id },
        data: data as any,
        include: {
          category: true,
        },
      });
      return mapPrismaOfferingToOffering(o as any);
    },
  };
}

export function seedOfferings() {
  // Database should be seeded via npx prisma db seed
}
