"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AppImage } from "@/components/ui/AppImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { categoryImages } from "@/data/images";
import { cn } from "@/lib/utils";

const slides = [
  {
    title: "Салон красоты премиум",
    location: "Москва · 6 кабинетов",
    image: categoryImages.hairdressing,
    href: "/catalog?category=salon-turnkey",
  },
  {
    title: "Студия nail & pedicure",
    location: "Санкт-Петербург",
    image: "/images/products/manikyurnyy-stol-aurora.jpg",
    href: "/catalog?category=pedicure",
  },
  {
    title: "Кабинет косметологии",
    location: "Казань · 4 кабинета",
    image: categoryImages.cosmetology,
    href: "/catalog?category=cosmetology",
  },
  {
    title: "Барбершоп Style Lux",
    location: "Екатеринбург",
    image: "/images/products/kreslo-barber-pro-x.jpg",
    href: "/catalog?category=hairdressing",
  },
  {
    title: "SPA & wellness",
    location: "Сочи",
    image: categoryImages.massage,
    href: "/catalog?category=massage",
  },
] as const;

const INTERVAL = 5500;

export function ProjectsSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => setIndex((n + slides.length) % slides.length), []);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [next, paused]);

  const slide = slides[index];

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 bg-[var(--surface-dark)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 [&_.section-title]:text-white [&_.section-label]:text-accent-400 [&_p]:text-white/55">
          <SectionHeader
            label="Портфолио"
            title="Реализованные проекты"
            description="Салоны, студии и клиники по всей России."
            action={
              <Link href="/catalog">
                <Button variant="white" size="lg" className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20 shadow-none">
                  Каталог
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            }
          />
        </div>

        <div className="relative rounded-[2rem] overflow-hidden shadow-premium ring-1 ring-white/10">
          <div className="relative aspect-[16/10] lg:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <AppImage src={slide.image} alt={slide.title} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12 z-10">
              <p className="text-xs font-bold uppercase tracking-widest text-accent-400 mb-2">
                {slide.location}
              </p>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4 max-w-2xl">
                {slide.title}
              </h3>
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-accent-300 transition-colors"
              >
                Похожие решения
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <button type="button" onClick={prev} aria-label="Назад" className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass text-white hover:bg-white/20 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={next} aria-label="Вперёд" className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full glass text-white hover:bg-white/20 transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute top-5 right-5 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button key={i} type="button" onClick={() => go(i)} aria-label={`Слайд ${i + 1}`} className={cn("h-1.5 rounded-full transition-all", i === index ? "w-8 bg-accent-500" : "w-2 bg-white/35 hover:bg-white/55")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
