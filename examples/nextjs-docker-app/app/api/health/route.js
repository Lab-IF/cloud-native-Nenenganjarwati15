import { NextResponse } from "next/server";
import { getHealthPayload } from "../../../lib/health.mjs";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(getHealthPayload());
}
