"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppImage } from "@/components/ui/AppImage";
import { ProductLightbox } from "@/components/product/ProductLightbox";
import { badgeColors, badgeLabels, type ProductBadge } from "@/data/products";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Expand, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  name: string;
  badge?: ProductBadge;
}

export function ProductGallery({ images, name, badge }: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : ["/images/product-base.svg"];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeImage = galleryImages[selectedIndex] ?? galleryImages[0];

  const goTo = useCallback(
    (next: number) => {
      setSelectedIndex((next + galleryImages.length) % galleryImages.length);
    },
    [galleryImages.length]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x, y });
  };

  return (
    <>
      <div className="space-y-4 lg:sticky lg:top-[5.25rem] lg:self-start">
        <div
          ref={containerRef}
          className="group relative aspect-[4/5] sm:aspect-square overflow-hidden rounded-3xl bg-surface-card border border-border shadow-card"
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className={cn(
                "absolute inset-0 transition-transform duration-500 ease-out",
                isZooming ? "scale-[1.65] cursor-zoom-in" : "scale-100"
              )}
              style={{ transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }}
            >
              <AppImage
                src={activeImage}
                alt={name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {badge && (
            <span
              className={cn(
                "absolute top-4 left-4 px-3 py-1.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider z-10 shadow-badge",
                badgeColors[badge]
              )}
            >
              {badgeLabels[badge]}
            </span>
          )}

          <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-card/90 border border-border text-foreground backdrop-blur-sm hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all"
              aria-label="Полноэкранный просмотр"
            >
              <Expand className="h-4 w-4" />
            </button>
          </div>

          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(selectedIndex - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface-card/90 border border-border text-foreground opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:border-brand-500/40 transition-all"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(selectedIndex + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-surface-card/90 border border-border text-foreground opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:border-brand-500/40 transition-all"
                aria-label="Следующее фото"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-surface-card/90 border border-border px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm hover:border-brand-500/40 transition-all sm:hidden"
          >
            <ZoomIn className="h-3.5 w-3.5" />
            Увеличить
          </button>

          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 right-4 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          )}
        </div>

        {galleryImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {galleryImages.map((img, index) => (
              <button
                key={`${img}-${index}`}
                type="button"
                aria-label={`Фото ${index + 1}`}
                aria-current={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition-all duration-300",
                  selectedIndex === index
                    ? "border-brand-500 ring-2 ring-brand-500/30 shadow-glow scale-[1.02]"
                    : "border-border hover:border-brand-500/35 opacity-80 hover:opacity-100"
                )}
              >
                <AppImage
                  src={img}
                  alt={`${name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="hidden sm:flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface-elevated/50 py-3 text-sm font-medium text-muted hover:text-foreground hover:border-brand-500/35 transition-all"
        >
          <Expand className="h-4 w-4" />
          Открыть детальный просмотр
        </button>
      </div>

      <ProductLightbox
        images={galleryImages}
        name={name}
        initialIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setSelectedIndex}
      />
    </>
  );
}
