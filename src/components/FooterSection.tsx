import { Github, Star, BookOpen, Terminal, Heart, ExternalLink, Coffee, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="relative z-10 pt-24 pb-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* CTA */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 glass p-8 rounded-[2rem] border-white/10 mb-20"
        >
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-2">
              Clear your <span className="text-gradient-accent">orbit</span> today.
            </h2>
            <p className="text-muted-foreground font-medium">Reclaim gigabytes of storage in milliseconds.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button variant="hero" size="lg" className="rounded-full px-8 group" asChild>
              <a href="#install">
                <Terminal className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Install Kessler
              </a>
            </Button>
            <Button variant="hero-outline" size="lg" className="rounded-full px-8" asChild>
              <a href="https://github.com/hariharen9/kessler" target="_blank" rel="noopener noreferrer">
                <Star className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Footer columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🛰️</span>
              <span className="font-bold text-lg text-foreground font-display">Kessler</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An intelligent CLI that clears build artifacts and runtime caches — safely, fast, and across 30+ ecosystems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider font-display">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li>
                <a href="https://github.com/hariharen9/kessler-extension" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors inline-flex items-center gap-1">
                  VS Code Extension <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li><a href="#install" className="hover:text-primary transition-colors">Installation</a></li>
              <li>
                <a href="https://www.buymeacoffee.com/hariharen" target="_blank" rel="noopener noreferrer" className="text-accent/80 hover:text-accent transition-colors inline-flex items-center gap-1.5 font-medium">
                  <Coffee className="w-3.5 h-3.5" /> Buy me a coffee
                </a>
              </li>
              <li>
                <a href="https://github.com/hariharen9/kessler#-usage" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                  Usage Guide <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider font-display">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://github.com/hariharen9/kessler" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/hariharen9/kessler/issues" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                  Report a Bug <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://github.com/hariharen9/kessler/pulls" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                  Contribute <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://github.com/hariharen9/kessler/releases" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1">
                  Releases <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-border/40 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span>MIT License</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-accent" /> by
                <a href="https://hariharen.site" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors font-medium">
                  Hariharen
                </a>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/hariharen9/kessler" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://github.com/hariharen9/kessler#readme" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
