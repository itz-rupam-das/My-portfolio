import type { RefObject } from "react";
import { HeroRevealLine } from "@/components/hero/HeroRevealLine";

type HeroRevealProps = {
  revealRef: RefObject<HTMLDivElement | null>;
};

export function HeroReveal({ revealRef }: HeroRevealProps) {
  return (
    <div
      ref={revealRef}
      className="pointer-events-none absolute inset-x-0 bottom-[11vh] z-30 flex justify-center px-4 opacity-0"
    >
      <h2 className="flex max-w-[18ch] flex-col items-center text-center text-[clamp(2.5rem,6.1vw,6.6rem)] font-black uppercase leading-[0.88] tracking-[-0.03em] text-[#E6E9DD]">
        <HeroRevealLine offsetClass="">
          <span className="font-serif text-[#BFD73A]">Redefining</span> products,
        </HeroRevealLine>
        <HeroRevealLine offsetClass="">
          building for <span className="font-serif text-[#BFD73A]">users</span>,
        </HeroRevealLine>
        <HeroRevealLine offsetClass="">
          shipping ideas into
        </HeroRevealLine>
        <HeroRevealLine offsetClass="">
          real apps. defining a
        </HeroRevealLine>
        <HeroRevealLine offsetClass="">
          <span className="font-serif text-[#BFD73A]">system</span> in code and
        </HeroRevealLine>
        <HeroRevealLine offsetClass="">
          across the product
        </HeroRevealLine>
        <HeroRevealLine offsetClass="">
          stack.
        </HeroRevealLine>
      </h2>
    </div>
  );
}
