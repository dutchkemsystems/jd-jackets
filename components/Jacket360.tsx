interface Jacket360Props {
  frames: string[];
  alt: string;
  sensitivity?: number;
}

/**
 * STUB IMPLEMENTATION — replaced in PR 4 with full 360° viewer.
 * Currently renders the first frame as a static image.
 */
export default function Jacket360({ frames, alt }: Jacket360Props) {
  if (frames.length === 0) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={frames[0]}
      alt={alt}
      className="h-auto w-full"
      loading="eager"
    />
  );
}
