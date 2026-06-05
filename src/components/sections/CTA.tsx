"use client";

import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section id="contacts" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] shadow-premium"
        >
          <div className="absolute inset-0">
            <AppImage
              src="/images/categories/beauty.jpg"
              alt="Консультация"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 p-8 sm:p-12 lg:p-16 items-center">
            <div>
              <p className="section-label text-accent-400 mb-4">Консультация</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                Готовы обсудить ваш салон?
              </h2>
              <p className="text-white/65 text-lg leading-relaxed max-w-md">
                3D-визуализация, смета и сроки. Ответ менеджера — за 30 минут.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <Link href="mailto:info@mebelitprof.ru" className="w-full lg:w-auto">
                <Button size="lg" className="w-full lg:min-w-[240px] gap-2 shadow-glow">
                  <Mail className="h-4 w-4" />
                  Оставить заявку
                </Button>
              </Link>
              <Link href="tel:+78001234567" className="w-full lg:w-auto">
                <Button
                  variant="white"
                  size="lg"
                  className="w-full lg:min-w-[240px] gap-2 bg-white/10 text-white border-white/25 hover:bg-white/20 shadow-none"
                >
                  <Phone className="h-4 w-4" />
                  8 800 123-45-67
                </Button>
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white mt-2 transition-colors"
              >
                Или выберите в каталоге
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
