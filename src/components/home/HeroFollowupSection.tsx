"use client";

import { useRef } from "react";
import { HeroRevealLine } from "@/components/hero/HeroRevealLine";
import { useGsapContext } from "@/hooks/useGsapContext";

const HIDDEN_CLIP = "inset(0 100% 0 0)";
const VISIBLE_CLIP = "inset(0 0% 0 0)";
const EXIT_CLIP = "inset(0 0 0 100%)";
const CHECKER_TILES = Array.from({ length: 100 }, (_, index) => index);

export function HeroFollowupSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGsapContext(sectionRef, (section, { gsap }) => {
    const revealCopies = section.querySelectorAll<HTMLElement>("[data-post-copy]");
    const revealBlocks = section.querySelectorAll<HTMLElement>("[data-post-block]");

    gsap.set(revealCopies, { clipPath: HIDDEN_CLIP });
    gsap.set(revealBlocks, { clipPath: HIDDEN_CLIP });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 72%",
        end: "+=460",
        scrub: 1,
      },
    });

    revealCopies.forEach((copy, index) => {
      const block = revealBlocks[index];
      if (!block) return;

      const at = index * 0.24;
      timeline.to(block, {
        clipPath: VISIBLE_CLIP,
        duration: 0.26,
        ease: "power2.inOut",
      }, at);
      timeline.set(copy, {
        clipPath: VISIBLE_CLIP,
      }, at + 0.18);
      timeline.to(block, {
        clipPath: EXIT_CLIP,
        duration: 0.3,
        ease: "power2.inOut",
      }, at + 0.28);
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f2eee3]"
    >
      <div className="w-full overflow-hidden bg-[#f2eee3]">
        <div className="grid min-h-[78vh] items-end gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[52vh] overflow-hidden">
            <img
              src="/img1.jpeg"
              alt="Rupam Das working as a full stack developer"
              className="h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#181c15]/52 via-transparent to-transparent" />
          </div>

          <div
            className="relative flex h-full flex-col justify-between bg-[#f2eee3] p-8 text-[#262b20] sm:p-10 lg:p-12"
            style={{
              backgroundImage:
                "radial-gradient(circle at top right, rgba(189, 202, 92, 0.16), transparent 24%), linear-gradient(rgba(114, 118, 96, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(114, 118, 96, 0.15) 1px, transparent 1px), linear-gradient(135deg, rgba(189, 202, 92, 0.09), rgba(242, 238, 227, 0) 42%)",
              backgroundPosition: "top right, 0 0, 0 0, center",
              backgroundSize: "auto, 72px 72px, 72px 72px, auto",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 grid grid-cols-10 grid-rows-10"
            >
              {CHECKER_TILES.map((tile) => (
                <span className="card-checker-tile" key={tile} />
              ))}
            </div>

            <div className="relative z-10 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6d7438]">
                Full Stack Developer
              </p>
              <h2 className="flex w-full max-w-[13ch] flex-col items-start text-[clamp(2.5rem,4.7vw,4.9rem)] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#22281f]">
                <HeroRevealLine offsetClass="" blockClass="bg-[#22281f]">
                  building <span className="text-[#4f5f2b]">polished</span>
                </HeroRevealLine>
                <HeroRevealLine offsetClass="" blockClass="bg-[#22281f]">
                  <span className="text-[#22281f]">products</span>{" "}
                  <span className="text-[#7b8448]">from</span>
                </HeroRevealLine>
                <HeroRevealLine offsetClass="" blockClass="bg-[#22281f]">
                  <span className="text-[#314336]">backend</span>{" "}
                  <span className="text-[#8f973d]">to</span>
                </HeroRevealLine>
                <HeroRevealLine offsetClass="" blockClass="bg-[#22281f]">
                  <span className="text-[#51632d]">frontend.</span>
                </HeroRevealLine>
              </h2>
              <p className="max-w-[36ch] text-base leading-7 text-[#4f5448] sm:text-lg">
                I design scalable APIs, build responsive interfaces, and connect the
                full product flow so ideas move cleanly from concept to production.
              </p>
            </div>

            <div className="relative z-10 mt-10 flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-[#c8ef2f]" />
              <p className="text-sm uppercase tracking-[0.28em] text-[#686d60]">
                Shipping end-to-end experiences with clean code
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
