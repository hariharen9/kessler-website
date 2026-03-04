import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, Zap } from "lucide-react";

const tools = [
  {
    name: "Kessler",
    isKessler: true,
    features: {
      multiEcosystem: true,
      gitAware: true,
      interactive: true,
      safeDelete: true,
      gitignoreIntelligence: true,
      speed: "Concurrent",
      crossPlatform: true,
      singleCommand: true,
    }
  },
  {
    name: "npkill",
    features: {
      multiEcosystem: false,
      gitAware: false,
      interactive: true,
      safeDelete: false,
      gitignoreIntelligence: false,
      speed: "Slow",
      crossPlatform: true,
      singleCommand: false,
    }
  },
  {
    name: "cargo clean",
    features: {
      multiEcosystem: false,
      gitAware: false,
      interactive: false,
      safeDelete: false,
      gitignoreIntelligence: false,
      speed: "Fast",
      crossPlatform: true,
      singleCommand: false,
    }
  },
  {
    name: "Manual Scripts",
    features: {
      multiEcosystem: false,
      gitAware: false,
      interactive: false,
      safeDelete: false,
      gitignoreIntelligence: false,
      speed: "Varies",
      crossPlatform: false,
      singleCommand: false,
    }
  },
];

const featureLabels = {
  multiEcosystem: "Multi-Ecosystem (10+)",
  gitAware: "Git Safety Net",
  interactive: "Interactive TUI",
  safeDelete: "OS Trash Integration",
  gitignoreIntelligence: ".gitignore Intelligence",
  speed: "Scan Performance",
  crossPlatform: "Cross-Platform",
  singleCommand: "Single Command Cleanup",
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
            <Zap className="w-3 h-3" /> The Clear Winner
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6 font-display">
            How Kessler <span className="text-gradient-accent">Stacks Up</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kessler vs. ecosystem-specific tools: built for modern polyglot development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Feature
              </div>
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className={`text-center p-4 rounded-t-xl ${
                    tool.isKessler
                      ? "bg-primary/10 border-2 border-primary/30"
                      : "glass border border-white/10"
                  }`}
                >
                  <div className={`font-bold text-lg ${tool.isKessler ? "text-primary" : "text-foreground"}`}>
                    {tool.name}
                  </div>
                  {tool.isKessler && (
                    <div className="text-[10px] text-primary/70 uppercase tracking-widest mt-1">
                      Recommended
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
                  <div className="text-sm font-medium text-foreground/90 py-4">
                    {label}
                  </div>
                  {tools.map((tool) => {
                    const value = tool.features[key as keyof typeof tool.features];
                    const isKessler = tool.isKessler;
                    
                    return (
                      <div
                        key={tool.name}
                        className={`text-center p-4 rounded-lg ${
                          isKessler
                            ? "bg-primary/5 border border-primary/20"
                            : "glass border border-white/5"
                        }`}
                      >
                        {typeof value === "boolean" ? (
                          value ? (
                            <Check className={`w-5 h-5 mx-auto ${isKessler ? "text-primary" : "text-green-400"}`} />
                          ) : (
                            <X className="w-5 h-5 mx-auto text-muted-foreground/40" />
                          )
                        ) : (
                          <span
                            className={`text-sm font-bold ${
                              isKessler
                                ? "text-primary"
                                : value === "Blazing" || value === "Medium"
                                ? "text-foreground/70"
                                : "text-muted-foreground/60"
                            }`}
                          >
                            {value}
                          </span>
                        )}
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
