/**
 * @trace US-095, US-096
 * Prisma investments repository
 */
import { Investment, InvestmentStatus } from "@openkick/types";
import { prisma } from "../lib/prisma.js";
import { Investment as PrismaInvestment } from "@prisma/client";

function mapPrismaInvestmentToInvestment(i: PrismaInvestment): Investment {
  return {
    id: i.id,
    investor_id: i.userId,
    offering_id: i.offeringId,
    amount: i.amount,
    fees: 0, // Not in schema yet, default 0
    escrow_tx_id: i.transactionId || "",
    status: i.status as InvestmentStatus,
    created_at: i.createdAt.toISOString(),
    settled_at: i.status === "settled" ? i.updatedAt.toISOString() : null,
  };
}

export function getInvestmentsRepository() {
  return {
    async findByInvestorId(investorId: string): Promise<Investment[]> {
      const investments = await prisma.investment.findMany({
        where: { userId: investorId },
      });
      return investments.map(mapPrismaInvestmentToInvestment);
    },
    async findByOfferingId(offeringId: string): Promise<Investment[]> {
      const investments = await prisma.investment.findMany({
        where: { offeringId },
      });
      return investments.map(mapPrismaInvestmentToInvestment);
    },
    async create(data: Omit<Investment, "id" | "created_at" | "settled_at">): Promise<Investment> {
      const i = await prisma.investment.create({
        data: {
          offeringId: data.offering_id,
          userId: data.investor_id,
          amount: data.amount,
          status: data.status,
          transactionId: data.escrow_tx_id,
        },
      });

      // Update offering raisedAmount
      if (data.status === "settled") {
          await prisma.offering.update({
              where: { id: data.offering_id },
              data: {
                  raisedAmount: {
                      increment: data.amount
                  }
              }
          });
      }

      return mapPrismaInvestmentToInvestment(i);
    },
    async updateStatus(id: string, status: InvestmentStatus): Promise<Investment | null> {
      const existing = await prisma.investment.findUnique({ where: { id } });
      if (!existing) return null;

      const i = await prisma.investment.update({
        where: { id },
        data: { status },
      });

      // If status changed to settled, increment raisedAmount
      if (status === "settled" && existing.status !== "settled") {
            await prisma.offering.update({
                where: { id: i.offeringId },
                data: {
                    raisedAmount: {
                        increment: i.amount
                    }
                }
            });
      }

      return mapPrismaInvestmentToInvestment(i);
    },
  };
}

export function seedInvestments() {
  // Database should be seeded via npx prisma db seed
}
