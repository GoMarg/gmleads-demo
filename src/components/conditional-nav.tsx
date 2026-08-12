"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/nav";

// /live-demo renders its own immersive "customer site" header (Gridflow) —
// the marketing site's fixed top nav must not render on top of it.
export function ConditionalNav() {
  const pathname = usePathname();
  if (pathname?.startsWith("/live-demo")) return null;
  return <Nav />;
}
