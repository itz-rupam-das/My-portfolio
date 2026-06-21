import type { RefObject } from "react";
import { HERO } from "@/lib/constants";
import { PortraitCanvas } from "@/components/hero/PortraitCanvas";

type HeroPortraitProps = {
  portraitRef: RefObject<HTMLDivElement | null>;
  shellRef: RefObject<HTMLDivElement | null>;
};

export function HeroPortrait({ portraitRef, shellRef }: HeroPortraitProps) {
  return (
    <div
      ref={shellRef}
      className="absolute bottom-0 left-1/2 z-30 h-[98vh] min-h-176 w-[min(114vw,1040px)] -translate-x-1/2 origin-bottom cursor-pointer will-change-transform"
    >
      <div
        ref={portraitRef}
        className="relative h-full w-full origin-bottom will-change-transform"
      >
        <PortraitCanvas colorSrc={HERO.colorPortrait} hoverSrc={HERO.hoverPortrait} />
      </div>
    </div>
  );
}
