"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { useShop } from "@/store/ShopProvider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    comment: "",
  });

  if (cart.length === 0 && !submitted) {
    return (
      <div className="pb-20">
        <div className="mx-auto max-w-3xl px-4 text-center py-16">
          <div className="rounded-3xl border border-border bg-surface-card p-12 shadow-card">
            <h1 className="font-display text-3xl font-semibold text-foreground mb-4">
              Корзина пуста
            </h1>
            <p className="text-muted mb-8">Добавьте товары, чтобы оформить заказ</p>
            <Link href="/catalog">
              <Button size="lg">В каталог</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="pb-20">
        <div className="mx-auto max-w-lg px-4 text-center py-16">
          <div className="rounded-3xl border border-border bg-surface-card p-12 shadow-card">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
            <h1 className="font-display text-3xl font-semibold text-foreground mb-3">
              Заказ принят!
            </h1>
            <p className="text-muted mb-8">
              Менеджер свяжется с вами в течение 30 минут для подтверждения заказа.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/catalog">
                <Button size="lg">Продолжить покупки</Button>
              </Link>
              <Link href="/">
                <Button variant="secondary" size="lg">
                  На главную
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    clearCart();
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад в корзину
        </Link>

        <PageHeader
          label="Оформление"
          title="Ваш заказ"
          description="Заполните контактные данные — менеджер подтвердит заказ"
        />

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5 rounded-2xl border border-border bg-surface-card p-6 sm:p-8 shadow-card">
            {[
              { id: "name", label: "Имя", type: "text", required: true },
              { id: "phone", label: "Телефон", type: "tel", required: true },
              { id: "email", label: "Email", type: "email", required: true },
              { id: "city", label: "Город", type: "text", required: true },
              { id: "address", label: "Адрес доставки", type: "text", required: true },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  required={field.required}
                  value={form[field.id as keyof typeof form]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [field.id]: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/30 transition-shadow"
                />
              </div>
            ))}
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-2">
                Комментарий
              </label>
              <textarea
                id="comment"
                rows={3}
                value={form.comment}
                onChange={(e) => setForm((prev) => ({ ...prev, comment: e.target.value }))}
                className="w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/30 resize-none transition-shadow"
                placeholder="Пожелания к заказу, время звонка..."
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[5.25rem] rounded-2xl border border-border bg-surface-card p-6 space-y-4 shadow-card">
              <h2 className="text-lg font-semibold text-foreground">Ваш заказ</h2>
              <ul className="space-y-3 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <li key={item.productId} className="flex justify-between gap-2 text-sm">
                    <span className="text-muted line-clamp-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-foreground shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="font-medium">Итого ({cartCount})</span>
                <span className="text-xl font-semibold text-foreground">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Отправка..." : "Подтвердить заказ"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с политикой обработки данных
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
