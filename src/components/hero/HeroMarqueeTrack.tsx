import { HERO } from "@/lib/constants";

export function HeroMarqueeTrack() {
  return (
    <div className="flex flex-none whitespace-nowrap" aria-hidden="true">
      {Array.from({ length: HERO.marqueeItems }, (_, index) => (
        <span className="hero-marquee-item" key={`${HERO.marqueeText}-${index}`}>
          {HERO.marqueeText}&nbsp;
        </span>
      ))}
    </div>
  );
}
