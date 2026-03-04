import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GitBranch, Eye, EyeOff, ShieldCheck, FolderTree, ArrowDown } from "lucide-react";

const GitIntelligence = () => {
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

  return (
    <section className="relative z-10 py-32 px-4 overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-widest mb-4 sm:mb-6">
              <GitBranch className="w-3 h-3" /> Dynamic Discovery
            </div>
            <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-4 sm:mb-6 font-display">
              Beyond <span className="text-gradient-accent">Static</span> Rules
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
              Generic tools only know about <code className="text-primary/80 bg-primary/5 px-1.5 py-0.5 rounded text-sm font-mono">node_modules</code>. Kessler dynamically queries your Git environment to discover ignored directories unique to your project.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold uppercase tracking-tight text-sm">Automated Adaptation</h4>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">Whether it's custom ML model logs or heavy asset caches—if Git ignores it, Kessler finds it.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-accent">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold uppercase tracking-tight text-sm">Surgical Privacy</h4>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">Files like <code className="text-accent/80 font-mono">.env</code> or lockfiles are automatically excluded from the cleanup scope.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="glass-strong rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 p-6 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
            
            <div className="relative z-10 font-mono text-[10px] sm:text-xs">
              <div className="flex items-center gap-3 mb-6 sm:mb-8 pb-4 border-b border-white/5">
                <FolderTree className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground font-bold uppercase tracking-widest">Project Scan Simulation</span>
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
                    <div className="flex items-center gap-2 sm:gap-4">
                      <span className="text-muted-foreground/20 hidden sm:inline">0{i+1}</span>
                      <span className={`${
                        item.type === 'junk' ? 'text-primary font-bold' : 
                        item.type === 'custom' ? 'text-accent font-bold' : 
                        'text-muted-foreground/60'
                      } truncate max-w-[100px] sm:max-w-none`}>
                        {item.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-3">
                      {item.status === 'ignored' ? (
                        <div className={`px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-tighter border ${
                          item.type === 'secret' ? 'border-red-500/30 text-red-400 bg-red-500/5' :
                          item.type === 'custom' ? 'border-accent/30 text-accent bg-accent/5' :
                          'border-primary/30 text-primary bg-primary/5'
                        }`}>
                          {item.reason}
                        </div>
                      ) : (
                        <div className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-tighter border border-white/5 text-muted-foreground/30">
                          Tracked by Git
                        </div>
                      )}
                      {item.type === 'source' ? (
                        <Eye className="w-3 h-3 text-muted-foreground/20" />
                      ) : (
                        <EyeOff className={`w-3 h-3 ${item.type === 'secret' ? 'text-red-500/40' : 'text-primary/40'}`} />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 sm:mt-10 p-3 sm:p-4 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 text-primary font-bold text-[10px] sm:text-xs">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="hidden xs:inline uppercase">Kessler Result:</span>
                  <span className="xs:hidden">RESULT:</span>
                </div>
                <div className="text-foreground font-black text-[10px] sm:text-xs uppercase tracking-tighter">3 Artifacts Targeted</div>
              </div>
            </div>

            {/* Decorative scan line */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-accent/20 z-20 pointer-events-none"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GitIntelligence;
