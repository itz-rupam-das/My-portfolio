import { Hero } from "@/components/hero/Hero";
import { HeroFollowupSection } from "@/components/home/HeroFollowupSection";

export default function Home() {
  return (
    <main className="bg-[#141910]">
      <Hero />
      <HeroFollowupSection />
    </main>
  );
}
