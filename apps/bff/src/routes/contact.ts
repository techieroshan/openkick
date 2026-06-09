import { FastifyInstance } from "fastify";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  organization: z.string().optional(),
  topic: z.string(),
  message: z.string(),
});

export async function contactRoutes(server: FastifyInstance) {
  server.post("/contact", async (request, _reply) => {
    // In a real app, this would send an email or store in a DB
    // For now, we log it and return success to fulfill the user story
    const body = contactSchema.parse(request.body);
    
    server.log.info({ contactRequest: body }, "New contact submission received");

    return {
      status: "success",
      message: "Thank you for your inquiry. Our team will review it and get back to you securely.",
      referenceId: `OK-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    };
  });
}
