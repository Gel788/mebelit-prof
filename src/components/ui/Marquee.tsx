"use client";

const items = [
  "3D-проект бесплатно",
  "Доставка по всей России",
  "Монтаж под ключ",
  "Гарантия до 10 лет",
  "2000+ реализованных проектов",
  "Ответ менеджера за 30 минут",
  "Профессиональная мебель",
  "Mebelit Prof",
];

export function Marquee() {
  const track = [...items, ...items];

  return (
    <section
      className="relative overflow-hidden border-y border-border bg-surface-elevated/60 py-4"
      aria-hidden
    >
      <div className="absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-4 px-6 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground whitespace-nowrap"
          >
            <span className="h-1 w-1 rotate-45 border border-brand-500/40 bg-brand-500/10" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
