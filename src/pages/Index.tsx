import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OrbitalScene from "@/components/OrbitalScene";
import FeaturesSection from "@/components/FeaturesSection";
import EcosystemSection from "@/components/EcosystemSection";
import InstallSection from "@/components/InstallSection";
import SafetySection from "@/components/SafetySection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StarField />
      <Navbar />
      <HeroSection />
      <OrbitalScene />
      <FeaturesSection />
      <EcosystemSection />
      <InstallSection />
      <SafetySection />
      <FooterSection />
    </div>
  );
};

export default Index;
