export const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] as const;
export type Size = (typeof SIZES)[number];

export type BrandingMethod = "embroidery" | "printing";
export type LogoPlacement = "front" | "back" | "left-sleeve" | "right-sleeve";

export interface OrderPayload {
  businessName: string;
  contactName: string;
  contactEmail?: string;
  industry: string;
  jacketStyle: string;
  sizes: Partial<Record<Size, number>>;
  colours: string;
  brandingMethod: BrandingMethod;
  logoPlacement: LogoPlacement[];
  artworkFiles: string[];
  deliveryLocation: string;
  requiredDate: string;
  notes?: string;
}

const PLACEMENT_LABELS: Record<LogoPlacement, string> = {
  front: "Front",
  back: "Back",
  "left-sleeve": "Left sleeve",
  "right-sleeve": "Right sleeve",
};

/**
 * wa.me accepts digits only: no `+`, no spaces, no dashes.
 * E.164 permits 8–15 digits. Anything outside that range is a
 * configuration error we surface loudly rather than send into the void.
 */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) {
    throw new Error(
      `Invalid WhatsApp number: expected 8–15 digits, received ${digits.length}.`
    );
  }
  return digits;
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${normalizePhone(phone)}?text=${encodeURIComponent(message)}`;
}

export function totalQuantity(sizes: Partial<Record<Size, number>>): number {
  return SIZES.reduce((sum, size) => sum + (sizes[size] ?? 0), 0);
}

function formatSizeBreakdown(sizes: Partial<Record<Size, number>>): string {
  const lines = SIZES.filter((s) => (sizes[s] ?? 0) > 0).map(
    (s) => `  • ${s} × ${sizes[s]}`
  );
  return lines.length ? lines.join("\n") : "  • (not specified)";
}

export function buildOrderMessage(order: OrderPayload): string {
  const total = totalQuantity(order.sizes);
  const placements = order.logoPlacement.map((p) => PLACEMENT_LABELS[p]).join(", ");

  return [
    "*NEW JACKET ORDER — JD Jackets*",
    "",
    `*Business:* ${order.businessName}`,
    `*Contact:* ${order.contactName}${
      order.contactEmail ? ` (${order.contactEmail})` : ""
    }`,
    "",
    `*Industry:* ${order.industry}`,
    `*Jacket style:* ${order.jacketStyle}`,
    `*Total quantity:* ${total}`,
    "",
    "*Size breakdown:*",
    formatSizeBreakdown(order.sizes),
    "",
    `*Colours:* ${order.colours || "(not specified)"}`,
    `*Branding method:* ${
      order.brandingMethod === "embroidery" ? "Embroidery" : "Printing"
    }`,
    `*Logo placement:* ${placements || "(not specified)"}`,
    `*Artwork files:* ${
      order.artworkFiles.length ? order.artworkFiles.join(", ") : "(to follow)"
    }`,
    `*Delivery to:* ${order.deliveryLocation}`,
    `*Required by:* ${order.requiredDate}`,
    order.notes ? `\n*Notes:* ${order.notes}` : "",
  ]
    .filter((line) => line !== undefined)
    .join("\n")
    .trim();
}
