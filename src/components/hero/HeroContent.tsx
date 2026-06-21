import { OrganicSvgBackground } from "@/components/background/OrganicSvgBackground";
import { RainbowBackground } from "@/components/background/RainbowBackground";
import { HeroHeader } from "@/components/hero/HeroHeader";
import { HeroMarquee } from "@/components/hero/HeroMarquee";
import { HeroPortrait } from "@/components/hero/HeroPortrait";
import { HeroReveal } from "@/components/hero/HeroReveal";
import { HeroSignature } from "@/components/hero/HeroSignature";
import { HERO } from "@/lib/constants";
import type { HeroRefs } from "@/types/hero";

type HeroContentProps = {
  refs: HeroRefs;
};

export function HeroContent({ refs }: HeroContentProps) {
  return (
    <main className="overflow-hidden bg-[#1F221A] text-neutral-950">
      <section
        ref={refs.section}
        className={`relative bg-[#1F221A] ${HERO.scrollHeightClass}`}
      >
        <div
          ref={refs.sticky}
          className="relative h-screen min-h-170 w-full bg-[#f5f5f5]"
        >
          <OrganicSvgBackground />
          <div
            ref={refs.textLayer}
            className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0"
          >
            <h1 className="whitespace-nowrap pt-20 text-[18vw] font-bold leading-[0.85] tracking-tighter text-[#D1F82D] sm:text-[15vw]">
              FULL STACK DEVELOPER • CREATIVE ENGINEER • FULL STACK DEVELOPER
            </h1>
          </div>

          <HeroSignature
            pathRef={refs.signaturePath}
            wrapperRef={refs.signature}
          />
          <HeroHeader nameRef={refs.headerName} socialRef={refs.headerSocial} />
          <HeroReveal revealRef={refs.reveal} />

          <div
            ref={refs.content}
            className="relative z-20 h-full w-full origin-center overflow-hidden px-5 will-change-transform"
          >
            <div
              ref={refs.cardBackground}
              className="absolute inset-0 -z-20 bg-[#f5f5f5]"
            />
            <RainbowBackground />
            <OrganicSvgBackground />
            <div ref={refs.marquee}>
              <HeroMarquee />
            </div>
            <HeroPortrait
              portraitRef={refs.portrait}
              shellRef={refs.portraitShell}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
