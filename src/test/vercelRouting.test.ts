import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("Vercel SPA routing", () => {
  it("defines a catch-all rewrite to index.html for deep links", () => {
    const vercelConfigPath = path.resolve(process.cwd(), "vercel.json");

    expect(fs.existsSync(vercelConfigPath)).toBe(true);

    const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, "utf8")) as {
      rewrites?: Array<{ source?: string; destination?: string }>;
    };

    expect(vercelConfig.rewrites).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "/(.*)",
          destination: "/index.html",
        }),
      ])
    );
  });
});
