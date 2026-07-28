"use client";

import { useEffect, useState } from "react";

export function WidgetNudge() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 4000);
    const hideTimer = setTimeout(() => setVisible(false), 14000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-30 hidden animate-[nudge-in_0.4s_ease-out] sm:block">
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#141414] px-4 py-3 shadow-xl">
        <p className="max-w-[170px] text-sm text-ink/80">
          Need help? Talk to us 👋
        </p>
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.08] bg-[#141414] text-[10px] text-ink-faint hover:text-ink"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
