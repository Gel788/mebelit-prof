"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppImage } from "@/components/ui/AppImage";
import { useShop } from "@/store/ShopProvider";

export function FlyToCartLayer() {
  const { flyPayload, clearFlyPayload } = useShop();

  useEffect(() => {
    if (!flyPayload) return;
    const timer = window.setTimeout(clearFlyPayload, 700);
    return () => window.clearTimeout(timer);
  }, [flyPayload, clearFlyPayload]);

  if (!flyPayload) return null;

  const cartEl = document.getElementById("cart-trigger");
  const cartRect = cartEl?.getBoundingClientRect();
  const endX = cartRect ? cartRect.left + cartRect.width / 2 : flyPayload.x;
  const endY = cartRect ? cartRect.top + cartRect.height / 2 : 40;

  return (
    <AnimatePresence>
      {flyPayload && (
        <motion.div
          initial={{
            x: flyPayload.x,
            y: flyPayload.y,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: endX,
            y: endY,
            scale: 0.15,
            opacity: 0.35,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed left-0 top-0 z-[200] h-16 w-16 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border-2 border-brand-500/40 shadow-glow"
        >
          <AppImage
            src={flyPayload.image}
            alt=""
            fill
            className="object-cover"
            sizes="64px"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
