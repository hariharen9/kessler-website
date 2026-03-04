import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Terminal, Github, ArrowDown, Zap, Shield, Cpu, Sparkles } from "lucide-react";
import { useState } from "react";
import TerminalSimulation from "./TerminalSimulation";

const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install -g kessler");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-4 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
            Modern Cosmic Cleanup Engine
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter mb-6 leading-[0.85] uppercase"
        >
          <span className="text-gradient-hero">Kessler</span>
        </motion.h1>

        {/* Bold Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-6 mb-10"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase">
            Stop drowning in <span className="text-primary">digital debris.</span>
          </h2>
          
          {/* Hooking Tags */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">Blazingly Fast</span>
            <span className="px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest">Git-Aware</span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] font-black uppercase tracking-widest">Zero Risk</span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] font-black uppercase tracking-widest">10+ Ecosystems</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
        >
          The intelligent <span className="text-foreground">cosmic cleanup engine</span> that finds and safely sweeps away <span className="text-primary/90 font-mono">node_modules</span>, <span className="text-primary/90 font-mono">venv</span>, <span className="text-primary/90 font-mono">target/</span>, and bloated build caches — reclaiming your orbit in milliseconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button variant="hero" size="xl" className="h-14 px-8 text-base group" asChild>
            <a href="#install">
              <Terminal className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Get Started
            </a>
          </Button>
          <Button variant="hero-outline" size="xl" className="h-14 px-8 text-base" asChild>
            <a href="https://github.com/hariharen9/kessler" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </Button>
        </motion.div>

        {/* Terminal Simulation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <TerminalSimulation />
        </motion.div>

        {/* Stats row - Moved below terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm border-t border-white/5 pt-12"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-primary font-bold text-xl">
              <Zap className="w-5 h-5" />
              <span>Concurrent</span>
            </div>
            <span className="text-muted-foreground text-xs uppercase tracking-widest">Scanning Engine</span>
          </div>
          <div className="w-px h-12 bg-border hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-accent font-bold text-xl">
              <Shield className="w-5 h-5" />
              <span>Git-Aware</span>
            </div>
            <span className="text-muted-foreground text-xs uppercase tracking-widest">Safety Net</span>
          </div>
          <div className="w-px h-12 bg-border hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-foreground font-bold text-xl">
              <Cpu className="w-5 h-5" />
              <span>10+</span>
            </div>
            <span className="text-muted-foreground text-xs uppercase tracking-widest">Ecosystems</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Orbit</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
