"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Ruler, Truck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  { icon: MessageSquare, n: "01", title: "Консультация", desc: "Задачи, бюджет, сроки" },
  { icon: Ruler, n: "02", title: "3D-проект", desc: "Визуализация пространства" },
  { icon: Truck, n: "03", title: "Доставка", desc: "Логистика по всей РФ" },
  { icon: Wrench, n: "04", title: "Монтаж", desc: "Сдача под ключ" },
];

export function Process() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Процесс"
          title="Как мы работаем"
          description="Прозрачный путь от идеи до готового салона."
          action={
            <Link href="/catalog">
              <Button variant="outline" className="gap-2">
                Начать подбор
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          }
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              id={step.title === "Доставка" ? "delivery" : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="premium-card p-6 relative overflow-hidden group hover:-translate-y-1"
            >
              <span className="absolute -top-4 -right-2 text-7xl font-extrabold text-foreground/[0.04] group-hover:text-accent-500/10 transition-colors">
                {step.n}
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 mb-4">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
