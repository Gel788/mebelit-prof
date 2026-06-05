export const categoryImages = {
  office: "/images/categories/office.jpg",
  beauty: "/images/categories/beauty.jpg",
  reception: "/images/categories/reception.jpg",
  conference: "/images/categories/conference.jpg",
  medical: "/images/categories/medical.jpg",
  horeca: "/images/categories/horeca.jpg",
} as const;

export type CategorySlug = keyof typeof categoryImages;

export const heroImage = "/images/categories/beauty.jpg";

export function getCategoryImage(slug: string): string {
  return categoryImages[slug as CategorySlug] ?? categoryImages.beauty;
}

export function getProductImageBySlug(slug: string): string {
  return `/images/products/${slug}.jpg`;
}

export function getProductImages(slug: string): string[] {
  return [getProductImageBySlug(slug)];
}

/** @deprecated use getProductImageBySlug */
export function getProductImage(categorySlug: string, index = 0): string {
  const slugMap: Record<string, string[]> = {
    office: ["kreslo-ceo-prestige", "stol-executive-line", "stellazh-modulnyy-open-space"],
    beauty: ["kreslo-barber-pro-x", "manikyurnyy-stol-aurora", "parikmaherskoe-kreslo-style-lux"],
    reception: ["resepshn-grand-lobby", "divan-lounge-comfort"],
    conference: ["stol-peregovornyy-summit", "kreslo-konferents-elite"],
    medical: ["kushetka-meditsinskaya-promed"],
    horeca: ["stul-restorannyy-milano"],
  };
  const slugs = slugMap[categorySlug] ?? ["kreslo-ceo-prestige"];
  return getProductImageBySlug(slugs[index % slugs.length]);
}
