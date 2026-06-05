"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { findProductBySlug } from "@/data/catalog";
import type { Product } from "@/data/products";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type FlyPayload = {
  image: string;
  x: number;
  y: number;
};

type ShopContextValue = {
  cart: CartItem[];
  favorites: string[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  quickViewSlug: string | null;
  flyPayload: FlyPayload | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openQuickView: (slug: string) => void;
  closeQuickView: () => void;
  triggerFlyToCart: (image: string, sourceRect: DOMRect) => void;
  clearFlyPayload: () => void;
  addToCart: (product: Product, quantity?: number, options?: { fly?: boolean; sourceRect?: DOMRect; openDrawer?: boolean }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  favoriteCount: number;
};

const CART_KEY = "mebelit-cart";
const FAV_KEY = "mebelit-favorites";

const ShopContext = createContext<ShopContextValue | null>(null);

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewSlug, setQuickViewSlug] = useState<string | null>(null);
  const [flyPayload, setFlyPayload] = useState<FlyPayload | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(loadCart());
    setFavorites(loadFavorites());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const triggerFlyToCart = useCallback((image: string, sourceRect: DOMRect) => {
    setFlyPayload({
      image,
      x: sourceRect.left + sourceRect.width / 2,
      y: sourceRect.top + sourceRect.height / 2,
    });
  }, []);

  const clearFlyPayload = useCallback(() => setFlyPayload(null), []);

  const addToCart = useCallback(
    (
      product: Product,
      quantity = 1,
      options?: { fly?: boolean; sourceRect?: DOMRect; openDrawer?: boolean }
    ) => {
      if (!product.inStock) return;

      if (options?.fly && options.sourceRect) {
        triggerFlyToCart(product.image, options.sourceRect);
      }

      setCart((prev) => {
        const existing = prev.find((item) => item.productId === product.id);
        if (existing) {
          return prev.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          },
        ];
      });

      if (options?.openDrawer !== false) {
        window.setTimeout(() => setIsCartOpen(true), options?.fly ? 450 : 0);
      }
    },
    [triggerFlyToCart]
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  const value: ShopContextValue = {
    cart,
    favorites,
    cartCount,
    cartTotal,
    isCartOpen,
    quickViewSlug,
    flyPayload,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
    toggleCart: () => setIsCartOpen((v) => !v),
    openQuickView: (slug) => setQuickViewSlug(slug),
    closeQuickView: () => setQuickViewSlug(null),
    triggerFlyToCart,
    clearFlyPayload,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleFavorite,
    isFavorite,
    favoriteCount: favorites.length,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export function useFavoriteProducts(): Product[] {
  const { favorites } = useShop();
  return favorites
    .map((slug) => findProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
}
