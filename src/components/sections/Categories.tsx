"use client";

import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { categories, getCategoryHref } from "@/data/categories";
import { cn } from "@/lib/utils";

const bentoSpans = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[280px] lg:min-h-0",
  "min-h-[220px]",
  "min-h-[220px]",
  "sm:col-span-2 lg:col-span-2 min-h-[200px]",
  "min-h-[200px]",
  "min-h-[200px]",
  "min-h-[200px]",
];

export function Categories() {
  return (
    <section id="directions" className="relative py-20 sm:py-28 bg-background bg-mesh-light overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Каталог"
          title="Направления"
          description="Всё для бьюти-бизнеса — от рабочих мест до комплектации салона под ключ."
          action={
            <Link href="/catalog">
              <Button size="lg" className="gap-2 shadow-glow">
                Весь каталог
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 gap-3 sm:gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={bentoSpans[index]}
            >
              <Link
                href={getCategoryHref(category)}
                className={cn(
                  "group relative flex h-full min-h-[inherit] overflow-hidden rounded-3xl shadow-card hover:shadow-premium transition-all duration-500 hover:-translate-y-1",
                  category.isService && "ring-2 ring-accent-500/40 ring-offset-2 ring-offset-background"
                )}
              >
                {category.isService ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-600 via-accent-600 to-accent-800" />
                ) : (
                  <>
                    <AppImage
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes={index === 0 ? "50vw" : "25vw"}
                    />
                    <div className="absolute inset-0 photo-overlay" />
                  </>
                )}

                <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white/15 group-hover:text-white/25 transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-accent-400 mb-2">
                      {category.isService ? "Услуга" : `${category.productCount} поз.`}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2 mb-3 hidden sm:block">
                      {category.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white group-hover:text-accent-300 transition-colors">
                      {category.isService ? "Подробнее" : "Смотреть"}
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
