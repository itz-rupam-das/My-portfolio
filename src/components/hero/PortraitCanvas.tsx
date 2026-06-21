"use client";

import { useRef } from "react";
import { useBlobReveal } from "@/hooks/useBlobReveal";

type PortraitCanvasProps = {
  colorSrc: string;
  hoverSrc: string;
};

export function PortraitCanvas({ colorSrc, hoverSrc }: PortraitCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  useBlobReveal(hostRef, { colorSrc, hoverSrc });

  return (
    <div
      ref={hostRef}
      aria-label="Portrait"
      className="h-full w-full [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
      role="img"
    />
  );
}
