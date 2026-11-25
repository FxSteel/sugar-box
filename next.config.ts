import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Imagen Docker autocontenida para Dokploy (ver Dockerfile)
  output: "standalone",
  poweredByHeader: false,
  images: {
    // TODO: quitar cuando las fotos propias vivan en /public
    remotePatterns: [{ protocol: "https", hostname: "i.pinimg.com" }],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
