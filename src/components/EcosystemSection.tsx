import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FaNodeJs, FaPython, FaRust, FaPhp, FaGem, FaJava } from "react-icons/fa";
import { SiGo, SiDotnet, SiElixir, SiTerraform } from "react-icons/si";
import { FileCode, FolderSearch, ArrowRight, Cog, Zap } from "lucide-react";

const ecosystems = [
  { 
    name: "Node.js", 
    triggers: ["package.json"],
    targets: ["node_modules", "dist", "build", ".next", ".nuxt", "coverage"], 
    icon: FaNodeJs, 
    color: "text-green-400",
    bg: "bg-green-400/10"
  },
  { 
    name: "Python", 
    triggers: ["requirements.txt", "pyproject.toml"],
    targets: ["__pycache__", "venv", ".venv", ".pytest_cache", ".mypy_cache"], 
    icon: FaPython, 
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  { 
    name: "Rust", 
    triggers: ["Cargo.toml"],
    targets: ["target/"], 
    icon: FaRust, 
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  { 
    name: "Go", 
    triggers: ["go.mod"],
    targets: ["vendor/"], 
    icon: SiGo, 
    color: "text-cyan-400",
    bg: "bg-cyan-400/10"
  },
  { 
    name: "Java / JVM", 
    triggers: ["pom.xml", "build.gradle"],
    targets: ["target/", "build/", ".gradle/"], 
    icon: FaJava, 
    color: "text-red-400",
    bg: "bg-red-400/10"
  },
  { 
    name: "Elixir", 
    triggers: ["mix.exs"],
    targets: ["deps/", "_build/"], 
    icon: SiElixir, 
    color: "text-violet-400",
    bg: "bg-violet-400/10"
  },
  { 
    name: "PHP", 
    triggers: ["composer.json"],
    targets: ["vendor/"], 
    icon: FaPhp, 
    color: "text-indigo-400",
    bg: "bg-indigo-400/10"
  },
  { 
    name: ".NET", 
    triggers: ["*.csproj", "*.sln"],
    targets: ["bin/", "obj/", "packages/"], 
    icon: SiDotnet, 
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  { 
    name: "Terraform", 
    triggers: [".terraform.lock.hcl"],
    targets: [".terraform/", "cdk.out/"], 
    icon: SiTerraform, 
    color: "text-sky-500",
    bg: "bg-sky-500/10"
  },
  { 
    name: "Ruby", 
    triggers: ["Gemfile"],
    targets: ["vendor/bundle", ".bundle"], 
    icon: FaGem, 
    color: "text-rose-400",
    bg: "bg-rose-400/10"
  },
];

const EcosystemSection = () => {
  const [selected, setSelected] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative z-10 py-32 px-4 overflow-hidden">
      {/* Background HUD elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                <Cog className="w-3 h-3 animate-spin-slow" /> Logic Engine
              </div>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                The <span className="text-gradient-primary">Rules</span> Engine
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Kessler doesn't guess. It analyzes your project structure using a dynamic trigger system to pinpoint debris with surgical precision.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass p-4 rounded-2xl border-white/5">
                <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1">
                  <Zap className="w-4 h-4" /> Zero False Positives
                </div>
                <p className="text-[11px] text-muted-foreground">Surgical identification ensures source code is never touched.</p>
              </div>
              <div className="glass p-4 rounded-2xl border-white/5">
                <div className="flex items-center gap-2 text-accent font-bold text-sm mb-1">
                  <FolderSearch className="w-4 h-4" /> Context-Aware
                </div>
                <p className="text-[11px] text-muted-foreground">Each ecosystem has its own lifecycle rules and safety tiers.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {ecosystems.map((eco, i) => {
                const Icon = eco.icon;
                return (
                  <button
                    key={eco.name}
                    onClick={() => setSelected(i)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-xs font-bold ${
                      selected === i 
                        ? `${eco.bg} ${eco.color} border-white/20 scale-105 shadow-lg` 
                        : "border-white/5 bg-white/5 text-muted-foreground hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {eco.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Visualization */}
          <div className="lg:col-span-7">
            <motion.div
              ref={ref}
              className="relative aspect-auto lg:h-[500px] min-h-[400px] glass-strong rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 p-6 sm:p-8 flex flex-col justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  {/* Visual Logic Flow */}
                  <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-md">
                    
                    {/* Trigger */}
                    <div className="w-full">
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-bold">Scanning for Triggers</div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {ecosystems[selected].triggers.map(t => (
                          <div key={t} className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 border border-white/10 rounded-lg text-primary font-mono text-[10px] sm:text-xs">
                            <FileCode className="w-3 h-3" /> {t}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative h-10 sm:h-12 w-px bg-gradient-to-b from-primary/50 to-accent/50">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]" />
                    </div>

                    {/* Result */}
                    <div className="w-full px-2 sm:px-0">
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 font-bold">Mapping Target Artifacts</div>
                      <div className="grid grid-cols-2 gap-2">
                        {ecosystems[selected].targets.map((t, idx) => (
                          <motion.div 
                            key={t}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-accent/5 border border-accent/20 rounded-lg text-accent font-mono text-[9px] sm:text-[10px] font-bold truncate"
                          >
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3 h-3 shrink-0" /> {t}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Status */}
                    <div className="mt-8 pt-8 border-t border-white/5 w-full flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        IDENTIFIED: {ecosystems[selected].name.toUpperCase()}
                      </div>
                      <div className="uppercase tracking-widest">Rules V2.4.0</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative HUD corners */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-xl" />
              <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-xl" />
              <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-xl" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
