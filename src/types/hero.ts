import type { RefObject } from "react";

export type HeroRefs = {
  section: RefObject<HTMLElement | null>;
  sticky: RefObject<HTMLDivElement | null>;
  content: RefObject<HTMLDivElement | null>;
  portraitShell: RefObject<HTMLDivElement | null>;
  portrait: RefObject<HTMLDivElement | null>;
  textLayer: RefObject<HTMLDivElement | null>;
  marquee: RefObject<HTMLDivElement | null>;
  signature: RefObject<HTMLDivElement | null>;
  signaturePath: RefObject<SVGPathElement | null>;
  reveal: RefObject<HTMLDivElement | null>;
  headerName: RefObject<HTMLDivElement | null>;
  headerSocial: RefObject<HTMLDivElement | null>;
  cardBackground: RefObject<HTMLDivElement | null>;
};

export type HeroElements = {
  [Key in keyof HeroRefs]: NonNullable<HeroRefs[Key]["current"]>;
};

export type OrganicBlob = {
  d: string;
  transform: string;
};

export type DriftConfig = {
  x: number;
  y: number;
  duration: number;
};
