import { describe, it, expect } from "vitest";
import {
  JACKET_STYLES,
  getJacketBySlug,
  getFramesForJacket,
} from "../../lib/jackets";

describe("JACKET_STYLES", () => {
  it("has exactly 20 styles", () => {
    expect(JACKET_STYLES).toHaveLength(20);
  });

  it("has unique slugs", () => {
    const slugs = JACKET_STYLES.map((j) => j.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("has non-empty name and category for each style", () => {
    for (const jacket of JACKET_STYLES) {
      expect(jacket.name.length).toBeGreaterThan(0);
      expect(jacket.category.length).toBeGreaterThan(0);
    }
  });
});

describe("getJacketBySlug", () => {
  it("returns the jacket for a known slug", () => {
    const result = getJacketBySlug("executive-puffer");
    expect(result).toBeDefined();
    expect(result?.name).toBe("Executive Puffer");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getJacketBySlug("nonexistent")).toBeUndefined();
  });
});

describe("getFramesForJacket", () => {
  it("produces 36 correctly zero-padded paths", () => {
    const frames = getFramesForJacket("executive-puffer");
    expect(frames).toHaveLength(36);
    expect(frames[0]).toBe("/jackets/executive-puffer/frame-001.webp");
    expect(frames[35]).toBe("/jackets/executive-puffer/frame-036.webp");
  });

  it("produces correctly padded frame numbers", () => {
    const frames = getFramesForJacket("test-jacket");
    for (let i = 0; i < frames.length; i++) {
      const expectedNum = String(i + 1).padStart(3, "0");
      expect(frames[i]).toBe(`/jackets/test-jacket/frame-${expectedNum}.webp`);
    }
  });

  it("respects custom frame count", () => {
    const frames = getFramesForJacket("test-jacket", 10);
    expect(frames).toHaveLength(10);
    expect(frames[0]).toBe("/jackets/test-jacket/frame-001.webp");
    expect(frames[9]).toBe("/jackets/test-jacket/frame-010.webp");
  });
});
