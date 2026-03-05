import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, Zap } from "lucide-react";

const tools = [
  {
    name: "Kessler",
    isKessler: true,
    features: {
      gitAware: "✅ (git ls-files)",
      globalCaches: "✅ (Docker, npm, Brew)",
      modeTiers: "✅ (Safe vs Deep)",
      gitignoreIntelligence: "✅ (Deep Scan)",
      osTrash: "✅ (+ Windows)",
      speed: "Concurrent",
    }
  },
  {
    name: "Kondo",
    isKondo: true,
    features: {
      gitAware: "❌",
      globalCaches: "❌",
      modeTiers: "❌",
      gitignoreIntelligence: "❌",
      osTrash: "✅",
      speed: "Fast",
    }
  },
  {
    name: "npkill",
    features: {
      gitAware: "❌",
      globalCaches: "❌",
      modeTiers: "❌",
      gitignoreIntelligence: "❌",
      osTrash: "❌",
      speed: "Slow",
    }
  },
  {
    name: "cargo clean",
    features: {
      gitAware: "❌",
      globalCaches: "❌",
      modeTiers: "❌",
      gitignoreIntelligence: "❌",
      osTrash: "❌",
      speed: "Fast",
    }
  },
];

const featureLabels = {
  gitAware: "Git Safety Net",
  globalCaches: "Global Caches",
  modeTiers: "Mode Tiers",
  gitignoreIntelligence: ".gitignore Scan",
  osTrash: "OS Trash Integration",
  speed: "Scan Performance",
};

const ComparisonChart = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 py-32 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            <Zap className="w-3 h-3" /> The Enterprise Choice
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6 font-display">
            The <span className="text-gradient-accent">Kondo Killer</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kessler vs. the competition: why the world's best engineering teams choose Kessler.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[900px]">
            {/* Header */}
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider self-end pb-4">
                Feature
              </div>
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className={`text-center p-6 rounded-t-2xl transition-all ${
                    tool.isKessler
                      ? "bg-primary/10 border-x-2 border-t-2 border-primary/40 shadow-[0_-10px_30px_-10px_rgba(125,86,244,0.2)]"
                      : tool.isKondo
                      ? "bg-white/5 border-x border-t border-white/20"
                      : "bg-white/5 border-x border-t border-white/10 opacity-60"
                  }`}
                >
                  <div className={`font-black text-xl uppercase tracking-tighter ${tool.isKessler ? "text-primary" : "text-foreground"}`}>
                    {tool.name}
                  </div>
                  {tool.isKessler && (
                    <div className="text-[10px] text-primary/70 font-black uppercase tracking-widest mt-1">
                      The Standard
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Feature Rows */}
            <div className="space-y-2">
              {Object.entries(featureLabels).map(([key, label], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  className="grid grid-cols-5 gap-4 items-center"
                >
                  <div className="text-sm font-bold text-foreground/80 py-4 uppercase tracking-tight">
                    {label}
                  </div>
                  {tools.map((tool) => {
                    const value = tool.features[key as keyof typeof tool.features];
                    const isKessler = tool.isKessler;
                    const isKondo = tool.isKondo;
                    
                    const isSuccess = typeof value === 'string' && value.includes('✅');
                    const isFailure = typeof value === 'string' && value.includes('❌');

                    return (
                      <div
                        key={tool.name}
                        className={`text-center p-5 rounded-xl transition-all ${
                          isKessler
                            ? "bg-primary/5 border-x-2 border-primary/20"
                            : isKondo
                            ? "bg-white/5 border-x border-white/10"
                            : "bg-white/5 border-x border-white/5 opacity-60"
                        }`}
                      >
                        <span
                          className={`text-[13px] font-black uppercase tracking-tight ${
                            isSuccess ? "text-green-400" : 
                            isFailure ? "text-red-400/50" :
                            isKessler ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {value}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </div>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold">
                <Zap className="w-4 h-4" />
                One tool to rule them all — no more ecosystem-specific cleanup commands
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonChart;
