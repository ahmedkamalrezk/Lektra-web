type IconProps = { className?: string; style?: React.CSSProperties };

export function ArrowIcon({ className, style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function CheckIcon({ className, style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function QuoteIcon({ className, style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7Z" />
      <path d="M20 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V7Z" />
      <path d="M6 14v1a3 3 0 0 0 3 3M16 14v1a3 3 0 0 0 3 3" />
    </svg>
  );
}

export function SchoolIcon({ className, style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 9 9-5 9 5-9 5-9-5Z" />
      <path d="M6 11.2V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.8" />
      <path d="M21 9v5" />
    </svg>
  );
}

export function InfoIcon({ className, style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function PenIcon({ className, style }: IconProps) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z" />
    </svg>
  );
}

export function SpinnerIcon({ className, style }: IconProps) {
  return (
    <svg
      className={`${className ?? ""} animate-spin`}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}
