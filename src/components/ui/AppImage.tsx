"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

const PLACEHOLDER = "/images/product-base.svg";

function isLocalStatic(src: ImageProps["src"]): boolean {
  return typeof src === "string" && src.startsWith("/");
}

export function AppImage({ src, alt, onError, unoptimized, ...props }: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const useUnoptimized =
    unoptimized ?? (isLocalStatic(imgSrc) || imgSrc === PLACEHOLDER);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      unoptimized={useUnoptimized}
      onError={(event) => {
        if (imgSrc !== PLACEHOLDER) {
          setImgSrc(PLACEHOLDER);
        }
        onError?.(event);
      }}
    />
  );
}
