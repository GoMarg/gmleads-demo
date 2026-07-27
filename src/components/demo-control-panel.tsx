"use client";

import { useCallback, useState } from "react";

// Demo Control Panel — only rendered when NEXT_PUBLIC_SHOW_DEMO_CONTROLS=true
// or in development mode. Provides self-service actions for live demos:
// - Clear demo lead data
// - Reset conversation
// - Refresh embed key
// - Simulate Slack notification
// - Simulate CRM sync
//
// Not visible in production builds to real customers.

const STORAGE_KEY_CONVERSATION = "gmleads_demo_conversation";

export function DemoControlPanel() {
  const [collapsed, setCollapsed] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = useCallback((msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 2500);
  }, []);

  function handleResetConversation() {
    try {
      sessionStorage.removeItem(STORAGE_KEY_CONVERSATION);
      showFeedback("Conversation reset. Reload the page to start fresh.");
    } catch {
      showFeedback("Could not access session storage.");
    }
  }

  function handleClearDemoLead() {
    try {
      // Clear any GMLeads-related session state
      sessionStorage.removeItem("gmleads_session_id");
      // Reload widget by destroying existing instance
      const w = window as unknown as {
        GmLeads?: { destroy: () => void; init: (c: { key: string }) => void };
      };
      if (w.GmLeads) {
        try { w.GmLeads.destroy(); } catch {}
      }
      showFeedback("Lead data cleared. Widget will reinitialize on next page load.");
    } catch {
      showFeedback("Could not clear lead data.");
    }
  }

  function handleSimulateSlack() {
    showFeedback("⚠ Slack simulation: In production, this sends a test alert to #sales-leads. Currently requires a live Slack integration.");
  }

  function handleSimulateCrm() {
    showFeedback("⚠ CRM simulation: In production, this syncs a test contact to HubSpot. Currently requires a live CRM integration.");
  }

  function handleRefreshPage() {
    window.location.reload();
  }

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed bottom-4 left-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg-raised text-ink-faint shadow-lg transition-colors hover:border-ink-faint hover:text-ink"
        aria-label="Open demo controls"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v6M12 16v6M4 12h6M14 12h6M7 7l3 3M14 14l3 3M17 7l-3 3M10 14l-3 3" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-72 animate-[nudge-in_0.2s_ease-out]">
      <div className="rounded-xl border border-line bg-bg-raised p-4 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
            Demo Controls
          </p>
          <div className="flex items-center gap-2">
            {feedback && (
              <span className="text-[10px] text-accent truncate max-w-[140px]">
                {feedback}
              </span>
            )}
            <button
              onClick={() => setCollapsed(true)}
              className="flex h-5 w-5 items-center justify-center rounded text-ink-faint hover:text-ink"
              aria-label="Close demo controls"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <ControlButton label="Reset Conversation" onClick={handleResetConversation} />
          <ControlButton label="Clear Demo Lead" onClick={handleClearDemoLead} />
          <ControlButton label="Reload Widget" onClick={handleRefreshPage} />
          <div className="border-t border-line-soft my-1.5" />
          <ControlButton label="Simulate Slack Notification" onClick={handleSimulateSlack} disabled />
          <ControlButton label="Simulate CRM Sync" onClick={handleSimulateCrm} disabled />
        </div>

        <p className="mt-2 text-[9px] text-ink-faint/50 text-center">
          Development only — hidden in production
        </p>
      </div>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-md px-3 py-2 text-left text-xs transition-colors ${
        disabled
          ? "text-ink-faint/40 cursor-not-allowed"
          : "text-ink-soft hover:bg-bg-inset hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

