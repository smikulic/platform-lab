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

  it("rejects an empty PORT", () => {
    expect(() => loadConfig({ PORT: "" })).toThrow(/PORT/);
  });

  it("rejects a non-numeric PORT", () => {
    expect(() => loadConfig({ PORT: "abc" })).toThrow(/PORT/);
  });

  it("parses valid values, with PORT as a number", () => {
    const config = loadConfig({
      NODE_ENV: "production",
      PORT: "8080",
      HOST: "0.0.0.0",
      LOG_LEVEL: "debug",
    });
    expect(config).toEqual({
      NODE_ENV: "production",
      PORT: 8080,
      HOST: "0.0.0.0",
      LOG_LEVEL: "debug",
    });
    expect(typeof config.PORT).toBe("number");
  });

  it("rejects an out-of-range PORT", () => {
    expect(() => loadConfig({ PORT: "70000" })).toThrow(/PORT/);
    expect(() => loadConfig({ PORT: "0" })).toThrow(/PORT/);
  });

  it("rejects an invalid LOG_LEVEL", () => {
    expect(() => loadConfig({ LOG_LEVEL: "loud" })).toThrow(/LOG_LEVEL/);
  });

  it("reports every problem in one error", () => {
    expect(() =>
      loadConfig({ PORT: "0", LOG_LEVEL: "loud", NODE_ENV: "prod" }),
    ).toThrow(/NODE_ENV.*PORT.*LOG_LEVEL/);
  });

  it("does not echo bad values in the error message", () => {
    let error: unknown;
    try {
      loadConfig({ LOG_LEVEL: "hunter2", PORT: "hunter2" });
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).not.toContain("hunter2");
  });
});
