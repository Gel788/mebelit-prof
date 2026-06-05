"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductQuantityProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  className?: string;
}

export function ProductQuantity({
  value,
  onChange,
  max = 99,
  className,
}: ProductQuantityProps) {
  return (
    <div className={cn("inline-flex items-center rounded-xl border border-border bg-surface-elevated", className)}>
      <button
        type="button"
        aria-label="Уменьшить количество"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
        className="flex h-12 w-12 items-center justify-center text-muted hover:text-foreground disabled:opacity-40 transition-colors"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-12 text-center text-base font-semibold text-foreground tabular-nums">
        {value}
      </span>
      <button
        type="button"
        aria-label="Увеличить количество"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-12 w-12 items-center justify-center text-muted hover:text-foreground disabled:opacity-40 transition-colors"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
