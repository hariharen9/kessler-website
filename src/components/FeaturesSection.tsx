import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  GitBranch, Eye, EyeOff, ShieldCheck, FolderTree, 
  Zap, Brain, Trash2, Palette, Settings, Gauge, 
  Cpu, Lock, Search, Target, Activity, Rocket,
  ArrowRight, CheckCircle2, AlertTriangle, Scan
} from "lucide-react";
import { cn } from "@/lib/utils";

const treeData = [
  { name: "src/core/", type: "source", status: "tracked", size: "42 KB" },
  { name: "node_modules/", type: "junk", status: "ignored", reason: "Auto-Detected", size: "840 MB" },
  { name: "experiment_logs/", type: "custom", status: "ignored", reason: "Git-Ignored", size: "120 MB" },
  { name: ".env", type: "secret", status: "ignored", reason: "Safety Lock", size: "1 KB" },
  { name: "package-lock.json", type: "source", status: "tracked", size: "240 KB" },
  { name: "dist/artifacts/", type: "junk", status: "ignored", reason: "Build Residue", size: "15 MB" },
];

const FeatureCard = ({ card, index, isInView }: { card: any; index: number; isInView: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 100, damping: 30 });
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]));
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]));

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative group rounded-[2.5rem] p-8 border overflow-hidden transition-all duration-500",
        card.className
      )}
    >
      {/* Magnetic Spotlight */}
      <motion.div 
        style={{ left: spotlightX, top: spotlightY }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <div className="relative z-10 h-full flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
        <div className="space-y-6">
          <div className={cn(
            "w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
            card.iconColor
          )}>
            <card.icon className="w-7 h-7" />
          </div>
          
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-foreground mb-3">{card.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">{card.desc}</p>
          </div>
        </div>

        {/* Card-specific Gadgets */}
        <div className="mt-8">
          {card.title === "Blazingly Fast" && (
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: ["0%", "100%", "0%"] }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full bg-primary shadow-[0_0_15px_hsl(var(--primary))]" 
                />
              </div>
              <span className="text-[10px] font-mono font-bold text-primary animate-pulse">2.4ms/scan</span>
            </div>
          )}
          {card.title === "OS Trash Integration" && (
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center"
                >
                  <Trash2 className="w-3 h-3 text-green-400" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [activeScanIndex, setActiveScanIndex] = useState(-1);

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveScanIndex(prev => (prev + 1) % treeData.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  const bentoCards = [
    {
      title: "Blazingly Fast",
      desc: "Concurrent engine written in Go. Processes 100k+ files in sub-second intervals with zero lag.",
      icon: Zap,
      className: "md:col-span-2 md:row-span-1 bg-primary/10 border-primary/20",
      iconColor: "text-primary",
    },
    {
      title: "Context-Aware",
      desc: "Intelligent fingerprinting identifies ecosystem-specific junk with military precision.",
      icon: Brain,
      className: "md:col-span-1 md:row-span-1 bg-white/5 border-white/10",
      iconColor: "text-purple-400",
    },
    {
      title: "Orbital Stats",
      desc: "Live telemetry and visualization of your disk's cleanup history and orbital debris.",
      icon: Activity,
      className: "md:col-span-1 md:row-span-1 bg-white/5 border-white/10",
      iconColor: "text-pink-400",
    },
    {
      title: "OS Trash Integration",
      desc: "Move debris to native Trash instead of permanent deletion. Safety is our primary mandate.",
      icon: Trash2,
      className: "md:col-span-2 md:row-span-1 bg-green-500/10 border-green-500/20",
      iconColor: "text-green-400",
    },
    {
      title: ".gitignore Intelligence",
      desc: "Queries your Git index to discover project-specific ignored paths dynamically.",
      icon: Search,
      className: "md:col-span-1 md:row-span-1 bg-white/5 border-white/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Custom Rules",
      desc: "Extend the engine with your own logic. Simple YAML configuration for custom targets.",
      icon: Settings,
      className: "md:col-span-1 md:row-span-1 bg-white/5 border-white/10",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <section id="features" ref={containerRef} className="relative z-10 py-32 sm:py-48 px-4 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        
        {/* Cinematic Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-10"
          >
            <Scan className="w-4 h-4 animate-pulse" /> Scanning Protocol Active
          </motion.div>
          <h2 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-10 font-display italic">
            Engineered <br />
            <span className="text-gradient-primary">To Discover.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
            Kessler doesn't just clean; it understands. Using a deep integration with your 
            <span className="text-foreground"> Git environment</span> to discover what generic tools miss.
          </p>
        </motion.div>

        {/* Feature Interaction: Telemetry Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
          <div className="lg:col-span-5 space-y-12">
            {[
              { icon: GitBranch, title: "Git Index Query", desc: "Queries your index to identify exactly what's being ignored by your project logic.", color: "text-primary" },
              { icon: ShieldCheck, title: "Collision Protection", desc: "Safeguards system criticals like .env and lockfiles from accidental sweeps.", color: "text-accent" },
              { icon: Target, title: "Surgical Deletion", desc: "Targets only 100% regeneratable artifacts. Zero risk to your source code.", color: "text-green-400" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.2 }}
                className="flex gap-6 group"
              >
                <div className={cn("w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10", item.color)}>
                  <item.icon className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-[3rem] opacity-30 animate-pulse" />
            <div className="relative glass-strong rounded-[2.5rem] border border-white/10 p-8 sm:p-12 overflow-hidden shadow-2xl min-h-[500px] flex flex-col">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
              
              <div className="relative z-10 flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary font-mono text-xs font-bold uppercase tracking-widest">Live Telemetry: Deep Scan</span>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground/40 font-bold tracking-tighter">EST SAVINGS: 1.2 GB</div>
              </div>

              <div className="relative z-10 flex-1 space-y-5">
                {treeData.map((item, i) => (
                  <motion.div 
                    key={item.name}
                    animate={{ 
                      opacity: activeScanIndex === i ? 1 : 0.4,
                      x: activeScanIndex === i ? 10 : 0,
                      scale: activeScanIndex === i ? 1.02 : 1
                    }}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                      activeScanIndex === i ? "bg-primary/10 border-primary/30" : "bg-white/5 border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        item.status === 'ignored' ? "bg-primary" : "bg-muted-foreground/30"
                      )} />
                      <span className={cn(
                        "font-mono text-xs font-bold",
                        activeScanIndex === i ? "text-primary" : "text-foreground/70"
                      )}>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-mono text-muted-foreground/40 font-bold">{item.size}</span>
                      <div className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter border",
                        item.status === 'ignored' ? "border-primary/40 text-primary bg-primary/5" : "border-white/5 text-muted-foreground/20"
                      )}>
                        {item.status === 'ignored' ? item.reason : "Tracked"}
                      </div>
                      {activeScanIndex === i && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Scan Animation Overlays */}
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-primary/10 to-transparent z-20 pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

        {/* High-Impact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-auto">
          {bentoCards.map((card, i) => (
            <FeatureCard key={card.title} card={card} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
