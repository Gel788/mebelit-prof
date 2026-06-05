"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Ruler, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Консультация",
    description: "Обсуждаем задачи, бюджет и сроки. Подбираем решения под ваш бизнес.",
  },
  {
    icon: Ruler,
    step: "02",
    title: "3D-проект",
    description: "Создаём визуализацию пространства с расстановкой мебели и зон.",
  },
  {
    icon: Truck,
    step: "03",
    title: "Доставка",
    description: "Производство, логистика и бережная доставка по всей России.",
  },
  {
    icon: Wrench,
    step: "04",
    title: "Монтаж",
    description: "Профессиональная сборка и сдача объекта под ключ.",
  },
];

export function Process() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-50/30 to-transparent dark:via-brand-950/20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="text-brand-600 dark:text-brand-400 text-sm font-medium uppercase tracking-widest mb-3">
              Как мы работаем
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              От идеи до готового пространства
            </h2>
            <p className="text-muted leading-relaxed">
              Прозрачный процесс без сюрпризов — вы контролируете каждый этап,
              а мы берём на себя всё остальное.
            </p>
          </div>
          <Link href="/catalog">
            <Button variant="outline" className="gap-2 shrink-0">
              Начать подбор
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group rounded-2xl border border-border bg-surface-card p-6 hover:border-brand-500/30 hover:shadow-premium transition-all duration-500"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-border z-10" />
              )}
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="font-display text-3xl font-semibold text-brand-600/30 dark:text-brand-500/20 group-hover:text-brand-600/50 dark:group-hover:text-brand-500/40 transition-colors">
                  {item.step}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
