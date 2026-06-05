import { categoryImages } from "./images";

export type SpaceId = keyof typeof categoryImages;
export type StyleId = "minimal" | "premium" | "classic" | "modern";
export type PaletteId = "warm" | "neutral" | "dark" | "light";
export type BudgetId = "start" | "business" | "premium";

export const configuratorSpaces = [
  {
    id: "office" as SpaceId,
    label: "Офис",
    description: "Рабочие места и кабинеты",
  },
  {
    id: "beauty" as SpaceId,
    label: "Салон красоты",
    description: "Beauty & barber",
  },
  {
    id: "reception" as SpaceId,
    label: "Ресепшн",
    description: "Зоны ожидания",
  },
  {
    id: "conference" as SpaceId,
    label: "Переговорная",
    description: "Конференц-залы",
  },
  {
    id: "medical" as SpaceId,
    label: "Медицина",
    description: "Клиники и кабинеты",
  },
  {
    id: "horeca" as SpaceId,
    label: "HoReCa",
    description: "Рестораны и отели",
  },
];

export const configuratorStyles: {
  id: StyleId;
  label: string;
  hint: string;
}[] = [
  { id: "minimal", label: "Минимализм", hint: "Чистые линии" },
  { id: "premium", label: "Premium", hint: "Статус и комфорт" },
  { id: "classic", label: "Классика", hint: "Тепло и солидность" },
  { id: "modern", label: "Modern", hint: "Современный ритм" },
];

export const configuratorPalettes: {
  id: PaletteId;
  label: string;
  floor: string;
  wall: string;
  accent: string;
  grid: string;
}[] = [
  {
    id: "warm",
    label: "Тёплый",
    floor: "#ebe3d8",
    wall: "#f7f2eb",
    accent: "#9a7858",
    grid: "rgba(154,120,88,0.12)",
  },
  {
    id: "neutral",
    label: "Нейтральный",
    floor: "#e4e4e7",
    wall: "#f4f4f5",
    accent: "#71717a",
    grid: "rgba(113,113,122,0.12)",
  },
  {
    id: "dark",
    label: "Тёмное дерево",
    floor: "#3f3f46",
    wall: "#27272a",
    accent: "#c7b49a",
    grid: "rgba(199,180,154,0.15)",
  },
  {
    id: "light",
    label: "Светлый",
    floor: "#fafafa",
    wall: "#ffffff",
    accent: "#846248",
    grid: "rgba(132,98,72,0.1)",
  },
];

export const configuratorBudgets: {
  id: BudgetId;
  label: string;
  max: number;
}[] = [
  { id: "start", label: "до 500 000 ₽", max: 500_000 },
  { id: "business", label: "500K — 1.5M ₽", max: 1_500_000 },
  { id: "premium", label: "от 1.5M ₽", max: Infinity },
];

/** Позиции мебели на 2D-плане (% от контейнера) */
export const roomSlotLayouts: Record<
  SpaceId,
  { x: number; y: number; w: number; h: number; label: string }[]
> = {
  office: [
    { x: 8, y: 14, w: 34, h: 28, label: "Рабочее место" },
    { x: 52, y: 12, w: 28, h: 24, label: "Кресло" },
    { x: 10, y: 58, w: 38, h: 26, label: "Стол" },
    { x: 58, y: 54, w: 30, h: 28, label: "Хранение" },
  ],
  beauty: [
    { x: 10, y: 16, w: 32, h: 26, label: "Кресло" },
    { x: 50, y: 14, w: 36, h: 28, label: "Barber" },
    { x: 14, y: 56, w: 34, h: 26, label: "Маникюр" },
    { x: 54, y: 54, w: 32, h: 28, label: "Зона ожидания" },
  ],
  reception: [
    { x: 8, y: 20, w: 40, h: 30, label: "Ресепшн" },
    { x: 54, y: 18, w: 34, h: 26, label: "Софа" },
    { x: 16, y: 58, w: 30, h: 24, label: "Кресло" },
    { x: 56, y: 56, w: 28, h: 26, label: "Столик" },
  ],
  conference: [
    { x: 12, y: 22, w: 76, h: 34, label: "Стол переговоров" },
    { x: 10, y: 62, w: 22, h: 22, label: "Место 1" },
    { x: 36, y: 62, w: 22, h: 22, label: "Место 2" },
    { x: 62, y: 62, w: 22, h: 22, label: "Место 3" },
  ],
  medical: [
    { x: 12, y: 18, w: 36, h: 30, label: "Кушетка" },
    { x: 54, y: 16, w: 30, h: 26, label: "Стол врача" },
    { x: 14, y: 58, w: 32, h: 24, label: "Шкаф" },
    { x: 54, y: 56, w: 34, h: 26, label: "Стул" },
  ],
  horeca: [
    { x: 10, y: 16, w: 26, h: 24, label: "Стол 1" },
    { x: 40, y: 14, w: 26, h: 24, label: "Стол 2" },
    { x: 68, y: 16, w: 24, h: 24, label: "Стол 3" },
    { x: 28, y: 56, w: 44, h: 28, label: "Барная зона" },
  ],
};

export function getSpaceImage(space: SpaceId): string {
  return categoryImages[space];
}
