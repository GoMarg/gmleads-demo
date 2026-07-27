import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { DevToolsWrapper } from "@/components/dev-tools-wrapper";

// Ashlar is a fictional company invented purely as a believable backdrop
// for demonstrating GmLeads the way a real customer would experience it
// — see README.md. Its own type identity, deliberately distinct from the
// gmleads-demo site this repo replaced (Manrope/Inter, coral accent).
const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ashlar — The workspace for teams who ship",
  description:
    "Issue tracking, sprints, and release workflows built for engineering teams who'd rather be shipping than managing tickets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showDevTools =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_SHOW_DEMO_CONTROLS === "true";

  return (
    <html lang="en" className={`${sora.variable} ${plexSans.variable}`}>
      <body className="min-h-full antialiased">
        {children}
        {showDevTools && <DevToolsWrapper />}
      </body>
    </html>
  );
}
