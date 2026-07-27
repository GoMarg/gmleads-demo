// Server-side API route for demo status / health panel.
//
// Returns the current status of the demo workspace — widget connectivity,
// Slack integration status, and live metrics.
//
// In production, this would query the backend APIs for real-time status.
// Currently returns demonstration values clearly labeled as such.

import { NextResponse } from "next/server";
import type { DemoStatus } from "@/lib/widget-api";

export async function GET() {
  // In a production setup, this would:
  //   1. Verify the demo embed key is still valid via the gateway
  //   2. Check Slack connection status via the gateway
  //   3. Query recent session/lead counts from the analytics API
  //   4. Return real-time metrics
  //
  // For now, return demonstration values.
  // These are clearly labeled as "Demonstration" downstream in the UI.

  const status: DemoStatus & { isDemo: boolean } = {
    widget: { status: "connected", label: "Widget Connected ✓" },
    slack: { status: "connected", label: "Slack Connected (#sales-leads)" },
    workspace: { status: "active", label: "Workspace Active", name: "GmLeads Demo" },
    embedKey: {
      status: "valid",
      label: "Embed Key Valid",
      key: process.env.NEXT_PUBLIC_DEMO_EMBED_KEY ?? "wk_demo_00000000000000000000000000",
    },
    metrics: {
      activeVisitors: 3,
      leadsCapturedToday: 18,
      lastConversation: "12 seconds ago",
      avgResponseTime: "< 1 sec",
    },
    isDemo: true,
  };

  return NextResponse.json(status);
}

