import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Use serverExternalPackages to avoid bundling Node.js built-ins in the edge bundle
  serverExternalPackages: [
    'async_hooks', 'fs', 'path', 'url', 'crypto', 'buffer', 'events', 'stream', 'util',
    'dns', 'net', 'tls', 'http', 'https', 'zlib', 'vm', 'os', 'child_process'
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
