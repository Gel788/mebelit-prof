import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  action,
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5 mb-10 sm:mb-12",
        !centered && "lg:flex-row lg:items-end lg:justify-between",
        centered && "text-center items-center",
        className
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        <p className="section-label mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          {label}
        </p>
        <h2 className="section-title">{title}</h2>
        {description && (
          <p className={cn("mt-4 text-base sm:text-lg text-muted leading-relaxed", centered && "max-w-lg mx-auto")}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function SectionHeaderLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 text-sm font-bold text-accent-600 hover:underline", className)}>
      {children}
    </Link>
  );
}
