"use client";

const items = [
  "3D-проект бесплатно",
  "Доставка по всей России",
  "Монтаж под ключ",
  "Гарантия до 10 лет",
  "2000+ проектов",
  "Ответ за 30 минут",
];

export function Marquee() {
  const track = [...items, ...items];

  return (
    <section
      className="relative overflow-hidden bg-[var(--surface-dark)] py-4"
      aria-hidden
    >
      <div className="flex w-max animate-marquee">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-6 px-8 text-sm font-semibold text-white/70 whitespace-nowrap"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
