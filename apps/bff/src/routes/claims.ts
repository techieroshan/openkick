import { FastifyInstance } from "fastify";
import { getClaimsRepository } from "../repositories/claims.js";

export async function claimsRoutes(fastify: FastifyInstance) {
  fastify.get("/claims", async (request, _reply) => {
    const userId = (request.headers["x-user-id"] as string) || "user-1";
    const repo = getClaimsRepository();
    const claims = await repo.findByUserId(userId);
    return { data: claims };
  });
}
