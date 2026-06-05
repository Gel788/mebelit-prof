import type { ReactNode } from "react";

interface PageHeaderProps {
  label: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ label, title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <p className="text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
          {label}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-muted mt-3 max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
