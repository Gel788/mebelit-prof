"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Phone,
  ChevronDown,
  Heart,
  ArrowRight,
} from "lucide-react";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useShop } from "@/store/ShopProvider";
import { useSiteSearch } from "@/components/layout/SiteEnhancements";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/catalog", label: "Каталог", match: "/catalog" },
  { href: "/catalog?filter=new", label: "Новинки", match: "filter=new" },
  { href: "/#services", label: "Услуги", match: "#services" },
  { href: "/#about", label: "О компании", match: "#about" },
  { href: "/#contacts", label: "Контакты", match: "#contacts" },
];

function isLinkActive(pathname: string, href: string, match: string) {
  if (match.startsWith("#")) return false;
  if (match === "/catalog" && href === "/catalog") {
    return pathname === "/catalog" && !href.includes("filter");
  }
  if (match.includes("filter=")) return href.includes(match);
  return pathname.startsWith(match);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const { cartCount, favoriteCount, openCart } = useShop();
  const { openSearch } = useSiteSearch();

  useEffect(() => {
    setMobileOpen(false);
    setCatalogOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const catalogActive = pathname === "/catalog" || pathname.startsWith("/product");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface-card/95 backdrop-blur-xl shadow-header">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[4.25rem] items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 group shrink-0 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-700 shadow-glow transition-transform group-hover:scale-105">
                <span className="font-display text-lg font-bold text-white">M</span>
              </div>
              <div className="hidden min-w-0 sm:block">
                <span className="block font-display text-sm lg:text-base font-semibold leading-tight text-foreground">
                  Мебель для бьюти-бизнеса
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 rounded-2xl border border-border bg-surface-elevated/80 p-1">
              <div
                className="relative"
                onMouseEnter={() => setCatalogOpen(true)}
                onMouseLeave={() => setCatalogOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors",
                    catalogActive || catalogOpen
                      ? "bg-accent-500 text-white shadow-glow"
                      : "text-foreground hover:bg-hover"
                  )}
                >
                  Каталог
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      catalogOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {catalogOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[min(920px,calc(100vw-2rem))]"
                    >
                      <div className="rounded-2xl border border-border bg-surface-card p-4 shadow-premium">
                        <div className="grid grid-cols-3 gap-3">
                          {categories.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/catalog?category=${cat.slug}`}
                              className="group relative overflow-hidden rounded-xl aspect-[16/10] border border-border hover:border-brand-500/30 transition-all"
                            >
                              <AppImage
                                src={cat.image}
                                alt={cat.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="300px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                              <div className="absolute inset-x-0 bottom-0 p-3">
                                <p className="text-sm font-semibold text-white group-hover:text-brand-200 transition-colors">
                                  {cat.name}
                                </p>
                                <p className="text-[11px] text-white/60 mt-0.5">
                                  {cat.productCount} товаров
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/catalog"
                          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-500/10 border border-brand-500/20 p-3 text-sm font-semibold text-brand-700 dark:text-brand-300 hover:bg-brand-500/15 transition-colors"
                        >
                          Смотреть весь каталог
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(1).map((link) => {
                const active = isLinkActive(pathname, link.href, link.match);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors",
                      active
                        ? "bg-brand-500/10 text-brand-700 dark:text-brand-300"
                        : "text-foreground hover:bg-hover"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <ThemeToggle className="border border-border bg-surface-elevated text-foreground hover:bg-hover" />

              <button
                aria-label="Поиск"
                onClick={openSearch}
                className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-foreground hover:bg-hover transition-all"
              >
                <Search className="h-5 w-5" />
              </button>

              <Link
                href="/favorites"
                aria-label="Избранное"
                className="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-foreground hover:bg-hover transition-all"
              >
                <Heart className="h-5 w-5" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {favoriteCount}
                  </span>
                )}
              </Link>

              <button
                id="cart-trigger"
                aria-label="Корзина"
                onClick={openCart}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-foreground hover:bg-hover transition-all"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link href="/catalog" className="hidden md:flex">
                <Button size="sm" className="gap-2 px-4">
                  В каталог
                </Button>
              </Link>

              <button
                aria-label="Меню"
                className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-foreground"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 z-[80] flex h-full w-full max-w-sm flex-col bg-surface-card border-l border-border shadow-drawer lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <span className="font-display text-lg font-semibold text-foreground">
                  Меню
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-xl border border-border bg-surface-elevated px-4 py-3.5 text-base font-semibold text-foreground hover:border-brand-500/30 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-brand-500" />
                  </Link>
                ))}

                <p className="pt-4 pb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Категории
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalog?category=${cat.slug}`}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground bg-hover hover:bg-brand-500/10 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {cat.name}
                      <span className="text-xs text-muted-foreground">
                        {cat.productCount}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-border p-5 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openSearch();
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-surface-elevated px-4 py-3.5 text-base font-semibold text-foreground hover:border-brand-500/30 transition-colors"
                >
                  Поиск
                  <Search className="h-4 w-4 text-brand-500" />
                </button>
              </div>

              <div className="border-t border-border p-5 space-y-3">
                <Link href="tel:+78001234567" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    8 800 123-45-67
                  </Button>
                </Link>
                <Link href="/catalog" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Открыть каталог</Button>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
