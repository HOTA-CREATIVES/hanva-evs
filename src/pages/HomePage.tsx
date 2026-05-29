import { MainLayout } from "@/layouts/MainLayout";
import { LoadingScreen } from "@/sections/LoadingScreen";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { Portfolio } from "@/sections/Portfolio";
import { About } from "@/sections/About";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { Workflow } from "@/sections/Workflow";
import { Testimonials } from "@/sections/Testimonials";
import { Cta } from "@/sections/Cta";
import { Contact } from "@/sections/Contact";

export function HomePage() {
  return (
    <>
      {/* Cinematic intro brand loader */}
      <LoadingScreen />

      {/* Primary visual sections layout */}
      <MainLayout>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <WhyChooseUs />
        <Workflow />
        <Testimonials />
        <Cta />
        <Contact />
      </MainLayout>
    </>
  );
}
export default HomePage;
