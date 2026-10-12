import { describe, it, expect } from "vitest";
import {
  normalizePhone,
  buildWhatsAppUrl,
  totalQuantity,
  buildOrderMessage,
  SIZES,
  type OrderPayload,
} from "../../lib/whatsapp";

describe("normalizePhone", () => {
  it("strips formatting characters", () => {
    expect(normalizePhone("+31 6 1234 5678")).toBe("31612345678");
    expect(normalizePhone("+44-7700-900123")).toBe("447700900123");
    expect(normalizePhone("(202) 555-0143")).toBe("2025550143");
  });

  it("rejects too-short numbers", () => {
    expect(() => normalizePhone("1234567")).toThrow(
      "Invalid WhatsApp number: expected 8–15 digits, received 7."
    );
  });

  it("rejects too-long numbers", () => {
    expect(() => normalizePhone("1234567890123456")).toThrow(
      "Invalid WhatsApp number: expected 8–15 digits, received 16."
    );
  });

  it("accepts 8-digit numbers", () => {
    expect(normalizePhone("12345678")).toBe("12345678");
  });

  it("accepts 15-digit numbers", () => {
    expect(normalizePhone("123456789012345")).toBe("123456789012345");
  });
});

describe("buildWhatsAppUrl", () => {
  it("produces a wa.me URL with digits only", () => {
    const url = buildWhatsAppUrl("+31 6 1234 5678", "Hello");
    expect(url).toBe("https://wa.me/31612345678?text=Hello");
  });

  it("percent-encodes ampersands", () => {
    const url = buildWhatsAppUrl("31612345678", "A & B");
    expect(url).toContain("text=A%20%26%20B");
  });

  it("percent-encodes newlines", () => {
    const url = buildWhatsAppUrl("31612345678", "Line1\nLine2");
    expect(url).toContain("text=Line1%0ALine2");
  });

  it("percent-encodes special characters", () => {
    const url = buildWhatsAppUrl("31612345678", "100% sure!");
    expect(url).toContain("text=100%25%20sure!");
  });
});

describe("totalQuantity", () => {
  it("sums all sizes", () => {
    const sizes = { XS: 2, S: 5, M: 10, L: 8, XL: 4, XXL: 1, XXXL: 0 };
    expect(totalQuantity(sizes)).toBe(30);
  });

  it("returns 0 for empty sizes", () => {
    expect(totalQuantity({})).toBe(0);
  });

  it("handles partial sizes", () => {
    expect(totalQuantity({ M: 3, L: 2 })).toBe(5);
  });
});

describe("buildOrderMessage", () => {
  const baseOrder: OrderPayload = {
    businessName: "Acme Corp",
    contactName: "Jane Doe",
    contactEmail: "jane@acme.com",
    industry: "Corporate & Office Teams",
    jacketStyle: "Executive Puffer",
    sizes: { XS: 0, S: 2, M: 5, L: 3, XL: 1, XXL: 0, XXXL: 0 },
    colours: "Navy, White",
    brandingMethod: "embroidery",
    logoPlacement: ["front", "back"],
    artworkFiles: ["logo.svg", "brand-guide.pdf"],
    deliveryLocation: "Amsterdam",
    requiredDate: "2026-12-01",
  };

  it("contains the total quantity", () => {
    const msg = buildOrderMessage(baseOrder);
    expect(msg).toContain("*Total quantity:* 11");
  });

  it("contains the size breakdown", () => {
    const msg = buildOrderMessage(baseOrder);
    expect(msg).toContain("S × 2");
    expect(msg).toContain("M × 5");
    expect(msg).toContain("L × 3");
    expect(msg).toContain("XL × 1");
  });

  it("omits zero-count sizes from breakdown", () => {
    const msg = buildOrderMessage(baseOrder);
    expect(msg).not.toContain("XS ×");
    expect(msg).not.toContain("XXL ×");
    expect(msg).not.toContain("XXXL ×");
  });

  it("uses humanised placement labels", () => {
    const msg = buildOrderMessage(baseOrder);
    expect(msg).toContain("*Logo placement:* Front, Back");
  });

  it("includes business name and contact", () => {
    const msg = buildOrderMessage(baseOrder);
    expect(msg).toContain("*Business:* Acme Corp");
    expect(msg).toContain("*Contact:* Jane Doe (jane@acme.com)");
  });

  it("handles optional email absence", () => {
    const order = { ...baseOrder, contactEmail: undefined };
    const msg = buildOrderMessage(order);
    expect(msg).toContain("*Contact:* Jane Doe");
    expect(msg).not.toContain("jane@acme.com");
  });

  it("includes branding method", () => {
    const msg = buildOrderMessage(baseOrder);
    expect(msg).toContain("*Branding method:* Embroidery");
  });

  it("includes artwork files", () => {
    const msg = buildOrderMessage(baseOrder);
    expect(msg).toContain("*Artwork files:* logo.svg, brand-guide.pdf");
  });

  it("handles empty artwork files", () => {
    const order = { ...baseOrder, artworkFiles: [] };
    const msg = buildOrderMessage(order);
    expect(msg).toContain("*Artwork files:* (to follow)");
  });

  it("includes delivery location and required date", () => {
    const msg = buildOrderMessage(baseOrder);
    expect(msg).toContain("*Delivery to:* Amsterdam");
    expect(msg).toContain("*Required by:* 2026-12-01");
  });

  it("includes notes when present", () => {
    const order = { ...baseOrder, notes: "Rush order please" };
    const msg = buildOrderMessage(order);
    expect(msg).toContain("*Notes:* Rush order please");
  });

  it("omits notes line when absent", () => {
    const msg = buildOrderMessage(baseOrder);
    expect(msg).not.toContain("*Notes:*");
  });

  it("handles all sizes", () => {
    const allSizes = Object.fromEntries(SIZES.map((s) => [s, 1]));
    const order = { ...baseOrder, sizes: allSizes };
    const msg = buildOrderMessage(order);
    expect(msg).toContain("*Total quantity:* 7");
  });
});
