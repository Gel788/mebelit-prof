"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Truck,
  Shield,
  ChevronRight,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import type { Product } from "@/data/products";
import { badgeLabels } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductTabs } from "@/components/product/ProductTabs";
import { ProductStickyBar } from "@/components/product/ProductStickyBar";
import { ProductQuantity } from "@/components/product/ProductQuantity";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { FavoriteButton } from "@/components/cart/FavoriteButton";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;

  const galleryImages =
    product.images.length > 0 ? product.images : [product.image];

  return (
    <>
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-foreground transition-colors">
          Главная
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <Link href="/catalog" className="hover:text-foreground transition-colors">
          Каталог
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <Link
          href={`/catalog?category=${product.categorySlug}`}
          className="hover:text-foreground transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        <span className="text-muted-foreground truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 mb-16 lg:mb-20">
        <ProductGallery
          images={galleryImages}
          name={product.name}
          badge={product.badge}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-300">
              <Sparkles className="h-3 w-3" />
              {product.category}
            </span>
            {product.badge && (
              <span className="rounded-full bg-surface-elevated border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {badgeLabels[product.badge]}
              </span>
            )}
            <span className="text-xs text-muted-foreground ml-auto">
              Арт. {product.id.padStart(4, "0")}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl xl:text-[2.75rem] font-semibold text-foreground mb-5 leading-[1.15]">
            {product.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating)
                      ? "fill-brand-500 text-brand-500"
                      : "text-zinc-300 dark:text-zinc-700"
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">{product.rating}</span>
            <span className="text-sm text-muted">
              {product.reviews} отзывов
            </span>
          </div>

          <p className="text-muted leading-relaxed mb-8 text-base sm:text-lg">
            {product.shortDescription}
          </p>

          <div className="rounded-3xl border border-border bg-surface-card p-6 shadow-card mb-6">
            <div className="flex flex-wrap items-end gap-4 mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  Цена
                </p>
                <p className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">
                  {formatPrice(product.price)}
                </p>
                {product.oldPrice && (
                  <p className="text-sm text-muted-foreground line-through mt-1">
                    {formatPrice(product.oldPrice)}
                  </p>
                )}
              </div>
              {discount && (
                <span className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-sm font-bold shadow-sm">
                  −{discount}%
                </span>
              )}
              <span
                className={cn(
                  "ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold",
                  product.inStock
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    product.inStock ? "bg-emerald-500" : "bg-red-500"
                  )}
                />
                {product.inStock ? "В наличии" : "Нет в наличии"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <ProductQuantity value={quantity} onChange={setQuantity} />
              <AddToCartButton
                product={product}
                quantity={quantity}
                size="lg"
                className="flex-1"
                flyAnimation
                label={`В корзину · ${formatPrice(product.price * quantity)}`}
              />
              <FavoriteButton slug={product.slug} variant="page" />
            </div>

            <p className="text-xs text-muted-foreground text-center sm:text-left">
              Бесплатная консультация и расчёт доставки после оформления
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { icon: Truck, title: "Доставка", text: "По всей России" },
              {
                icon: Shield,
                title: "Гарантия",
                text: product.specs["Гарантия"] || "До 5 лет",
              },
              { icon: RotateCcw, title: "Возврат", text: "14 дней на обмен" },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface-elevated/80 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
                  <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mb-16 lg:mb-20">
        <ProductTabs product={product} />
      </div>

      <ProductStickyBar product={product} quantity={quantity} />
    </>
  );
}
