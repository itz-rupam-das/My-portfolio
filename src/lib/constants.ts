export const SITE = {
  name: "RUPAM DAS",
  title: "Portfolio",
  description: "Interactive portfolio hero for Rupam Das.",
} as const;

export const HERO = {
  colorPortrait: "/me-color.png",
  hoverPortrait: "/me-bw.png",
  marqueeText: "FULL STACK DEVELOPER",
  marqueeItems: 8,
  scrollDistance: 9400,
  scrollHeightClass: "h-[960vh]",
} as const;

export const HERO_COLORS = {
  accent: "#D1F82D",
  card: "#8f9484",
  page: "#182014",
  organicStroke: "rgba(209, 248, 45, 0.15)",
} as const;

export const HERO_TIMING = {
  shrinkDuration: 1,
  cardDecorFadeDuration: 0.55,
  marqueeFadeDuration: 0.7,
  exitAt: 1.12,
  exitDuration: 0.8,
  revealAt: 1.5,
  revealDuration: 0.36,
  lineRevealAt: 1.56,
  lineStagger: 0.11,
  lineCoverDuration: 0.16,
  lineUncoverDuration: 0.22,
  revealTravelAt: 3.72,
  revealTravelDuration: 0.6,
  headerAt: 0.2,
  headerDuration: 0.5,
  typographyAt: 0.2,
  typographyDuration: 2,
  signatureAt: 0.5,
  signatureFadeDuration: 0.1,
  signatureDrawDuration: 0.6,
  signatureScaleDuration: 1,
  lineCopyRevealOffset: 0.15,
} as const;

export const HERO_MOTION = {
  cardScale: 0.42,
  cardRadius: "18px",
  typographyStartX: "15vw",
  typographyEndX: "-145vw",
  signatureScale: 0.78,
  exitY: "-100vh",
  revealStartY: "18vh",
  revealEnterY: "6vh",
  revealExitY: "-10vh",
  signatureDashLength: 1794.412,
} as const;

export const PORTRAIT_MOTION = {
  parallaxDistance: 15,
  parallaxDuration: 0.65,
  shellScale: 1.56,
  shellTranslateY: "35vh",
  hoverEase: 0.12,
  scrollFadeEase: 0.2,
  maxDpr: 2,
} as const;

export const LOADER = {
  durationMs: 2100,
  label: "Loading Portfolio",
} as const;

export const RAINBOW = {
  count: 25,
  duration: 45,
  palettes: [
    ["#e879f9", "#60a5fa", "#5eead4"],
    ["#e879f9", "#5eead4", "#60a5fa"],
    ["#5eead4", "#e879f9", "#60a5fa"],
    ["#5eead4", "#60a5fa", "#e879f9"],
    ["#60a5fa", "#5eead4", "#e879f9"],
    ["#60a5fa", "#e879f9", "#5eead4"],
  ],
} as const;

export const SOCIAL_LINKS = [
  {
    label: "Github",
    href: "https://github.com/rdas4",
    gradient: ["#2f3437", "#111111"],
    path: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.27-5.23-5.67 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.42.36.78 1.06.78 2.14v3.15c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/rdas4",
    gradient: ["#f58529", "#dd2a7b"],
    path: "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.7 2.35a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/rdas4",
    gradient: ["#56ccf2", "#1877f2"],
    path: "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.25.2 2.25.2V8.6H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z",
  },
  {
    label: "Gmail",
    href: "mailto:rdas4@gmail.com",
    gradient: ["#ea4335", "#fbbc05"],
    path: "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm8 7.22L4.58 7H4v.73l8 5.63 8-5.63V7h-.58L12 12.22Z",
  },
] as const;
