export const categoryImages = {
  hairdressing: "/images/categories/beauty.jpg",
  cosmetology: "/images/categories/medical.jpg",
  pedicure: "/images/categories/beauty.jpg",
  "salon-turnkey": "/images/categories/reception.jpg",
  design: "/images/categories/beauty.jpg",
  massage: "/images/categories/medical.jpg",
  storage: "/images/categories/reception.jpg",
  beauty: "/images/categories/beauty.jpg",
  reception: "/images/categories/reception.jpg",
  medical: "/images/categories/medical.jpg",
  office: "/images/categories/beauty.jpg",
  conference: "/images/categories/reception.jpg",
  horeca: "/images/categories/beauty.jpg",
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
    hairdressing: ["parikmaherskoe-kreslo-style-lux", "kreslo-barber-pro-x"],
    cosmetology: ["kushetka-meditsinskaya-promed"],
    pedicure: ["manikyurnyy-stol-aurora"],
    "salon-turnkey": ["resepshn-grand-lobby", "divan-lounge-comfort"],
    massage: ["kushetka-meditsinskaya-promed"],
    storage: ["stellazh-modulnyy-open-space"],
    beauty: ["kreslo-barber-pro-x", "manikyurnyy-stol-aurora"],
    reception: ["resepshn-grand-lobby", "divan-lounge-comfort"],
    medical: ["kushetka-meditsinskaya-promed"],
  };
  const slugs = slugMap[categorySlug] ?? ["parikmaherskoe-kreslo-style-lux"];
  return getProductImageBySlug(slugs[index % slugs.length]);
}
