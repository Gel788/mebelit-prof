"use client";

import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { categoryImages } from "@/data/images";

export function CTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-background">
      <SectionAtmosphere variant="accent" />
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-border bg-surface-card shadow-premium"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[280px] lg:min-h-[420px]">
              <AppImage
                src={categoryImages.office}
                alt="Проект под ключ Mebelit Prof"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 photo-overlay lg:hidden" />
              <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent to-surface-card/20 dark:to-surface-card/40" />
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <p className="text-brand-600 dark:text-brand-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
                Консультация
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-foreground mb-4 leading-tight">
                Проект под ключ за 30 минут
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                Оставьте заявку — подготовим 3D-визуализацию, смету и сроки
                поставки под ваш объект.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="mailto:info@mebelitprof.ru">
                  <Button size="lg" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Оставить заявку
                  </Button>
                </Link>
                <Link href="tel:+78001234567">
                  <Button variant="secondary" size="lg" className="gap-2">
                    <Phone className="h-4 w-4" />
                    8 800 123-45-67
                  </Button>
                </Link>
              </div>

              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand-600 dark:hover:text-brand-400 transition-colors mt-6 group"
              >
                Или выберите товары в каталоге
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
