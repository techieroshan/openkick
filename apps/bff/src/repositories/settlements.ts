/**
 * @trace US-001
 * Prisma settlements repository
 */
import { Settlement, SettlementStatus } from "@openkick/types";
import { prisma } from "../lib/prisma.js";

interface PrismaCaseWithCategory {
  id: string;
  slug: string;
  title: string;
  defendants: string;
  category: {
    slug: string;
  };
  claimDeadline: Date | null;
  proofRequired: string;
  awardRules: string | null;
  status: string;
  officialSiteUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

function mapPrismaCaseToSettlement(c: PrismaCaseWithCategory): Settlement {
  return {
    id: c.id,
    case_id: c.slug,
    title: c.title,
    slug: c.slug,
    defendant: c.defendants,
    category_id: c.category.slug,
    deadline: c.claimDeadline?.toISOString() || "",
    proof_needed: c.proofRequired === "yes",
    award_type: c.awardRules || "",
    status: c.status as SettlementStatus,
    official_link: c.officialSiteUrl || "",
    created_at: c.createdAt.toISOString(),
    updated_at: c.updatedAt.toISOString(),
  };
}

export function getSettlementsRepository() {
  return {
    async findAll(): Promise<Settlement[]> {
      const cases = await prisma.case.findMany({
        include: {
          category: true,
        },
      });
      return (cases as any).map(mapPrismaCaseToSettlement);
    },
    async findById(id: string): Promise<Settlement | undefined> {
      const c = await prisma.case.findUnique({
        where: { id },
        include: {
          category: true,
        },
      });
      return c ? mapPrismaCaseToSettlement(c as any) : undefined;
    },
    async findBySlug(slug: string): Promise<Settlement | undefined> {
        const c = await prisma.case.findUnique({
          where: { slug },
          include: {
            category: true,
          },
        });
        return c ? mapPrismaCaseToSettlement(c as any) : undefined;
      },
    async create(data: Omit<Settlement, "id" | "created_at" | "updated_at">): Promise<Settlement> {
      // Find category by slug
      const category = await prisma.category.findUnique({
        where: { slug: data.category_id }
      });

      if (!category) {
        throw new Error(`Category ${data.category_id} not found`);
      }

      const c = await prisma.case.create({
        data: {
          slug: data.slug,
          title: data.title,
          defendants: data.defendant,
          jurisdiction: "General", // Default
          status: data.status,
          claimDeadline: data.deadline ? new Date(data.deadline) : null,
          proofRequired: data.proof_needed ? "yes" : "no",
          awardRules: data.award_type,
          officialSiteUrl: data.official_link,
          categoryId: category.id,
        },
        include: {
          category: true,
        },
      });
      return mapPrismaCaseToSettlement(c as any);
    },
  };
}

// Keep seed function but make it a no-op as we use prisma db seed
export function seedSettlements() {
  // Database should be seeded via npx prisma db seed
}
