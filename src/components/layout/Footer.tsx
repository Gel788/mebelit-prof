import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Share2,
  Send,
  ArrowUpRight,
} from "lucide-react";
import { categories } from "@/data/categories";

const footerLinks = {
  company: [
    { label: "О компании", href: "/#about" },
    { label: "Проекты", href: "/#projects" },
    { label: "Услуги", href: "/#services" },
    { label: "Доставка", href: "/#delivery" },
    { label: "Гарантия", href: "/#warranty" },
    { label: "Контакты", href: "/#contacts" },
  ],
};

export function Footer() {
  return (
    <footer id="contacts" className="relative overflow-hidden border-t border-border bg-surface-elevated">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/25 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-64 w-64 rounded-full blur-[100px] bg-accent-500/8 dark:bg-accent-500/12"
        aria-hidden
      />
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent-500 to-accent-700">
                <span className="font-display text-lg font-bold text-white">M</span>
              </div>
              <div>
                <span className="font-display text-base font-semibold text-foreground leading-tight">
                  Мебель для бьюти-бизнеса
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Мебель и оборудование для салонов красоты, студий и клиник.
              Полный цикл — от дизайн-проекта до монтажа.
            </p>
            <div className="flex gap-3">
              {[Share2, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-hover text-muted hover:text-foreground hover:bg-accent-500/10 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Каталог</h4>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/catalog?category=${link.slug}`}
                    className="text-sm text-muted-foreground hover:text-accent-600 dark:hover:text-accent-400 transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Контакты</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+78001234567"
                  className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4 text-accent-500 shrink-0" />
                  8 800 123-45-67
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@mebelitprof.ru"
                  className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 text-accent-500 shrink-0" />
                  info@mebelitprof.ru
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <MapPin className="h-4 w-4 text-accent-500 shrink-0 mt-0.5" />
                Москва, ул. Профессиональная, 15
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Мебель для бьюти-бизнеса. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
