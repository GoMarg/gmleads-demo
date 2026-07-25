import Link from "next/link";
import { Container } from "./container";

const LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#live-demo", label: "Live demo" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="#top" className="font-display text-lg font-800 tracking-tight">
          GmLeads
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="#live-demo"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-85"
        >
          See it live
        </Link>
      </Container>
    </header>
  );
}
