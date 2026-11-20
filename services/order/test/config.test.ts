import { describe, it, expect } from "vitest";
import { loadConfig } from "../src/config.js";

describe("loadConfig", () => {
  it("applies defaults when env is empty", () => {
    expect(loadConfig({})).toEqual({
      NODE_ENV: "development",
      PORT: 3001,
      HOST: "127.0.0.1",
      LOG_LEVEL: "info",
    });
  });

  it("rejects a non-numeric PORT", () => {
    expect(() => loadConfig({ PORT: "abc" })).toThrow(/PORT/);
  });
});
