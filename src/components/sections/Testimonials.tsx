"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Star } from "lucide-react";

const items = [
  {
    name: "Анна Волкова",
    role: "Салон красоты · Москва",
    text: "Полное оснащение за 5 дней — от кресел до ресепшн. 3D-проект, доставка, сборка. Качество на высоте.",
  },
  {
    name: "Елена Смирнова",
    role: "Клиника · Казань",
    text: "Медицинская мебель с сертификатами, аккуратный монтаж. Кабинеты косметологии — всё отлично.",
  },
  {
    name: "Максим Орлов",
    role: "Барбершоп · Санкт-Петербург",
    text: "Открывали с нуля. Планировка и подбор под бюджет. Клиенты в восторге от зоны ожидания.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Отзывы"
          title="Нам доверяют"
          description="Реальные истории из бьюти-индустрии"
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="premium-card p-6 sm:p-8 hover:-translate-y-1"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent-500 text-accent-500" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-muted leading-relaxed mb-6">
                «{item.text}»
              </p>
              <p className="font-bold text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.role}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
