"use client";

import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { SectionAccentLine } from "@/components/ui/ElegantLines";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Sparkles,
  Building2,
  Presentation,
  HeartPulse,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Sparkles,
  Building2,
  Presentation,
  HeartPulse,
  UtensilsCrossed,
};

const bentoLayout = [
  "lg:col-span-6 lg:row-span-2",
  "lg:col-span-3 lg:row-span-1",
  "lg:col-span-3 lg:row-span-1",
  "lg:col-span-4 lg:row-span-1",
  "lg:col-span-4 lg:row-span-1",
  "lg:col-span-4 lg:row-span-1",
] as const;

interface CategoryCardProps {
  slug: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
  index: number;
  layoutClass?: string;
  featured?: boolean;
}

function CategoryCard({
  slug,
  name,
  description,
  image,
  icon,
  productCount,
  index,
  layoutClass,
  featured,
}: CategoryCardProps) {
  const Icon = iconMap[icon] ?? Briefcase;
  const countLabel =
    productCount === 1
      ? "1 товар"
      : productCount < 5
        ? `${productCount} товара`
        : `${productCount} товаров`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className={cn("min-h-[280px]", layoutClass, featured && "min-h-[320px] lg:min-h-0")}
    >
      <Link
        href={`/catalog?category=${slug}`}
        className="group relative flex h-full min-h-[inherit] overflow-hidden rounded-3xl border border-border bg-surface-card shadow-card transition-all duration-500 hover:border-brand-500/35 hover:shadow-premium"
      >
        <AppImage
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 1024px) 50vw, 33vw"
          }
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/35 to-background/10 dark:from-background/95 dark:via-background/45 dark:to-background/15" />
        <div className="absolute inset-0 photo-overlay opacity-80" />

        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-500/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-surface-card/80 text-brand-600 dark:text-brand-400 backdrop-blur-md shadow-soft">
              <Icon className="h-5 w-5" />
            </div>
            <span className="font-display text-sm text-muted-foreground tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-auto">
            <div
              className={cn(
                "rounded-2xl border border-border/70 bg-surface-card/85 backdrop-blur-xl p-4 sm:p-5 shadow-soft transition-all duration-500 group-hover:bg-surface-card/95 group-hover:border-brand-500/20 group-hover:shadow-card",
                featured && "sm:p-6"
              )}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-400 mb-2">
                {countLabel}
              </p>
              <h3
                className={cn(
                  "font-display font-semibold text-foreground leading-tight mb-2 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors",
                  featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                )}
              >
                {name}
              </h3>
              <p
                className={cn(
                  "text-muted leading-relaxed line-clamp-2",
                  featured ? "text-sm sm:text-base mb-4" : "text-sm mb-3"
                )}
              >
                {description}
              </p>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/70">
                <span className="text-sm font-semibold text-foreground">
                  Смотреть
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-700 dark:text-brand-300 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white group-hover:shadow-glow">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function Categories() {
  return (
    <section id="directions" className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-background">
      <SectionAtmosphere variant="warm" />
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <SectionAccentLine />
            <p className="text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Каталог
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-4">
              Направления
            </h2>
            <p className="text-muted leading-relaxed text-base sm:text-lg">
              Шесть профессиональных сегментов — от кабинета руководителя до
              ресторана и медицинского кабинета. Подберём комплектацию под ваш
              бизнес.
            </p>
          </div>

          <Link href="/catalog" className="shrink-0">
            <Button variant="secondary" size="lg" className="gap-2">
              Весь каталог
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 gap-4 sm:gap-5 lg:gap-6 lg:min-h-[620px]">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              slug={category.slug}
              name={category.name}
              description={category.description}
              image={category.image}
              icon={category.icon}
              productCount={category.productCount}
              index={index}
              layoutClass={bentoLayout[index]}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
