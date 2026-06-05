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
    name: "Офисная мебель",
    slug: "office",
    description: "Эргономичные рабочие места премиум-класса",
    icon: "Briefcase",
  },
  {
    id: "2",
    name: "Салоны красоты",
    slug: "beauty",
    description: "Профессиональное оборудование для beauty-индустрии",
    icon: "Sparkles",
  },
  {
    id: "3",
    name: "Ресепшн и зоны ожидания",
    slug: "reception",
    description: "Впечатляющие первые впечатления для ваших клиентов",
    icon: "Building2",
  },
  {
    id: "4",
    name: "Конференц-залы",
    slug: "conference",
    description: "Мебель для переговоров и презентаций",
    icon: "Presentation",
  },
  {
    id: "5",
    name: "Медицинские кабинеты",
    slug: "medical",
    description: "Функциональная мебель для клиник и кабинетов",
    icon: "HeartPulse",
  },
  {
    id: "6",
    name: "HoReCa",
    slug: "horeca",
    description: "Решения для ресторанов, кафе и отелей",
    icon: "UtensilsCrossed",
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
