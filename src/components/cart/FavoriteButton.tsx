"use client";

import { Heart } from "lucide-react";
import { useShop } from "@/store/ShopProvider";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  slug: string;
  className?: string;
  variant?: "card" | "page";
}

export function FavoriteButton({
  slug,
  className,
  variant = "card",
}: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useShop();
  const active = isFavorite(slug);

  const base =
    variant === "card"
      ? "flex h-9 w-9 items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-300"
      : "flex h-12 px-5 items-center justify-center gap-2 rounded-xl border font-semibold transition-all";

  return (
    <button
      type="button"
      aria-label={active ? "Убрать из избранного" : "В избранное"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(slug);
      }}
      className={cn(
        base,
        active
          ? variant === "card"
            ? "bg-red-500 border-red-500 text-white shadow-badge"
            : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30"
          : variant === "card"
            ? "bg-surface-card/90 border-border text-foreground shadow-soft hover:bg-red-500 hover:border-red-500 hover:text-white hover:shadow-badge"
            : "bg-surface-card border-border text-muted hover:text-foreground hover:border-brand-500/30",
        className
      )}
    >
      <Heart className={cn("h-4 w-4", active && "fill-current")} />
      {variant === "page" && (active ? "В избранном" : "В избранное")}
    </button>
  );
}
