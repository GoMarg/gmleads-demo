import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";

const LINKS = [
  { href: "/#product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/#customers", label: "Customers" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-bg/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-display text-lg font-700 tracking-tight">Ashlar</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/#product" className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-ink sm:block">
            Sign in
          </Link>
          <Link
            href="/#product"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
          >
            Start for free
          </Link>
        </div>
      </Container>
    </header>
  );
}
