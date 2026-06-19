const TEXT = "FULL STACK DEVELOPER";
const ITEMS_PER_GROUP = 8;

function TrackGroup() {
  return (
    <div className="flex flex-none whitespace-nowrap" aria-hidden="true">
      {Array.from({ length: ITEMS_PER_GROUP }).map((_, index) => (
        <span className="hero-marquee-item" key={index}>
          {TEXT}&nbsp;
        </span>
      ))}
    </div>
  );
}

export function HeroMarquee() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[44%] z-20 -translate-y-1/2 overflow-hidden"
    >
      <div className="relative left-1/2 mb-4 flex w-[130vw] min-w-max -translate-x-1/2 rotate-[-0.6deg] overflow-hidden bg-[#BFD73A] py-3 sm:py-4">
        <div className="hero-marquee-track hero-marquee-left flex w-max whitespace-nowrap text-[clamp(78px,11vw,220px)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-[#ffffff]">
          <TrackGroup />
          <TrackGroup />
        </div>
      </div>

      <div className="relative left-1/2 flex w-[130vw] min-w-max -translate-x-1/2 rotate-[0.45deg] overflow-hidden bg-[#000000] py-3 sm:py-4">
        <div className="hero-marquee-track hero-marquee-right flex w-max whitespace-nowrap text-[clamp(78px,11vw,220px)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-[#BFD73A]">
          <TrackGroup />
          <TrackGroup />
        </div>
      </div>
    </div>
  );
}
