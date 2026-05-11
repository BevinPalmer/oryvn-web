import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import ProofBar from "@/components/ProofBar";
import PluginPreviewShowcase from "@/components/PluginPreviewShowcase";
import SectionDivider from "@/components/SectionDivider";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import ConversationsSection from "@/components/ConversationsSection";
import PricingSection from "@/components/PricingSection";
import CtaBanner from "@/components/CtaBanner";
import FaqSection from "@/components/FaqSection";

export default function HomePage() {
  return (
    <div className="bg-bg">
      <LandingHero />
      <ProofBar />
      <PluginPreviewShowcase />
      <SectionDivider />
      <CapabilitiesSection />
      <ConversationsSection />
      <div id="pricing" className="scroll-mt-[calc(52px+1.5rem)] md:scroll-mt-28">
        <PricingSection />
      </div>
      <CtaBanner />
      <FaqSection />
      <Footer />
    </div>
  );
}
