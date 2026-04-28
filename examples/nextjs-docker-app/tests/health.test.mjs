import assert from "node:assert/strict";
import test from "node:test";

import { getHealthPayload } from "../lib/health.mjs";

test("health payload exposes runtime information", () => {
  const payload = getHealthPayload({
    now: new Date("2026-01-01T00:00:00.000Z"),
    uptime: 12.4,
    env: {
      APP_ENV: "test",
      APP_VERSION: "9.9.9",
      NEXT_PUBLIC_APP_MESSAGE: "Hello from tests"
    }
  });

  assert.deepEqual(payload, {
    status: "ok",
    service: "nextjs-docker-app",
    version: "9.9.9",
    environment: "test",
    message: "Hello from tests",
    uptimeSeconds: 12,
    timestamp: "2026-01-01T00:00:00.000Z"
  });
});
