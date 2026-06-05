import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { ShopProvider } from "@/store/ShopProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SiteEnhancements } from "@/components/layout/SiteEnhancements";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mebelit Prof — Профессиональная мебель и оборудование",
  description:
    "Премиальная мебель и оборудование для офисов, салонов красоты, медицинских кабинетов и HoReCa. Доставка, монтаж, 3D-проектирование.",
  keywords: [
    "офисная мебель",
    "мебель для салона красоты",
    "оборудование для офиса",
    "профессиональная мебель",
    "Mebelit Prof",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <ShopProvider>
            <SiteEnhancements>
              <Header />
              <main className="flex-1 pt-[4.25rem] pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
                {children}
              </main>
              <Footer />
              <CartDrawer />
            </SiteEnhancements>
          </ShopProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
