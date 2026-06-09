/**
 * @trace US-028
 * Prisma leads repository
 */
import { prisma } from "../lib/prisma.js";

export function getLeadsRepository() {
  return {
    async findByFirmId(firmId: string) {
      const leads = await prisma.lead.findMany({
        where: { firmId },
        include: {
          user: true,
          investigation: true,
          case: true
        }
      });
      return leads.map((l: any) => ({
        id: l.id,
        client: l.user.firstName + " " + l.user.lastName,
        issue: l.investigation?.title || l.case?.title || "Class Action",
        location: "US", // Placeholder
        date: l.deliveredAt?.toISOString() || "",
        status: l.status
      }));
    }
  };
}
