/**
 * @trace US-001, US-002, US-003
 * Settlements API endpoints
 */
import { FastifyInstance } from "fastify";
import { getSettlementsRepository } from "../repositories/settlements.js";

export async function settlementsRoutes(fastify: FastifyInstance) {
  fastify.get<{ Querystring: { status?: string; page?: string; per_page?: string } }>(
    "/settlements",
    async (_request, _reply) => {
      const repo = getSettlementsRepository();
      const settlements = await repo.findAll();
      
      return {
        data: settlements,
        pagination: {
          page: 1,
          per_page: settlements.length,
          total: settlements.length,
          total_pages: 1,
        },
      };
    }
  );
}
