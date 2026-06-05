import { products, type Product } from "./products";
import { testCatalogProducts } from "./test-catalog";

export const EXCLUDED_CATEGORY_SLUGS = ["office", "horeca", "conference"] as const;

export const allProducts: Product[] = [...products, ...testCatalogProducts];

function isBeautyCatalogProduct(product: Product): boolean {
  return !EXCLUDED_CATEGORY_SLUGS.includes(
    product.categorySlug as (typeof EXCLUDED_CATEGORY_SLUGS)[number]
  );
}

export function getCatalogProducts(): Product[] {
  return allProducts.filter(isBeautyCatalogProduct);
}

export function findProductBySlug(slug: string): Product | undefined {
  const product = allProducts.find((p) => p.slug === slug);
  if (product && !isBeautyCatalogProduct(product)) return undefined;
  return product;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getCatalogProducts().filter((p) => p.categorySlug === categorySlug);
}

export function getCategoryProductCount(categorySlug: string): number {
  return getProductsByCategory(categorySlug).length;
}

export function getFeaturedProducts(): Product[] {
  return getCatalogProducts()
    .filter((p) => p.badge === "premium" || p.badge === "hit")
    .slice(0, 8);
}

export function getPremiumProducts(): Product[] {
  return getCatalogProducts().filter((p) => p.badge === "premium").slice(0, 8);
}

export function getHitProducts(): Product[] {
  return getCatalogProducts().filter((p) => p.badge === "hit").slice(0, 8);
}

export function getNewProducts(): Product[] {
  return getCatalogProducts().filter((p) => p.badge === "new").slice(0, 8);
}

export function getSaleProducts(): Product[] {
  return getCatalogProducts().filter((p) => p.badge === "sale").slice(0, 8);
}

export { products, testCatalogProducts };
export type { Product };
