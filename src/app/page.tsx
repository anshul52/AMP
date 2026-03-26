import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TotalRewardsSection from "@/components/TotalRewardsSection";
import StatsSection from "@/components/StatsSection";
import WhatMakesUsDifferent from "@/components/WhatMakesUsDifferent";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TotalRewardsSection />
      <StatsSection />
      <WhatMakesUsDifferent />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
