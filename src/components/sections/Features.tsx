"use client";

import { motion } from "framer-motion";
import { SectionAccentLine } from "@/components/ui/ElegantLines";
import {
  Truck,
  Shield,
  Ruler,
  Headphones,
  Wrench,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Ruler,
    title: "3D-проектирование",
    description: "Бесплатная визуализация вашего пространства до заказа",
  },
  {
    icon: Truck,
    title: "Доставка по РФ",
    description: "Бережная доставка и профессиональный монтаж под ключ",
  },
  {
    icon: Shield,
    title: "Гарантия до 10 лет",
    description: "Официальная гарантия производителя на всю продукцию",
  },
  {
    icon: Headphones,
    title: "Персональный менеджер",
    description: "Индивидуальный подход на каждом этапе сотрудничества",
  },
  {
    icon: Wrench,
    title: "Сервисное обслуживание",
    description: "Техническая поддержка и обслуживание после покупки",
  },
  {
    icon: Award,
    title: "15 лет опыта",
    description: "Более 2000 реализованных проектов по всей России",
  },
];

export function Features() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-surface-elevated/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionAccentLine align="center" className="mb-5" />
          <p className="text-brand-600 dark:text-brand-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
            Преимущества
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Почему Mebelit Prof
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Полный цикл — от концепции до монтажа. Работаем с бизнесом любого
            масштаба.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              id={
                feature.title.includes("Доставка")
                  ? "delivery"
                  : feature.title.includes("Гарантия")
                    ? "warranty"
                    : undefined
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group p-7 rounded-2xl bg-surface-card border border-border/80 hover:border-brand-500/20 transition-all duration-500"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 mb-5 group-hover:bg-brand-500/15 transition-colors">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
