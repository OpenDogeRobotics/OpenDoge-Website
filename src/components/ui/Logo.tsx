import { cn } from "@/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-8 w-8", className)} aria-hidden>
      <rect width="64" height="64" rx="14" className="fill-mint-500" />
      <path
        d="M18 42c0-8 6-14 14-14s14 6 14 14"
        fill="none"
        stroke="#07070a"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <circle cx="21" cy="21" r="4.2" fill="#07070a" />
      <circle cx="32" cy="16.5" r="4.2" fill="#07070a" />
      <circle cx="43" cy="21" r="4.2" fill="#07070a" />
      <rect x="27" y="42" width="10" height="6" rx="2" fill="#07070a" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <a href="#top" className={cn("group inline-flex items-center gap-2.5", className)} aria-label="OpenDoge home">
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-6" />
      {!compact ? (
        <span className="text-[17px] font-semibold tracking-tight text-white">
          Open<span className="text-mint-400">Doge</span>
        </span>
      ) : null}
    </a>
  );
}
