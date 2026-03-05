import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  GitBranch, Eye, EyeOff, ShieldCheck, FolderTree, 
  Zap, Brain, Trash2, Palette, Settings, Gauge, 
  Cpu, Lock, Search, Target
} from "lucide-react";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const treeData = [
    { name: "src/", type: "source", status: "tracked" },
    { name: "node_modules/", type: "junk", status: "ignored", reason: "Standard Rule" },
    { name: "experiment_logs/", type: "custom", status: "ignored", reason: ".gitignore Intelligence" },
    { name: "assets/cache/", type: "custom", status: "ignored", reason: ".gitignore Intelligence" },
    { name: ".env", type: "secret", status: "ignored", reason: "Safety Lock" },
    { name: "package.json", type: "source", status: "tracked" },
  ];

  const bentoCards = [
    {
      title: "Blazingly Fast",
      desc: "Written in Go with concurrent scanning. Processes massive trees in milliseconds.",
      icon: Zap,
      className: "md:col-span-2 md:row-span-1 bg-primary/5 border-primary/20",
      iconColor: "text-primary",
    },
    {
      title: "Context-Aware",
      desc: "Identifies ecosystems before targeting artifacts. Zero false positives.",
      icon: Brain,
      className: "md:col-span-1 md:row-span-1 bg-white/5 border-white/10",
      iconColor: "text-purple-400",
    },
    {
      title: "Beautiful TUI",
      desc: "Interactive dashboard with live telemetry and orbital stats.",
      icon: Palette,
      className: "md:col-span-1 md:row-span-1 bg-white/5 border-white/10",
      iconColor: "text-pink-400",
    },
    {
      title: "OS Trash Integration",
      desc: "Safety first. Moves debris to native Trash instead of permanent deletion.",
      icon: Trash2,
      className: "md:col-span-2 md:row-span-1 bg-green-500/5 border-green-500/20",
      iconColor: "text-green-400",
    },
    {
      title: "Custom Rules",
      desc: "Extend the built-in engine with your own project-specific rules.yaml.",
      icon: Settings,
      className: "md:col-span-1 md:row-span-1 bg-white/5 border-white/10",
      iconColor: "text-orange-400",
    },
    {
      title: "Deep Scan",
      desc: "Finds hidden ignored directories deep within nested monorepos.",
      icon: Search,
      className: "md:col-span-1 md:row-span-1 bg-white/5 border-white/10",
      iconColor: "text-blue-400",
    },
  ];

  return (
    <section id="features" className="relative z-10 py-32 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            <Cpu className="w-3 h-3" /> Engineered for Power
          </div>
          <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            Beyond <span className="text-gradient-primary">Static</span> Rules
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Kessler isn't just another script. It's a high-performance engine that dynamically queries your Git environment to discover ignored directories unique to your project.
          </p>
        </motion.div>

        {/* Git Intelligence Simulation Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-6">
              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                  <GitBranch className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-foreground font-black uppercase tracking-tight text-lg">Dynamic Discovery</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed font-medium">
                    Generic tools only know about <code className="text-primary/80 bg-primary/5 px-1.5 py-0.5 rounded text-xs font-mono">node_modules</code>. Kessler asks Git directly what's being ignored.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-foreground font-black uppercase tracking-tight text-lg">Safety Lock</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed font-medium">
                    Files like <code className="text-accent/80 bg-accent/5 px-1.5 py-0.5 rounded text-xs font-mono">.env</code> or lockfiles are automatically locked out of the cleanup scope.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 text-green-400">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-foreground font-black uppercase tracking-tight text-lg">Automated Adaptation</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed font-medium">
                    Whether it's custom ML model logs or heavy asset caches—if it's in your <code className="text-green-400/80 bg-green-400/5 px-1.5 py-0.5 rounded text-xs font-mono">.gitignore</code>, Kessler finds it.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Terminal Scan Simulation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="lg:col-span-7 glass-strong rounded-[2.5rem] border border-white/10 p-6 sm:p-10 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
            
            <div className="relative z-10 font-mono text-[10px] sm:text-xs">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5">
                <FolderTree className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">Git Intelligence Scan</span>
              </div>

              <div className="space-y-4">
                {treeData.map((item, i) => (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-muted-foreground/20 hidden sm:inline">0{i+1}</span>
                      <span className={`${
                        item.type === 'junk' ? 'text-primary font-bold' : 
                        item.type === 'custom' ? 'text-accent font-bold' : 
                        'text-muted-foreground/60'
                      } truncate max-w-[120px] sm:max-w-none`}>
                        {item.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3">
                      {item.status === 'ignored' ? (
                        <div className={`px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-tighter border ${
                          item.type === 'secret' ? 'border-red-500/30 text-red-400 bg-red-500/5' :
                          item.type === 'custom' ? 'border-accent/30 text-accent bg-accent/5' :
                          'border-primary/30 text-primary bg-primary/5'
                        }`}>
                          {item.reason}
                        </div>
                      ) : (
                        <div className="px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-tighter border border-white/5 text-muted-foreground/30">
                          Tracked
                        </div>
                      )}
                      {item.type === 'source' ? (
                        <Eye className="w-3.5 h-3.5 text-muted-foreground/20" />
                      ) : (
                        <EyeOff className={`w-3.5 h-3.5 ${item.type === 'secret' ? 'text-red-500/40' : 'text-primary/40'}`} />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-4 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-3 text-primary font-bold text-[10px] sm:text-xs">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(125,86,244,1)]" />
                  <span className="uppercase tracking-widest">Kessler Target List:</span>
                </div>
                <div className="text-foreground font-black text-[10px] sm:text-xs uppercase tracking-tighter">3 Ignored Artifacts</div>
              </div>
            </div>

            {/* Decorative scan line */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-accent/40 z-20 pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Performance Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[180px]">
          {bentoCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`glass-strong rounded-[2.5rem] p-6 sm:p-8 border relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 ${card.className} md:min-h-0 min-h-[160px]`}
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${card.iconColor} group-hover:scale-110 transition-transform shadow-lg`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-foreground mb-2">{card.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium line-clamp-2">{card.desc}</p>
                </div>
              </div>
              
              {/* Subtle background glow */}
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity ${card.className.split(' ').find(c => c.includes('bg-'))}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
