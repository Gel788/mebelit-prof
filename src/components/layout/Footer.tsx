import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Share2,
  Send,
  ArrowUpRight,
} from "lucide-react";

const footerLinks = {
  catalog: [
    { label: "Офисная мебель", href: "/catalog?category=office" },
    { label: "Салоны красоты", href: "/catalog?category=beauty" },
    { label: "Ресепшн", href: "/catalog?category=reception" },
    { label: "HoReCa", href: "/catalog?category=horeca" },
  ],
  company: [
    { label: "О компании", href: "/#about" },
    { label: "Проекты", href: "/#projects" },
    { label: "Доставка", href: "/#delivery" },
    { label: "Гарантия", href: "/#warranty" },
    { label: "Контакты", href: "/#contacts" },
  ],
};

export function Footer() {
  return (
    <footer id="contacts" className="border-t border-border bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600">
                <span className="font-display text-lg font-bold text-white">M</span>
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-foreground">
                  Mebelit
                </span>
                <span className="ml-1 text-brand-600 dark:text-brand-400 font-display text-xl font-semibold">
                  Prof
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Профессиональное оборудование и мебель для офисов, салонов красоты,
              медицинских кабинетов и HoReCa. Полный цикл — от проекта до монтажа.
            </p>
            <div className="flex gap-3">
              {[Share2, Send].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-hover text-muted hover:text-foreground hover:bg-brand-500/10 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Каталог</h4>
            <ul className="space-y-3">
              {footerLinks.catalog.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
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
                    className="text-sm text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
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
                  <Phone className="h-4 w-4 text-brand-500 shrink-0" />
                  8 800 123-45-67
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@mebelitprof.ru"
                  className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 text-brand-500 shrink-0" />
                  info@mebelitprof.ru
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted">
                <MapPin className="h-4 w-4 text-brand-500 shrink-0 mt-0.5" />
                Москва, ул. Профессиональная, 15
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Mebelit Prof. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-muted transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-muted transition-colors">
              Оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
