import type { RefObject } from "react";
import { SITE } from "@/lib/constants";
import { SocialLinks } from "@/components/social/SocialLinks";
import type { CssVariableStyle } from "@/types/global";

type HeroHeaderProps = {
  nameRef: RefObject<HTMLDivElement | null>;
  socialRef: RefObject<HTMLDivElement | null>;
};

export function HeroHeader({ nameRef, socialRef }: HeroHeaderProps) {
  return (
    <>
      <div
        ref={nameRef}
        className="permanent-marker-regular fixed left-5 top-5 z-[1000] text-4xl text-neutral-900 transition-colors sm:text-5xl"
      >
        <span className="hero-name" aria-label={SITE.name}>
          {Array.from(SITE.name).map((character, index) => {
            const style: CssVariableStyle = { "--char-index": index };
            return (
              <span
                aria-hidden="true"
                className={`hero-name-char${character === " " ? " hero-name-space" : ""}`}
                key={`${character}-${index}`}
                style={style}
              >
                {character === " " ? "\u00A0" : character}
              </span>
            );
          })}
        </span>
      </div>
      <div
        ref={socialRef}
        className="fixed right-5 top-5 z-[1000] text-neutral-900 transition-colors sm:right-8 sm:top-8"
      >
        <SocialLinks />
      </div>
    </>
  );
}
