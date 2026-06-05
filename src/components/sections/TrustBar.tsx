"use client";

import { motion } from "framer-motion";
import { Truck, Shield, Ruler, Clock } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Доставка по РФ",
    description: "Бережная логистика и монтаж",
  },
  {
    icon: Shield,
    title: "Гарантия до 10 лет",
    description: "Официальная поддержка",
  },
  {
    icon: Ruler,
    title: "3D-проект бесплатно",
    description: "Визуализация до заказа",
  },
  {
    icon: Clock,
    title: "Ответ за 30 минут",
    description: "Быстрая консультация",
  },
];

export function TrustBar() {
  return (
    <section className="relative z-10 -mt-6 pb-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 rounded-2xl border border-border/60 bg-surface-card/70 backdrop-blur-md p-4 sm:p-5 shadow-soft"
        >
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`flex items-start gap-3 ${
                index < items.length - 1
                  ? "lg:border-r lg:border-border/60 lg:pr-4"
                  : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <item.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground leading-tight">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
