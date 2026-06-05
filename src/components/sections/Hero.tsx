"use client";

import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";

const stats = [
  { value: "15+", label: "лет опыта" },
  { value: "2000+", label: "проектов" },
  { value: "500+", label: "салонов" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative -mt-[4.25rem] min-h-[100svh] overflow-hidden flex items-end"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <AppImage
          src="/images/IMG_0014.JPG"
          alt="Мебель для бьюти-бизнеса"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        style={{ y }}
        className="relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-10 sm:pb-14 lg:pb-16"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="h-4 w-4 text-accent-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/90">
              Premium · Beauty · Equipment
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-white leading-[1.02] tracking-tight mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
          >
            Мебель и оборудование
            <span className="block mt-1 text-white/95">
              для бьюти-бизнеса
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg sm:text-xl text-white/90 leading-relaxed mb-10 max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
          >
            Комплектуем салоны, студии и клиники под ключ — проектирование,
            поставка и монтаж по всей России.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <Link href="/catalog">
              <Button size="lg" className="gap-2 min-w-[200px] shadow-glow">
                Смотреть каталог
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/#services">
              <Button
                variant="white"
                size="lg"
                className="min-w-[180px] bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm shadow-none"
              >
                Дизайн-проект
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl glass-light rounded-2xl p-4 sm:p-5"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left sm:px-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                {stat.value}
              </p>
              <p className="text-[11px] sm:text-xs font-medium text-white/75 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
