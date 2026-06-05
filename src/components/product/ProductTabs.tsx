"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, Package, Truck } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "description", label: "Описание" },
  { id: "specs", label: "Характеристики" },
  { id: "delivery", label: "Доставка" },
] as const;

type TabId = (typeof tabs)[number]["id"];

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  return (
    <div className="rounded-3xl border border-border bg-surface-card shadow-card overflow-hidden">
      <div className="flex gap-1 overflow-x-auto border-b border-border p-2 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative shrink-0 rounded-xl px-4 sm:px-6 py-2.5 text-sm font-semibold transition-colors",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            )}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="product-tab-indicator"
                className="absolute inset-0 rounded-xl bg-brand-500/10 border border-brand-500/20"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        {activeTab === "description" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <p className="text-muted leading-relaxed text-base sm:text-lg max-w-3xl">
              {product.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-surface-elevated p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
                    <Check className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "specs" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border overflow-hidden"
          >
            {Object.entries(product.specs).map(([key, value], i) => (
              <div
                key={key}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-5 py-4",
                  i % 2 === 0 ? "bg-surface-elevated" : "bg-surface-card"
                )}
              >
                <span className="text-sm text-muted-foreground">{key}</span>
                <span className="text-sm font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "delivery" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                icon: Truck,
                title: "Доставка по России",
                text: "Бесплатная доставка при заказе от 100 000 ₽. Срок — от 3 до 14 дней.",
              },
              {
                icon: Package,
                title: "Сборка и монтаж",
                text: "Профессиональная сборка на объекте. Подъём и занос включены в стоимость.",
              },
              {
                icon: CreditCard,
                title: "Оплата",
                text: "Картой онлайн, по счёту для юрлиц, рассрочка до 12 месяцев без переплаты.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-surface-elevated p-5"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10">
                  <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
