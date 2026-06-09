/**
 * @trace US-095, US-096
 * Investments API endpoints
 */
import { FastifyInstance } from "fastify";
import { getInvestmentsRepository } from "../repositories/investments.js";
import { getInvestorsRepository } from "../repositories/investors.js";
import { InvestmentStatus } from "@openkick/types";

export async function investmentsRoutes(fastify: FastifyInstance) {
  fastify.get("/investments", async (request, reply) => {
    const userId = (request.headers["x-user-id"] as string) || "user-1";
    const investorRepo = getInvestorsRepository();
    const investor = await investorRepo.findByUserId(userId);
    if (!investor) {
      return reply.code(404).send({ error: "Investor not found" });
    }
    const repo = getInvestmentsRepository();
    const investments = await repo.findByInvestorId(investor.id);
    return { data: investments };
  });

  fastify.get<{ Params: { id: string } }>("/investments/:id", async (request, reply) => {
    const repo = getInvestmentsRepository();
    const investment = await repo.findById(request.params.id);
    if (!investment) {
      return reply.code(404).send({ error: "Not found" });
    }
    return investment;
  });

  fastify.post<{ Params: { id: string }; Body: { amount: number; payment_method: string; risk_ack: boolean } }>(
    "/offerings/:id/invest",
    async (request, reply) => {
      const userId = (request.headers["x-user-id"] as string) || "user-1";
      const investorRepo = getInvestorsRepository();
      const investor = await investorRepo.findByUserId(userId);
      if (!investor) {
        return reply.code(404).send({ error: "Investor not found" });
      }
      const repo = getInvestmentsRepository();
      const investment = await repo.create({
        offering_id: request.params.id,
        investor_id: investor.id,
        amount: request.body.amount,
        fees: request.body.amount * 0.02, // 2% fee
        status: "initiated",
        escrow_tx_id: null,
      });
      return {
        investment,
        escrow_instructions: {
          account: "escrow-account-123",
          reference: investment.id,
        },
      };
    }
  );
}
