"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "mebelit-splash-seen";

export function SplashScreen() {
  const [phase, setPhase] = useState<"checking" | "enter" | "exit" | "done">("checking");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (sessionStorage.getItem(STORAGE_KEY) || prefersReducedMotion) {
      setPhase("done");
      return;
    }

    setPhase("enter");

    const exitTimer = window.setTimeout(() => setPhase("exit"), 2200);
    const doneTimer = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setPhase("done");
    }, 2900);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "checking" || phase === "done") return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-background"
          aria-hidden={phase === "exit"}
        >
          <div className="pointer-events-none absolute inset-0">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-transparent via-brand-500/25 to-transparent"
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 origin-center bg-gradient-to-r from-transparent via-border to-transparent"
            />
            {[18, 82].map((pos) => (
              <motion.div
                key={pos}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 h-full w-px origin-top bg-gradient-to-b from-transparent via-brand-500/10 to-transparent"
                style={{ left: `${pos}%` }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow"
            >
              <span className="font-display text-2xl font-bold text-white">M</span>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mb-5 h-px w-24 origin-center bg-gradient-to-r from-transparent via-brand-500/60 to-transparent"
            />

            <p className="font-display text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
              Mebelit{" "}
              <span className="text-brand-600 dark:text-brand-400">Prof</span>
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.5 }}
              className="mt-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground"
            >
              Профессиональная мебель
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="mt-8 h-px w-40 origin-center bg-gradient-to-r from-transparent via-border to-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: phase === "exit" ? 1 : 0 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 bottom-0 h-full origin-bottom bg-background"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "exit" ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="h-8 w-px bg-gradient-to-b from-brand-500/40 to-transparent animate-pulse" />
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );
}
