"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { LayoutGrid, SlidersHorizontal, X, SearchX } from "lucide-react";
import Link from "next/link";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterChip } from "@/components/ui/FilterChip";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getCatalogProducts, getCategoryProductCount } from "@/data/catalog";
import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

const quickFilters = [
  { label: "Новинки", param: "new" },
  { label: "Хиты", param: "hit" },
  { label: "Premium", param: "premium" },
  { label: "Со скидкой", param: "sale" },
  { label: "В наличии", param: "in-stock" },
];

function buildFilterHref(category?: string | null, filter?: string | null) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (filter) params.set("filter", filter);
  const query = params.toString();
  return query ? `/catalog?${query}` : "/catalog";
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const filterType = searchParams.get("filter");

  const filteredProducts = useMemo(() => {
    let result = getCatalogProducts();

    if (categoryFilter) {
      result = result.filter((p) => p.categorySlug === categoryFilter);
    }
    if (filterType === "new") result = result.filter((p) => p.badge === "new");
    if (filterType === "hit") result = result.filter((p) => p.badge === "hit");
    if (filterType === "premium") result = result.filter((p) => p.badge === "premium");
    if (filterType === "sale") {
      result = result.filter((p) => p.badge === "sale" || p.oldPrice);
    }
    if (filterType === "in-stock") result = result.filter((p) => p.inStock);

    return result;
  }, [categoryFilter, filterType]);

  const activeCategory = categories.find((c) => c.slug === categoryFilter);
  const totalProducts = getCatalogProducts().length;
  const hasActiveFilters = Boolean(categoryFilter || filterType);

  const productWord =
    filteredProducts.length === 1
      ? "товар"
      : filteredProducts.length < 5
        ? "товара"
        : "товаров";

  return (
    <div className="relative overflow-hidden pb-20">
      <SectionAtmosphere variant="default" />
      <div className="relative z-[1]">
      {activeCategory && (
        <div className="relative h-36 sm:h-44 mb-8 overflow-hidden rounded-2xl border border-border mx-4 sm:mx-6 lg:mx-8 max-w-7xl lg:mx-auto">
          <AppImage
            src={activeCategory.image}
            alt={activeCategory.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
          <div className="absolute inset-0 flex items-end p-6 sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400 mb-2">
                Категория
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
                {activeCategory.name}
              </h2>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!activeCategory && (
          <PageHeader
            label="Каталог"
            title="Все товары"
            description={`${totalProducts} позиций профессиональной мебели и оборудования`}
          />
        )}

        {activeCategory && (
          <div className="mb-8">
            <p className="text-muted">
              {filteredProducts.length} {productWord} в категории
            </p>
          </div>
        )}

        <div className="lg:hidden mb-6 space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <FilterChip
              href="/catalog"
              active={!categoryFilter && !filterType}
              count={totalProducts}
            >
              Все
            </FilterChip>
            {categories.map((cat) => (
              <FilterChip
                key={cat.slug}
                href={buildFilterHref(cat.slug, filterType)}
                active={categoryFilter === cat.slug}
                count={getCategoryProductCount(cat.slug)}
              >
                {cat.name}
              </FilterChip>
            ))}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickFilters.map((filter) => (
              <FilterChip
                key={filter.param}
                href={buildFilterHref(categoryFilter, filter.param)}
                active={filterType === filter.param}
              >
                {filter.label}
              </FilterChip>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mr-1">
              Фильтры:
            </span>
            {activeCategory && (
              <FilterChip href={buildFilterHref(null, filterType)} active>
                {activeCategory.name}
              </FilterChip>
            )}
            {filterType && (
              <FilterChip href={buildFilterHref(categoryFilter, null)} active>
                {quickFilters.find((f) => f.param === filterType)?.label}
              </FilterChip>
            )}
            <Link href="/catalog">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <X className="h-3.5 w-3.5" />
                Сбросить
              </Button>
            </Link>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <div className="sticky top-[5.25rem] space-y-5">
              <div className="rounded-2xl border border-border bg-surface-card p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <LayoutGrid className="h-4 w-4 text-brand-500" />
                  <h3 className="text-sm font-semibold text-foreground">Категории</h3>
                </div>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/catalog"
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                        !categoryFilter && !filterType
                          ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow"
                          : "text-muted hover:text-foreground hover:bg-hover"
                      )}
                    >
                      Все товары
                      <span
                        className={cn(
                          "text-xs tabular-nums",
                          !categoryFilter && !filterType ? "text-white/80" : "text-muted-foreground"
                        )}
                      >
                        {totalProducts}
                      </span>
                    </Link>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <Link
                        href={buildFilterHref(cat.slug, filterType)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                          categoryFilter === cat.slug
                            ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow"
                            : "text-muted hover:text-foreground hover:bg-hover"
                        )}
                      >
                        {cat.name}
                        <span
                          className={cn(
                            "text-xs tabular-nums",
                            categoryFilter === cat.slug
                              ? "text-white/80"
                              : "text-muted-foreground"
                          )}
                        >
                          {getCategoryProductCount(cat.slug)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-surface-card p-5 shadow-card">
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="h-4 w-4 text-brand-500" />
                  <h3 className="text-sm font-semibold text-foreground">Фильтры</h3>
                </div>
                <ul className="space-y-1">
                  {quickFilters.map((filter) => (
                    <li key={filter.param}>
                      <Link
                        href={buildFilterHref(categoryFilter, filter.param)}
                        className={cn(
                          "block px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                          filterType === filter.param
                            ? "bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-500/25"
                            : "text-muted hover:text-foreground hover:bg-hover"
                        )}
                      >
                        {filter.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filteredProducts.length > 0 ? (
                <>
                  {!activeCategory && (
                    <p className="text-sm text-muted mb-6">
                      Показано {filteredProducts.length} {productWord}
                    </p>
                  )}
                  <ProductGrid products={filteredProducts} columns={3} />
                </>
              ) : (
                <EmptyState
                  icon={<SearchX className="h-8 w-8" />}
                  title="Ничего не найдено"
                  description="Попробуйте другую категорию, сбросьте фильтры или пройдите умный квиз — он подберёт решения под ваш бизнес."
                  actionLabel="Сбросить фильтры"
                  actionHref="/catalog"
                  secondaryLabel="Пройти квиз"
                  secondaryHref="/#configurator"
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="pb-20 flex items-center justify-center min-h-[50vh]">
          <div className="h-10 w-10 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
