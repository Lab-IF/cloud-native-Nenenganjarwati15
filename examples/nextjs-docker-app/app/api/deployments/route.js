import { NextResponse } from "next/server";
import { deploymentSteps, runtimeChecks } from "../../../lib/teachingData.js";

export function GET() {
  return NextResponse.json({
    service: "nextjs-docker-app",
    purpose: "Data contoh untuk menjelaskan build, run, compose, dan smoke test.",
    steps: deploymentSteps,
    checks: runtimeChecks
  });
}
