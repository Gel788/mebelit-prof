import type { QuizAnswers } from "@/lib/quiz-engine";

const QUIZ_STORAGE_KEY = "mebelit-quiz-saved";

export type SavedQuizSession = {
  answers: QuizAnswers;
  savedAt: number;
};

export function saveQuizSession(answers: QuizAnswers): void {
  if (typeof window === "undefined") return;
  try {
    const payload: SavedQuizSession = {
      answers,
      savedAt: Date.now(),
    };
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota errors */
  }
}

export function loadQuizSession(): SavedQuizSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedQuizSession;
  } catch {
    return null;
  }
}

export function clearQuizSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(QUIZ_STORAGE_KEY);
}

export function formatQuizSavedDate(timestamp: number): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}
