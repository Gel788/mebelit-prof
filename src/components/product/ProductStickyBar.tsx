"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

interface ProductStickyBarProps {
  product: Product;
  quantity: number;
}

export function ProductStickyBar({ product, quantity }: ProductStickyBarProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={anchorRef} className="h-px w-full lg:hidden" aria-hidden />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] inset-x-0 z-40 lg:hidden border-t border-border bg-surface-card/95 backdrop-blur-xl shadow-premium"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 safe-area-pb">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted truncate">{product.name}</p>
                <p className="text-lg font-semibold text-foreground">
                  {formatPrice(product.price * quantity)}
                </p>
              </div>
              <AddToCartButton
                product={product}
                quantity={quantity}
                size="lg"
                className="shrink-0 min-w-[140px]"
                flyAnimation
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
