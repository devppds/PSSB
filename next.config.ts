import type { NextConfig } from "next";

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
};

export default nextConfig;
