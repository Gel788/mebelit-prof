import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow hover:from-brand-400 hover:to-brand-500 hover:shadow-float hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        secondary:
          "bg-surface-card text-foreground border border-border shadow-soft hover:border-brand-500/35 hover:bg-brand-500/5 hover:shadow-card active:scale-[0.98]",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-hover active:scale-[0.98]",
        outline:
          "border-2 border-brand-500/40 text-brand-700 dark:text-brand-300 bg-transparent hover:bg-brand-500/10 hover:border-brand-500 active:scale-[0.98]",
        white:
          "bg-foreground text-background shadow-card hover:shadow-float hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        soft:
          "bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/20 hover:bg-brand-500/15 hover:border-brand-500/30",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
