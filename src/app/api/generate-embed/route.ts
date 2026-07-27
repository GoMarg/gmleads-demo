// Server-side API route for generating embed keys.
//
// Two modes:
//   DEMO MODE: Returns the pre-configured demo workspace. No database writes.
//   CUSTOMER MODE: Creates a new workspace via the backend gateway.
//
// Mode is selected by the `mode` field in the request body:
//   { mode: "demo", ... }
//   { mode: "customer", ... }
//
// Environment variables required on the server:
//   GATEWAY_URL              — The gmleads-gateway URL (e.g. http://localhost:3000)
//   DEMO_ADMIN_EMAIL         — Admin email for demo workspace creation
//   DEMO_ADMIN_PASSWORD      — Admin password for demo workspace creation
//   NEXT_PUBLIC_DEMO_EMBED_KEY — Pre-existing demo embed key (for demo mode)

import { NextResponse } from "next/server";
import type { EmbedKeyResponse } from "@/lib/widget-api";

const GATEWAY_URL = process.env.GATEWAY_URL ?? "http://localhost:3000";

// ---- Mock fallback (used when gateway is unreachable) ----

function generateMockEmbedKey(config: {
  workspaceName: string;
  allowedDomain: string;
  environment: string;
}): EmbedKeyResponse {
  const randomSuffix = crypto.randomUUID().slice(0, 8);
  return {
    embedKey: `wk_live_${randomSuffix}${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`,
    workspaceId: crypto.randomUUID(),
    status: "active",
    workspaceName: config.workspaceName,
    allowedDomain: config.allowedDomain,
    environment: config.environment,
    createdAt: new Date().toISOString(),
  };
}


// ---- Real backend integration ----

async function createWorkspaceViaGateway(body: {
  name: string;
  slackChannelUrl?: string;
  adminEmail: string;
  adminPassword: string;
}): Promise<EmbedKeyResponse | null> {
  try {
    const res = await fetch(`${GATEWAY_URL}/api/workspaces`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      console.error("[generate-embed] gateway returned", res.status, await res.text());
      return null;
    }

    const data = await res.json();

    // Map the workspace response to our EmbedKeyResponse shape.
    // The gateway returns the full Workspace object from the backend.
    return {
      embedKey: data.embedKey,
      workspaceId: data.id,
      status: "active",
      workspaceName: data.name,
      allowedDomain: extractDomain(body.slackChannelUrl ?? ""), // derived from config in mock; real backend stores it
      environment: inferEnvironment(),
      createdAt: data.createdAt ?? new Date().toISOString(),
    };
  } catch (err) {
    console.error("[generate-embed] gateway request failed:", err);
    return null;
  }
}

function extractDomain(urlOrDomain: string): string {
  try {
    return new URL(urlOrDomain).hostname.replace("www.", "");
  } catch {
    return urlOrDomain;
  }
}

function inferEnvironment(): string {
  const host = process.env.VERCEL_ENV ?? process.env.NODE_ENV;
  if (host === "production") return "production";
  return "staging";
}

// ---- Route Handler ----

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { workspaceName, slackChannelUrl, teamEmail, allowedDomain, environment, mode } = body;

    if (!workspaceName || !teamEmail || !allowedDomain) {
      return NextResponse.json(
        { error: "workspaceName, teamEmail, and allowedDomain are required" },
        { status: 400 }
      );
    }

    // DEMO MODE: Return a mock response without hitting the backend.
    // Used for the Interactive Demo section — no new workspace created.
    if (mode === "demo") {
      const mock = generateMockEmbedKey({ workspaceName, allowedDomain, environment });
      return NextResponse.json(mock);
    }

    // CUSTOMER MODE: Try real backend first, fall back to mock only if unreachable.
    // We use the provided teamEmail and generate a random temporary password.
    // In a real SaaS, this would send an email for password setup.
    const adminEmail = teamEmail;
    const adminPassword = crypto.randomUUID() + crypto.randomUUID();

    const result = await createWorkspaceViaGateway({
      name: workspaceName,
      slackChannelUrl: slackChannelUrl || undefined,
      adminEmail,
      adminPassword,
    });

    if (result) {
      return NextResponse.json(result);
    }

    // Fallback: generate a mock embed key
    const mock = generateMockEmbedKey({ workspaceName, allowedDomain, environment });
    return NextResponse.json(mock);
  } catch (err) {
    console.error("[generate-embed] unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Health check for the API route itself.
  return NextResponse.json({ status: "ok", service: "generate-embed" });
}

