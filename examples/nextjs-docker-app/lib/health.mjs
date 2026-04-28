export function getHealthPayload({ now = new Date(), uptime = process.uptime(), env = process.env } = {}) {
  return {
    status: "ok",
    service: "nextjs-docker-app",
    version: env.APP_VERSION || env.npm_package_version || "0.1.0",
    environment: env.APP_ENV || "development",
    message:
      env.NEXT_PUBLIC_APP_MESSAGE ||
      "Next.js is running with UI, API routes, and container-ready runtime config.",
    uptimeSeconds: Math.round(uptime),
    timestamp: now.toISOString()
  };
}
