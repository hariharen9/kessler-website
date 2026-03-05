import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Copy, Apple, Wind, Terminal, Package, Box, Download, ArrowRight } from "lucide-react";
import { SiGo } from "react-icons/si";

const installMethods = [
  { 
    id: "brew",
    label: "Homebrew", 
    icon: Apple,
    command: "brew tap hariharen9/tap && brew install kessler",
    platform: "macOS / Linux"
  },
  { 
    id: "npm",
    label: "NPM", 
    icon: Package,
    command: "npm install -g kessler-cli", 
    alt: "npx kessler-cli ~/Projects",
    platform: "Node.js (Cross-platform)"
  },
  { 
    id: "go",
    label: "Go", 
    icon: SiGo,
    command: "go install github.com/hariharen9/kessler@latest",
    platform: "Developer (Go installed)"
  },
  { 
    id: "scoop",
    label: "Scoop", 
    icon: Wind,
    command: "scoop bucket add hariharen9 https://github.com/hariharen9/scoop-bucket && scoop install kessler",
    platform: "Windows"
  },
  { 
    id: "apt",
    label: "Debian", 
    icon: Box,
    command: "sudo dpkg -i kessler_*.deb",
    note: "Download .deb from releases",
    platform: "Ubuntu / Debian"
  },
  { 
    id: "aur",
    label: "AUR", 
    icon: Terminal,
    command: "yay -S kessler-bin",
    platform: "Arch Linux"
  },
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button 
      onClick={handleCopy} 
      className={`p-2 rounded-lg transition-all duration-300 border ${
        copied ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/10 text-muted-foreground hover:text-primary hover:border-primary/50"
      }`}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

const InstallSection = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="install" className="relative z-10 py-32 px-4 overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-black uppercase tracking-widest mb-6">
            <Download className="w-3 h-3" /> Distribution
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            <span className="text-gradient-accent">Deploy</span> in seconds
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Binary distribution for every major platform. Reclaim your space with zero friction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Platform Selector */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2">
            {installMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-300 text-left group ${
                    active === i
                      ? "bg-accent/10 border-accent/30 text-accent shadow-lg shadow-accent/5"
                      : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/10"
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${active === i ? "bg-accent/20 text-accent" : "bg-white/5 text-muted-foreground group-hover:text-foreground"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-black uppercase tracking-tight">{method.label}</div>
                    <div className="text-[10px] opacity-60 font-medium">{method.platform}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Code Terminal */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-strong rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Terminal Header */}
              <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Installation — {installMethods[active].label}
                </div>
                <div className="w-10" />
              </div>

              {/* Terminal Body */}
              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-mono text-sm sm:text-base break-all">
                      <span className="text-accent mr-3 select-none">$</span>
                      <span className="text-foreground/90">{installMethods[active].command}</span>
                    </div>
                    <CopyButton text={installMethods[active].command} />
                  </div>
                  
                  {installMethods[active].note && (
                    <div className="text-[11px] text-accent/60 italic font-medium bg-accent/5 p-2 rounded-lg border border-accent/10 inline-block">
                      Note: {installMethods[active].note}
                    </div>
                  )}
                </div>

                {(installMethods[active].alt) && (
                  <div className="pt-8 border-t border-white/5 space-y-4">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-black">Alternative / One-off Run</div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-mono text-sm sm:text-base break-all opacity-70">
                        <span className="text-accent mr-3 select-none">$</span>
                        <span className="text-foreground/90">{installMethods[active].alt}</span>
                      </div>
                      <CopyButton text={installMethods[active].alt || ""} />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Command Reference */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass p-5 rounded-2xl border-white/5 group hover:border-primary/20 transition-all">
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">Live TUI</div>
                <code className="text-xs text-foreground/80 block mb-1">kessler ~/Projects</code>
                <p className="text-[10px] text-muted-foreground">Interactive dashboard.</p>
              </div>
              <div className="glass p-5 rounded-2xl border-white/5 group hover:border-primary/20 transition-all">
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">CI Mode</div>
                <code className="text-xs text-foreground/80 block mb-1">kessler scan --json</code>
                <p className="text-[10px] text-muted-foreground">JSON output for automation.</p>
              </div>
              <div className="glass p-5 rounded-2xl border-white/5 group hover:border-primary/20 transition-all">
                <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">Deep Clean</div>
                <code className="text-xs text-foreground/80 block mb-1">kessler . --deep</code>
                <p className="text-[10px] text-muted-foreground">Include build outputs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallSection;
