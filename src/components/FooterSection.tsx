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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-strong rounded-[2.5rem] p-16 sm:p-24 text-center mb-24 relative overflow-hidden border border-white/10 group"
        >
          {/* Background Grid & Effects */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
          
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse pointer-events-none" />

          {/* Floating Orbital Elements */}
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 text-primary/20 pointer-events-none hidden md:block"
          >
            <Box className="w-12 h-12" />
          </motion.div>
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -8, 0]
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-10 text-accent/20 pointer-events-none hidden md:block"
          >
            <Coffee className="w-10 h-10" />
          </motion.div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl sm:text-6xl font-black mb-6 uppercase tracking-tighter leading-none">
                Clear your <span className="text-gradient-accent">orbit</span> today
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-xl mb-12 font-medium"
            >
              Reclaim gigabytes of storage. One command. <span className="text-foreground">Zero risk.</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button variant="hero" size="xl" className="h-16 px-10 text-lg font-bold group w-full sm:w-auto rounded-full" asChild>
                <a href="#install">
                  <Terminal className="w-6 h-6 mr-2 group-hover:translate-x-1 transition-transform" />
                  Install Kessler
                </a>
              </Button>
              <Button variant="hero-outline" size="xl" className="h-16 px-10 text-lg font-bold w-full sm:w-auto rounded-full" asChild>
                <a href="https://github.com/hariharen9/kessler" target="_blank" rel="noopener noreferrer">
                  <Star className="w-6 h-6 mr-2" />
                  Star on GitHub
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
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

          {/* Install */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider font-display">Install via</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="font-mono text-[10px] text-primary/80">npm i -g kessler</li>
              <li className="font-mono text-[10px] text-primary/80">brew install kessler</li>
              <li className="font-mono text-[10px] text-primary/80">go install …@latest</li>
              <li className="font-mono text-[10px] text-primary/80">scoop install kessler</li>
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
