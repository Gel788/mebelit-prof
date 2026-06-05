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
  title: "Мебель и оборудование для бьюти-бизнеса",
  description:
    "Профессиональная мебель и оборудование для салонов красоты, студий и клиник. Доставка, монтаж, дизайн-проектирование.",
  keywords: [
    "мебель для салона красоты",
    "оборудование для beauty-салона",
    "мебель для клиники",
    "дизайн салона красоты",
    "бьюти бизнес",
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
              <main className="relative z-[1] flex-1 pt-[4.25rem] pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] lg:pb-0">
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
