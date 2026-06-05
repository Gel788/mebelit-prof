"use client";

import { AppImage } from "@/components/ui/AppImage";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop } from "@/store/ShopProvider";
import { formatPrice } from "@/lib/utils";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const {
    cart,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useShop();

  if (cart.length === 0) {
    return (
      <div className="pb-20">
        <div className="mx-auto max-w-3xl px-4 text-center py-16">
          <div className="rounded-3xl border border-border bg-surface-card p-12 shadow-card">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500/10">
              <ShoppingBag className="h-10 w-10 text-brand-500" />
            </div>
            <h1 className="font-display text-3xl font-semibold text-foreground mb-3">
              Корзина пуста
            </h1>
            <p className="text-muted mb-8">
              Добавьте товары из каталога, чтобы оформить заказ
            </p>
            <Link href="/catalog">
              <Button size="lg">Перейти в каталог</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PageHeader
          label="Корзина"
          title="Ваш заказ"
          description={`${cartCount} позиций`}
          action={
            <Button variant="ghost" onClick={clearCart}>
              Очистить корзину
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 rounded-2xl border border-border bg-surface-card p-4 sm:p-5 shadow-card transition-shadow hover:shadow-premium"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-elevated"
                >
                  <AppImage src={item.image} alt={item.name} fill className="object-cover" />
                </Link>
                <div className="flex flex-1 flex-col sm:flex-row sm:gap-4 min-w-0">
                  <div className="flex-1">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-medium text-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-lg font-semibold text-foreground mt-2">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 mt-3 sm:mt-0">
                    <div className="flex items-center rounded-xl border border-border">
                      <button
                        className="flex h-10 w-10 items-center justify-center text-muted hover:text-foreground"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        className="flex h-10 w-10 items-center justify-center text-muted hover:text-foreground"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        className="mt-1 text-sm text-muted hover:text-red-500 transition-colors inline-flex items-center gap-1"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[5.25rem] rounded-2xl border border-border bg-surface-card p-6 space-y-4 shadow-card">
              <h2 className="text-lg font-semibold text-foreground">Итого</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted">
                  <span>Товары ({cartCount})</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>Доставка</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Бесплатно</span>
                </div>
              </div>
              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="font-medium text-foreground">К оплате</span>
                <span className="text-2xl font-semibold text-foreground">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <Link href="/checkout">
                <Button size="lg" className="w-full gap-2">
                  Оформить заказ
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
