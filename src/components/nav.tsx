"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#sdk", label: "SDK" },
  { href: "#docs", label: "Documentation" },
  { href: "#integrations", label: "Integrations" },
  { href: "https://github.com/GoMarg/gmleads-demo", label: "GitHub", external: true },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <span className="text-sm font-bold text-black">G</span>
            </div>
            <span className="text-sm font-semibold text-white">GmLeads</span>
          </a>

          {/* Links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm text-white/50 transition-colors hover:text-white/90"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#get-started"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </a>
        </div>
      </div>
    </motion.nav>
  );
}