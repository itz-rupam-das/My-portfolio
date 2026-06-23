"use client";

export function HeroFollowupSection() {
  return (
    <section className="relative bg-[#141910] px-4 pt-12 pb-4 sm:px-6 sm:pt-16 sm:pb-6">
       <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] border border-[#2d3723] bg-[#1a2015] shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
        <div className="grid min-h-[78vh] items-end gap-0 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[52vh] overflow-hidden">
            <img
              src="/img1.jpeg"
              alt="Rupam Das working as a full stack developer"
              className="h-full w-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141910] via-transparent to-transparent" />
          </div>

          <div className="flex h-full flex-col justify-between bg-[#10150d] p-8 text-[#E6E9DD] sm:p-10 lg:p-12">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#BFD73A]">
                Full Stack Developer
              </p>
              <h2 className="max-w-[12ch] text-[clamp(2.8rem,5.4vw,5.5rem)] font-black uppercase leading-[0.9] tracking-[-0.04em]">
                Building polished products from backend to frontend.
              </h2>
              <p className="max-w-[36ch] text-base leading-7 text-[#B8BDAF] sm:text-lg">
                I design scalable APIs, build responsive interfaces, and connect the
                full product flow so ideas move cleanly from concept to production.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-3 w-3 rounded-full bg-[#BFD73A]" />
              <p className="text-sm uppercase tracking-[0.28em] text-[#909781]">
                Shipping end-to-end experiences with clean code
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
