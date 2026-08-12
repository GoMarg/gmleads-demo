import type { Metadata } from "next";
import { Sora, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { DevToolsWrapper } from "@/components/dev-tools-wrapper";
import { ConditionalNav } from "@/components/conditional-nav";

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
  title: "GmLeads — Identify your website visitors in real-time",
  description:
    "Drop a single <script> tag and start identifying your website visitors, routing leads to Slack, and capturing conversations — no forms required.",
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
        <ConditionalNav />
        {children}
        {showDevTools && <DevToolsWrapper />}
      </body>
    </html>
  );
}
