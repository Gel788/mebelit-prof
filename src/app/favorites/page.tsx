"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavoriteProducts } from "@/store/ShopProvider";
import { ProductGrid } from "@/components/products/ProductGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function FavoritesPage() {
  const favorites = useFavoriteProducts();

  if (favorites.length === 0) {
    return (
      <div className="pb-20">
        <div className="mx-auto max-w-3xl px-4 text-center py-16">
          <div className="rounded-3xl border border-border bg-surface-card p-12 shadow-card">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-500/10">
              <Heart className="h-10 w-10 text-brand-500" />
            </div>
            <h1 className="font-display text-3xl font-semibold text-foreground mb-3">
              Избранное пусто
            </h1>
            <p className="text-muted mb-8">
              Сохраняйте понравившиеся товары, нажимая на сердечко
            </p>
            <Link href="/catalog">
              <Button size="lg">В каталог</Button>
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
          label="Избранное"
          title="Сохранённые товары"
          description={`${favorites.length} товаров в вашем списке`}
        />
        <ProductGrid products={favorites} columns={4} />
      </div>
    </div>
  );
}
