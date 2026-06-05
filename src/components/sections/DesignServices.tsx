"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionAccentLine } from "@/components/ui/ElegantLines";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Layers, LayoutGrid, PenTool, Ruler } from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Дизайн-проект салона",
    description:
      "Планировка зон, расстановка рабочих мест и потоков клиентов под ваш формат.",
  },
  {
    icon: Layers,
    title: "3D-визуализация",
    description:
      "Наглядная картина будущего пространства до заказа — бесплатно для клиентов.",
  },
  {
    icon: LayoutGrid,
    title: "Планировка кабинетов",
    description:
      "Клиники, кабинеты косметологии и процедурные — с учётом норм и эргономики.",
  },
  {
    icon: Ruler,
    title: "Подбор оборудования",
    description:
      "Комплектация под бюджет: мебель, свет, декор и профессиональная техника.",
  },
];

export function DesignServices() {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-20 sm:py-28 bg-background"
    >
      <SectionAtmosphere variant="accent" />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <SectionAccentLine />
            <p className="text-accent-600 dark:text-accent-400 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Услуги
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground leading-tight mb-4">
              Дизайн-проектирование
            </h2>
            <p className="text-muted leading-relaxed">
              Проектируем салоны, студии и клиники — от эскиза до готового
              пространства. Без лишней сложности: понятные этапы и фиксированные
              сроки.
            </p>
          </div>
          <Link href="/#contacts" className="shrink-0">
            <Button size="lg" className="gap-2">
              Обсудить проект
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-surface-card p-6 shadow-card hover:border-accent-500/25 hover:shadow-premium transition-all duration-500"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
