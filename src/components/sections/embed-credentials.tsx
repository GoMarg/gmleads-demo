"use client";

import { useState } from "react";
import { Container } from "../container";

interface EmbedCredentialsProps {
  embedKey: string;
  workspaceName: string;
  allowedDomain: string;
  environment: string;
  createdAt: string;
  adminPassword?: string;
}

function getTimeAgo(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = now - then;
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

function DetailItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
        {label}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function EmbedCredentials({
  embedKey,
  workspaceName,
  allowedDomain,
  environment,
  createdAt,
  adminPassword,
}: EmbedCredentialsProps) {
  const [copied, setCopied] = useState(false);
  const timeAgo = getTimeAgo(createdAt);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(embedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <section id="credentials" className="py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-lg">
          <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised shadow-2xl">
            {/* header */}
            <div className="border-b border-line-soft bg-accent-soft/20 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                  <svg
                    className="h-5 w-5 text-accent-ink"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-lg font-700 text-ink">
                    Widget Generated
                  </h3>
                  <p className="text-sm text-ink-soft">
                    Your widget is ready to install
                  </p>
                </div>
              </div>
            </div>

            {/* credentials */}
            <div className="px-6 py-6 space-y-5">
              {/* embed key */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
                  Embed Key
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 overflow-hidden rounded-lg border border-line bg-bg px-3.5 py-2.5">
                    <code className="text-sm font-mono text-accent break-all">
                      {embedKey}
                    </code>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line text-ink-soft transition-colors hover:border-ink-faint hover:text-ink"
                    aria-label={copied ? "Copied" : "Copy embed key"}
                  >
                    {copied ? (
                      <svg
                        className="h-4 w-4 text-accent"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="mt-1.5 text-xs text-accent animate-[nudge-in_0.2s_ease-out]">
                    Copied to clipboard
                  </p>
                )}
              </div>

              {/* details grid */}
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Status">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 rounded-full bg-accent" />
                    <span className="text-sm text-ink">Active</span>
                  </div>
                </DetailItem>
                <DetailItem label="Environment">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      environment === "production"
                        ? "bg-accent-soft text-accent-2"
                        : "bg-ink-faint/20 text-ink-soft"
                    }`}
                  >
                    {environment === "production" ? "Production" : "Staging"}
                  </span>
                </DetailItem>
                <DetailItem label="Workspace">
                  <span className="text-sm text-ink truncate">
                    {workspaceName}
                  </span>
                </DetailItem>
                <DetailItem label="Allowed Domain">
                  <span className="text-sm text-ink truncate">
                    {allowedDomain}
                  </span>
                </DetailItem>
              </div>

              {/* admin password (shown once) */}
              {adminPassword && (
                <div className="rounded-lg border border-accent-soft/40 bg-accent-soft/10 px-4 py-3">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-accent">
                        Temporary Dashboard Password
                      </p>
                      <code className="mt-1 block text-sm font-mono text-ink break-all">
                        {adminPassword}
                      </code>
                      <p className="mt-1.5 text-xs text-ink-soft">
                        Use this password to log into your dashboard. Save it
                        now — it won&apos;t be shown again.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* created timestamp */}
              <div className="flex items-center gap-2 text-xs text-ink-faint border-t border-line-soft pt-4">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Created {timeAgo}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
