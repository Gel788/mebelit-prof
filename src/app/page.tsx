import { SplashScreen } from "@/components/ui/SplashScreen";
import { Marquee } from "@/components/ui/Marquee";
import { ElegantDivider } from "@/components/ui/ElegantLines";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Categories } from "@/components/sections/Categories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ProjectsSlider } from "@/components/sections/ProjectsSlider";
import { DesignServices } from "@/components/sections/DesignServices";
import { Process } from "@/components/sections/Process";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <SplashScreen />

      <div className="relative">
        <div className="relative z-[1]">
          <Hero />
          <TrustBar />
          <Marquee />
          <ElegantDivider />
          <Categories />
          <ElegantDivider />
          <FeaturedProducts />
          <ElegantDivider />
          <ProjectsSlider />
          <ElegantDivider />
          <DesignServices />
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
