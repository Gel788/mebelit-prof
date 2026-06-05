import { getCategoryImage, getProductImageBySlug, getProductImages } from "./images";
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
    description: `${name} — профессиональное решение для бизнеса. Качественные материалы, надёжная конструкция и полный сервис от Mebelit Prof.`,
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
  createProduct("15", "Шкаф архивный Office Pro", "test-shkaf-archive", "Офисная мебель", "office", 67800),
  createProduct("16", "Стеллаж открытый Loft", "test-stellazh-loft", "Офисная мебель", "office", 34500, "sale", 42000),
  createProduct("17", "Перегородка офисная Glass", "test-peregorodka-glass", "Офисная мебель", "office", 156000, "premium"),
  createProduct("18", "Стол для переговоров Round", "test-stol-round", "Конференц-залы", "conference", 198000, "premium"),
  createProduct("19", "Трибуна для презентаций", "test-tribuna", "Конференц-залы", "conference", 89000),
  createProduct("20", "Стул для конференций Stack", "test-stul-stack", "Конференц-залы", "conference", 12500, "hit"),
  createProduct("21", "Доска магнитная Premium", "test-doska-magnit", "Конференц-залы", "conference", 34500, "new"),
  createProduct("22", "Кресло для маникюра Luxe", "test-kreslo-manikyur", "Салоны красоты", "beauty", 89000, "hit"),
  createProduct("23", "Мойка для парикмахерской", "test-moyka-parik", "Салоны красоты", "beauty", 112000, "premium"),
  createProduct("24", "Тележка для инструментов", "test-telezhka-beauty", "Салоны красоты", "beauty", 24500),
  createProduct("25", "Зеркало с подсветкой LED", "test-zerkalo-led", "Салоны красоты", "beauty", 56000, "new", 65000),
  createProduct("26", "Кресло для косметолога", "test-kreslo-kosmetolog", "Салоны красоты", "beauty", 134000, "limited"),
  createProduct("27", "Стойка ресепшн Compact", "test-resepshn-compact", "Ресепшн и зоны ожидания", "reception", 178000),
  createProduct("28", "Кресло для ожидания Duo", "test-kreslo-ozhidanie", "Ресепшн и зоны ожидания", "reception", 45000, "sale", 52000),
  createProduct("29", "Журнальный столик Lobby", "test-stolik-lobby", "Ресепшн и зоны ожидания", "reception", 32000),
  createProduct("30", "Стойка для брошюр Info", "test-stoyka-broshyur", "Ресепшн и зоны ожидания", "reception", 18900, "new"),
  createProduct("31", "Кушетка медицинская Basic", "test-kushetka-basic", "Медицинские кабинеты", "medical", 89000),
  createProduct("32", "Шкаф медицинский Sterile", "test-shkaf-med", "Медицинские кабинеты", "medical", 67000, "hit"),
  createProduct("33", "Стол для осмотра Pro", "test-stol-osmotr", "Медицинские кабинеты", "medical", 145000, "premium"),
  createProduct("34", "Табурет медицинский", "test-taburet-med", "Медицинские кабинеты", "medical", 8900),
  createProduct("35", "Стол ресторанный Bistro", "test-stol-bistro", "HoReCa", "horeca", 24000, "hit"),
  createProduct("36", "Барная стойка Classic", "test-barnaya-stoyka", "HoReCa", "horeca", 89000, "premium"),
  createProduct("37", "Стул барный High", "test-stul-bar", "HoReCa", "horeca", 15600, "sale", 18000),
  createProduct("38", "Диван для лаунжа Hotel", "test-divan-hotel", "HoReCa", "horeca", 198000, "limited"),
  createProduct("39", "Стол для кафе Outdoor", "test-stol-outdoor", "HoReCa", "horeca", 34500, "new"),
  createProduct("40", "Комплект open space Start", "test-open-space-start", "Офисная мебель", "office", 299000, "premium"),
  createProduct("41", "Комплект beauty salon Mini", "test-beauty-mini", "Салоны красоты", "beauty", 449000, "premium"),
  createProduct("42", "Комплект ресепшн Standard", "test-resepshn-standard", "Ресепшн и зоны ожидания", "reception", 389000, "hit"),
];
