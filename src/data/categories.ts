import { getCategoryImage } from "./images";
import { getCategoryProductCount } from "./catalog";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
};

const categoryDefs = [
  {
    id: "1",
    name: "Салоны и студии",
    slug: "beauty",
    description: "Кресла, столы и профессиональное оборудование для beauty-салонов и студий",
    icon: "Sparkles",
  },
  {
    id: "2",
    name: "Клиники",
    slug: "medical",
    description: "Мебель и оборудование для клиник, кабинетов косметологии и медицины",
    icon: "HeartPulse",
  },
  {
    id: "3",
    name: "Ресепшн и зоны ожидания",
    slug: "reception",
    description: "Стойки reception, диваны и lounge-зоны для салонов и клиник",
    icon: "Building2",
  },
] as const;

export const categories: Category[] = categoryDefs.map((cat) => ({
  ...cat,
  image: getCategoryImage(cat.slug),
  productCount: getCategoryProductCount(cat.slug),
}));

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
