"use client";

import dynamic from "next/dynamic";

// Dynamically import the DemoControlPanel so it's never loaded in
// production (it only renders when NEXT_PUBLIC_SHOW_DEMO_CONTROLS=true
// or NODE_ENV === 'development').
//
// We use dynamic() with ssr: false here to avoid hydration mismatches
// from client-only browser APIs (sessionStorage, window, etc.).
const DemoControlPanel = dynamic(
  () =>
    import("./demo-control-panel").then((mod) => mod.DemoControlPanel),
  { ssr: false }
);

export function DevToolsWrapper() {
  return <DemoControlPanel />;
}

