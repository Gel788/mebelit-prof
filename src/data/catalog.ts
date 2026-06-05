import { products, type Product } from "./products";
import { testCatalogProducts } from "./test-catalog";

export const allProducts: Product[] = [...products, ...testCatalogProducts];

export function getCatalogProducts(): Product[] {
  return allProducts;
}

export function findProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return allProducts.filter((p) => p.categorySlug === categorySlug);
}

export function getCategoryProductCount(categorySlug: string): number {
  return getProductsByCategory(categorySlug).length;
}

export function getFeaturedProducts(): Product[] {
  return allProducts
    .filter((p) => p.badge === "premium" || p.badge === "hit")
    .slice(0, 8);
}

export function getPremiumProducts(): Product[] {
  return allProducts.filter((p) => p.badge === "premium").slice(0, 8);
}

export function getHitProducts(): Product[] {
  return allProducts.filter((p) => p.badge === "hit").slice(0, 8);
}

export function getNewProducts(): Product[] {
  return allProducts.filter((p) => p.badge === "new").slice(0, 8);
}

export function getSaleProducts(): Product[] {
  return allProducts.filter((p) => p.badge === "sale").slice(0, 8);
}

export { products, testCatalogProducts };
export type { Product };
