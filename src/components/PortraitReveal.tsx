"use client";

import { WebGLCanvas } from "@/components/WebGLCanvas";

type PortraitRevealProps = {
  colorSrc: string;
  monochromeSrc: string;
};

export function PortraitReveal({
  colorSrc,
  monochromeSrc,
}: PortraitRevealProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <WebGLCanvas colorSrc={colorSrc} monochromeSrc={monochromeSrc} />
    </div>
  );
}
