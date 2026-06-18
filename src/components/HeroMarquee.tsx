const TEXT = "FULL STACK DEVELOPER";
const ITEMS_PER_TRACK = 6;

function TrackItems() {
  return (
    <>
      {Array.from({ length: ITEMS_PER_TRACK }).map((_, index) => (
        <span className="hero-marquee-item" key={index}>
          {TEXT}
        </span>
      ))}
    </>
  );
}

export function HeroMarquee() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[39%] z-20 -translate-y-1/2 overflow-hidden"
    >
      <div className="hero-marquee-track hero-marquee-left flex w-max whitespace-nowrap text-[clamp(72px,11vw,190px)] font-black uppercase leading-none tracking-[0.03em] text-neutral-800">
        <TrackItems />
        <TrackItems />
      </div>
      <div className="hero-marquee-track hero-marquee-right mt-3 flex w-max whitespace-nowrap text-[clamp(58px,9vw,150px)] font-black uppercase leading-none tracking-[0.03em] text-neutral-300">
        <TrackItems />
        <TrackItems />
      </div>
    </div>
  );
}
