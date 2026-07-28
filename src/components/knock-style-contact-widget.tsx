"use client";

import { useState, useEffect } from "react";

export function KnockStyleContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("slack_connected") === "true") {
      setIsConnected(true);
    }
  }, []);

  const handleSlackConnect = () => {
    const slackClientId = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID;
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/slack/callback`);
    const scopes = encodeURIComponent("channels:read,chat:write,chat:write.public");
    
    const slackAuthUrl = `https://slack.com/oauth/v2/authorize?client_id=${slackClientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
    
    window.location.href = slackAuthUrl;
  };

  return (
    <>
      {/* Contact Button - Exact Knock.ai style */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="footer__knock-button"
            style={{
              gridColumnGap: "12px",
              gridRowGap: "12px",
              backgroundColor: "#fff",
              width: "auto",
              height: "50px",
              color: "#000",
              border: "2px solid #fff",
              borderRadius: "16px",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "38px",
              padding: "12px 20px",
              textDecoration: "none",
              display: "flex",
              position: "relative",
              boxShadow: "0 2px 5px #0000001f,0 4px #0003",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ position: "relative", width: "24px", height: "24px" }}>
                <div style={{ perspective: "400px" }}>
                  {/* Slack Icon */}
                  <svg className="loop-button-logo" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none" style={{
                    width: "24px",
                    height: "24px",
                    position: "absolute",
                    animation: "icon-flip 4.5s infinite",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    opacity: 0.01,
                    animationDelay: "0s",
                  }}>
                    <path d="M5.556 15.6726C5.556 17.0672 4.42955 18.1944 3.03581 18.1944C1.64207 18.1944 0.515625 17.0672 0.515625 15.6726C0.515625 14.278 1.64207 13.1509 3.03581 13.1509C4.42767 13.1509 5.556 14.2808 5.556 15.6726Z" fill="#D41A69"></path>
                    <path d="M6.80273 15.6729C6.80273 14.2781 7.92928 13.1509 9.32315 13.1509C10.717 13.1509 11.8436 14.2781 11.8436 15.6729V21.9778C11.8436 23.3725 10.717 24.4998 9.32315 24.4998C7.92928 24.4998 6.80273 23.3725 6.80273 21.9778V15.6729Z" fill="#D41A69"></path>
                    <path d="M9.32292 5.5435C7.92918 5.5435 6.80273 4.41635 6.80273 3.02175C6.80273 1.62715 7.92918 0.5 9.32292 0.5C10.7167 0.5 11.8431 1.62715 11.8431 3.02175C11.8431 4.41361 10.7148 5.5435 9.32292 5.5435Z" fill="#40B4E2"></path>
                    <path d="M9.34054 6.82764C10.7344 6.82764 11.861 7.95488 11.861 9.34961C11.861 10.7443 10.7344 11.8716 9.34054 11.8716H3.02041C1.62655 11.8716 0.5 10.7443 0.5 9.34961C0.5 7.95488 1.62655 6.82764 3.02041 6.82764H9.34054Z" fill="#40B4E2"></path>
                    <path d="M19.4434 9.34939C19.4434 7.95478 20.5698 6.82764 21.9635 6.82764C23.3573 6.82764 24.4837 7.95478 24.4837 9.34939C24.4837 10.744 23.3573 11.8711 21.9635 11.8711C20.5717 11.8711 19.4434 10.7412 19.4434 9.34939Z" fill="#06AF72"></path>
                    <path d="M18.1873 9.34602C18.1873 10.7408 17.0608 11.868 15.6669 11.868C14.273 11.868 13.1465 10.7408 13.1465 9.34602V3.02198C13.1465 1.62725 14.273 0.5 15.6669 0.5C17.0608 0.5 18.1873 1.62725 18.1873 3.02198V9.34602Z" fill="#06AF72"></path>
                    <path d="M15.6589 19.4531C17.0526 19.4531 18.179 20.5803 18.179 21.9749C18.179 23.3695 17.0526 24.4966 15.6589 24.4966C14.2651 24.4966 13.1387 23.3695 13.1387 21.9749C13.1387 20.583 14.267 19.4531 15.6589 19.4531Z" fill="#F2B021"></path>
                    <path d="M15.6591 18.2002C14.2652 18.2002 13.1387 17.073 13.1387 15.6782C13.1387 14.2835 14.2652 13.1562 15.6591 13.1562H21.9792C23.3731 13.1562 24.4996 14.2835 24.4996 15.6782C24.4996 17.073 23.3731 18.2002 21.9792 18.2002H15.6591Z" fill="#F2B021"></path>
                  </svg>

                  {/* LinkedIn Icon */}
                  <svg className="loop-button-logo" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{
                    position: "absolute",
                    animation: "icon-flip 4.5s infinite",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    opacity: 0.01,
                    animationDelay: "1.5s",
                  }}>
                    <rect width="24" height="24" rx="4" fill="#0077B7"></rect>
                    <path d="M8 9h2v6H8V9zm1.5-1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM16 9h-2v1.5c0 1.5-1 2.5-2.5 2.5S9 11.5 9 10V9H7v6h2v-1.5c0-1 1-2 2-2s2 .5 2 2V15h2V9z" fill="white"></path>
                  </svg>

                  {/* Checkmark Icon */}
                  <svg className="loop-button-logo" width="24" height="24" viewBox="0 0 24 24" fill="none" style={{
                    position: "absolute",
                    animation: "icon-flip 4.5s infinite",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    opacity: 0.01,
                    animationDelay: "3s",
                  }}>
                    <circle cx="12" cy="12" r="10" fill="url(#grad1)"></circle>
                    <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" fill="none"></path>
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#57D163"></stop>
                        <stop offset="100%" stopColor="#23B33A"></stop>
                      </linearGradient>
                    </defs>
                  </svg>

                  <style>{`
                    @keyframes icon-flip {
                      0% {
                        opacity: 0;
                        transform: rotateX(-90deg);
                      }
                      11.11% {
                        opacity: 1;
                        transform: rotateX(0deg);
                      }
                      22.22% {
                        opacity: 1;
                        transform: rotateX(0deg);
                      }
                      33.33% {
                        opacity: 0;
                        transform: rotateX(90deg);
                      }
                      33.34% {
                        opacity: 0;
                        transform: rotateX(-90deg);
                      }
                      100% {
                        opacity: 0;
                        transform: rotateX(-90deg);
                      }
                    }
                  `}</style>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: "14px", color: "#000" }}>
                Contact GmLeads Team
              </div>
            </div>
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full bg-gray-900 p-3 text-white shadow-lg transition-all hover:scale-110"
            style={{ width: "50px", height: "50px" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
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