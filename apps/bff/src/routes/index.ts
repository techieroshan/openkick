import { FastifyInstance } from "fastify";
import { settlementsRoutes } from "./settlements.js";
import { traceabilityRoutes } from "./traceability.js";
import { offeringsRoutes } from "./offerings.js";
import { investorsRoutes } from "./investors.js";
import { investmentsRoutes } from "./investments.js";

export async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(settlementsRoutes, { prefix: "/v1" });
  await fastify.register(offeringsRoutes, { prefix: "/v1" });
  await fastify.register(investorsRoutes, { prefix: "/v1" });
  await fastify.register(investmentsRoutes, { prefix: "/v1" });
  await fastify.register(traceabilityRoutes);
}
