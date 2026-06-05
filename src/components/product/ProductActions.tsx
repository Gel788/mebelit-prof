"use client";

import type { Product } from "@/data/products";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { FavoriteButton } from "@/components/cart/FavoriteButton";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <AddToCartButton
        product={product}
        size="lg"
        className="flex-1 sm:flex-none min-w-[200px]"
        showIcon
      />
      <FavoriteButton slug={product.slug} variant="page" />
    </div>
  );
}
