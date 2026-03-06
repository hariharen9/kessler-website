import StarField from "@/components/StarField";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OrbitalScene from "@/components/OrbitalScene";
import FeaturesSection from "@/components/FeaturesSection";
import EcosystemSection from "@/components/EcosystemSection";
import InstallSection from "@/components/InstallSection";
import FAQSection from "@/components/FAQSection";
import SafetySection from "@/components/SafetySection";
import ComparisonChart from "@/components/ComparisonChart";
import FooterSection from "@/components/FooterSection";
import TerminalSimulation from "@/components/TerminalSimulation";
import BenchmarkSection from "@/components/BenchmarkSection";
import SmoothScroll from "@/components/SmoothScroll";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground">
      <StarField />
      <Navbar />
      
      <main>
        {/* Hook */}
        <HeroSection />
        
        {/* Visual Metaphor */}
        <OrbitalScene />
        
        {/* Features / Capabilities */}
        <FeaturesSection />
        
        {/* Breadth / Reach */}
        <EcosystemSection />
        
        {/* Speed / Benchmarks */}
        <BenchmarkSection />
        
        {/* Trust / Safety */}
        <SafetySection />
        
        {/* Decision / Comparison */}
        <ComparisonChart />
        
        {/* Acquisition */}
        <InstallSection />
        
        {/* Objections / Support */}
        <FAQSection />
      </main>

      <FooterSection />
    </div>
  );
};

export default Index;
