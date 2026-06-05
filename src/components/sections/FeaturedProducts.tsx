"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Truck, Shield, Ruler } from "lucide-react";
import { SectionAccentLine } from "@/components/ui/ElegantLines";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getFeaturedProducts } from "@/data/catalog";

const highlights = [
  { icon: Ruler, label: "3D-проект бесплатно" },
  { icon: Truck, label: "Доставка по РФ" },
  { icon: Shield, label: "Гарантия до 10 лет" },
];

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-background">
      <SectionAtmosphere variant="default" />
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10">
          <div>
            <SectionAccentLine />
            <p className="text-brand-600 dark:text-brand-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
              Популярное
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground">
              Хиты продаж
            </h2>
            <p className="text-muted mt-3 max-w-md">
              Лучшие решения для профессионального бизнеса
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-card border border-border text-sm text-muted"
              >
                <item.icon className="h-4 w-4 text-brand-500" />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ProductGrid products={products} columns={4} />
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-600 dark:hover:text-brand-400 transition-colors group"
          >
            Смотреть весь каталог
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
