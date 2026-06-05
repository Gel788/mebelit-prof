"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollProgress, GrainOverlay } from "@/components/ui/ScrollProgress";
import { ConsultButton } from "@/components/ui/ConsultButton";
import { CommandSearch, useCommandSearch } from "@/components/ui/CommandSearch";
import { QuickViewModal } from "@/components/ui/QuickViewModal";
import { FlyToCartLayer } from "@/components/ui/FlyToCartLayer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { createContext, useContext, type ReactNode } from "react";

type SearchContextValue = {
  openSearch: () => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSiteSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSiteSearch must be used within SiteEnhancements");
  return ctx;
}

function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function SiteEnhancements({ children }: { children: ReactNode }) {
  const { open, openSearch, closeSearch } = useCommandSearch();

  return (
    <SearchContext.Provider value={{ openSearch }}>
      {children}
      <ScrollToTop />
      <ScrollProgress />
      <GrainOverlay />
      <MobileBottomNav />
      <ConsultButton />
      <CommandSearch open={open} onClose={closeSearch} />
      <QuickViewModal />
      <FlyToCartLayer />
    </SearchContext.Provider>
  );
}
