"use client";

import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { SectionAccentLine } from "@/components/ui/ElegantLines";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";

const projects = [
  {
    categorySlug: "office",
    title: "Офис IT-компании",
    location: "Москва · 120 рабочих мест",
    image: categories[0].image,
    span: "lg:col-span-7 lg:row-span-2",
    featured: true,
  },
  {
    categorySlug: "beauty",
    title: "Салон премиум-класса",
    location: "Санкт-Петербург · 8 кабинетов",
    image: categories[1].image,
    span: "lg:col-span-5",
    featured: false,
  },
  {
    categorySlug: "reception",
    title: "Lobby бизнес-центра",
    location: "Казань · зона ожидания 200 м²",
    image: categories[2].image,
    span: "lg:col-span-5",
    featured: false,
  },
  {
    categorySlug: "horeca",
    title: "Ресторан авторской кухни",
    location: "Екатеринбург · 90 посадочных мест",
    image: categories[5].image,
    span: "lg:col-span-7",
    featured: false,
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden py-20 sm:py-28 bg-surface-elevated/40">
      <SectionAtmosphere variant="elevated" />
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <SectionAccentLine />
            <p className="text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Портфолио
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-4">
              Реализованные проекты
            </h2>
            <p className="text-muted leading-relaxed">
              Более 2000 объектов — от стартапов до федеральных сетей. Каждый
              проект — полный цикл от 3D-визуализации до монтажа.
            </p>
          </div>
          <Link href="/catalog">
            <Button variant="secondary" size="lg" className="gap-2 shrink-0">
              Смотреть оборудование
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:auto-rows-[240px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={project.span}
            >
              <Link
                href={`/catalog?category=${project.categorySlug}`}
                className="group relative flex h-full min-h-[280px] lg:min-h-0 overflow-hidden rounded-3xl border border-border bg-surface-card shadow-card hover:border-brand-500/35 hover:shadow-premium transition-all duration-500"
              >
                <AppImage
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/10 dark:from-background/95 dark:via-background/50" />
                <div className="absolute inset-0 photo-overlay opacity-70" />

                <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
                  <div className="rounded-2xl border border-border/70 bg-surface-card/85 backdrop-blur-xl p-4 sm:p-5 transition-all duration-500 group-hover:bg-surface-card/95 group-hover:border-brand-500/20">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-600 dark:text-brand-400 mb-2">
                      Кейс · {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className={`font-display font-semibold text-foreground mb-1 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors ${
                        project.featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted mb-4">{project.location}</p>
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/70">
                      <span className="text-sm font-semibold text-foreground">
                        Смотреть решения
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-700 dark:text-brand-300 transition-all group-hover:bg-gradient-to-r group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
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
