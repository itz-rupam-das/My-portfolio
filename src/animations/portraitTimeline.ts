import { PORTRAIT_MOTION } from "@/lib/constants";
import type { GsapTools } from "@/lib/gsap";

type PortraitParallaxOptions = {
  section: HTMLElement;
  portrait: HTMLElement;
};

export function createPortraitParallax(
  { section, portrait }: PortraitParallaxOptions,
  { gsap }: GsapTools,
) {
  const moveX = gsap.quickTo(portrait, "x", {
    duration: PORTRAIT_MOTION.parallaxDuration,
    ease: "power3.out",
  });
  const moveY = gsap.quickTo(portrait, "y", {
    duration: PORTRAIT_MOTION.parallaxDuration,
    ease: "power3.out",
  });

  const onPointerMove = (event: PointerEvent) => {
    const rect = section.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    moveX(x * -PORTRAIT_MOTION.parallaxDistance);
    moveY(y * -PORTRAIT_MOTION.parallaxDistance);
  };

  section.addEventListener("pointermove", onPointerMove, { passive: true });

  return () => {
    section.removeEventListener("pointermove", onPointerMove);
    moveX(0);
    moveY(0);
  };
}
