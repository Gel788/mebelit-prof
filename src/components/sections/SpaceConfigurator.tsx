"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AppImage } from "@/components/ui/AppImage";
import { Button } from "@/components/ui/Button";
import { SectionAccentLine } from "@/components/ui/ElegantLines";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { EmptyState } from "@/components/ui/EmptyState";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import {
  configuratorSpaces,
  configuratorStyles,
  configuratorPalettes,
  configuratorBudgets,
  roomSlotLayouts,
  getSpaceImage,
  type SpaceId,
  type StyleId,
  type PaletteId,
  type BudgetId,
} from "@/data/configurator";
import {
  quizSteps,
  quizAreas,
  quizPriorities,
  quizTimelines,
  analyzingMessages,
  computeQuizResult,
  emptyQuizAnswers,
  isQuizComplete,
  type QuizAnswers,
  type AreaId,
  type PriorityId,
  type TimelineId,
} from "@/lib/quiz-engine";
import {
  saveQuizSession,
  loadQuizSession,
  clearQuizSession,
  formatQuizSavedDate,
  type SavedQuizSession,
} from "@/lib/quiz-storage";
import type { Product } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  HeartPulse,
  Presentation,
  RotateCcw,
  Sparkles,
  Sparkle,
  UtensilsCrossed,
  Wand2,
  Zap,
  Bookmark,
  PackageSearch,
} from "lucide-react";

type Phase = "intro" | "quiz" | "analyzing" | "result";
type StepId = (typeof quizSteps)[number]["id"];

const spaceIcons: Record<SpaceId, typeof Briefcase> = {
  office: Briefcase,
  beauty: Sparkles,
  reception: Building2,
  conference: Presentation,
  medical: HeartPulse,
  horeca: UtensilsCrossed,
};

const slide = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
};

function QuizProgress({
  stepIndex,
  total,
}: {
  stepIndex: number;
  total: number;
}) {
  const progress = ((stepIndex + 1) / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        <span>
          Шаг {stepIndex + 1} из {total}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-elevated overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

function OptionCard({
  active,
  onClick,
  title,
  hint,
  image,
  icon: Icon,
  badge,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  hint?: string;
  image?: string;
  icon?: typeof Briefcase;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border text-left transition-all duration-300",
        image ? "min-h-[120px]" : "p-4",
        active
          ? "border-brand-500 bg-brand-500/10 shadow-glow ring-2 ring-brand-500/20"
          : "border-border bg-surface-elevated hover:border-brand-500/35 hover:shadow-soft"
      )}
    >
      {image && (
        <>
          <AppImage src={image} alt="" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" sizes="200px" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-background/20" />
        </>
      )}
      <div className={cn("relative z-10", image && "p-4 flex h-full min-h-[120px] flex-col justify-end")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            {Icon && (
              <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl border", active ? "border-brand-500/30 bg-brand-500/15 text-brand-600 dark:text-brand-400" : "border-border bg-surface-card text-muted")}>
                <Icon className="h-4 w-4" />
              </span>
            )}
            <div>
              <p className="font-semibold text-foreground">{title}</p>
              {hint && <p className="text-xs text-muted mt-0.5">{hint}</p>}
            </div>
          </div>
          {active && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">
              <Check className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
        {badge && (
          <span className="mt-2 inline-flex text-[10px] font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            {badge}
          </span>
        )}
      </div>
    </button>
  );
}

function ResultBlueprint({
  space,
  palette,
  picks,
}: {
  space: SpaceId;
  palette: (typeof configuratorPalettes)[number];
  picks: Product[];
}) {
  const slots = roomSlotLayouts[space];

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-3xl border shadow-card"
      style={{ backgroundColor: palette.wall, borderColor: `${palette.accent}44` }}
    >
      <div
        className="absolute inset-0 configurator-grid"
        style={{ "--grid-color": palette.grid } as React.CSSProperties}
      />
      <div
        className="absolute inset-3 sm:inset-4 rounded-2xl overflow-hidden border"
        style={{ backgroundColor: palette.floor, borderColor: `${palette.accent}33` }}
      >
        <AppImage
          src={getSpaceImage(space)}
          alt=""
          fill
          className="object-cover opacity-[0.12]"
          sizes="600px"
        />
        {picks.slice(0, 4).map((product, i) => {
          const slot = slots[i];
          if (!slot) return null;
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="absolute overflow-hidden rounded-xl border bg-surface-card/95 shadow-soft"
              style={{
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                width: `${slot.w}%`,
                height: `${slot.h}%`,
                borderColor: `${palette.accent}55`,
              }}
            >
              <AppImage src={product.image} alt={product.name} fill className="object-cover" sizes="100px" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function SpaceConfigurator() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(emptyQuizAnswers());
  const [analyzeIndex, setAnalyzeIndex] = useState(0);
  const [savedSession, setSavedSession] = useState<SavedQuizSession | null>(null);

  useEffect(() => {
    setSavedSession(loadQuizSession());
  }, []);

  useEffect(() => {
    if (phase === "result" && isQuizComplete(answers)) {
      saveQuizSession(answers);
      setSavedSession(loadQuizSession());
    }
  }, [phase, answers]);

  const currentStep = quizSteps[stepIndex];
  const result = useMemo(
    () => (phase === "result" ? computeQuizResult(answers) : null),
    [phase, answers]
  );

  const paletteMeta =
    configuratorPalettes.find((p) => p.id === answers.palette) ??
    configuratorPalettes[0];

  const setAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const goNext = useCallback(() => {
    if (stepIndex < quizSteps.length - 1) {
      setStepIndex((i) => i + 1);
      return;
    }
    setPhase("analyzing");
    setAnalyzeIndex(0);
  }, [stepIndex]);

  const goBack = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
    else setPhase("intro");
  };

  const canContinue = useMemo(() => {
    if (!currentStep) return false;
    const map: Record<StepId, boolean> = {
      space: Boolean(answers.space),
      area: Boolean(answers.area),
      priority: Boolean(answers.priority),
      style: Boolean(answers.style),
      palette: Boolean(answers.palette),
      budget: Boolean(answers.budget),
      timeline: Boolean(answers.timeline),
    };
    return map[currentStep.id];
  }, [answers, currentStep]);

  useEffect(() => {
    if (phase !== "analyzing") return;

    const msgTimer = window.setInterval(() => {
      setAnalyzeIndex((i) => (i + 1) % analyzingMessages.length);
    }, 650);

    const doneTimer = window.setTimeout(() => {
      setPhase("result");
    }, 2800);

    return () => {
      window.clearInterval(msgTimer);
      window.clearTimeout(doneTimer);
    };
  }, [phase]);

  const restart = () => {
    clearQuizSession();
    setSavedSession(null);
    setAnswers(emptyQuizAnswers());
    setStepIndex(0);
    setPhase("intro");
  };

  const restoreSaved = () => {
    if (!savedSession) return;
    setAnswers(savedSession.answers);
    setPhase("result");
  };

  const openBudgetStep = () => {
    setStepIndex(quizSteps.findIndex((s) => s.id === "budget"));
    setPhase("quiz");
  };

  const renderQuestion = () => {
    if (!currentStep) return null;

    switch (currentStep.id) {
      case "space":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {configuratorSpaces.map((item) => (
              <OptionCard
                key={item.id}
                active={answers.space === item.id}
                onClick={() => {
                  setAnswer("space", item.id);
                  window.setTimeout(goNext, 280);
                }}
                title={item.label}
                hint={item.description}
                image={getSpaceImage(item.id)}
                icon={spaceIcons[item.id]}
              />
            ))}
          </div>
        );
      case "area":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quizAreas.map((item) => (
              <OptionCard
                key={item.id}
                active={answers.area === item.id}
                onClick={() => {
                  setAnswer("area", item.id);
                  window.setTimeout(goNext, 220);
                }}
                title={item.label}
                hint={item.hint}
                badge={item.seats}
              />
            ))}
          </div>
        );
      case "priority":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quizPriorities.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setAnswer("priority", item.id);
                  window.setTimeout(goNext, 220);
                }}
                className={cn(
                  "rounded-2xl border p-5 text-left transition-all duration-300",
                  answers.priority === item.id
                    ? "border-brand-500 bg-brand-500/10 shadow-glow"
                    : "border-border bg-surface-elevated hover:border-brand-500/35"
                )}
              >
                <span className="text-2xl mb-3 block">{item.emoji}</span>
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-sm text-muted mt-1">{item.hint}</p>
              </button>
            ))}
          </div>
        );
      case "style":
        return (
          <div className="grid grid-cols-2 gap-3">
            {configuratorStyles.map((item) => (
              <OptionCard
                key={item.id}
                active={answers.style === item.id}
                onClick={() => {
                  setAnswer("style", item.id as StyleId);
                  window.setTimeout(goNext, 220);
                }}
                title={item.label}
                hint={item.hint}
              />
            ))}
          </div>
        );
      case "palette":
        return (
          <div className="grid grid-cols-2 gap-3">
            {configuratorPalettes.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setAnswer("palette", item.id as PaletteId);
                  window.setTimeout(goNext, 220);
                }}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-all duration-300",
                  answers.palette === item.id
                    ? "border-brand-500 bg-brand-500/10 shadow-glow"
                    : "border-border bg-surface-elevated hover:border-brand-500/35"
                )}
              >
                <div className="flex gap-2 mb-3">
                  <span className="h-8 flex-1 rounded-lg" style={{ backgroundColor: item.wall }} />
                  <span className="h-8 w-8 rounded-lg" style={{ backgroundColor: item.floor }} />
                  <span className="h-8 w-8 rounded-lg" style={{ backgroundColor: item.accent }} />
                </div>
                <p className="font-semibold text-foreground">{item.label}</p>
              </button>
            ))}
          </div>
        );
      case "budget":
        return (
          <div className="space-y-3">
            {configuratorBudgets.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setAnswer("budget", item.id as BudgetId);
                  window.setTimeout(goNext, 220);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all duration-300",
                  answers.budget === item.id
                    ? "border-brand-500 bg-brand-500/10 shadow-glow"
                    : "border-border bg-surface-elevated hover:border-brand-500/35"
                )}
              >
                <span className="font-semibold text-foreground">{item.label}</span>
                {answers.budget === item.id && (
                  <Check className="h-5 w-5 text-brand-500" />
                )}
              </button>
            ))}
          </div>
        );
      case "timeline":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quizTimelines.map((item) => (
              <OptionCard
                key={item.id}
                active={answers.timeline === item.id}
                onClick={() => {
                  setAnswer("timeline", item.id as TimelineId);
                  window.setTimeout(goNext, 280);
                }}
                title={item.label}
                hint={item.hint}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="configurator" className="relative py-16 sm:py-24 lg:py-28 bg-background overflow-hidden">
      <SectionAtmosphere variant="accent" />
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <SectionAccentLine align="center" className="mb-5" />
          <p className="text-brand-600 dark:text-brand-400 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Умный квиз
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-4">
            Подбор пространства{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-700 dark:from-brand-300 dark:to-brand-500">
              за 60 секунд
            </span>
          </h2>
          <p className="text-muted leading-relaxed">
            7 коротких вопросов — и персональная комплектация из реального каталога
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] border border-border bg-surface-card shadow-premium overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" />

            <div className="p-6 sm:p-8 lg:p-10 min-h-[480px] flex flex-col">
              <AnimatePresence mode="wait">
                {phase === "intro" && (
                  <motion.div key="intro" {...slide} className="flex flex-1 flex-col items-center justify-center text-center py-8">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow">
                      <Wand2 className="h-9 w-9 text-white" />
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-3">
                      Mebelit Smart Match
                    </h3>
                    <p className="text-muted max-w-md mb-8 leading-relaxed">
                      Ответьте на несколько вопросов — алгоритм подберёт мебель под ваш
                      бизнес, бюджет и сроки. Без регистрации.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      {["7 вопросов", "60 секунд", "Реальный каталог"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-semibold text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button size="lg" className="gap-2 min-w-[220px]" onClick={() => setPhase("quiz")}>
                      Начать подбор
                      <Zap className="h-4 w-4" />
                    </Button>

                    {savedSession && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 w-full max-w-md rounded-2xl border border-brand-500/25 bg-brand-500/5 p-4 text-left"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-600 dark:text-brand-400">
                            <Bookmark className="h-5 w-5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-foreground">
                              Есть сохранённая подборка
                            </p>
                            <p className="text-xs text-muted mt-1">
                              {formatQuizSavedDate(savedSession.savedAt)}
                            </p>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="mt-3 gap-2"
                              onClick={restoreSaved}
                            >
                              Вернуться к результату
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {phase === "quiz" && currentStep && (
                  <motion.div key={currentStep.id} {...slide} className="flex flex-1 flex-col">
                    <QuizProgress stepIndex={stepIndex} total={quizSteps.length} />
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                      {currentStep.title}
                    </h3>
                    <p className="text-sm text-muted mb-6">
                      Выберите вариант — следующий шаг откроется автоматически
                    </p>
                    <div className="flex-1">{renderQuestion()}</div>
                    <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-border">
                      <Button variant="ghost" onClick={goBack} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Назад
                      </Button>
                      <Button onClick={goNext} disabled={!canContinue} className="gap-2">
                        {stepIndex === quizSteps.length - 1 ? "Получить результат" : "Далее"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {phase === "analyzing" && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-1 flex-col items-center justify-center text-center py-10"
                  >
                    <div className="relative mb-8">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                        className="h-24 w-24 rounded-full border-2 border-brand-500/20 border-t-brand-500"
                      />
                      <Sparkle className="absolute inset-0 m-auto h-8 w-8 text-brand-500" />
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={analyzeIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="text-lg font-semibold text-foreground"
                      >
                        {analyzingMessages[analyzeIndex]}
                      </motion.p>
                    </AnimatePresence>
                    <p className="text-sm text-muted mt-3">Умный алгоритм Mebelit Prof</p>
                  </motion.div>
                )}

                {phase === "result" && result && answers.space && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-4">
                          <Sparkle className="h-3.5 w-3.5" />
                          {result.matchScore}% совпадение
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                          {result.headline}
                        </h3>
                        <p className="text-muted leading-relaxed max-w-2xl">{result.summary}</p>
                      </div>
                      <Button variant="ghost" onClick={restart} className="gap-2 shrink-0">
                        <RotateCcw className="h-4 w-4" />
                        Заново
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-semibold text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <ResultBlueprint
                      space={answers.space}
                      palette={paletteMeta}
                      picks={result.picks}
                    />

                    {result.picks.length === 0 ? (
                      <EmptyState
                        icon={<PackageSearch className="h-8 w-8" />}
                        title="В этом бюджете мало позиций"
                        description="Попробуйте расширить бюджет или выберите другой приоритет — мы подберём больше решений из каталога."
                        actionLabel="Изменить бюджет"
                        onAction={openBudgetStep}
                        secondaryLabel="Весь каталог"
                        secondaryHref={result.catalogHref}
                      />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {result.picks.map((product, i) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            className="rounded-2xl border border-border bg-surface-elevated overflow-hidden"
                          >
                            <Link href={`/product/${product.slug}`} className="block relative aspect-[4/3]">
                              <AppImage src={product.image} alt={product.name} fill className="object-cover" sizes="300px" />
                            </Link>
                            <div className="p-4">
                              <p className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
                                {product.name}
                              </p>
                              <p className="text-lg font-semibold text-foreground mb-3">
                                {formatPrice(product.price)}
                              </p>
                              <AddToCartButton product={product} fullWidth flyAnimation size="sm" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    <div className="rounded-2xl border border-border bg-surface-elevated p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                          Оценка комплекта
                        </p>
                        <p className="text-2xl font-semibold text-foreground">
                          {formatPrice(result.kitEstimate)}
                        </p>
                        <p className="text-sm text-muted mt-1">
                          {result.products.length} решений в категории
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href={result.catalogHref}>
                          <Button size="lg" className="w-full sm:w-auto gap-2">
                            Открыть подборку
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href="/#contacts">
                          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                            Связаться с менеджером
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
