import Fastify, { type FastifyInstance } from "fastify";
import type { Config } from "./config.js";

export interface AppHandle {
  app: FastifyInstance;
  setShuttingDown(): void;
}

export function buildApp(config: Config): AppHandle {
  const app = Fastify({ logger: { level: config.LOG_LEVEL } });

  let started = false;
  let shuttingDown = false;
  app.addHook("onReady", async () => {
    started = true;
  });

  // Liveness: "the process is up". Deliberately checks nothing external.
  app.get("/livez", async () => ({ status: "ok" }));

  // Readiness: "send me traffic". Fails before startup completes and during shutdown.
  app.get("/readyz", async (_req, reply) => {
    if (!started || shuttingDown) {
      return reply.code(503).send({ status: "not_ready" });
    }
    return { status: "ready" };
  });

  return {
    app,
    setShuttingDown: () => {
      shuttingDown = true;
    },
  };
}
