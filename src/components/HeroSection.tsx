import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Terminal, Github, ArrowDown, Zap, Shield, Cpu, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import TerminalSimulation from "./TerminalSimulation";

const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const glowX = useTransform(springX, [0, 1], ["-15%", "15%"]);
  const glowY = useTransform(springY, [0, 1], ["-15%", "15%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install -g kessler-cli");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center pt-24 sm:pt-32 pb-20 px-4 z-10">
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
          className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 sm:px-4 sm:py-1.5 mb-6 sm:mb-8"
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary animate-pulse" />
          <span className="text-[8px] sm:text-[10px] font-bold text-muted-foreground tracking-[0.2em] uppercase">
            Modern Cosmic Cleanup Engine
          </span>
        </motion.div>

        {/* Title */}
        <div className="relative group mb-4 sm:mb-6">
          <motion.div
            style={{ x: glowX, y: glowY }}
            className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl sm:text-8xl md:text-9xl font-display font-light tracking-tight leading-[0.85] uppercase relative z-10"
          >
            <span className="text-gradient-hero">Kessler</span>
          </motion.h1>
        </div>

        {/* Bold Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="space-y-4 sm:space-y-6 mb-8 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl px-2 tracking-wide leading-tight" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            Stop drowning in<br className="sm:hidden" /> <span className="text-primary font-normal">digital debris.</span>
          </h2>
          
          {/* Hooking Tags */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
            <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[8px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Blazingly Fast</span>
            <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-[8px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Git-Aware</span>
            <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-[8px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Zero Risk</span>
            <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-[8px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">30+ Ecosystems</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed font-medium px-4"
        >
          The intelligent <span className="text-foreground">cosmic cleanup engine</span> that finds and safely sweeps away <span className="text-primary/90 font-bold">development artifacts</span> and <span className="text-primary/90 font-bold">100% regeneratable debris</span> — reclaiming your orbit in milliseconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 px-4"
        >
          <Button variant="hero" size="xl" className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg group w-full sm:w-auto rounded-full" asChild>
            <a href="#install">
              <Terminal className="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:translate-x-1 transition-transform" />
              Get Started
            </a>
          </Button>
          <Button variant="hero-outline" size="xl" className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg w-full sm:w-auto rounded-full" asChild>
            <a href="https://github.com/hariharen9/kessler" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              View on GitHub
            </a>
          </Button>
        </motion.div>

        {/* Mini Snippet for Power Users */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="glass px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3 group cursor-pointer hover:border-primary/30 transition-all" onClick={handleCopy}>
            <code className="text-[10px] sm:text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
              <span className="text-primary/50 mr-2">$</span>
              npm install -g kessler-cli
            </code>
            <div className="w-px h-3 bg-white/10" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 group-hover:text-primary/60 transition-colors">
              {copied ? "Copied!" : "Copy"}
            </span>
          </div>
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
              <span>30+</span>
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
