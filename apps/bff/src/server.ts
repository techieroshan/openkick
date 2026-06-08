/**
 * @trace BFF server entry point
 */
import Fastify from "fastify";
import cors from "@fastify/cors";
import { registerRoutes } from "./routes/index.js";
import { registerRepositories } from "./repositories/index.js";

const server = Fastify({
  logger: true,
});

async function start() {
  await server.register(cors, {
    origin: true,
  });

  // Initialize mock repositories
  registerRepositories();

  // Register API routes
  await server.register(registerRoutes, { prefix: "/api" });

  // Health check
  server.get("/health", async () => {
    return { status: "ok" };
  });

  const port = Number(process.env.PORT) || 3000;
  const host = process.env.HOST || "0.0.0.0";

  try {
    await server.listen({ port, host });
    console.log(`BFF server listening on http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
