"use client";

import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { ElegantFrame } from "@/components/ui/ElegantLines";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { heroImage } from "@/data/images";
import { useRef } from "react";

const stats = [
  { value: "15+", label: "лет на рынке" },
  { value: "2000+", label: "проектов" },
  { value: "42+", label: "товаров" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative min-h-[calc(100svh-4.25rem)] flex items-center overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-105">
        <AppImage
          src={heroImage}
          alt="Профессиональная мебель Mebelit Prof"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/55 dark:bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20 dark:from-background/90 dark:via-background/60 dark:to-transparent" />
      </motion.div>

      <ElegantFrame />

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-xl rounded-3xl border border-border/80 bg-surface-card/90 backdrop-blur-xl p-8 sm:p-10 shadow-premium relative"
        >
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
          <p className="text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-[0.28em] mb-5">
            Mebelit Prof
          </p>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-foreground leading-[1.05] tracking-tight mb-5">
            Мебель и оборудование{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700 dark:from-brand-300 dark:to-brand-500">
              для бизнеса
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted leading-relaxed mb-8">
            Офисы, салоны красоты, медицина и HoReCa. Проектирование, доставка
            и монтаж — под ключ.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/catalog">
              <Button size="lg" className="gap-2 min-w-[180px]">
                Смотреть каталог
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#configurator">
              <Button variant="secondary" size="lg" className="gap-2">
                <Wand2 className="h-4 w-4" />
                Умный квиз
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xl sm:text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[10px] uppercase tracking-[0.25em]">Листайте</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
