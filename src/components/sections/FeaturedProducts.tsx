"use client";

import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedProducts } from "@/data/catalog";
import { formatPrice } from "@/lib/utils";
import { type Product, badgeLabels } from "@/data/products";

function ShowcaseCard({
  product,
  index,
  featured,
}: {
  product: Product;
  index: number;
  featured?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={featured ? "lg:col-span-2 lg:row-span-2" : ""}
    >
      <Link
        href={`/product/${product.slug}`}
        className="group block h-full premium-card overflow-hidden hover:-translate-y-1"
      >
        <div
          className={`relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 ${
            featured ? "aspect-[16/11] lg:aspect-auto lg:h-[340px]" : "aspect-[4/5]"
          }`}
        >
          <AppImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={featured ? "66vw" : "33vw"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {product.badge && (
            <span className="absolute top-4 left-4 rounded-full bg-accent-500 px-3 py-1 text-[11px] font-bold uppercase text-white">
              {badgeLabels[product.badge]}
            </span>
          )}
        </div>
        <div className="p-5 sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400 mb-2">
            {product.category}
          </p>
          <h3 className="text-lg font-bold text-foreground leading-snug mb-3 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
            <p className="text-xl font-extrabold text-foreground tabular-nums">
              {formatPrice(product.price)}
            </p>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 group-hover:bg-accent-500 group-hover:text-white transition-all">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 5);

  return (
    <section className="py-20 sm:py-28 bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Избранное"
          title="Хиты продаж"
          description="Профессиональное оборудование с доставкой и монтажом."
        />

        <div id="warranty" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 scroll-mt-28">
          {products.map((product, index) => (
            <ShowcaseCard
              key={product.id}
              product={product}
              index={index}
              featured={index === 0}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-2 rounded-2xl border border-border bg-surface-card px-8 py-4 text-sm font-bold shadow-soft hover:shadow-card hover:border-accent-500/30 transition-all"
          >
            Смотреть весь каталог
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
