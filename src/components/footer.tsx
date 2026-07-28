import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/#how-it-works", label: "How it Works" },
      { href: "/#configure", label: "Get Started" },
      { href: "/live-demo", label: "Live Demo" },
      { href: "/docs", label: "Documentation" },
    ],
  },
  {
    title: "Developers",
    links: [
      { href: "/docs", label: "SDK Reference" },
      { href: "/docs", label: "API Reference" },
      { href: "/docs", label: "Changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Installation Guide" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line-soft py-16">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-display text-base font-700">GmLeads</span>
            </div>
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-ink-faint">
              Website visitor identification. One line of code.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-ink-soft transition-colors hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 border-t border-line-soft pt-8 text-sm text-ink-faint">
          &copy; {new Date().getFullYear()} GmLeads, Inc.
        </div>
      </Container>
    </footer>
  );
}
