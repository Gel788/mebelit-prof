import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Categories } from "@/components/sections/Categories";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ProjectsSlider } from "@/components/sections/ProjectsSlider";
import { DesignServices } from "@/components/sections/DesignServices";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden">
      <Hero />
      <Marquee />
      <Categories />
      <FeaturedProducts />
      <ProjectsSlider />
      <DesignServices />
      <Process />
      <Testimonials />
      <CTA />
    </div>
  );
}
