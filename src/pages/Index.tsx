import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OrbitalScene from "@/components/OrbitalScene";
import FeaturesSection from "@/components/FeaturesSection";
import GitIntelligence from "@/components/GitIntelligence";
import EcosystemSection from "@/components/EcosystemSection";
import InstallSection from "@/components/InstallSection";
// import FAQSection from "@/components/FAQSection";
import SafetySection from "@/components/SafetySection";
import ComparisonChart from "@/components/ComparisonChart";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StarField />
      <Navbar />
      <HeroSection />
      <OrbitalScene />
      <FeaturesSection />
      <GitIntelligence />
      <EcosystemSection />
      <InstallSection />
      {/* <FAQSection /> */}
      <SafetySection />
      <ComparisonChart />
      <FooterSection />
    </div>
  );
};

export default Index;
