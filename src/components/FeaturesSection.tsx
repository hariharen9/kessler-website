import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  GitBranch, ShieldCheck, 
  Zap, Brain, Trash2, Settings, 
  Search, Target, Activity, Rocket,
  CheckCircle2, Scan, Terminal,
  Layout, MousePointer2, Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";

const treeData = [
  { name: "src/core/", status: "tracked", size: "42 KB" },
  { name: "node_modules/", status: "ignored", reason: "Auto-Detected", size: "840 MB" },
  { name: "experiment_logs/", status: "ignored", reason: "Git-Ignored", size: "120 MB" },
  { name: ".env", status: "ignored", reason: "Safety Lock", size: "1 KB" },
  { name: "package-lock.json", status: "tracked", size: "240 KB" },
  { name: "dist/artifacts/", status: "ignored", reason: "Build Residue", size: "15 MB" },
];

const FeatureCard = ({ card, index, isInView }: { card: any; index: number; isInView: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 });
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
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "relative group rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 border overflow-hidden transition-all duration-500 min-h-[260px] sm:min-h-[300px] flex flex-col justify-between",
        card.className
      )}
    >
      <motion.div 
        style={{ left: spotlightX, top: spotlightY }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <div className={cn(
          "w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
          card.iconColor
        )}>
          <card.icon className="w-5 h-5 sm:w-7 sm:h-7" />
        </div>
        
        <h3 className="text-sm sm:text-xl font-black uppercase tracking-tight text-foreground mb-2 sm:mb-3">{card.title}</h3>
        <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed font-medium mb-4 line-clamp-3 sm:line-clamp-none">{card.desc}</p>
      </div>

      <div className="relative z-10 mt-auto" style={{ transform: "translateZ(40px)" }}>
        {card.title === "Blazingly Fast" && (
          <div className="bg-black/40 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 space-y-2 sm:space-y-3">
            <div className="flex justify-between text-[8px] sm:text-[10px] font-mono font-bold text-primary">
              <span>SCAN VELOCITY</span>
              <span className="animate-pulse">98% PEAK</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ["10%", "95%", "85%"] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="h-full bg-primary shadow-[0_0_15px_hsl(var(--primary))]" 
              />
            </div>
          </div>
        )}
        {card.title === "OS Trash Integration" && (
          <div className="flex items-center gap-3 sm:gap-4 bg-black/40 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex -space-x-2 sm:-space-x-3">
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  animate={{ y: [15, -15], x: [0, (i-2)*8], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-lg"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                </motion.div>
              ))}
            </div>
            <div className="flex-1 text-[8px] sm:text-[10px] font-mono text-green-400/60 font-bold uppercase tracking-widest leading-none">
              Safe Sweep Active
            </div>
          </div>
        )}
        {card.title === "Project Launchpad" && (
          <div className="flex items-center gap-2 bg-primary/5 border border-primary/20 p-2 rounded-lg">
             <Terminal className="w-3 h-3 text-primary" />
             <span className="text-[8px] font-mono text-primary font-bold uppercase">Open in Cursor...</span>
          </div>
        )}
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
      desc: "Concurrent Go engine. Processes 100k+ files in sub-second intervals with zero lag.",
      icon: Zap,
      className: "col-span-2 bg-primary/10 border-primary/20",
      iconColor: "text-primary",
    },
    {
      title: "Environmental Doctor",
      desc: "Identifies and cleans unused versions of toolchains across Node, Rust, and Python.",
      icon: Stethoscope,
      className: "col-span-1 md:row-span-2",
      iconColor: "text-purple-400",
    },
    {
      title: "Orbital Stats",
      desc: "Live telemetry and cumulative savings history visualized in real-time.",
      icon: Activity,
      className: "col-span-1",
      iconColor: "text-pink-400",
    },
    {
      title: "OS Trash Integration",
      desc: "Never permanent. Moves debris to native Trash for an instant safety net.",
      icon: Trash2,
      className: "col-span-2 bg-green-500/10 border-green-500/20",
      iconColor: "text-green-400",
    },
    {
      title: "Project Launchpad",
      desc: "Fuzzy-search projects and instantly open them in VS Code, Cursor, or Terminal.",
      icon: MousePointer2,
      className: "col-span-1",
      iconColor: "text-blue-400",
    },
    {
      title: "Git Index Intel",
      desc: "Queries git ls-files to discover project-specific ignored paths dynamically.",
      icon: Search,
      className: "col-span-1",
      iconColor: "text-indigo-400",
    },
    {
      title: "Interactive TUI",
      desc: "Terminal dashboard with fuzzy search and keyboard-driven navigation.",
      icon: Terminal,
      className: "col-span-2 sm:col-span-1",
      iconColor: "text-pink-400",
    },
    {
      title: "CI/CD Ready",
      desc: "Native JSON output and headless flags for automated cleanup in build pipelines.",
      icon: Rocket,
      className: "col-span-2 md:col-span-2 bg-white/5 border-white/10",
      iconColor: "text-indigo-400",
    },
  ];

  return (
    <section id="features" ref={containerRef} className="relative z-10 py-24 sm:py-48 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 sm:mb-32"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-8 sm:mb-10"
          >
            <Scan className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" /> Scanning Protocol Active
          </motion.div>
          <h2 className="text-4xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] sm:leading-[0.8] mb-8 sm:mb-10 font-display italic">
            Engineered <br />
            <span className="text-gradient-primary">To Discover.</span>
          </h2>
          <p className="text-sm sm:text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed px-4">
            Kessler doesn't just clean; it understands. Using a deep integration with your 
            <span className="text-foreground"> Git environment</span> to discover what generic tools miss.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 sm:mb-32">
          <div className="lg:col-span-5 space-y-8 sm:space-y-12">
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
                className="flex gap-4 sm:gap-6 group"
              >
                <div className={cn("w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10", item.color)}>
                  <item.icon className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h4 className="text-base sm:text-xl font-black uppercase tracking-tight mb-1 sm:mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-[3rem] opacity-30 animate-pulse" />
            <div className="relative glass-strong rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 p-6 sm:p-12 overflow-hidden shadow-2xl min-h-[400px] sm:min-h-[500px] flex flex-col">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
              
              <div className="relative z-10 flex items-center justify-between mb-8 sm:mb-10 pb-4 sm:pb-6 border-b border-white/5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest">Live Telemetry: Deep Scan</span>
                </div>
                <div className="text-[8px] sm:text-[10px] font-mono text-muted-foreground/40 font-bold tracking-tighter">EST SAVINGS: 1.2 GB</div>
              </div>

              <div className="relative z-10 flex-1 space-y-3 sm:space-y-5">
                {treeData.map((item, i) => (
                  <motion.div 
                    key={item.name}
                    animate={{ 
                      opacity: activeScanIndex === i ? 1 : 0.4,
                      x: activeScanIndex === i ? 10 : 0,
                      scale: activeScanIndex === i ? 1.02 : 1
                    }}
                    className={cn(
                      "flex items-center justify-between p-3 sm:p-4 rounded-xl border transition-all duration-300",
                      activeScanIndex === i ? "bg-primary/10 border-primary/30" : "bg-white/5 border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={cn(
                        "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full",
                        item.status === 'ignored' ? "bg-primary" : "bg-muted-foreground/30"
                      )} />
                      <span className={cn(
                        "font-mono text-[10px] sm:text-xs font-bold truncate max-w-[100px] sm:max-w-none",
                        activeScanIndex === i ? "text-primary" : "text-foreground/70"
                      )}>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="text-[8px] sm:text-[9px] font-mono text-muted-foreground/40 font-bold">{item.size}</span>
                      <div className={cn(
                        "px-1.5 py-0.5 rounded text-[7px] sm:text-[8px] font-black uppercase tracking-tighter border",
                        item.status === 'ignored' ? "border-primary/40 text-primary bg-primary/5" : "border-white/5 text-muted-foreground/20"
                      )}>
                        {item.status === 'ignored' ? item.reason.split(' ')[0] : "Tracked"}
                      </div>
                      {activeScanIndex === i && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-primary/10 to-transparent z-20 pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bentoCards.map((card, i) => (
            <FeatureCard key={card.title} card={card} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
