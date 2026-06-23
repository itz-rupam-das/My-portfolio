import type { ReactNode } from "react";

type HeroRevealLineProps = {
  children: ReactNode;
  offsetClass: string;
};

export function HeroRevealLine({ children, offsetClass }: HeroRevealLineProps) {
  return (
    <span
      className={`relative block w-fit whitespace-nowrap overflow-hidden ${offsetClass}`}
      data-post-reveal
    >
      <span className="block whitespace-nowrap" data-post-copy>{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[#BFD73A]"
        data-post-block
      />
    </span>
  );
}
