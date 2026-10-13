/**
 * Generates placeholder WebP frames for each jacket style.
 * Each style gets 36 frames (frame-001.webp through frame-036.webp).
 * These are generated placeholders pending real photography.
 *
 * Usage: node scripts/generate-frames.mjs
 */
import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

// Minimal valid WebP file (1x1 pixel, lossy)
// This is a real WebP file that browsers can render
const MINIMAL_WEBP = Buffer.from([
  0x52, 0x49, 0x46, 0x46, // "RIFF"
  0x1a, 0x00, 0x00, 0x00, // file size (26 bytes)
  0x57, 0x45, 0x42, 0x50, // "WEBP"
  0x56, 0x50, 0x38, 0x20, // "VP8 "
  0x0e, 0x00, 0x00, 0x00, // chunk size (14 bytes)
  0x9d, 0x01, 0x2a, // VP8 start code
  0x01, 0x00, 0x01, 0x00, // width=1, height=1
  0x00, 0x34, 0x25, 0xa4, // VP8 data
  0x00, 0x03, 0x70, 0x00, // VP8 data
  0xfe, 0xfb, 0x94, 0x00, // VP8 data
]);

const JACKET_SLUGS = [
  "executive-puffer",
  "classic-softshell",
  "hi-vis-jacket",
  "hi-vis-vest",
  "work-parka",
  "fleece-jacket",
  "rain-jacket",
  "windbreaker",
  "bomber-jacket",
  "hooded-sweatshirt",
  "quarter-zip",
  "vest-gilet",
  "thermal-jacket",
  "reflective-jacket",
  "softshell-vest",
  "padded-vest",
  "coach-jacket",
  "track-jacket",
  "duffle-coat",
  "safety-harness-jacket",
];

const FRAMES_PER_STYLE = 36;

function generateFrames() {
  let totalFrames = 0;

  for (const slug of JACKET_SLUGS) {
    const dir = join(rootDir, "public", "jackets", slug);
    mkdirSync(dir, { recursive: true });

    for (let i = 1; i <= FRAMES_PER_STYLE; i++) {
      const frameNum = String(i).padStart(3, "0");
      const filePath = join(dir, `frame-${frameNum}.webp`);
      writeFileSync(filePath, MINIMAL_WEBP);
      totalFrames++;
    }

    console.log(`Generated ${FRAMES_PER_STYLE} frames for ${slug}`);
  }

  console.log(`\nTotal: ${totalFrames} frames across ${JACKET_SLUGS.length} styles`);
  console.log("These are generated placeholders pending real photography.");
}

generateFrames();
