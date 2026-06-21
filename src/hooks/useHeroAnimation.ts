"use client";

import { useRef } from "react";
import { createHeroTimeline } from "@/animations/heroTimeline";
import { createPortraitParallax } from "@/animations/portraitTimeline";
import type { HeroElements, HeroRefs } from "@/types/hero";
import { useGsapContext } from "@/hooks/useGsapContext";

function resolveElements(refs: HeroRefs): HeroElements | null {
  const entries = Object.entries(refs);
  if (entries.some(([, ref]) => !ref.current)) {
    return null;
  }

  return Object.fromEntries(
    entries.map(([key, ref]) => [key, ref.current]),
  ) as HeroElements;
}

export function useHeroAnimation(): HeroRefs {
  const refs: HeroRefs = {
    section: useRef<HTMLElement>(null),
    sticky: useRef<HTMLDivElement>(null),
    content: useRef<HTMLDivElement>(null),
    portraitShell: useRef<HTMLDivElement>(null),
    portrait: useRef<HTMLDivElement>(null),
    textLayer: useRef<HTMLDivElement>(null),
    marquee: useRef<HTMLDivElement>(null),
    signature: useRef<HTMLDivElement>(null),
    signaturePath: useRef<SVGPathElement>(null),
    reveal: useRef<HTMLDivElement>(null),
    headerName: useRef<HTMLDivElement>(null),
    headerSocial: useRef<HTMLDivElement>(null),
    cardBackground: useRef<HTMLDivElement>(null),
  };

  useGsapContext(refs.section, (_section, tools) => {
    const elements = resolveElements(refs);
    if (!elements) return;

    const timeline = createHeroTimeline(elements, tools);
    const removeParallax = createPortraitParallax({
      section: elements.section,
      portrait: elements.portrait,
    }, tools);

    return () => {
      removeParallax();
      timeline.kill();
      elements.section.style.removeProperty("--hero-scroll");
      elements.section.style.removeProperty("--portrait-grade");
      tools.ScrollTrigger.refresh();
    };
  });

  return refs;
}
