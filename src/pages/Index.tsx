import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OrbitalScene from "@/components/OrbitalScene";
import FeaturesSection from "@/components/FeaturesSection";
import EcosystemSection from "@/components/EcosystemSection";
import InstallSection from "@/components/InstallSection";
// import FAQSection from "@/components/FAQSection";
import SafetySection from "@/components/SafetySection";
import ComparisonChart from "@/components/ComparisonChart";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <StarField />
      <Navbar />
      <HeroSection />
      <OrbitalScene />
      <FeaturesSection />
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
