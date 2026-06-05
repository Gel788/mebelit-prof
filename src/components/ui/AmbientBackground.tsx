"use client";

import { ElegantPageLines } from "@/components/ui/ElegantLines";

export function AmbientBackground() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-x-0 top-0 h-[min(100vh,920px)] bg-hero-glow opacity-100" />

        <div
          className="absolute inset-0 opacity-[0.55] dark:opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, var(--ambient-dot) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.22] dark:opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(to right, transparent 0%, var(--ambient-line) 50%, transparent 100%),
              repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 399px,
                var(--ambient-line) 399px,
                var(--ambient-line) 400px
              )
            `,
            backgroundSize: "1px 100%, 100% 400px",
            maskImage:
              "linear-gradient(to bottom, black 0%, transparent 90%)",
          }}
        />

        <div
          className="ambient-orb absolute -left-[12%] top-[12%] h-[min(52vw,440px)] w-[min(52vw,440px)] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--ambient-orb) 0%, transparent 68%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="ambient-orb absolute -right-[8%] top-[38%] h-[min(44vw,380px)] w-[min(44vw,380px)] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--ambient-orb-2) 0%, transparent 70%)",
            animationDelay: "-7s",
          }}
        />
        <div
          className="ambient-orb absolute bottom-[8%] left-[28%] h-[min(40vw,360px)] w-[min(40vw,360px)] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--ambient-orb) 0%, transparent 72%)",
            animationDelay: "-14s",
          }}
        />

        <div className="absolute top-[18%] right-[8%] hidden lg:block">
          <div className="h-40 w-40 rounded-full border border-brand-500/10 dark:border-brand-500/15" />
          <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-500/[0.06] dark:border-brand-500/10" />
          <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-brand-500/[0.05] dark:border-brand-500/[0.08]" />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[36vh] bg-gradient-to-t from-brand-500/[0.045] via-brand-500/[0.015] to-transparent dark:from-brand-500/[0.07] dark:via-brand-500/[0.02]" />
      </div>

      <ElegantPageLines />
    </>
  );
}
