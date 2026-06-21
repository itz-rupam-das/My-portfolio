"use client";

import { useRef } from "react";
import {
  animateOrganicBackground,
  ORGANIC_BLOBS,
} from "@/animations/scrollEffects";
import { useGsapContext } from "@/hooks/useGsapContext";

export function OrganicSvgBackground() {
  const rootRef = useRef<SVGSVGElement>(null);
  useGsapContext(rootRef, animateOrganicBackground);

  return (
    <svg
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1920 1080"
    >
      <g
        className="organic-svg-g"
        fill="none"
        stroke="#d8d8d8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      >
        {ORGANIC_BLOBS.map(({ d, transform }) => (
          <g data-blob-path key={transform} transform={transform}>
            <g data-blob-drift>
              <path d={d} />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
