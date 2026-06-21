import type { RefObject } from "react";
import { SIGNATURE_PATH } from "@/lib/signaturePath";

type HeroSignatureProps = {
  pathRef: RefObject<SVGPathElement | null>;
  wrapperRef: RefObject<HTMLDivElement | null>;
};

export function HeroSignature({ pathRef, wrapperRef }: HeroSignatureProps) {
  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute left-1/2 top-1/2 z-40 w-[70vw] max-w-220 -translate-x-1/2 -translate-y-1/2 opacity-0"
    >
      <svg
        className="overflow-visible drop-shadow-2xl"
        fill="none"
        stroke="#D1F82D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
        viewBox="0 0 357 166"
      >
        <path ref={pathRef} d={SIGNATURE_PATH} />
      </svg>
    </div>
  );
}
