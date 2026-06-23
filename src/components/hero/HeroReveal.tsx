import type { RefObject } from "react";
import { HeroRevealLine } from "@/components/hero/HeroRevealLine";

type HeroRevealProps = {
  revealRef: RefObject<HTMLDivElement | null>;
};

export function HeroReveal({ revealRef }: HeroRevealProps) {
  return (
    <div
      ref={revealRef}
      className="pointer-events-none absolute inset-x-0 bottom-[-4vh] z-30 flex justify-center px-4 opacity-0"
    >
      <h2 className="flex max-w-375 flex-col items-center text-center text-[clamp(3.6rem,8.5vw,9.5rem)] font-black uppercase leading-[0.88] tracking-normal text-[#E6E9DD]">
        <HeroRevealLine offsetClass="-translate-x-[3vw]">
          <span className="font-serif text-[#BFD73A]">Redefining</span>{" "}
          interfaces,
        </HeroRevealLine>
        <HeroRevealLine offsetClass="translate-x-[4vw]">
          building for <span className="font-serif text-[#BFD73A]">impact</span>,
        </HeroRevealLine>
        <HeroRevealLine offsetClass="-translate-x-[1vw]">
          shipping it all in <span className="font-serif text-[#BFD73A]">code.</span>
        </HeroRevealLine>
      </h2>
    </div>
  );
}
