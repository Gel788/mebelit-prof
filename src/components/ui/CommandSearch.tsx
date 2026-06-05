"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AppImage } from "@/components/ui/AppImage";
import { getCatalogProducts } from "@/data/catalog";
import { formatPrice, cn } from "@/lib/utils";
import { ArrowRight, Search, X } from "lucide-react";

interface CommandSearchProps {
  open: boolean;
  onClose: () => void;
}

export function CommandSearch({ open, onClose }: CommandSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const products = useMemo(() => getCatalogProducts(), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [products, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        router.push(`/product/${results[activeIndex].slug}`);
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, results, activeIndex, router, onClose]);

  const goTo = useCallback(
    (slug: string) => {
      router.push(`/product/${slug}`);
      onClose();
    },
    [router, onClose]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-background/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-[12vh] z-[130] w-[min(640px,calc(100vw-1.5rem))] -translate-x-1/2 overflow-hidden rounded-3xl border border-border bg-surface-card shadow-premium"
            role="dialog"
            aria-modal="true"
            aria-label="Поиск товаров"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Search className="h-5 w-5 text-brand-500 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по каталогу..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
              />
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-hover"
                aria-label="Закрыть поиск"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[min(420px,55vh)] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-muted">
                  Ничего не найдено
                </p>
              ) : (
                <ul className="space-y-1">
                  {results.map((product, index) => (
                    <li key={product.id}>
                      <button
                        type="button"
                        onClick={() => goTo(product.slug)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                          index === activeIndex
                            ? "bg-brand-500/10 border border-brand-500/20"
                            : "hover:bg-hover border border-transparent"
                        )}
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-surface-elevated">
                          <AppImage
                            src={product.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted truncate">
                            {product.category}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-foreground shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
              <span>↑↓ навигация · Enter открыть</span>
              <Link
                href="/catalog"
                onClick={onClose}
                className="inline-flex items-center gap-1 font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Весь каталог
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function useCommandSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return {
    open,
    openSearch: () => setOpen(true),
    closeSearch: () => setOpen(false),
    toggleSearch: () => setOpen((v) => !v),
  };
}
