"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AppImage } from "@/components/ui/AppImage";
import { SectionAccentLine } from "@/components/ui/ElegantLines";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { categoryImages } from "@/data/images";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "Салон красоты премиум",
    location: "Москва · 6 кабинетов",
    image: categoryImages.beauty,
    href: "/catalog?category=beauty",
    tag: "Салон",
  },
  {
    title: "Студия маникюра и педикюра",
    location: "Санкт-Петербург · open space",
    image: "/images/products/manikyurnyy-stol-aurora.jpg",
    href: "/catalog?category=beauty",
    tag: "Студия",
  },
  {
    title: "Клиника эстетической медицины",
    location: "Казань · 4 кабинета",
    image: categoryImages.medical,
    href: "/catalog?category=medical",
    tag: "Клиника",
  },
  {
    title: "Барбершоп Style Lux",
    location: "Екатеринбург · 5 рабочих мест",
    image: "/images/products/kreslo-barber-pro-x.jpg",
    href: "/catalog?category=beauty",
    tag: "Барбершоп",
  },
  {
    title: "SPA & wellness центр",
    location: "Сочи · зона релакса и кабинеты",
    image: categoryImages.beauty,
    href: "/catalog?category=beauty",
    tag: "SPA",
  },
] as const;

const INTERVAL_MS = 5000;

export function ProjectsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(goNext, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [goNext, paused]);

  const slide = slides[index];

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-20 sm:py-28 bg-surface-elevated/40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SectionAtmosphere variant="elevated" />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <SectionAccentLine />
            <p className="text-accent-600 dark:text-accent-400 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Наши проекты
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground leading-tight mb-4">
              Салоны, студии и клиники
            </h2>
            <p className="text-muted leading-relaxed">
              Реализованные объекты для бьюти-бизнеса — от compact-студий до
              премиальных клиник.
            </p>
          </div>
          <Link href="/catalog" className="shrink-0">
            <Button variant="secondary" size="lg" className="gap-2">
              Смотреть каталог
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-card shadow-premium">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.title}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <AppImage
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/35 to-background/10 dark:from-background/95 dark:via-background/45" />
                <div className="absolute inset-0 photo-overlay opacity-60" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10">
              <div className="max-w-xl rounded-2xl border border-border/70 bg-surface-card/90 backdrop-blur-xl p-5 sm:p-6 shadow-card">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-600 dark:text-accent-400 mb-2">
                  {slide.tag}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                  {slide.title}
                </h3>
                <p className="text-sm text-muted mb-4">{slide.location}</p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent-600 dark:text-accent-400 hover:underline"
                >
                  Похожие решения
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Предыдущий проект"
            className="absolute left-3 sm:left-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface-card/90 text-foreground shadow-card backdrop-blur-sm hover:border-accent-500/40 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Следующий проект"
            className="absolute right-3 sm:right-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface-card/90 text-foreground shadow-card backdrop-blur-sm hover:border-accent-500/40 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 right-4 sm:bottom-auto sm:top-4 sm:right-4 z-20 flex items-center gap-2">
            {slides.map((item, i) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Проект ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 bg-accent-500"
                    : "w-2 bg-foreground/25 hover:bg-foreground/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
