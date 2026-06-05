import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  secondaryLabel,
  secondaryHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-surface-card p-10 sm:p-12 text-center shadow-card",
        className
      )}
    >
      {icon && (
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted max-w-md mx-auto leading-relaxed mb-8">{description}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {actionLabel && actionHref && (
          <Link href={actionHref}>
            <Button size="lg">{actionLabel}</Button>
          </Link>
        )}
        {actionLabel && onAction && !actionHref && (
          <Button size="lg" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
        {secondaryLabel && secondaryHref && (
          <Link href={secondaryHref}>
            <Button variant="secondary" size="lg">
              {secondaryLabel}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
