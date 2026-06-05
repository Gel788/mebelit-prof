"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ElegantDividerProps {
  className?: string;
  withDot?: boolean;
}

export function ElegantDivider({ className, withDot = true }: ElegantDividerProps) {
  return (
    <div className={cn("relative py-8 sm:py-10", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-px flex-1 max-w-[calc(50%-2rem)] origin-right bg-gradient-to-l from-brand-500/35 to-transparent"
          />
          {withDot && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mx-4 flex items-center gap-2"
            >
              <span className="h-px w-3 bg-brand-500/30" />
              <span className="h-1 w-1 rotate-45 border border-brand-500/40 bg-brand-500/10" />
              <span className="h-px w-3 bg-brand-500/30" />
            </motion.div>
          )}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-px flex-1 max-w-[calc(50%-2rem)] origin-left bg-gradient-to-r from-brand-500/35 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}

interface ElegantFrameProps {
  className?: string;
}

export function ElegantFrame({ className }: ElegantFrameProps) {
  const corner =
    "absolute h-12 w-12 sm:h-16 sm:w-16 border-brand-500/25 pointer-events-none";

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-[1]", className)}>
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className={cn(corner, "top-6 left-4 sm:top-10 sm:left-8 border-t border-l rounded-tl-sm")}
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.75 }}
        className={cn(corner, "top-6 right-4 sm:top-10 sm:right-8 border-t border-r rounded-tr-sm")}
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className={cn(corner, "bottom-6 left-4 sm:bottom-10 sm:left-8 border-b border-l rounded-bl-sm")}
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.05 }}
        className={cn(
          corner,
          "bottom-6 right-4 sm:bottom-10 sm:right-8 border-b border-r rounded-br-sm"
        )}
      />
    </div>
  );
}

export function ElegantPageLines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-full">
          {[0, 33.33, 66.66, 100].map((left, i) => (
            <motion.div
              key={left}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 h-full w-px origin-top bg-gradient-to-b from-brand-500/[0.1] via-border/50 to-transparent"
              style={{ left: `${left}%` }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute inset-0 opacity-[0.45] dark:opacity-[0.28]"
        style={{
          backgroundImage: `
            linear-gradient(to right, transparent 0%, transparent calc(50% - 0.5px), var(--border) calc(50% - 0.5px), var(--border) calc(50% + 0.5px), transparent calc(50% + 0.5px)),
            linear-gradient(to bottom, transparent 0%, transparent calc(12.5% - 0.5px), var(--border) calc(12.5% - 0.5px), var(--border) calc(12.5% + 0.5px), transparent calc(12.5% + 0.5px))
          `,
          backgroundSize: "100% 100%, 100% 800px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
        }}
      />
    </div>
  );
}

interface SectionAccentLineProps {
  align?: "left" | "center";
  className?: string;
}

export function SectionAccentLine({
  align = "left",
  className,
}: SectionAccentLineProps) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "h-px w-16 sm:w-24 mb-4 origin-left bg-gradient-to-r from-brand-500/50 to-transparent",
        align === "center" && "mx-auto origin-center bg-gradient-to-r from-transparent via-brand-500/50 to-transparent",
        className
      )}
    />
  );
}
