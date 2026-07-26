"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";

const LINKS = [
  { href: "/#product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-bg/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
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
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 md:block"
          >
            Start for free
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-ink-faint md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 z-30 h-[calc(100dvh-4rem)] animate-[nudge-in_0.2s_ease-out] overflow-y-auto bg-bg md:hidden"
        >
          <Container className="flex flex-col gap-1 py-6">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3.5 text-lg font-600 text-ink transition-colors hover:bg-bg-raised"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-line-soft pt-6">
              <Link
                href="/#product"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-line px-4 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-ink-faint"
              >
                Sign in
              </Link>
              <Link
                href="/#product"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
              >
                Start for free
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
