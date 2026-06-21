"use client";

import { type RefObject, useEffect } from "react";
import { createBlobReveal } from "@/animations/blobReveal";

type BlobRevealSources = {
  colorSrc: string;
  hoverSrc: string;
};

export function useBlobReveal(
  hostRef: RefObject<HTMLDivElement | null>,
  sources: BlobRevealSources,
) {
  const { colorSrc, hoverSrc } = sources;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    return createBlobReveal(host, { colorSrc, hoverSrc });
  }, [colorSrc, hostRef, hoverSrc]);
}
