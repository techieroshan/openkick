/**
 * @trace US-104, US-105
 * Prisma distributions repository
 */
import { prisma } from "../lib/prisma.js";

export interface Distribution {
  id: string;
  offering_id: string;
  amount: number;
  distribution_date: string;
  description: string | null;
  created_at: string;
}

export function getDistributionsRepository() {
  return {
    async findByOfferingId(offeringId: string): Promise<Distribution[]> {
      const distributions = await prisma.distribution.findMany({
        where: { offeringId },
      });
      return distributions.map((d: any) => ({
        id: d.id,
        offering_id: d.offeringId,
        amount: d.amount,
        distribution_date: d.distributionDate.toISOString(),
        description: d.description,
        created_at: d.createdAt.toISOString(),
      }));
    },
    async create(data: { offering_id: string; amount: number; distribution_date: string; description?: string }): Promise<Distribution> {
      const d = await prisma.distribution.create({
        data: {
          offeringId: data.offering_id,
          amount: data.amount,
          distributionDate: new Date(data.distribution_date),
          description: data.description,
        },
      });
      return {
        id: d.id,
        offering_id: d.offeringId,
        amount: d.amount,
        distribution_date: d.distributionDate.toISOString(),
        description: d.description,
        created_at: d.createdAt.toISOString(),
      };
    },
  };
}
