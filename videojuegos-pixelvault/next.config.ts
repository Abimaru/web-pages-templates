import type { NextConfig } from "next";

// El base path solo se aplica en el build de GitHub Pages (vía la variable
// NEXT_PUBLIC_BASE_PATH que define el workflow). En local queda vacío, así que
// `npm run dev` sigue funcionando en http://localhost:3000 sin prefijos.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
