export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
      {children}
    </span>
  );
}
