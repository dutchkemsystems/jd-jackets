export interface JacketStyle {
  slug: string;
  name: string;
  category: string;
}

export const JACKET_STYLES: JacketStyle[] = [
  { slug: "executive-puffer", name: "Executive Puffer", category: "Corporate" },
  { slug: "classic-softshell", name: "Classic Softshell", category: "Corporate" },
  { slug: "hi-vis-jacket", name: "Hi-Vis Jacket", category: "Safety" },
  { slug: "hi-vis-vest", name: "Hi-Vis Vest", category: "Safety" },
  { slug: "work-parka", name: "Work Parka", category: "Industrial" },
  { slug: "fleece-jacket", name: "Fleece Jacket", category: "Casual" },
  { slug: "rain-jacket", name: "Rain Jacket", category: "Outdoor" },
  { slug: "windbreaker", name: "Windbreaker", category: "Outdoor" },
  { slug: "bomber-jacket", name: "Bomber Jacket", category: "Casual" },
  { slug: "hooded-sweatshirt", name: "Hooded Sweatshirt", category: "Casual" },
  { slug: "quarter-zip", name: "Quarter Zip", category: "Corporate" },
  { slug: "vest-gilet", name: "Vest / Gilet", category: "Corporate" },
  { slug: "thermal-jacket", name: "Thermal Jacket", category: "Industrial" },
  { slug: "reflective-jacket", name: "Reflective Jacket", category: "Safety" },
  { slug: "softshell-vest", name: "Softshell Vest", category: "Corporate" },
  { slug: "padded-vest", name: "Padded Vest", category: "Industrial" },
  { slug: "coach-jacket", name: "Coach Jacket", category: "Casual" },
  { slug: "track-jacket", name: "Track Jacket", category: "Sports" },
  { slug: "duffle-coat", name: "Duffle Coat", category: "Corporate" },
  { slug: "safety-harness-jacket", name: "Safety Harness Jacket", category: "Safety" },
];

export function getJacketBySlug(slug: string): JacketStyle | undefined {
  return JACKET_STYLES.find((jacket) => jacket.slug === slug);
}

export function getFramesForJacket(slug: string, frameCount = 36): string[] {
  return Array.from({ length: frameCount }, (_, i) => {
    const frameNum = String(i + 1).padStart(3, "0");
    return `/jackets/${slug}/frame-${frameNum}.webp`;
  });
}
