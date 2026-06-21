"use client";

import { useEffect, useRef } from "react";
import { HeroMarquee } from "@/components/HeroMarquee";
import { OrganicSvgBackground } from "@/components/OrganicSvgBackground";
import { PortraitReveal } from "@/components/PortraitReveal";
import { RainbowBackground } from "@/components/RainbowBackground";
import { SocialLinks } from "@/components/SocialLinks";
import { getGsap } from "@/lib/gsap";

const HERO_NAME = "RUPAM DAS";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portraitShellRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgMarqueeRef = useRef<HTMLDivElement>(null);
  const signatureWrapperRef = useRef<HTMLDivElement>(null);
  const signaturePathRef = useRef<SVGPathElement>(null);
  const postTextRef = useRef<HTMLDivElement>(null);
  const headerTextRef1 = useRef<HTMLDivElement>(null);
  const headerTextRef2 = useRef<HTMLDivElement>(null);
  const baseBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const content = contentRef.current;
    const portraitShell = portraitShellRef.current;
    const portrait = portraitRef.current;
    const textLayer = textRef.current;
    const bgMarquee = bgMarqueeRef.current;
    const sigWrapper = signatureWrapperRef.current;
    const sigPath = signaturePathRef.current;
    const postText = postTextRef.current;
    const baseBg = baseBgRef.current;

    if (!section || !sticky || !content || !portraitShell || !portrait || !textLayer || !bgMarquee || !sigWrapper || !sigPath || !postText || !baseBg) {
      return;
    }

    const { gsap, ScrollTrigger } = getGsap();
    section.style.setProperty("--hero-scroll", "0");

    // 3D Mouse Tracking for portrait (subtle)
    const moveX = gsap.quickTo(portrait, "x", {
      duration: 0.65,
      ease: "power3.out",
    });
    const moveY = gsap.quickTo(portrait, "y", {
      duration: 0.65,
      ease: "power3.out",
    });

    const onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;

      moveX(nx * -15);
      moveY(ny * -15);
    };

    section.addEventListener("pointermove", onPointerMove, { passive: true });

    // Initialize signature path
    const pathLength = sigPath.getTotalLength() || 1000;
    gsap.set(sigPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });
    gsap.set(postText, { opacity: 0, y: "34vh" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=3000",
        pin: sticky,
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          section.style.setProperty("--hero-scroll", `${self.progress}`);
        },
      }
    });

    // Whole page shrinks into a much smaller frame
    tl.to(content, {
      scale: 0.42,
      borderRadius: "18px",
      filter: "grayscale(1)",
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // Keep the portrait contained as the card shrinks so the head does not clip.
    tl.to(portraitShell, {
      scale: 1.56,
      y: "35vh",
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    // Background color transition to dark olive on the sticky container
    tl.to(sticky, { backgroundColor: "#182014", duration: 1 }, 0);

    // Transition background SVG blobs to a subtle neon green
    tl.to(".organic-svg-g", { stroke: "rgba(209, 248, 45, 0.15)", duration: 1 }, 0);

    // Keep part of the light card visible instead of fading it out completely.
    tl.to(baseBg, { opacity: 0.28, duration: 1 }, 0);

    // The always-running background marquee belongs only to the initial hero state.
    tl.to(bgMarquee, { opacity: 0, duration: 0.7, ease: "none" }, 0);

    // Header texts transition to white to match the new dark background
    if (headerTextRef1.current && headerTextRef2.current) {
      tl.to([headerTextRef1.current, headerTextRef2.current], {
        color: "#ffffff",
        duration: 0.5
      }, 0.2);
    }

    // Typography reveals behind portrait and keeps sliding horizontally.
    tl.fromTo(textLayer, {
      opacity: 0,
      x: "15vw"
    }, {
      opacity: 1,
      x: "-145vw",
      duration: 2.0,
      ease: "none"
    }, 0.2);

    // Signature wrapper fades in, then path draws
    tl.to(sigWrapper, {
      opacity: 1,
      duration: 0.1
    }, 0.5);

    tl.to(sigWrapper, {
      scale: 0.78,
      duration: 1,
      ease: "power2.inOut"
    }, 0);

    tl.to(sigPath, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power3.inOut"
    }, 0.5);

    // Exit as soon as the signature finishes drawing.
    tl.to([content, sigWrapper, textLayer], {
      y: "-100vh",
      duration: 0.8,
      ease: "power2.inOut"
    }, 1.12);

    // Bring the editorial statement in as soon as the card creates enough room.
    tl.to(postText, {
      opacity: 1,
      y: "-2vh",
      duration: 0.52,
      ease: "power2.out"
    }, 1.48);

    tl.to(postText, {
      y: "-22vh",
      duration: 1.05,
      ease: "none"
    }, 1.78);

    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      moveX(0);
      moveY(0);
      tl.kill();
      section.style.removeProperty("--hero-scroll");
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <main className="bg-[#1F221A] text-neutral-950 overflow-hidden">
      <section
        ref={sectionRef}
        className="relative h-[400vh] bg-[#1F221A]"
      >
        <div
          ref={stickyRef}
          className="relative h-screen min-h-170 w-full bg-[#f5f5f5]"
        >
          {/* SVG Background - Moved OUTSIDE shrinking card to sit on main background */}
          <OrganicSvgBackground />

          {/* Oversized Typography Layer - Moved OUTSIDE shrinking card to sit on main background */}
          <div
            ref={textRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none opacity-0"
          >
            <h1 className="text-[18vw] sm:text-[15vw] font-bold leading-[0.85] tracking-tighter text-[#D1F82D] whitespace-nowrap pt-20">
              FULL STACK DEVELOPER • CREATIVE ENGINEER • FULL STACK DEVELOPER
            </h1>
          </div>

          {/* SVG Signature Layer - Moved OUTSIDE shrinking card to spill over */}
          <div
            ref={signatureWrapperRef}
            className="absolute left-1/2 top-1/2 z-40 w-[70vw] max-w-220 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0"
          >
            <svg viewBox="0 0 357 166" fill="none" stroke="#D1F82D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="overflow-visible drop-shadow-2xl">
              <path
                ref={signaturePathRef}
                d="M105.891 3.6818C104.901 0.216803 103.911 -3.2482 111.898 16.4993C119.886 36.2468 136.881 79.3118 147.203 106.364C157.526 133.417 160.661 143.152 162.688 148.909C166.298 159.161 167.886 163.167 168.801 164.427C170.169 166.311 165.271 148.962 154.393 126.104C148.715 114.173 140.381 102.752 133.416 94.1593C121.561 79.5342 112.081 73.8618 106.023 70.9543C97.4647 66.8464 86.2806 64.8568 73.4081 63.6068C57.47 62.0591 45.5856 63.8418 37.6231 66.1618C12.9897 73.3391 3.25062 80.9968 1.06562 83.8293C0.384838 84.7118 5.15062 85.0118 8.42312 84.7668C11.6956 84.5218 14.5006 83.8618 54.3081 69.9093C94.1156 55.9568 170.841 28.7318 211.438 14.4593C252.036 0.186803 254.181 -0.308196 227.731 16.0193C201.281 32.3468 146.171 65.5118 108.376 89.8568C70.5806 114.202 51.7706 128.722 41.1731 137.192C30.5756 145.662 28.7606 147.642 28.8156 148.744C28.8706 149.847 30.8506 150.012 60.6631 137.062C90.4756 124.112 148.061 98.0418 179.458 84.0343C218.808 66.479 222.381 65.5168 223.386 64.4418C227.707 59.8191 216.081 52.5518 210.496 44.1318C209.019 41.9053 207.751 39.5618 206.988 39.1143C203.54 37.0908 207.051 48.6518 209.961 55.5718C211.476 59.1747 214.541 62.3318 217.618 64.9968C219.819 66.9029 223.041 66.6818 225.953 66.3518C227.25 66.2049 228.041 65.3618 228.713 64.4443C232.74 58.9508 232.391 46.8968 232.143 40.3068C232.075 38.4862 231.401 39.8218 231.146 41.1618C229.801 48.2277 234.551 55.8368 236.046 57.8343C236.756 58.784 237.871 59.1718 238.876 59.1793C239.881 59.1868 240.871 58.6918 241.546 57.6943C246.153 50.8859 244.891 39.7018 244.891 37.3618C244.891 32.8846 248.861 55.0918 251.468 64.9893C254.439 76.2653 258.051 91.9918 259.133 94.7493C261.347 100.389 255.231 78.3818 252.818 70.6343C246.566 50.5561 250.051 27.5268 251.546 25.5293C252.256 24.5796 253.371 24.1918 254.046 24.6793C260.852 29.595 254.731 45.3218 251.736 53.0693C250.621 55.9519 249.566 58.8318 248.976 61.6618C248.73 62.8397 250.531 63.5018 251.706 63.6768C256.306 64.3619 268.131 52.9318 279.446 38.9793C283.431 34.0653 282.391 28.5318 281.566 25.7018C280.702 22.741 275.741 23.1818 272.746 23.6768C266.931 24.6379 266.231 33.1618 265.476 38.4868C265.149 40.7903 265.391 44.4418 265.886 46.4768C266.381 48.5118 267.371 48.8418 268.541 49.0118C269.711 49.1818 271.031 49.1818 272.206 48.5218C277.9 45.3234 278.551 37.7018 280.966 27.2093C282.645 19.9143 282.551 38.9918 284.046 41.9968C287.179 48.2956 288.891 23.8718 289.886 17.2068C290.115 15.6722 290.551 14.7018 290.803 14.8518C294.126 16.8258 292.051 24.6418 293.966 31.8243C294.724 34.6687 296.551 36.5068 297.716 36.7668C307.034 38.8465 301.386 16.3618 302.548 14.6918C302.979 14.0732 304.041 15.0018 304.548 16.0843C307.053 21.4273 307.386 26.6668 308.466 29.3293C308.96 30.5477 309.711 31.3318 310.381 30.6018C314.958 25.6149 312.891 20.2018 313.636 15.4518C314.14 12.2383 315.886 9.3618 316.883 8.1043C321.361 2.45864 321.711 25.8168 324.206 30.8143C325.189 32.7846 326.371 33.1718 327.706 33.1793C334.701 29.8718 342.526 21.2218 348.431 14.0668C351.201 10.8718 353.511 8.5618 355.891 6.1818"
              />
            </svg>
          </div>

          {/* Header Text - Moved OUTSIDE shrinking card to stay fixed */}
          <div
            ref={headerTextRef1}
            className="absolute left-5 top-5 z-50 text-4xl sm:text-5xl permanent-marker-regular text-neutral-900 transition-colors"
          >
            <span className="hero-name" aria-label={HERO_NAME}>
              {Array.from(HERO_NAME).map((character, index) => (
                <span
                  key={`${character}-${index}`}
                  className={`hero-name-char${character === " " ? " hero-name-space" : ""}`}
                  style={{ ["--char-index" as string]: index }}
                  aria-hidden="true"
                >
                  {character === " " ? "\u00A0" : character}
                </span>
              ))}
            </span>
          </div>

          <div ref={headerTextRef2} className="absolute right-5 top-5 z-50 text-neutral-900 transition-colors sm:right-8 sm:top-8">
            <SocialLinks />
          </div>

          <div
            ref={postTextRef}
            className="pointer-events-none absolute inset-x-0 bottom-[4vh] z-30 flex justify-center px-4 opacity-0"
          >
            <h2 className="max-w-375 text-center text-[clamp(3.6rem,8.5vw,9.5rem)] font-black uppercase leading-[0.88] tracking-normal text-[#E6E9DD]">
              <span className="font-serif font-black text-[#BFD73A]">Redefining</span>{" "}
              interfaces,
              <br />
              building for{" "}
              <span className="font-serif font-black text-[#BFD73A]">impact</span>,
              <br />
              shipping it all in{" "}
              <span className="font-serif font-black text-[#BFD73A]">code.</span>
            </h2>
          </div>

          <div
            ref={contentRef}
            className="relative h-full w-full overflow-hidden px-5 origin-center will-change-transform z-20"
          >
            {/* Base Background layer */}
            <div ref={baseBgRef} className="absolute inset-0 bg-[#f5f5f5] -z-20" />

            {/* Inner SVG Background for the light card */}
            <RainbowBackground />
            <OrganicSvgBackground />
            <div ref={bgMarqueeRef}>
              <HeroMarquee />
            </div>

            {/* Portrait shell anchored to bottom */}
            <div
              ref={portraitShellRef}
              className="absolute bottom-0 left-1/2 z-30 h-[98vh] min-h-176 w-[min(114vw,1040px)] -translate-x-1/2 origin-bottom will-change-transform cursor-pointer"
            >
              <div
                ref={portraitRef}
                className="relative h-full w-full will-change-transform transform-origin-bottom"
                style={{ transformOrigin: "bottom center" }}
              >
                <PortraitReveal
                  colorSrc="/me-color.png"
                  monochromeSrc="/me-bw.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
