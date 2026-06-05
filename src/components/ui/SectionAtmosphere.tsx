import { cn } from "@/lib/utils";

type AtmosphereVariant = "default" | "warm" | "elevated" | "accent";

interface SectionAtmosphereProps {
  variant?: AtmosphereVariant;
  className?: string;
}

const orbStyles: Record<
  AtmosphereVariant,
  { primary: string; secondary: string; ring: string }
> = {
  default: {
    primary: "bg-brand-500/10 dark:bg-brand-500/14",
    secondary: "bg-brand-400/8 dark:bg-brand-600/10",
    ring: "border-brand-500/10 dark:border-brand-500/15",
  },
  warm: {
    primary: "bg-brand-600/10 dark:bg-brand-500/16",
    secondary: "bg-amber-500/6 dark:bg-brand-400/10",
    ring: "border-brand-600/12 dark:border-brand-400/15",
  },
  elevated: {
    primary: "bg-foreground/[0.03] dark:bg-white/[0.04]",
    secondary: "bg-brand-500/8 dark:bg-brand-500/12",
    ring: "border-border/80 dark:border-white/10",
  },
  accent: {
    primary: "bg-brand-500/14 dark:bg-brand-500/18",
    secondary: "bg-brand-700/8 dark:bg-brand-400/12",
    ring: "border-brand-500/15 dark:border-brand-400/20",
  },
};

export function SectionAtmosphere({
  variant = "default",
  className,
}: SectionAtmosphereProps) {
  const styles = orbStyles[variant];

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className={cn(
          "absolute -top-24 right-[8%] h-72 w-72 rounded-full blur-[100px]",
          styles.primary
        )}
      />
      <div
        className={cn(
          "absolute -bottom-28 left-[4%] h-80 w-80 rounded-full blur-[110px]",
          styles.secondary
        )}
      />
      <div
        className="absolute inset-0 opacity-35 dark:opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--ambient-dot) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 75%)",
        }}
      />
      <div className="absolute top-1/2 left-1/2 h-px w-[min(90%,720px)] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent-500/12 to-transparent dark:via-accent-500/10" />
    </div>
  );
}
