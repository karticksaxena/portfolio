import type { NextConfig } from "next";

// The game is its own Vercel project (multi-zones); /dreams/play is proxied to it.
const DREAMS_ORIGIN =
  process.env.DREAMS_ORIGIN ?? (process.env.NODE_ENV === "production" ? "" : "http://localhost:5230");
if (!DREAMS_ORIGIN) {
  throw new Error("DREAMS_ORIGIN is not set. Set it to the dreams game's Vercel URL (e.g. https://kartiks-dreams.vercel.app).");
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Next strips the trailing slash (/dreams/play/ -> /dreams/play), so the bare path must
      // reach the game's page itself: the game's own server has nothing at /dreams/play.
      { source: "/dreams/play", destination: `${DREAMS_ORIGIN}/dreams/play/index.html` },
      { source: "/dreams/play/:path+", destination: `${DREAMS_ORIGIN}/dreams/play/:path+` },
    ];
  },
};

export default nextConfig;
