"use client";

import { useState, useEffect } from "react";

export function SlackContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if Slack is connected
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("slack_connected") === "true") {
      setIsConnected(true);
    }
  }, []);

  const handleSlackConnect = () => {
    // Redirect to Slack OAuth
    const slackClientId = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID;
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/slack/callback`);
    const scopes = encodeURIComponent("channels:read,chat:write,chat:write.public");
    
    const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${slackClientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
    
    window.location.href = slackAuthUrl;
  };

  return (
    <>
      {/* Contact Button - Similar to Knock.ai style */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-lg transition-all hover:scale-105"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-[#4A154B]">
              <path d="M5.042 15.166a2.52 2.52 0 0 1-2.52 2.52A2.52 2.52 0 0 1 0 15.166a2.52 2.52 0 0 1 2.52-2.52h2.522v2.52zM6.313 15.166a2.52 2.52 0 0 1 2.52-2.52 2.52 2.52 0 0 1 2.52 2.52v6.313a2.52 2.52 0 0 1-2.52 2.52 2.52 2.52 0 0 1-2.52-2.52v-6.313z" />
              <path d="M8.833 5.042a2.52 2.52 0 0 1-2.52-2.52A2.52 2.52 0 0 1 8.833 0a2.52 2.52 0 0 1 2.52 2.52v2.522H8.833zM8.833 6.313a2.52 2.52 0 0 1 2.52 2.52 2.52 2.52 0 0 1-2.52 2.52H2.52A2.52 2.52 0 0 1 0 8.833a2.52 2.52 0 0 1 2.52-2.52h6.313z" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">Contact GmLeads Team</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-gray-900 p-3 text-white shadow-lg transition-all hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl bg-white shadow-2xl">
          <div className="border-b border-gray-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4A154B]">
                <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
                  <path d="M5.042 15.166a2.52 2.52 0 0 1-2.52 2.52A2.52 2.52 0 0 1 0 15.166a2.52 2.52 0 0 1 2.52-2.52h2.522v2.52zM6.313 15.166a2.52 2.52 0 0 1 2.52-2.52 2.52 2.52 0 0 1 2.52 2.52v6.313a2.52 2.52 0 0 1-2.52 2.52 2.52 2.52 0 0 1-2.52-2.52v-6.313z" />
                  <path d="M8.833 5.042a2.52 2.52 0 0 1-2.52-2.52A2.52 2.52 0 0 1 8.833 0a2.52 2.52 0 0 1 2.52 2.52v2.522H8.833zM8.833 6.313a2.52 2.52 0 0 1 2.52 2.52 2.52 2.52 0 0 1-2.52 2.52H2.52A2.52 2.52 0 0 1 0 8.833a2.52 2.52 0 0 1 2.52-2.52h6.313z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">GmLeads Support</h3>
                <p className="text-xs text-gray-500">We typically reply in minutes</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            {isConnected ? (
              <div className="rounded-lg bg-green-50 p-3">
                <p className="text-sm text-green-800">✓ Slack connected successfully!</p>
                <p className="mt-1 text-xs text-green-600">You'll receive notifications in your Slack workspace.</p>
              </div>
            ) : (
              <>
                <p className="mb-3 text-sm text-gray-700">
                  Connect your Slack workspace to receive lead notifications and chat with our team.
                </p>
                <button
                  onClick={handleSlackConnect}
                  className="w-full rounded-lg bg-[#4A154B] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#3a113d]"
                >
                  Connect Slack
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}