/**
 * @trace Traceability matrix endpoint
 */
import { FastifyInstance } from "fastify";
import { readFileSync } from "fs";
import { join } from "path";

export async function traceabilityRoutes(fastify: FastifyInstance) {
  fastify.get("/traceability", async (request, reply) => {
    try {
      const tracePath = join(process.cwd(), "artifacts", "traceability-e2e.json");
      const data = JSON.parse(readFileSync(tracePath, "utf-8"));
      return data;
    } catch {
      return [];
    }
  });
}
