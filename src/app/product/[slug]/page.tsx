import { notFound } from "next/navigation";
import { findProductBySlug, getCatalogProducts } from "@/data/catalog";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { ProductGrid } from "@/components/products/ProductGrid";

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getCatalogProducts().map((product) => ({ slug: product.slug }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = findProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getCatalogProducts()
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pb-24 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductDetailClient product={product} />

        {relatedProducts.length > 0 && (
          <section className="border-t border-border pt-16">
            <p className="text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Рекомендуем
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-8">
              Похожие товары
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </section>
        )}
      </div>
    </div>
  );
}
