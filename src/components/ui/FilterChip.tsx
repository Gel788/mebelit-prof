import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FilterChipProps {
  href: string;
  active?: boolean;
  children: ReactNode;
  count?: number;
}

export function FilterChip({ href, active, children, count }: FilterChipProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
        active
          ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow"
          : "bg-surface-card text-foreground border border-border hover:border-brand-500/35 hover:bg-brand-500/5"
      )}
    >
      {children}
      {count !== undefined && (
        <span
          className={cn(
            "text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center",
            active ? "bg-white/20 text-white" : "bg-hover text-muted-foreground"
          )}
        >
          {count}
        </span>
      )}
    </Link>
  );
}
