// API service layer for widget configuration and embed-key generation.
//
// Architecture:
//   1. Browser → fetch POST /api/generate-embed (local Next.js Route Handler)
//   2. Route Handler → fetch POST {GATEWAY_URL}/api/workspaces (real backend)
//   3. If gateway is unreachable, Route Handler falls back to mock generation
//
// This keeps admin credentials server-side and provides a clean typed
// interface that can be tested independently.

export interface WidgetConfig {
  workspaceName: string;
  slackChannelUrl?: string;
  notificationPreference: "slack" | "email" | "webhook";
  teamEmail: string;
  allowedDomain: string;
  environment: "production" | "staging";
  /** "customer" = creates a real workspace via gateway. "demo" = mock response only. */
  mode?: "customer" | "demo";
}

export interface EmbedKeyResponse {
  embedKey: string;
  workspaceId: string;
  status: "active";
  workspaceName: string;
  allowedDomain: string;
  environment: string;
  createdAt: string;
  /** Temporary admin password for dashboard login (returned only on successful workspace creation). */
  adminPassword?: string;
}

export interface DemoStatus {
  widget: { status: "connected" | "disconnected"; label: string };
  slack: { status: "connected" | "disconnected"; label: string };
  workspace: { status: "active" | "inactive"; label: string; name: string };
  embedKey: { status: "valid" | "invalid"; label: string; key: string };
  metrics: {
    activeVisitors: number;
    leadsCapturedToday: number;
    lastConversation: string;
    avgResponseTime: string;
  };
}

export interface GenerateEmbedResponse {
  success: boolean;
  data?: EmbedKeyResponse;
  error?: string;
}

// Browser-facing: calls the local Next.js API route which proxies to
// the real backend (or falls back to mock if unavailable).
// The browser never knows about gateway URLs or admin credentials.
export async function generateEmbedKey(
  config: WidgetConfig
): Promise<GenerateEmbedResponse> {
  try {
    const res = await fetch("/api/generate-embed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    const body = await res.json();
    if (!res.ok) {
      return { success: false, error: body.error ?? "Failed to generate embed key" };
    }
    return { success: true, data: body as EmbedKeyResponse };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}

// Fetch demo status from the server-side endpoint
export async function fetchDemoStatus(): Promise<DemoStatus | null> {
  try {
    const res = await fetch("/api/demo-status");
    if (!res.ok) return null;
    return (await res.json()) as DemoStatus;
  } catch {
    return null;
  }
}
