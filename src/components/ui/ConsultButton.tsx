"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ConsultButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6 z-[55] w-[min(280px,calc(100vw-2rem))] rounded-2xl border border-border bg-surface-card/95 p-4 shadow-premium backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Бесплатная консультация
                </p>
                <p className="text-xs text-muted mt-1">
                  Подберём мебель под ваш бизнес за 30 минут
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-hover"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="tel:+78001234567"
                className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated py-2.5 text-xs font-semibold text-foreground hover:border-brand-500/30 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-brand-500" />
                Позвонить
              </Link>
              <Link
                href="/#contacts"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 py-2.5 text-xs font-semibold text-white shadow-glow"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Написать
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-4 sm:bottom-6 sm:right-6 z-[55] flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-card/95 text-brand-600 dark:text-brand-400 shadow-premium backdrop-blur-xl transition-colors hover:border-brand-500/35",
          open && "bg-brand-500 text-white border-brand-500"
        )}
        aria-label="Консультация менеджера"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>
    </>
  );
}
