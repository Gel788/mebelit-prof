"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppImage } from "@/components/ui/AppImage";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Minus, Plus, X, ZoomIn, ZoomOut } from "lucide-react";

interface ProductLightboxProps {
  images: string[];
  name: string;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function ProductLightbox({
  images,
  name,
  initialIndex,
  isOpen,
  onClose,
  onIndexChange,
}: ProductLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) setIndex(initialIndex);
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen) return;
    setZoom(1);
  }, [index, isOpen]);

  const goTo = useCallback(
    (next: number) => {
      const wrapped = (next + images.length) % images.length;
      setIndex(wrapped);
      onIndexChange(wrapped);
    },
    [images.length, onIndexChange]
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(z + 0.25, 3));
      if (e.key === "-") setZoom((z) => Math.max(z - 0.25, 1));
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, index, goTo, onClose]);

  const activeImage = images[index] ?? images[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`Просмотр: ${name}`}
        >
          <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-border">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-1">
                Галерея
              </p>
              <p className="text-sm sm:text-base font-medium text-foreground truncate">
                {name}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="hidden sm:inline text-sm text-muted mr-2">
                {index + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-card text-muted hover:text-foreground transition-colors"
                aria-label="Уменьшить"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-card text-muted hover:text-foreground transition-colors"
                aria-label="Увеличить"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-card text-muted hover:text-foreground transition-colors"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 min-h-0 flex items-center justify-center p-4 sm:p-8">
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  className="absolute left-3 sm:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-card/90 text-foreground shadow-card backdrop-blur-sm hover:border-brand-500/40 transition-colors"
                  aria-label="Предыдущее фото"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  className="absolute right-3 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-card/90 text-foreground shadow-card backdrop-blur-sm hover:border-brand-500/40 transition-colors"
                  aria-label="Следующее фото"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="relative w-full h-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-premium">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: zoom }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full origin-center"
              >
                <AppImage
                  src={activeImage}
                  alt={`${name} — фото ${index + 1}`}
                  fill
                  className="object-contain p-4 sm:p-8"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {images.length > 1 && (
            <div className="border-t border-border px-4 sm:px-6 py-4">
              <div className="mx-auto flex max-w-3xl gap-3 overflow-x-auto pb-1 scrollbar-none justify-center">
                {images.map((img, i) => (
                  <button
                    key={`${img}-${i}`}
                    type="button"
                    onClick={() => goTo(i)}
                    className={cn(
                      "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition-all",
                      i === index
                        ? "border-brand-500 ring-2 ring-brand-500/30 scale-105"
                        : "border-border opacity-70 hover:opacity-100"
                    )}
                    aria-label={`Фото ${i + 1}`}
                  >
                    <AppImage src={img} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="sm:hidden flex items-center justify-center gap-4 pb-4 text-muted">
            <button type="button" onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}>
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-xs font-medium">{Math.round(zoom * 100)}%</span>
            <button type="button" onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}>
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
