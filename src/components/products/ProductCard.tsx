"use client";

import { useState } from "react";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Star, ArrowRight } from "lucide-react";
import {
  type Product,
  badgeLabels,
  badgeColors,
} from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { FavoriteButton } from "@/components/cart/FavoriteButton";
import { useShop } from "@/store/ShopProvider";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "featured";
}

export function ProductCard({
  product,
  index = 0,
  variant = "default",
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { openQuickView } = useShop();
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={cn("group relative", variant === "featured" && "md:col-span-1")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-surface-card border border-border shadow-card transition-all duration-500 hover:border-brand-500/30 hover:shadow-premium">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface-elevated">
          <Link href={`/product/${product.slug}`}>
            <AppImage
              src={product.image}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-transform duration-700 ease-out",
                isHovered ? "scale-105" : "scale-100"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </Link>

          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {product.badge && (
              <span
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm",
                  badgeColors[product.badge]
                )}
              >
                {badgeLabels[product.badge]}
              </span>
            )}
            {discount && (
              <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-red-500 text-white shadow-sm">
                −{discount}%
              </span>
            )}
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.25 }}
            className="absolute top-3 right-3 flex flex-col gap-2 z-10"
          >
            <FavoriteButton slug={product.slug} />
            <button
              type="button"
              aria-label="Быстрый просмотр"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openQuickView(product.slug);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-card/90 border border-border text-foreground backdrop-blur-sm hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all"
            >
              <Eye className="h-4 w-4" />
            </button>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12 }}
            transition={{ duration: 0.25, delay: 0.03 }}
            className="absolute bottom-3 left-3 right-3 z-10"
          >
            <AddToCartButton product={product} fullWidth flyAnimation />
          </motion.div>

          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm z-20">
              <span className="px-4 py-2 rounded-xl bg-surface-card border border-border text-sm font-semibold text-foreground">
                Нет в наличии
              </span>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3.5 w-3.5 fill-brand-500 text-brand-500" />
            <span className="text-xs font-semibold text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>

          <p className="text-[11px] uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-1.5 font-semibold">
            {product.category}
          </p>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-medium text-foreground text-[15px] leading-snug mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {product.shortDescription}
          </p>

          <div className="flex items-end justify-between gap-2 pt-4 border-t border-border">
            <div>
              <p className="text-lg font-semibold text-foreground tracking-tight">
                {formatPrice(product.price)}
              </p>
              {product.oldPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </p>
              )}
            </div>
            <Link href={`/product/${product.slug}`}>
              <Button variant="secondary" size="icon" className="shrink-0">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
