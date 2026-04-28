import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  turbopack: {
    root: appRoot
  }
};

export default nextConfig;
