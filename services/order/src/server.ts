import { loadConfig } from "./config.js";
import { buildApp } from "./app.js";

let config;
try {
  config = loadConfig(process.env);
} catch (err) {
  console.error(
    "Invalid configuration:",
    err instanceof Error ? err.message : err,
  );
  process.exit(1);
}

const { app } = buildApp(config);
await app.listen({ port: config.PORT, host: config.HOST });
