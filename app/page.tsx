import BenefitsSection from "@/components/custom/BenefitsSection";
import HeroSection from "@/components/custom/HeroSection";
import { Fragment } from "react";
// Update to this ui https://www.figma.com/file/AKLjfLDR3l1V8OUtkDUjua/7-%2F-Feb-21--?type=design&node-id=0-1&mode=design&t=lMH6o5LBoyfjR88x-0
export default function HomeRoute() {
  return (
    <Fragment>
      <HeroSection />
      <BenefitsSection />
    </Fragment>
  )
}
