"use client";

import { HeroHeader } from "@/components/hero/HeroHeader";
import { HeroContent } from "@/components/hero/HeroContent";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

export function Hero() {
  const refs = useHeroAnimation();
  return (
    <>
      <HeroHeader nameRef={refs.headerName} socialRef={refs.headerSocial} />
      <HeroContent refs={refs} />
    </>
  );
}
