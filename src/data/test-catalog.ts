import { getProductImageBySlug, getProductImages } from "./images";
import type { Product } from "./products";

function createProduct(
  id: string,
  name: string,
  slug: string,
  category: string,
  categorySlug: Product["categorySlug"],
  price: number,
  badge?: Product["badge"],
  oldPrice?: number
): Product {
  const index = parseInt(id, 10);
  return {
    id,
    name,
    slug,
    description: `${name} — профессиональное решение для салонов, студий и клиник. Качественные материалы и монтаж под ключ.`,
    shortDescription: name,
    price,
    oldPrice,
    category,
    categorySlug,
    image: getProductImageBySlug(slug),
    images: getProductImages(slug),
    badge,
    rating: 4.2 + (index % 8) * 0.1,
    reviews: 10 + index * 3,
    inStock: index % 7 !== 0,
    features: [
      "Профессиональное качество",
      "Бесплатная консультация",
      "Доставка по РФ",
      "Монтаж под ключ",
    ],
    specs: {
      Материал: "Premium",
      Гарантия: "2 года",
      Страна: "Россия",
    },
  };
}

export const testCatalogProducts: Product[] = [
  createProduct("13", "Стол оператора Call Center", "test-stol-call-center", "Офисная мебель", "office", 45900, "new"),
  createProduct("14", "Кресло для персонала Soft", "test-kreslo-personal-soft", "Офисная мебель", "office", 28900, "hit"),
  createProduct("15", "Шкаф архивный Office Pro", "test-shkaf-archive", "Витрины и шкафы", "storage", 67800),
  createProduct("16", "Стеллаж открытый Loft", "test-stellazh-loft", "Витрины и шкафы", "storage", 34500, "sale", 42000),
  createProduct("17", "Перегородка офисная Glass", "test-peregorodka-glass", "Офисная мебель", "office", 156000, "premium"),
  createProduct("18", "Стол для переговоров Round", "test-stol-round", "Конференц-залы", "conference", 198000, "premium"),
  createProduct("19", "Трибуна для презентаций", "test-tribuna", "Конференц-залы", "conference", 89000),
  createProduct("20", "Стул для конференций Stack", "test-stul-stack", "Конференц-залы", "conference", 12500, "hit"),
  createProduct("21", "Доска магнитная Premium", "test-doska-magnit", "Конференц-залы", "conference", 34500, "new"),
  createProduct("22", "Кресло для педикюра Luxe", "test-kreslo-manikyur", "Педикюрное оборудование", "pedicure", 89000, "hit"),
  createProduct("23", "Мойка для парикмахерской", "test-moyka-parik", "Парикмахерское оборудование", "hairdressing", 112000, "premium"),
  createProduct("24", "Тележка для инструментов", "test-telezhka-beauty", "Витрины и шкафы", "storage", 24500),
  createProduct("25", "Зеркало с подсветкой LED", "test-zerkalo-led", "Парикмахерское оборудование", "hairdressing", 56000, "new", 65000),
  createProduct("26", "Кресло для косметолога", "test-kreslo-kosmetolog", "Косметологическое оборудование", "cosmetology", 134000, "limited"),
  createProduct("27", "Стойка ресепшн Compact", "test-resepshn-compact", "Салон под ключ", "salon-turnkey", 178000),
  createProduct("28", "Кресло для ожидания Duo", "test-kreslo-ozhidanie", "Салон под ключ", "salon-turnkey", 45000, "sale", 52000),
  createProduct("29", "Журнальный столик Lobby", "test-stolik-lobby", "Салон под ключ", "salon-turnkey", 32000),
  createProduct("30", "Стойка для брошюр Info", "test-stoyka-broshyur", "Салон под ключ", "salon-turnkey", 18900, "new"),
  createProduct("31", "Кушетка массажная Basic", "test-kushetka-basic", "Массажное оборудование", "massage", 89000),
  createProduct("32", "Шкаф медицинский Sterile", "test-shkaf-med", "Витрины и шкафы", "storage", 67000, "hit"),
  createProduct("33", "Стол для осмотра Pro", "test-stol-osmotr", "Косметологическое оборудование", "cosmetology", 145000, "premium"),
  createProduct("34", "Табурет для кабинета", "test-taburet-med", "Косметологическое оборудование", "cosmetology", 8900),
  createProduct("35", "Стол ресторанный Bistro", "test-stol-bistro", "HoReCa", "horeca", 24000, "hit"),
  createProduct("36", "Барная стойка Classic", "test-barnaya-stoyka", "HoReCa", "horeca", 89000, "premium"),
  createProduct("37", "Стул барный High", "test-stul-bar", "HoReCa", "horeca", 15600, "sale", 18000),
  createProduct("38", "Диван для лаунжа Hotel", "test-divan-hotel", "HoReCa", "horeca", 198000, "limited"),
  createProduct("39", "Стол для кафе Outdoor", "test-stol-outdoor", "HoReCa", "horeca", 34500, "new"),
  createProduct("40", "Комплект open space Start", "test-open-space-start", "Офисная мебель", "office", 299000, "premium"),
  createProduct("41", "Комплект beauty salon Mini", "test-beauty-mini", "Салон под ключ", "salon-turnkey", 449000, "premium"),
  createProduct("42", "Комплект ресепшн Standard", "test-resepshn-standard", "Салон под ключ", "salon-turnkey", 389000, "hit"),
  createProduct("43", "Стол массажный Pro", "test-stol-massage", "Массажное оборудование", "massage", 156000, "premium"),
  createProduct("44", "Витрина для косметики", "test-vitrina-kosmet", "Витрины и шкафы", "storage", 78000, "new"),
];
