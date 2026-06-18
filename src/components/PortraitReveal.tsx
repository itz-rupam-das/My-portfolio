"use client";

import { WebGLCanvas } from "@/components/WebGLCanvas";

type PortraitRevealProps = {
  colorSrc: string;
};

export function PortraitReveal({
  colorSrc,
}: PortraitRevealProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <WebGLCanvas colorSrc={colorSrc} />
    </div>
  );
}
