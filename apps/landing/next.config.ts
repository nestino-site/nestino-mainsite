import type { NextConfig } from "next";

function normalizeOrigin(origin: string): string {
  return origin.endsWith("/") ? origin.slice(0, -1) : origin;
}

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.posthog.com https://us.i.posthog.com https://eu.i.posthog.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.posthog.com https://us.i.posthog.com https://eu.i.posthog.com wss://*.posthog.com https://vitals.vercel-insights.com https://maps.googleapis.com",
  "frame-src https://*.nestino.com https://nestino-main.vercel.app https://*.nestino-main.vercel.app https://www.google.com https://maps.google.com https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  transpilePackages: ["@nestino/db", "@nestino/villa-site"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "www.silyanvillas.com",
      },
      // Engine / CMS may host media on arbitrary HTTPS CDNs
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    const origin = process.env.CURINA_ORIGIN?.trim();
    if (!origin) return [];

    const curinaOrigin = normalizeOrigin(origin);
    return [
      { source: "/Curina", destination: `${curinaOrigin}/` },
      { source: "/Curina/:path*", destination: `${curinaOrigin}/:path*` },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
