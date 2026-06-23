import { useState } from "react";
import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { Stats } from "@/sections/Stats";
import { Manifest } from "@/sections/Manifest";
import { Pillars } from "@/sections/Pillars";
import { Testimonials } from "@/sections/Testimonials";
import { Process } from "@/sections/Process";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { ClosingCTA } from "@/sections/ClosingCTA";
import { Footer } from "@/sections/Footer";

export function HomePage() {
  const [activePortfolioTab, setActivePortfolioTab] = useState<"all" | "events" | "interiors">("all");

  const handleExplorePortfolio = (tab: "events" | "interiors") => {
    setActivePortfolioTab(tab);
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <Hero onExplorePortfolio={handleExplorePortfolio} />
      <Stats />
      <Manifest activeTab={activePortfolioTab} setActiveTab={setActivePortfolioTab} />
      <Pillars onExplorePortfolio={handleExplorePortfolio} />
      <Testimonials />
      <Process />
      <WhyChooseUs />
      <ClosingCTA />
      <Footer />
    </>
  );
}

export default HomePage;
