"use client";

import { AppImage } from "@/components/ui/AppImage";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop } from "@/store/ShopProvider";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useShop();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-border bg-surface-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-brand-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Корзина {cartCount > 0 && `(${cartCount})`}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-hover hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center px-4">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/10">
                    <ShoppingBag className="h-8 w-8 text-brand-500" />
                  </div>
                  <p className="text-foreground font-medium mb-2">Корзина пуста</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Добавьте товары из каталога
                  </p>
                  <Link href="/catalog" onClick={closeCart}>
                    <Button>В каталог</Button>
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li
                      key={item.productId}
                      className="flex gap-3 rounded-2xl border border-border bg-surface-elevated p-3 shadow-sm"
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-elevated"
                      >
                        <AppImage
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col min-w-0">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-sm font-medium text-foreground line-clamp-2 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm font-semibold text-foreground mt-1">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                          <div className="flex items-center rounded-xl border border-border bg-surface-card">
                            <button
                              className="flex h-8 w-8 items-center justify-center text-muted hover:text-foreground"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              className="flex h-8 w-8 items-center justify-center text-muted hover:text-foreground"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            className="text-muted hover:text-red-500 transition-colors"
                            onClick={() => removeFromCart(item.productId)}
                            aria-label="Удалить"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Итого</span>
                  <span className="text-xl font-semibold text-foreground">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <Link href="/checkout" onClick={closeCart}>
                  <Button size="lg" className="w-full gap-2">
                    Оформить заказ
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Link href="/cart" onClick={closeCart} className="flex-1">
                    <Button variant="secondary" className="w-full">
                      В корзину
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={clearCart}>
                    Очистить
                  </Button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
