import {
  configuratorBudgets,
  configuratorPalettes,
  configuratorSpaces,
  configuratorStyles,
  type BudgetId,
  type PaletteId,
  type SpaceId,
  type StyleId,
} from "@/data/configurator";
import { getProductsByCategory } from "@/data/catalog";
import type { Product } from "@/data/products";

export type AreaId = "compact" | "medium" | "large";
export type PriorityId = "comfort" | "design" | "value" | "turnkey";
export type TimelineId = "urgent" | "month" | "planning";

export type QuizAnswers = {
  space: SpaceId | null;
  area: AreaId | null;
  priority: PriorityId | null;
  style: StyleId | null;
  palette: PaletteId | null;
  budget: BudgetId | null;
  timeline: TimelineId | null;
};

export const quizSteps = [
  { id: "space", title: "Какой у вас бизнес?" },
  { id: "area", title: "Какая площадь помещения?" },
  { id: "priority", title: "Что для вас важнее всего?" },
  { id: "style", title: "Какой стиль ближе?" },
  { id: "palette", title: "Выберите палитру" },
  { id: "budget", title: "Какой бюджет закладываете?" },
  { id: "timeline", title: "Когда нужен результат?" },
] as const;

export const quizAreas = [
  {
    id: "compact" as AreaId,
    label: "До 50 м²",
    hint: "Компактное пространство",
    seats: "5–10 позиций",
  },
  {
    id: "medium" as AreaId,
    label: "50–150 м²",
    hint: "Средний объект",
    seats: "10–25 позиций",
  },
  {
    id: "large" as AreaId,
    label: "150+ м²",
    hint: "Крупный проект",
    seats: "25+ позиций",
  },
];

export const quizPriorities = [
  {
    id: "comfort" as PriorityId,
    label: "Комфорт",
    hint: "Эргономика и качество",
    emoji: "☁️",
  },
  {
    id: "design" as PriorityId,
    label: "Дизайн",
    hint: "Статус и эстетика",
    emoji: "✨",
  },
  {
    id: "value" as PriorityId,
    label: "Оптимальный бюджет",
    hint: "Максимум за деньги",
    emoji: "💎",
  },
  {
    id: "turnkey" as PriorityId,
    label: "Под ключ",
    hint: "Доставка и монтаж",
    emoji: "🔑",
  },
];

export const quizTimelines = [
  {
    id: "urgent" as TimelineId,
    label: "Срочно",
    hint: "До 2 недель",
  },
  {
    id: "month" as TimelineId,
    label: "В этом месяце",
    hint: "2–4 недели",
  },
  {
    id: "planning" as TimelineId,
    label: "Планирую заранее",
    hint: "1–2 месяца",
  },
];

export const analyzingMessages = [
  "Анализируем ваш запрос...",
  "Сопоставляем каталог и задачу...",
  "Подбираем оптимальную комплектацию...",
  "Считаем бюджет и сроки...",
  "Готовим персональную подборку...",
];

export type QuizResult = {
  products: Product[];
  picks: Product[];
  matchScore: number;
  headline: string;
  summary: string;
  tags: string[];
  kitEstimate: number;
  catalogHref: string;
};

function sortByPriority(products: Product[], priority: PriorityId): Product[] {
  const list = [...products];

  switch (priority) {
    case "comfort":
      return list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case "design":
      return list.sort((a, b) => {
        const badgeScore = (p: Product) =>
          p.badge === "premium" ? 3 : p.badge === "new" ? 2 : p.badge === "hit" ? 1 : 0;
        return badgeScore(b) - badgeScore(a) || b.rating - a.rating;
      });
    case "value":
      return list.sort(
        (a, b) => a.price / Math.max(a.rating, 1) - b.price / Math.max(b.rating, 1)
      );
    case "turnkey":
      return list.sort(
        (a, b) =>
          b.features.length - a.features.length ||
          (b.badge === "hit" ? 1 : 0) - (a.badge === "hit" ? 1 : 0)
      );
    default:
      return list;
  }
}

export function isQuizComplete(answers: QuizAnswers): boolean {
  return Boolean(
    answers.space &&
      answers.area &&
      answers.priority &&
      answers.style &&
      answers.palette &&
      answers.budget &&
      answers.timeline
  );
}

export function computeQuizResult(answers: QuizAnswers): QuizResult | null {
  if (!isQuizComplete(answers)) return null;

  const space = answers.space!;
  const budget = configuratorBudgets.find((b) => b.id === answers.budget!)!;
  const style = configuratorStyles.find((s) => s.id === answers.style!)!;
  const palette = configuratorPalettes.find((p) => p.id === answers.palette!)!;
  const area = quizAreas.find((a) => a.id === answers.area!)!;
  const priority = quizPriorities.find((p) => p.id === answers.priority!)!;
  const spaceMeta = configuratorSpaces.find((s) => s.id === space)!;

  const filtered = getProductsByCategory(space).filter((p) => p.price <= budget.max);
  const sorted = sortByPriority(filtered, answers.priority!);
  const pickCount = answers.area === "compact" ? 3 : answers.area === "medium" ? 4 : 5;
  const picks = sorted.slice(0, pickCount);
  const kitEstimate = picks.reduce((sum, p) => sum + p.price, 0);

  const coverage = filtered.length / Math.max(getProductsByCategory(space).length, 1);
  const priorityBoost =
    answers.priority === "design"
      ? picks.some((p) => p.badge === "premium")
        ? 8
        : 0
      : answers.priority === "turnkey"
        ? 5
        : 3;
  const matchScore = Math.min(
    98,
    Math.round(82 + coverage * 12 + priorityBoost + (picks.length >= 3 ? 4 : 0))
  );

  const timelineText =
    answers.timeline === "urgent"
      ? "ускоренная комплектация"
      : answers.timeline === "month"
        ? "стандартный монтаж"
        : "проект с 3D-визуализацией";

  const headline = `${style.label} · ${spaceMeta.label} · ${area.label}`;
  const summary = `Под ваш приоритет «${priority.label}» мы собрали ${picks.length} позиций в палитре «${palette.label}». Ориентир по комплекту — ${new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(kitEstimate)} с ${timelineText}.`;

  const tags = [
    spaceMeta.label,
    style.label,
    palette.label,
    budget.label,
    priority.label,
    area.seats,
  ];

  return {
    products: sorted,
    picks,
    matchScore,
    headline,
    summary,
    tags,
    kitEstimate,
    catalogHref: `/catalog?category=${space}`,
  };
}

export const emptyQuizAnswers = (): QuizAnswers => ({
  space: null,
  area: null,
  priority: null,
  style: null,
  palette: null,
  budget: null,
  timeline: null,
});
