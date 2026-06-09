/**
 * @trace US-013, US-015
 * Prisma claims repository
 */
import { prisma } from "../lib/prisma.js";

export function getClaimsRepository() {
  return {
    async findByUserId(userId: string) {
      const claims = await prisma.claimLocker.findMany({
        where: { userId },
        include: {
          case: true
        }
      });
      return claims.map(c => ({
        id: c.id,
        defendant: c.case.defendants,
        status: c.status,
        deadline: c.case.claimDeadline?.toISOString() || "",
        amount: c.payoutAmount ? c.payoutAmount.toString() : "TBD"
      }));
    }
  };
}
