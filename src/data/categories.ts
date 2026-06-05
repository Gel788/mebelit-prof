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
  href?: string;
  isService?: boolean;
};

const categoryDefs = [
  {
    id: "1",
    name: "Парикмахерское оборудование",
    slug: "hairdressing",
    description:
      "Кресла, мойки, зеркала и рабочие места для парикмахерских и барбершопов",
    icon: "Scissors",
  },
  {
    id: "2",
    name: "Косметологическое оборудование",
    slug: "cosmetology",
    description:
      "Кушетки, кресла и столы для кабинетов косметологии и эстетической медицины",
    icon: "Sparkles",
  },
  {
    id: "3",
    name: "Педикюрное оборудование",
    slug: "pedicure",
    description:
      "Стулья, столы и комплексы для педикюра и nail-студий",
    icon: "Footprints",
  },
  {
    id: "4",
    name: "Салон красоты под ключ",
    slug: "salon-turnkey",
    description:
      "Мебель для холла, стойки администратора, зоны ожидания и комплектация салона",
    icon: "Building2",
  },
  {
    id: "5",
    name: "Дизайн-проект",
    slug: "design",
    description:
      "Планировка, 3D-визуализация и подбор оборудования под ваш салон или клинику",
    icon: "PenTool",
    href: "/#services",
    isService: true,
  },
  {
    id: "6",
    name: "Массажное оборудование",
    slug: "massage",
    description:
      "Кушетки, столы и аксессуары для массажных и SPA-кабинетов",
    icon: "HeartPulse",
  },
  {
    id: "7",
    name: "Витрины, лаборатории и шкафы",
    slug: "storage",
    description:
      "Витрины, лаборатории, шкафы и системы хранения для салонов и клиник",
    icon: "Archive",
  },
] as const;

export const categories: Category[] = categoryDefs.map((cat) => ({
  ...cat,
  image: getCategoryImage(cat.slug),
  productCount:
    "isService" in cat && cat.isService ? 0 : getCategoryProductCount(cat.slug),
}));

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryHref(category: Category): string {
  return category.href ?? `/catalog?category=${category.slug}`;
}
