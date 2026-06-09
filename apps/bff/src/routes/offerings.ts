/**
 * @trace US-093, US-094, US-098, US-099
 * Offerings API endpoints
 */
import { FastifyInstance } from "fastify";
import { getOfferingsRepository } from "../repositories/offerings.js";
import { Offering, OfferingStatus } from "@openkick/types";

export async function offeringsRoutes(fastify: FastifyInstance) {
  fastify.get<{
    Querystring: { status?: OfferingStatus; category_id?: string; min_investment?: string; page?: string; per_page?: string; q?: string };
  }>("/offerings", async (request, reply) => {
    const repo = getOfferingsRepository();
    const filters: any = {};
    if (request.query.status) filters.status = request.query.status;
    if (request.query.category_id) filters.category_id = request.query.category_id;
    if (request.query.min_investment) filters.min_investment = Number(request.query.min_investment);
    
    let offerings = await repo.findAll(filters);
    
    // Simple search
    if (request.query.q) {
      const q = request.query.q.toLowerCase();
      offerings = offerings.filter((o) => 
        o.title.toLowerCase().includes(q) || (o.summary && o.summary.toLowerCase().includes(q))
      );
    }
    
    const page = Number(request.query.page) || 1;
    const perPage = Number(request.query.per_page) || 20;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    
    return {
      data: offerings.slice(start, end),
      pagination: {
        page,
        per_page: perPage,
        total: offerings.length,
        total_pages: Math.ceil(offerings.length / perPage),
      },
    };
  });

  fastify.get<{ Params: { id: string } }>("/offerings/:id", async (request, reply) => {
    const repo = getOfferingsRepository();
    const offering = await repo.findById(request.params.id);
    if (!offering) {
      return reply.code(404).send({ error: "Not found" });
    }
    return offering;
  });

  fastify.post<{ Body: Partial<Offering> }>("/offerings", async (request, reply) => {
    const repo = getOfferingsRepository();
    const offering = await repo.create({
      ...request.body,
      status: "draft",
    } as any);
    return offering;
  });

  fastify.patch<{ Params: { id: string }; Body: Partial<Offering> }>("/offerings/:id", async (request, reply) => {
    const repo = getOfferingsRepository();
    const updated = await repo.update(request.params.id, request.body);
    if (!updated) {
      return reply.code(404).send({ error: "Not found" });
    }
    return updated;
  });

  fastify.post<{ Params: { id: string } }>("/offerings/:id/publish", async (request, reply) => {
    const repo = getOfferingsRepository();
    const updated = await repo.update(request.params.id, { status: "open" });
    if (!updated) {
      return reply.code(404).send({ error: "Not found" });
    }
    return updated;
  });
}
