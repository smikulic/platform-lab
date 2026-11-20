import { describe, it, expect } from "vitest";
import { buildApp } from "../src/app.js";
import { loadConfig } from "../src/config.js";

describe("health endpoints", () => {
  it("livez returns 200", async () => {
    const { app } = buildApp(loadConfig({ LOG_LEVEL: "silent" }));
    const res = await app.inject({ method: "GET", url: "/livez" });
    expect(res.statusCode).toBe(200);
    await app.close();
  });

  it("readyz is 200 when started and 503 while shutting down", async () => {
    const { app, setShuttingDown } = buildApp(loadConfig({ LOG_LEVEL: "silent" }));
    await app.ready();
    expect((await app.inject({ method: "GET", url: "/readyz" })).statusCode).toBe(200);
    setShuttingDown();
    expect((await app.inject({ method: "GET", url: "/readyz" })).statusCode).toBe(503);
    await app.close();
  });
});
