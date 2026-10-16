import type { NextConfig } from "next";
const csp =
  "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self' mailto:";
const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          ...(process.env.NODE_ENV === "production"
            ? [{ key: "Content-Security-Policy", value: csp }]
            : []),
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/grcloop", destination: "/services/grcloop", permanent: true },
      {
        source: "/forgeloop",
        destination: "/services/forgeloop",
        permanent: true,
      },
      { source: "/hexn6", destination: "/services/hexn6", permanent: true },
      { source: "/resources/blog", destination: "/insights", permanent: true },
      {
        source: "/resources/success-stories",
        destination: "/our-work",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
