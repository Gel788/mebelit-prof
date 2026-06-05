"use client";

import { motion } from "framer-motion";
import { SectionAccentLine } from "@/components/ui/ElegantLines";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Анна Волкова",
    role: "Владелица салона красоты",
    city: "Москва",
    text: "Заказывали полное оснащение салона — от кресел до ресепшн. Mebelit Prof сделали 3D-проект, всё привезли и собрали за 5 дней. Качество на высоте.",
    rating: 5,
  },
  {
    name: "Дмитрий Козлов",
    role: "Директор по развитию",
    city: "Санкт-Петербург",
    text: "Обновляли офис на 80 человек. Персональный менеджер помог подобрать мебель под бюджет, доставка и монтаж — без задержек. Рекомендуем.",
    rating: 5,
  },
  {
    name: "Елена Смирнова",
    role: "Управляющая клиникой",
    city: "Казань",
    text: "Медицинская мебель с сертификатами, аккуратный монтаж, гарантийное обслуживание. Работаем уже второй год — всё отлично.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-500/[0.04] via-transparent to-brand-500/[0.03] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionAccentLine align="center" className="mb-5" />
          <p className="text-brand-600 dark:text-brand-400 text-sm font-medium uppercase tracking-widest mb-3">
            Отзывы
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4">
            Нам доверяют профессионалы
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Реальные истории клиентов из разных отраслей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col rounded-3xl border border-border bg-surface-card p-6 sm:p-7 shadow-card hover:border-brand-500/25 hover:shadow-premium transition-all duration-500"
            >
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
              <Quote className="h-8 w-8 text-brand-600/35 dark:text-brand-500/25 mb-4" />
              <p className="text-sm text-muted leading-relaxed flex-1 mb-6">
                «{item.text}»
              </p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-brand-500 text-brand-500"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.role} · {item.city}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
