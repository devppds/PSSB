import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare/cloudflare-context";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  serverExternalPackages: ['async_hooks', 'fs', 'path', 'node:async_hooks', 'node:fs', 'node:path', 'node:dns', 'node:net']
};

export default nextConfig;
