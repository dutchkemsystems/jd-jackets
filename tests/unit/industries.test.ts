import { describe, it, expect } from "vitest";
import { INDUSTRIES, getIndustryBySlug } from "../../lib/industries";

describe("INDUSTRIES", () => {
  it("has exactly 8 industries", () => {
    expect(INDUSTRIES).toHaveLength(8);
  });

  it("has unique slugs", () => {
    const slugs = INDUSTRIES.map((i) => i.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("has non-empty name and description for each industry", () => {
    for (const industry of INDUSTRIES) {
      expect(industry.name.length).toBeGreaterThan(0);
      expect(industry.description.length).toBeGreaterThan(0);
      expect(industry.detail.length).toBeGreaterThan(0);
    }
  });
});

describe("getIndustryBySlug", () => {
  it("returns the industry for a known slug", () => {
    const result = getIndustryBySlug("corporate-office");
    expect(result).toBeDefined();
    expect(result?.name).toBe("Corporate & Office Teams");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getIndustryBySlug("nonexistent")).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(getIndustryBySlug("")).toBeUndefined();
  });
});
