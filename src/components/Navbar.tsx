import { motion } from "framer-motion";
import { Github, Star, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 100; // Account for floating header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-strong border border-white/10 rounded-full px-6 h-14 flex items-center justify-between gap-8 max-w-fit shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto"
      >
        <a href="#" onClick={(e) => scrollToSection(e, '#root')} className="flex items-center gap-2 font-bold text-lg shrink-0" title="Kessler Home">
          <span className="text-xl">🛰️</span>
          <span className="text-foreground font-display uppercase tracking-tight text-base sm:text-lg">Kessler</span>
        </a>

        <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" onClick={(e) => scrollToSection(e, '#features')} className="hover:text-primary transition-colors" title="Kessler Features">Features</a>
          <a href="#vscode" onClick={(e) => scrollToSection(e, '#vscode')} className="hover:text-blue-400 transition-colors" title="VS Code Extension">VS Code</a>
          <a href="#install" onClick={(e) => scrollToSection(e, '#install')} className="hover:text-primary transition-colors" title="How to Install Kessler">Install</a>
          <a href="https://github.com/hariharen9/kessler#-usage" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" title="Kessler Documentation">Docs</a>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button variant="ghost" size="sm" asChild className="hidden xs:flex h-9 rounded-full px-4 hover:bg-white/5">
            <a href="https://www.buymeacoffee.com/hariharen" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent/90" title="Support Kessler Development">
              <Coffee className="w-4 h-4" />
              <span className="hidden lg:inline">Support</span>
            </a>
          </Button>
          <div className="w-px h-4 bg-white/10 hidden xs:block" />
          <Button variant="ghost" size="sm" asChild className="h-9 w-9 p-0 rounded-full hover:bg-white/5">
            <a href="https://github.com/hariharen9/kessler" target="_blank" rel="noopener noreferrer" title="View Kessler on GitHub">
              <Github className="w-4 h-4" />
            </a>
          </Button>
          <Button variant="default" size="sm" asChild className="h-9 rounded-full px-5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <a href="#install" onClick={(e) => scrollToSection(e, '#install')} className="font-bold" title="Get Started with Kessler">Get Started</a>
          </Button>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
