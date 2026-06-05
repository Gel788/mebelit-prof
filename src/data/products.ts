import { getProductImageBySlug, getProductImages } from "./images";

export type ProductBadge = "new" | "hit" | "sale" | "premium" | "limited";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  oldPrice?: number;
  category: string;
  categorySlug: string;
  image: string;
  images: string[];
  badge?: ProductBadge;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  specs: Record<string, string>;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Кресло CEO Prestige",
    slug: "kreslo-ceo-prestige",
    description:
      "Флагманское кресло руководителя с полной эргономикой, итальянской кожей и хромированным основанием. Создано для тех, кто ценит безупречный комфорт и статус.",
    shortDescription: "Кожаное кресло руководителя с полной эргономикой",
    price: 189900,
    oldPrice: 219900,
    category: "Офисная мебель",
    categorySlug: "office",
    image: getProductImageBySlug("kreslo-ceo-prestige"),
    images: getProductImages("kreslo-ceo-prestige"),
    badge: "premium",
    rating: 4.9,
    reviews: 47,
    inStock: true,
    features: [
      "Натуральная итальянская кожа",
      "4D подлокотники",
      "Поясничная поддержка",
      "Гарантия 5 лет",
    ],
    specs: {
      Материал: "Натуральная кожа",
      "Макс. нагрузка": "150 кг",
      Гарантия: "5 лет",
      Страна: "Италия",
    },
  },
  {
    id: "2",
    name: "Стол Executive Line",
    slug: "stol-executive-line",
    description:
      "Массивный рабочий стол из дуба с встроенной системой кабель-менеджмента и LED-подсветкой. Минималистичный дизайн для современного кабинета.",
    shortDescription: "Дубовый стол с LED-подсветкой и кабель-менеджментом",
    price: 245000,
    category: "Офисная мебель",
    categorySlug: "office",
    image: getProductImageBySlug("stol-executive-line"),
    images: getProductImages("stol-executive-line"),
    badge: "hit",
    rating: 4.8,
    reviews: 32,
    inStock: true,
    features: [
      "Массив дуба",
      "Встроенная LED-подсветка",
      "Система кабель-менеджмента",
      "Индивидуальные размеры",
    ],
    specs: {
      Материал: "Массив дуба",
      Размер: "200×90×75 см",
      Гарантия: "10 лет",
      Страна: "Германия",
    },
  },
  {
    id: "3",
    name: "Кресло Barber Pro X",
    slug: "kreslo-barber-pro-x",
    description:
      "Профессиональное барбер-кресло с гидравлическим подъёмом, поворотом 360° и премиальной обивкой. Стандарт индустрии для топовых барбершопов.",
    shortDescription: "Профессиональное барбер-кресло с гидравликой",
    price: 156000,
    oldPrice: 178000,
    category: "Салоны красоты",
    categorySlug: "beauty",
    image: getProductImageBySlug("kreslo-barber-pro-x"),
    images: getProductImages("kreslo-barber-pro-x"),
    badge: "hit",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    features: [
      "Гидравлический подъём",
      "Поворот 360°",
      "Премиальная обивка",
      "Хромированное основание",
    ],
    specs: {
      Материал: "Экокожа Premium",
      "Макс. нагрузка": "200 кг",
      Гарантия: "3 года",
      Страна: "Турция",
    },
  },
  {
    id: "4",
    name: "Маникюрный стол Aurora",
    slug: "manikyurnyy-stol-aurora",
    description:
      "Элегантный маникюрный стол с встроенной вытяжкой, LED-лампой и системой хранения. Создан для салонов, где важна каждая деталь.",
    shortDescription: "Маникюрный стол с вытяжкой и LED-лампой",
    price: 98500,
    category: "Салоны красоты",
    categorySlug: "beauty",
    image: getProductImageBySlug("manikyurnyy-stol-aurora"),
    images: getProductImages("manikyurnyy-stol-aurora"),
    badge: "new",
    rating: 4.7,
    reviews: 23,
    inStock: true,
    features: [
      "Встроенная вытяжка",
      "LED-лампа с регулировкой",
      "Система хранения",
      "Аntibacterial покрытие",
    ],
    specs: {
      Материал: "ЛДСП + акрил",
      Размер: "120×50×85 см",
      Гарантия: "2 года",
      Страна: "Россия",
    },
  },
  {
    id: "5",
    name: "Ресепшн Grand Lobby",
    slug: "resepshn-grand-lobby",
    description:
      "Монументальная стойка ресепшн с подсветкой, мраморной столешницей и встроенным брендированием. Центральный элемент вашего пространства.",
    shortDescription: "Премиальная стойка ресепшн с подсветкой",
    price: 389000,
    category: "Ресепшн и зоны ожидания",
    categorySlug: "reception",
    image: getProductImageBySlug("resepshn-grand-lobby"),
    images: getProductImages("resepshn-grand-lobby"),
    badge: "premium",
    rating: 5.0,
    reviews: 12,
    inStock: true,
    features: [
      "Мраморная столешница",
      "LED-подсветка",
      "Индивидуальный дизайн",
      "Монтаж под ключ",
    ],
    specs: {
      Материал: "МДФ + мрамор",
      Размер: "300×80×110 см",
      Гарантия: "5 лет",
      Страна: "Италия",
    },
  },
  {
    id: "6",
    name: "Диван Lounge Comfort",
    slug: "divan-lounge-comfort",
    description:
      "Роскошный диван для зоны ожидания с антивандальной обивкой и эргономичной посадкой. Комфорт, который ваши клиенты запомнят.",
    shortDescription: "Диван для зоны ожидания премиум-класса",
    price: 124000,
    oldPrice: 145000,
    category: "Ресепшн и зоны ожидания",
    categorySlug: "reception",
    image: getProductImageBySlug("divan-lounge-comfort"),
    images: getProductImages("divan-lounge-comfort"),
    badge: "sale",
    rating: 4.6,
    reviews: 38,
    inStock: true,
    features: [
      "Антивандальная обивка",
      "Пенополиуретан HR",
      "Деревянный каркас",
      "Съёмные чехлы",
    ],
    specs: {
      Материал: "Ткань Premium",
      Размер: "220×90×85 см",
      Гарантия: "3 года",
      Страна: "Россия",
    },
  },
  {
    id: "7",
    name: "Стол переговорный Summit",
    slug: "stol-peregovornyy-summit",
    description:
      "Большой переговорный стол на 12 человек с интегрированными розетками и беспроводной зарядкой. Для решений, которые меняют бизнес.",
    shortDescription: "Переговорный стол на 12 мест с зарядкой",
    price: 456000,
    category: "Конференц-залы",
    categorySlug: "conference",
    image: getProductImageBySlug("stol-peregovornyy-summit"),
    images: getProductImages("stol-peregovornyy-summit"),
    badge: "premium",
    rating: 4.9,
    reviews: 15,
    inStock: true,
    features: [
      "На 12 человек",
      "Беспроводная зарядка",
      "Встроенные розетки",
      "Кабель-каналы",
    ],
    specs: {
      Материал: "Шпон дуба",
      Размер: "400×140×75 см",
      Гарантия: "5 лет",
      Страна: "Германия",
    },
  },
  {
    id: "8",
    name: "Кресло конференц Elite",
    slug: "kreslo-konferents-elite",
    description:
      "Облегчённое конференц-кресло с мягкой посадкой и стильным силуэтом. Идеально для длительных совещаний.",
    shortDescription: "Конференц-кресло для длительных совещаний",
    price: 34500,
    category: "Конференц-залы",
    categorySlug: "conference",
    image: getProductImageBySlug("kreslo-konferents-elite"),
    images: getProductImages("kreslo-konferents-elite"),
    badge: "hit",
    rating: 4.7,
    reviews: 56,
    inStock: true,
    features: [
      "Мягкая посадка",
      "Стекируемое",
      "10 цветов обивки",
      "Быстрая доставка",
    ],
    specs: {
      Материал: "Ткань / экокожа",
      "Макс. нагрузка": "120 кг",
      Гарантия: "2 года",
      Страна: "Польша",
    },
  },
  {
    id: "9",
    name: "Кушетка медицинская ProMed",
    slug: "kushetka-meditsinskaya-promed",
    description:
      "Профессиональная медицинская кушетка с электроприводом, памятью положений и антибacterial покрытием.",
    shortDescription: "Медицинская кушетка с электроприводом",
    price: 178000,
    category: "Медицинские кабинеты",
    categorySlug: "medical",
    image: getProductImageBySlug("kushetka-meditsinskaya-promed"),
    images: getProductImages("kushetka-meditsinskaya-promed"),
    badge: "new",
    rating: 4.8,
    reviews: 19,
    inStock: true,
    features: [
      "Электропривод",
      "Память положений",
      "Аntibacterial покрытие",
      "Сертификат CE",
    ],
    specs: {
      Материал: "Медицинская экокожа",
      "Макс. нагрузка": "200 кг",
      Гарантия: "3 года",
      Страна: "Германия",
    },
  },
  {
    id: "10",
    name: "Стул ресторанный Milano",
    slug: "stul-restorannyy-milano",
    description:
      "Изящный ресторанный стул с металлическим каркасом и мягкой обивкой. Создан для атмосферных заведений.",
    shortDescription: "Ресторанный стул с металлическим каркасом",
    price: 18900,
    oldPrice: 22000,
    category: "HoReCa",
    categorySlug: "horeca",
    image: getProductImageBySlug("stul-restorannyy-milano"),
    images: getProductImages("stul-restorannyy-milano"),
    badge: "sale",
    rating: 4.5,
    reviews: 124,
    inStock: true,
    features: [
      "Металлический каркас",
      "Стекируемый",
      "12 цветов",
      "Опт от 10 шт",
    ],
    specs: {
      Материал: "Металл + ткань",
      "Макс. нагрузка": "150 кг",
      Гарантия: "1 год",
      Страна: "Италия",
    },
  },
  {
    id: "11",
    name: "Парикмахерское кресло Style Lux",
    slug: "parikmaherskoe-kreslo-style-lux",
    description:
      "Иконическое парикмахерское кресло с хромированным основанием, мягкой спинкой и регулируемой высотой.",
    shortDescription: "Парикмахерское кресло с хромированным основанием",
    price: 134000,
    category: "Салоны красоты",
    categorySlug: "beauty",
    image: getProductImageBySlug("parikmaherskoe-kreslo-style-lux"),
    images: getProductImages("parikmaherskoe-kreslo-style-lux"),
    badge: "limited",
    rating: 4.9,
    reviews: 67,
    inStock: true,
    features: [
      "Хромированное основание",
      "Гидравлика",
      "Премиальная обивка",
      "Limited Edition",
    ],
    specs: {
      Материал: "Экокожа Lux",
      "Макс. нагрузка": "180 кг",
      Гарантия: "3 года",
      Страна: "Италия",
    },
  },
  {
    id: "12",
    name: "Стеллаж модульный Open Space",
    slug: "stellazh-modulnyy-open-space",
    description:
      "Модульная система хранения для open space с возможностью зонирования и брендирования.",
    shortDescription: "Модульный стеллаж для open space",
    price: 89000,
    category: "Офисная мебель",
    categorySlug: "office",
    image: getProductImageBySlug("stellazh-modulnyy-open-space"),
    images: getProductImages("stellazh-modulnyy-open-space"),
    badge: "new",
    rating: 4.6,
    reviews: 28,
    inStock: true,
    features: [
      "Модульная система",
      "Зонирование пространства",
      "Брендирование",
      "Быстрый монтаж",
    ],
    specs: {
      Материал: "МДФ + металл",
      Размер: "240×40×200 см",
      Гарантия: "3 года",
      Страна: "Россия",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge === "premium" || p.badge === "hit").slice(0, 8);
}

export const badgeLabels: Record<ProductBadge, string> = {
  new: "Новинка",
  hit: "Хит",
  sale: "Скидка",
  premium: "Premium",
  limited: "Limited",
};

export const badgeColors: Record<ProductBadge, string> = {
  new: "bg-emerald-500/90 text-white",
  hit: "bg-orange-500/90 text-white",
  sale: "bg-red-500/90 text-white",
  premium: "bg-brand-500/90 text-white",
  limited: "bg-violet-500/90 text-white",
};
