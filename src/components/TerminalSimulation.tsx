import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { HardDrive, Search, Shield, Zap, Box, Terminal as TerminalIcon, History, Globe, AlertTriangle } from "lucide-react";

const TerminalSimulation = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(1); // 1: Projects, 2: Global, 3: History

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "1") setActiveTab(1);
    if (event.key === "2") setActiveTab(2);
    if (event.key === "3") setActiveTab(3);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step === 0) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step]);

  const projects = [
    { name: "void-engine", size: "1.2 GB", type: "Rust", time: "2d", artifact: "target/" },
    { name: "nebula-api", size: "842.1 MB", type: "Python", time: "1d", artifact: ".venv" },
    { name: "event-horizon", size: "529.7 MB", type: "Node.js", time: "today", artifact: "node_modules" },
    { name: "star-tracker", size: "357.8 MB", type: "C++", time: "5d", artifact: "build/" },
    { name: "quant-core", size: "215.3 MB", type: "Go", time: "today", artifact: "dist/" },
  ];

  const globalCaches = [
    { name: "npm cache", size: "4.2 GB", icon: "📦" },
    { name: "cargo registry", size: "2.8 GB", icon: "🦀" },
    { name: "pip wheels", size: "1.1 GB", icon: "🐍" },
    { name: "homebrew bottle", size: "950 MB", icon: "🍺" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 sm:mt-16 relative group px-2 sm:px-0">
      {/* Terminal Header */}
      <div className="bg-[#1a1b26] rounded-t-xl border-x border-t border-white/10 p-3 sm:p-4 flex items-center justify-between shadow-2xl transition-colors group-hover:border-primary/30">
        <div className="flex gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#ff5f56] shadow-lg shadow-red-500/20" />
          <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#ffbd2e] shadow-lg shadow-yellow-500/20" />
          <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#27c93f] shadow-lg shadow-green-500/20" />
        </div>
        <div className="text-[9px] sm:text-[11px] text-muted-foreground font-mono uppercase tracking-[0.1em] sm:tracking-[0.2em] flex items-center gap-2 sm:gap-3">
          <TerminalIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/70" />
          kessler — tui — 120x40
        </div>
        <div className="w-10 sm:w-16" />
      </div>

      {/* Terminal Body */}
      <div className="bg-[#0b0d13] rounded-b-xl border border-white/10 p-4 sm:p-8 font-mono text-[10px] sm:text-sm shadow-2xl relative overflow-hidden min-h-[400px] sm:min-h-[500px] transition-colors group-hover:border-primary/20">
        {/* TUI Header Tabs */}
        <div className="flex gap-6 mb-8 border-b border-white/5 pb-3">
          <button 
            onClick={() => setActiveTab(1)}
            className={`px-3 py-1 rounded text-xs transition-all border ${activeTab === 1 ? "bg-primary/20 text-primary border-primary/40" : "text-muted-foreground/40 border-transparent hover:text-muted-foreground"}`}
          >
            [ 1: Projects ]
          </button>
          <button 
            onClick={() => setActiveTab(2)}
            className={`px-3 py-1 rounded text-xs transition-all border ${activeTab === 2 ? "bg-primary/20 text-primary border-primary/40" : "text-muted-foreground/40 border-transparent hover:text-muted-foreground"}`}
          >
            2: Global
          </button>
          <button 
            onClick={() => setActiveTab(3)}
            className={`px-3 py-1 rounded text-xs transition-all border ${activeTab === 3 ? "bg-primary/20 text-primary border-primary/40" : "text-muted-foreground/40 border-transparent hover:text-muted-foreground"}`}
          >
            3: History
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 1 && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-12 gap-6 lg:gap-10"
            >
              {/* Projects Main View */}
              <div className="col-span-12 lg:col-span-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <span className="text-primary bg-primary/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded text-[10px] sm:text-xs font-bold border border-primary/20 tracking-wider">🚀 KESSLER ENGINE</span>
                </div>

                <div className="text-muted-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 bg-white/5 p-2 sm:p-3 rounded-lg border border-white/5">
                  <span className="text-primary font-bold">{">"}</span>
                  {step === 0 ? (
                    <span className="animate-pulse flex items-center gap-2 text-[10px] sm:text-xs">
                      <Search className="w-3 h-3 sm:w-4 sm:h-4" /> Scanning... {progress}%
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-[10px] sm:text-xs truncate">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" /> Found 12 targets | <span className="text-accent font-bold">4.2 GB</span>
                    </span>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {projects.map((p, i) => (
                    <motion.div
                      key={p.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: step >= 1 ? 1 : 0, x: step >= 1 ? 0 : -10 }}
                      transition={{ delay: i * 0.1 }}
                      className={`flex items-center gap-2 sm:gap-4 p-2 sm:p-2.5 rounded-md transition-all ${i === 0 && step >= 1 ? "bg-primary/10 border border-primary/20" : "border border-transparent"}`}
                    >
                      <span className="text-primary/60 text-[10px] w-3">{i === 0 ? "→" : " "}</span>
                      <span className="text-primary/40 hidden sm:inline">[ ]</span>
                      <span className="text-green-400/80">
                        <Box className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                      <span className="flex-1 text-foreground/90 font-medium truncate text-[11px] sm:text-sm">
                        {p.name} <span className="text-[9px] text-primary/40 font-mono ml-1 hidden sm:inline">{p.artifact}</span>
                      </span>
                      <span className="text-muted-foreground/80 font-bold text-[10px] sm:text-xs">{p.size}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-white/5 text-[9px] sm:text-[11px] text-muted-foreground/50 flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 uppercase tracking-widest font-bold">
                  <span className="text-primary/60">↑/↓: Nav</span>
                  <span className="text-primary/60 hidden sm:inline">Space: Select</span>
                  <span className="text-accent/60">Enter: Cleanup</span>
                </div>
              </div>

              {/* Projects Sidebar - Hidden on mobile */}
              <div className="hidden lg:block lg:col-span-4 space-y-8">
                <div className="border border-white/10 rounded-xl p-5 bg-white/5 relative overflow-hidden group/card">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="flex items-center gap-3 mb-4 text-xs font-bold text-foreground/90 uppercase tracking-widest">
                    <HardDrive className="w-4 h-4 text-primary" />
                    Orbital Stats
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Disk Used</span>
                      <span className="text-foreground font-bold">42%</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "42%" }}
                        className="h-full bg-primary" 
                      />
                    </div>
                    <div className="pt-4 space-y-2">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Total Debris</span>
                        <span className="text-accent font-bold">4.2 GB</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Reclaimable</span>
                        <span className="text-primary font-bold">100%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-white/10 rounded-xl p-5 bg-white/5 group/card">
                  <div className="flex items-center gap-3 mb-4 text-xs font-bold text-foreground/90 uppercase tracking-widest">
                    <Search className="w-4 h-4 text-accent" />
                    Deep Preview
                  </div>
                  <div className="text-xs text-muted-foreground font-mono space-y-2">
                    <div className="text-green-400 font-bold">void-engine/</div>
                    <div className="ml-4 border-l border-white/10 pl-4 py-1 space-y-1">
                      <div className="flex justify-between">
                        <span>├── <span className="text-primary">target/</span></span>
                        <span className="text-muted-foreground/60 text-[10px]">1.1 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>└── <span className="text-primary">build/</span></span>
                        <span className="text-muted-foreground/60 text-[10px]">102 MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 2 && (
            <motion.div 
              key="global"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 text-accent bg-accent/10 p-4 rounded-xl border border-accent/20">
                <AlertTriangle className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Caution: Global caches are shared system resources.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {globalCaches.map((cache) => (
                  <div key={cache.name} className="glass p-5 rounded-xl border border-white/5 flex items-center justify-between group/cache hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{cache.icon}</span>
                      <div>
                        <div className="font-bold text-foreground/90">{cache.name}</div>
                        <div className="text-xs text-muted-foreground">System Cache Layer</div>
                      </div>
                    </div>
                    <div className="text-primary font-mono font-bold">{cache.size}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 3 && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 text-muted-foreground mb-6">
                <History className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Recent Cleanup Logs</span>
              </div>
              {[
                { date: "2024-03-01", action: "Nuked", target: "rust-workspace", saved: "12.4 GB" },
                { date: "2024-02-28", action: "Trashed", target: "node-junk", saved: "2.1 GB" },
                { date: "2024-02-25", action: "Cleaned", target: "global-npm", saved: "850 MB" },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-white/5 text-xs font-mono">
                  <span className="text-muted-foreground/40">{log.date}</span>
                  <span className="text-accent font-bold">[{log.action}]</span>
                  <span className="flex-1 text-foreground/80">{log.target}</span>
                  <span className="text-green-400 font-bold">+ {log.saved}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Keyboard Hint */}
      <div className="mt-4 text-center">
        <span className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.4em]">Press 1, 2, or 3 to switch views</span>
      </div>
    </div>
  );
};

export default TerminalSimulation;
