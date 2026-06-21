import {
  HERO,
  HERO_COLORS,
  HERO_MOTION,
  HERO_TIMING,
  PORTRAIT_MOTION,
} from "@/lib/constants";
import type { GsapTools } from "@/lib/gsap";
import type { HeroElements } from "@/types/hero";

const HIDDEN_CLIP = "inset(0 100% 0 0)";
const VISIBLE_CLIP = "inset(0 0% 0 0)";
const EXIT_CLIP = "inset(0 0 0 100%)";

function initializeHero(elements: HeroElements, { gsap }: GsapTools) {
  const pathLength = elements.signaturePath.getTotalLength() ||
    HERO_MOTION.signatureDashLength;
  const revealCopies = elements.reveal.querySelectorAll<HTMLElement>("[data-post-copy]");
  const revealBlocks = elements.reveal.querySelectorAll<HTMLElement>("[data-post-block]");

  elements.section.style.setProperty("--hero-scroll", "0");
  elements.section.style.setProperty("--portrait-grade", "0");
  gsap.set(elements.signaturePath, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });
  gsap.set(elements.reveal, { opacity: 0, y: HERO_MOTION.revealStartY });
  gsap.set(revealCopies, { clipPath: HIDDEN_CLIP });
  gsap.set(revealBlocks, { clipPath: HIDDEN_CLIP });

  return { revealCopies: Array.from(revealCopies), revealBlocks: Array.from(revealBlocks) };
}

export function createHeroTimeline(elements: HeroElements, tools: GsapTools) {
  const { gsap } = tools;
  const { revealCopies, revealBlocks } = initializeHero(elements, tools);
  const cardDecor = elements.content.querySelectorAll(".rainbow-bg, .organic-svg-g");
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: elements.section,
      start: "top top",
      end: `+=${HERO.scrollDistance}`,
      pin: elements.sticky,
      scrub: 1,
      onUpdate: ({ progress }) => {
        elements.section.style.setProperty("--hero-scroll", `${progress}`);
      },
    },
  });

  timeline.to(elements.content, {
    scale: HERO_MOTION.cardScale,
    borderRadius: HERO_MOTION.cardRadius,
    duration: HERO_TIMING.shrinkDuration,
    ease: "power2.inOut",
  }, 0);
  timeline.to(elements.section, {
    "--portrait-grade": 1,
    duration: HERO_TIMING.shrinkDuration,
    ease: "none",
  }, 0);
  timeline.to(elements.portraitShell, {
    scale: PORTRAIT_MOTION.shellScale,
    y: PORTRAIT_MOTION.shellTranslateY,
    duration: HERO_TIMING.shrinkDuration,
    ease: "power2.inOut",
  }, 0);
  timeline.to(elements.sticky, {
    backgroundColor: HERO_COLORS.page,
    duration: HERO_TIMING.shrinkDuration,
  }, 0);
  timeline.to(".organic-svg-g", {
    stroke: HERO_COLORS.organicStroke,
    duration: HERO_TIMING.shrinkDuration,
  }, 0);
  timeline.to(cardDecor, {
    opacity: 0,
    duration: HERO_TIMING.cardDecorFadeDuration,
    ease: "none",
  }, 0);
  timeline.to(elements.cardBackground, {
    backgroundColor: HERO_COLORS.card,
    duration: HERO_TIMING.shrinkDuration,
    ease: "none",
  }, 0);
  timeline.to(elements.marquee, {
    opacity: 0,
    duration: HERO_TIMING.marqueeFadeDuration,
    ease: "none",
  }, 0);
  timeline.to([elements.headerName, elements.headerSocial], {
    color: "#ffffff",
    duration: HERO_TIMING.headerDuration,
  }, HERO_TIMING.headerAt);
  timeline.fromTo(elements.textLayer, {
    opacity: 0,
    x: HERO_MOTION.typographyStartX,
  }, {
    opacity: 1,
    x: HERO_MOTION.typographyEndX,
    duration: HERO_TIMING.typographyDuration,
    ease: "none",
  }, HERO_TIMING.typographyAt);
  timeline.to(elements.signature, {
    opacity: 1,
    duration: HERO_TIMING.signatureFadeDuration,
  }, HERO_TIMING.signatureAt);
  timeline.to(elements.signature, {
    scale: HERO_MOTION.signatureScale,
    duration: HERO_TIMING.signatureScaleDuration,
    ease: "power2.inOut",
  }, 0);
  timeline.to(elements.signaturePath, {
    strokeDashoffset: 0,
    duration: HERO_TIMING.signatureDrawDuration,
    ease: "power3.inOut",
  }, HERO_TIMING.signatureAt);
  timeline.set(elements.signaturePath, {
    strokeDasharray: "none",
    strokeDashoffset: 0,
  }, HERO_TIMING.signatureAt + HERO_TIMING.signatureDrawDuration);
  timeline.to([elements.content, elements.signature, elements.textLayer], {
    y: HERO_MOTION.exitY,
    duration: HERO_TIMING.exitDuration,
    ease: "power2.inOut",
  }, HERO_TIMING.exitAt);
  timeline.to(elements.reveal, {
    opacity: 1,
    y: HERO_MOTION.revealEnterY,
    duration: HERO_TIMING.revealDuration,
    ease: "power2.out",
  }, HERO_TIMING.revealAt);

  revealCopies.forEach((copy, index) => {
    const block = revealBlocks[index];
    if (!block) return;
    const at = HERO_TIMING.lineRevealAt + index * HERO_TIMING.lineStagger;
    timeline.to(block, {
      clipPath: VISIBLE_CLIP,
      duration: HERO_TIMING.lineCoverDuration,
      ease: "power2.inOut",
    }, at);
    timeline.set(copy, {
      clipPath: VISIBLE_CLIP,
    }, at + HERO_TIMING.lineCopyRevealOffset);
    timeline.to(block, {
      clipPath: EXIT_CLIP,
      duration: HERO_TIMING.lineUncoverDuration,
      ease: "power2.inOut",
    }, at + HERO_TIMING.lineCoverDuration);
  });

  timeline.to(elements.reveal, {
    y: HERO_MOTION.revealExitY,
    duration: HERO_TIMING.revealTravelDuration,
    ease: "none",
  }, HERO_TIMING.revealTravelAt);

  return timeline;
}
