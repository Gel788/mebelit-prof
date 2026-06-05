import { SplashScreen } from "@/components/ui/SplashScreen";
import { Marquee } from "@/components/ui/Marquee";
import { ElegantDivider, ElegantPageLines } from "@/components/ui/ElegantLines";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Categories } from "@/components/sections/Categories";
import { SpaceConfigurator } from "@/components/sections/SpaceConfigurator";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <SplashScreen />

      <div className="relative">
        <ElegantPageLines />

        <div className="relative z-[1]">
          <Hero />
          <TrustBar />
          <Marquee />
          <ElegantDivider />
          <Categories />
          <ElegantDivider />
          <SpaceConfigurator />
          <Marquee />
          <ElegantDivider />
          <FeaturedProducts />
          <ElegantDivider />
          <Projects />
          <ElegantDivider />
          <Process />
          <ElegantDivider />
          <Features />
          <ElegantDivider />
          <Testimonials />
          <ElegantDivider className="pb-4" />
          <CTA />
        </div>
      </div>
    </>
  );
}
