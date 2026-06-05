"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AppImage } from "@/components/ui/AppImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Layers, LayoutGrid, PenTool, Ruler } from "lucide-react";
import { categoryImages } from "@/data/images";

const services = [
  { icon: PenTool, title: "Дизайн-проект салона", desc: "Планировка зон и рабочих мест." },
  { icon: Layers, title: "3D-визуализация", desc: "Бесплатно для клиентов." },
  { icon: LayoutGrid, title: "Планировка кабинетов", desc: "С учётом норм и эргономики." },
  { icon: Ruler, title: "Подбор оборудования", desc: "Комплектация под бюджет." },
];

export function DesignServices() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14">
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-premium">
            <AppImage
              src={categoryImages["salon-turnkey"]}
              alt="Дизайн-проект"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass-light rounded-2xl p-4 sm:p-5">
              <p className="text-sm font-bold text-white">3D-визуализация</p>
              <p className="text-xs text-white/65 mt-1">Бесплатно при заказе комплектации</p>
            </div>
          </div>

          <div>
            <SectionHeader
              label="Услуги"
              title="Дизайн-проектирование"
              description="От эскиза до готового пространства — понятные этапы и сроки."
              action={
                <Link href="/#contacts">
                  <Button size="lg" className="gap-2 shadow-glow">
                    Обсудить проект
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              }
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="premium-card p-6 hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 text-white shadow-glow mb-5">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
