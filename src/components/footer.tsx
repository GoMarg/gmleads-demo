import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/#product", label: "Issue tracking" },
      { href: "/#product", label: "Sprints" },
      { href: "/#product", label: "Roadmaps" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [{ href: "/docs", label: "Support" }],
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
              <span className="font-display text-base font-700">Ashlar</span>
            </div>
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-ink-faint">
              The workspace for teams who ship.
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
          &copy; {new Date().getFullYear()} Ashlar, Inc.
        </div>
      </Container>
    </footer>
  );
}
