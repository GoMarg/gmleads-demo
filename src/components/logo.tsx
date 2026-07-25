// A simple mark evoking ashlar stonework — offset, stacked rectangular
// blocks, like coursed masonry. Distinct, ownable, not a generic
// abstract-blob logo.
export function Logo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect x="2" y="3" width="9" height="7" rx="1.5" fill="var(--accent)" />
      <rect x="13" y="3" width="9" height="7" rx="1.5" fill="var(--ink)" opacity="0.9" />
      <rect x="6" y="14" width="9" height="7" rx="1.5" fill="var(--ink)" opacity="0.9" />
      <rect x="17" y="14" width="5" height="7" rx="1.5" fill="var(--accent)" />
    </svg>
  );
}
