"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AppImage } from "@/components/ui/AppImage";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { FavoriteButton } from "@/components/cart/FavoriteButton";
import { findProductBySlug } from "@/data/catalog";
import { formatPrice, cn } from "@/lib/utils";
import { useShop } from "@/store/ShopProvider";
import { ArrowRight, Star, X } from "lucide-react";

export function QuickViewModal() {
  const { quickViewSlug, closeQuickView } = useShop();
  const product = quickViewSlug ? findProductBySlug(quickViewSlug) : null;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!quickViewSlug) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeQuickView();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [quickViewSlug, closeQuickView]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {product && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
          role="presentation"
        >
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Закрыть просмотр"
            className="absolute inset-0 bg-background/75 backdrop-blur-md"
            onClick={closeQuickView}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex w-full max-w-[920px] max-h-[min(90vh,760px)] flex-col overflow-hidden rounded-3xl border border-border bg-surface-card shadow-premium"
            role="dialog"
            aria-modal="true"
            aria-label={`Быстрый просмотр: ${product.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-card/90 text-muted hover:text-foreground backdrop-blur-sm"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid min-h-0 flex-1 grid-cols-1 overflow-y-auto md:grid-cols-2 md:overflow-hidden">
              <div className="relative aspect-square shrink-0 bg-surface-elevated md:aspect-auto md:min-h-[420px]">
                <AppImage
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 460px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
              </div>

              <div className="flex flex-col p-6 sm:p-8 md:overflow-y-auto">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400 mb-2">
                  {product.category}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight mb-3 pr-10">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5",
                          i < Math.floor(product.rating)
                            ? "fill-brand-500 text-brand-500"
                            : "text-zinc-300 dark:text-zinc-700"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted">
                    {product.rating} · {product.reviews} отзывов
                  </span>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-6 line-clamp-4">
                  {product.shortDescription}
                </p>

                <div className="rounded-2xl border border-border bg-surface-elevated p-4 mb-6">
                  <p className="text-2xl font-semibold text-foreground">
                    {formatPrice(product.price)}
                  </p>
                  {product.oldPrice && (
                    <p className="text-sm text-muted-foreground line-through mt-1">
                      {formatPrice(product.oldPrice)}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <AddToCartButton
                    product={product}
                    size="lg"
                    className="flex-1"
                    flyAnimation
                  />
                  <FavoriteButton slug={product.slug} variant="page" />
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={closeQuickView}
                  className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Подробнее о товаре
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
