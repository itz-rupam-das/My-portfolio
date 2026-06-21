"use client";

import { HeroContent } from "@/components/hero/HeroContent";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

export function Hero() {
  const refs = useHeroAnimation();
  return <HeroContent refs={refs} />;
}
