import { FastifyInstance } from "fastify";
import { getLeadsRepository } from "../repositories/leads.js";

export async function leadsRoutes(fastify: FastifyInstance) {
  fastify.get("/leads", async (request, reply) => {
    // For now, use a default firmId or from headers
    const firmId = (request.headers["x-firm-id"] as string) || "firm-1";
    const repo = getLeadsRepository();
    const leads = await repo.findByFirmId(firmId);
    return { data: leads };
  });
}
