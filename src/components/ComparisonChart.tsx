import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Check, X, Zap, Shield, Rocket, Globe, Target, Cpu, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

const tools = [
  {
    name: "Kessler",
    tagline: "The Modern Engine",
    isKessler: true,
    score: 98,
    features: {
      gitAware: { value: "git ls-files", status: "success" },
      globalCaches: { value: "Full Stack", status: "success" },
      modeTiers: { value: "Safe vs Deep", status: "success" },
      gitignoreIntelligence: { value: "Deep Scan", status: "success" },
      osTrash: { value: "+ Windows", status: "success" },
      speed: { value: "Concurrent", status: "success" },
    }
  },
  {
    name: "Kondo",
    tagline: "Legacy Tool",
    isKondo: true,
    score: 45,
    features: {
      gitAware: { value: "No Support", status: "failure" },
      globalCaches: { value: "Limited", status: "partial" },
      modeTiers: { value: "None", status: "failure" },
      gitignoreIntelligence: { value: "Basic", status: "partial" },
      osTrash: { value: "MacOS Only", status: "success" },
      speed: { value: "Single-thread", status: "partial" },
    }
  },
  {
    name: "npkill",
    tagline: "Niche Node",
    score: 32,
    features: {
      gitAware: { value: "None", status: "failure" },
      globalCaches: { value: "None", status: "failure" },
      modeTiers: { value: "None", status: "failure" },
      gitignoreIntelligence: { value: "None", status: "failure" },
      osTrash: { value: "None", status: "failure" },
      speed: { value: "Sync Node", status: "failure" },
    }
  },
  {
    name: "cargo clean",
    tagline: "Manual Cmd",
    score: 28,
    features: {
      gitAware: { value: "None", status: "failure" },
      globalCaches: { value: "None", status: "failure" },
      modeTiers: { value: "None", status: "failure" },
      gitignoreIntelligence: { value: "None", status: "failure" },
      osTrash: { value: "None", status: "failure" },
      speed: { value: "Recursive", status: "partial" },
    }
  },
];

const featureConfig = {
  gitAware: { label: "Git Safety Net", icon: Shield },
  globalCaches: { label: "Global Ecosystems", icon: Globe },
  modeTiers: { label: "Aggression Modes", icon: Target },
  gitignoreIntelligence: { label: ".gitignore Intelligence", icon: Cpu },
  osTrash: { label: "OS Recycle Bin", icon: MousePointer2 },
  speed: { label: "Scanning Speed", icon: Rocket },
};

const ComparisonChart = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  // Mouse tilt effect for the Kessler card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section className="hidden lg:block relative z-10 py-32 sm:py-48 px-4 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] animate-pulse-slow" />
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} 
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Zap className="w-3.5 h-3.5 fill-primary" /> Competitive Intelligence
          </motion.div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 font-display italic">
            Out-perform. <br />
            <span className="text-gradient-primary">Out-clean.</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Kessler is the only engine designed for the modern developer's orbit. 
            Safely reclaiming disk space across <span className="text-foreground">30+ ecosystems</span> with military-grade precision.
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Feature Sidebar (Desktop) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col justify-end pb-12 gap-4">
            {Object.entries(featureConfig).map(([key, config]) => (
              <motion.div
                key={key}
                onMouseEnter={() => setHoveredRow(key)}
                onMouseLeave={() => setHoveredRow(null)}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all duration-300 border border-transparent",
                  hoveredRow === key ? "bg-white/5 border-white/10 translate-x-2" : "opacity-40"
                )}
              >
                <config.icon className={cn("w-5 h-5", hoveredRow === key ? "text-primary" : "text-muted-foreground")} />
                <span className="text-xs font-black uppercase tracking-widest">{config.label}</span>
              </motion.div>
            ))}
            <div className="h-20" /> {/* Spacer for footer stats */}
          </div>

          {/* Comparison Cards */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {tools.map((tool, toolIdx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * toolIdx }}
                onMouseMove={tool.isKessler ? handleMouseMove : undefined}
                style={tool.isKessler ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
                className={cn(
                  "relative group rounded-3xl p-6 sm:p-8 flex flex-col transition-all duration-500 overflow-hidden",
                  tool.isKessler 
                    ? "bg-gradient-to-b from-primary/20 via-primary/5 to-background border-2 border-primary/40 shadow-[0_20px_60px_-15px_rgba(125,86,244,0.3)] z-10" 
                    : "bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                )}
              >
                {/* Highlight effects */}
                {tool.isKessler && (
                  <>
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/30 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 bg-primary text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full animate-pulse shadow-lg shadow-primary/40">
                      Standard
                    </div>
                  </>
                )}

                <div className="mb-8">
                  <h3 className={cn(
                    "text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-1",
                    tool.isKessler ? "text-white" : "text-foreground/70"
                  )}>
                    {tool.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">{tool.tagline}</p>
                </div>

                {/* Features List for mobile/compact */}
                <div className="flex-1 space-y-6">
                  {Object.entries(tool.features).map(([key, feature], idx) => (
                    <div 
                      key={key} 
                      className={cn(
                        "flex flex-col gap-1.5 transition-all duration-300",
                        hoveredRow === key ? "scale-105 translate-x-1" : ""
                      )}
                      onMouseEnter={() => setHoveredRow(key)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest lg:hidden">
                        <span className="text-muted-foreground/40">{featureConfig[key as keyof typeof featureConfig].label}</span>
                      </div>
                      <div className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border transition-all duration-300",
                        tool.isKessler 
                          ? (feature.status === 'success' ? "bg-primary/10 border-primary/20" : "bg-white/5 border-white/10")
                          : (feature.status === 'success' ? "bg-green-500/5 border-green-500/10" : "bg-white/5 border-white/5")
                      )}>
                        {feature.status === 'success' ? (
                          <Check className={cn("w-4 h-4", tool.isKessler ? "text-primary" : "text-green-400")} />
                        ) : feature.status === 'partial' ? (
                          <div className="w-4 h-4 rounded-full border-2 border-accent border-t-transparent animate-spin-slow" />
                        ) : (
                          <X className="w-4 h-4 text-red-400/30" />
                        )}
                        <span className={cn(
                          "text-[11px] font-bold font-mono tracking-tight",
                          tool.isKessler ? "text-white" : "text-muted-foreground"
                        )}>
                          {feature.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Performance Meter */}
                <div className="mt-12 pt-8 border-t border-white/5">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Efficiency Index</span>
                    <span className={cn("text-xl font-black font-mono", tool.isKessler ? "text-primary" : "text-foreground/40")}>{tool.score}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${tool.score}%` } : {}}
                      transition={{ duration: 1.5, delay: 0.5 + (toolIdx * 0.1), ease: "circOut" }}
                      className={cn(
                        "h-full rounded-full",
                        tool.isKessler ? "bg-primary shadow-[0_0_15px_hsl(var(--primary))]" : "bg-muted-foreground/20"
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ComparisonChart;
