import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

// Build-time check: fail early if WhatsApp number is missing in production
if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) {
  throw new Error(
    "NEXT_PUBLIC_WHATSAPP_NUMBER is not set. " +
    "Add it to your environment variables before building for production. " +
    "See .env.example for the expected format."
  );
}

export default nextConfig;
