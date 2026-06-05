"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, PenTool, ShoppingBag, Phone } from "lucide-react";
import { useShop } from "@/store/ShopProvider";
import { cn } from "@/lib/utils";

const items = [
  { href: "/catalog", label: "Каталог", icon: LayoutGrid, match: "/catalog" },
  { href: "/#services", label: "Услуги", icon: PenTool, match: "services" },
  { href: "/#contacts", label: "Контакты", icon: Phone, match: "contacts" },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount, openCart } = useShop();

  const isActive = (match: string) => {
    if (match === "/catalog") {
      return pathname === "/catalog" || pathname.startsWith("/product");
    }
    return false;
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-border bg-surface-card/95 backdrop-blur-xl shadow-premium"
      aria-label="Мобильная навигация"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
        {items.map(({ href, label, icon: Icon, match }) => {
          const active = isActive(match);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-semibold transition-colors",
                active
                  ? "text-accent-600 dark:text-accent-400"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-colors",
                  active && "bg-accent-500/10"
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              {label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={openCart}
          className="relative flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
          aria-label={`Корзина${cartCount > 0 ? `, ${cartCount} товаров` : ""}`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl">
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-[9px] font-bold text-white">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </span>
          Корзина
        </button>
      </div>
    </nav>
  );
}
