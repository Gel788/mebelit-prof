"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useShop } from "@/store/ShopProvider";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  size?: "default" | "sm" | "lg";
  fullWidth?: boolean;
  showIcon?: boolean;
  label?: string;
  flyAnimation?: boolean;
  openDrawer?: boolean;
}

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  size = "default",
  fullWidth,
  showIcon = true,
  label = "В корзину",
  flyAnimation = false,
  openDrawer = true,
}: AddToCartButtonProps) {
  const { addToCart } = useShop();

  return (
    <Button
      size={size}
      className={cn(fullWidth && "w-full", className)}
      disabled={!product.inStock}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
        addToCart(product, quantity, {
          fly: flyAnimation,
          sourceRect: rect,
          openDrawer,
        });
      }}
    >
      {showIcon && <ShoppingBag className="h-4 w-4" />}
      {product.inStock ? label : "Нет в наличии"}
    </Button>
  );
}
