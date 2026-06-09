/**
 * @trace US-090, US-091, US-092
 * Investors API endpoints
 */
import { FastifyInstance } from "fastify";
import { getInvestorsRepository } from "../repositories/investors.js";
import { KYCStatus, AccreditationStatus } from "@openkick/types";

export async function investorsRoutes(fastify: FastifyInstance) {
  fastify.get("/investors/me", async (request, reply) => {
    // Mock: assume user_id from auth header or default
    const userId = (request.headers["x-user-id"] as string) || "user-1";
    const repo = getInvestorsRepository();
    const investor = await repo.findByUserId(userId);
    if (!investor) {
      return reply.code(404).send({ error: "Investor profile not found" });
    }
    return investor;
  });

  fastify.post<{ Body: { profile?: Record<string, unknown>; kyc_status?: KYCStatus; accreditation_status?: AccreditationStatus } }>(
    "/investors",
    async (request, _reply) => {
      const userId = (request.headers["x-user-id"] as string) || "user-1";
      const repo = getInvestorsRepository();
      const investor = await repo.createOrUpdate(userId, request.body as any);
      return investor;
    }
  );

  fastify.post<{ Body: { status: KYCStatus } }>("/investors/me/kyc", async (request, reply) => {
    const userId = (request.headers["x-user-id"] as string) || "user-1";
    const repo = getInvestorsRepository();
    const updated = await repo.updateKYC(userId, request.body.status);
    if (!updated) {
      return reply.code(404).send({ error: "Investor not found" });
    }
    return updated;
  });

  fastify.post<{ Body: { method: string; status: AccreditationStatus; expires_at?: string } }>(
    "/investors/me/accreditation",
    async (request, reply) => {
      const userId = (request.headers["x-user-id"] as string) || "user-1";
      const repo = getInvestorsRepository();
      const updated = await repo.updateAccreditation(userId, request.body.status, request.body.expires_at);
      if (!updated) {
        return reply.code(404).send({ error: "Investor not found" });
      }
      return updated;
    }
  );
}
