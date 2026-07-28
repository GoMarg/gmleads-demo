export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      className={`h-6 w-6 ${className}`}
      aria-hidden="true"
    >
      <rect width="28" height="28" rx="6" fill="currentColor" className="text-accent" />
      <path
        d="M8 14l4 4 8-8"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
