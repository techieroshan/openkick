import { FastifyInstance } from "fastify";
import { z } from "zod";

const extractSchema = z.object({
  text: z.string().optional(),
  type: z.enum(["text", "pdf"]),
});

export async function eligibilityRoutes(server: FastifyInstance) {
  server.post("/eligibility/extract", async (request, _reply) => {
    const { text: _text, type: _type } = extractSchema.parse(request.body);
    
    // Simulate AI extraction logic
    return {
      status: "success",
      extracted: {
        classDefinition: "All residents of the United States who purchased Example Product between 2020 and 2024.",
        period: "2020 - 2024",
        states: ["All US States"],
        exclusions: "Employees of Defendant, Judges, etc.",
        deadline: "2026-12-31",
        awardType: "Cash / Service Credit",
        proofNeeded: true,
      },
      confidence: 0.94,
      matchCase: {
        id: "1",
        title: "Example Product Class Action",
        officialLink: "https://example-product-settlement.com",
      }
    };
  });
}
