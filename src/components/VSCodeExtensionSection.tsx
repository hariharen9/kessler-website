import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Zap, Shield, Search, Cpu, 
  ExternalLink, MousePointer2, 
  Layers, BarChart3, Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const VSCodeExtensionSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const features = [
    {
      icon: BarChart3,
      title: "Live Telemetry",
      desc: "Real-time debris tracking directly in your status bar. Watch your orbit clear as you work.",
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      icon: MousePointer2,
      title: "QuickPick UI",
      desc: "Beautiful, keyboard-driven interface to select and vaporize artifacts in seconds.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Shield,
      title: "Safety First",
      desc: "Moves debris to the native OS Trash. You always have an 'Undo' button for your orbit.",
      color: "text-green-400",
      bg: "bg-green-400/10"
    },
    {
        icon: Code2,
        title: "Native Performance",
        desc: "Written in pure TypeScript with zero dependencies. Lightweight and blazingly fast.",
        color: "text-orange-400",
        bg: "bg-orange-400/10"
    }
  ];

  return (
    <section id="vscode" ref={containerRef} className="relative z-10 py-24 sm:py-48 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/20 bg-blue-400/5 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                <Layers className="w-3 h-3" /> Extension
              </div>
              <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8 font-display italic">
                Kessler <br />
                <span className="text-blue-400">For VS Code</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed mb-10">
                The native VS Code brainchild of the original Kessler engine. 
                Experience <span className="text-foreground">real-time orbital telemetry</span> without ever leaving your editor.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {features.map((f, i) => (
                  <motion.div 
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="glass p-5 rounded-2xl border-white/5 group hover:border-blue-400/30 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl ${f.bg} ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <f.icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-black uppercase tracking-tight mb-2">{f.title}</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="hero" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-14 group" asChild>
                  <a href="https://marketplace.visualstudio.com/items?itemName=hariharen.kessler-vscode" target="_blank" rel="noopener noreferrer">
                    Install Extension
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </Button>
                <Button variant="hero-outline" className="rounded-full px-8 h-14" asChild>
                    <a href="https://github.com/hariharen9/kessler-extension" target="_blank" rel="noopener noreferrer">
                        View Source
                    </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Visual (Mockup) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative perspective-1000"
            >
              {/* VS Code Window Mockup */}
              <div className="glass-strong rounded-3xl border border-white/10 overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5)] bg-[#0d1117]">
                {/* Header */}
                <div className="bg-[#161b22] border-b border-white/5 px-6 py-4 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Code2 className="w-3 h-3 text-blue-400" />
                    Visual Studio Code — Kessler
                  </div>
                  <div className="w-10" />
                </div>

                {/* Content Area */}
                <div className="p-8 min-h-[400px] flex flex-col justify-center items-center relative">
                  <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
                  
                  {/* QuickPick Mockup */}
                  <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="w-full max-w-md bg-[#161b22] border border-blue-500/30 rounded-xl shadow-2xl z-10 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                      <Search className="w-4 h-4 text-blue-400" />
                      <div className="text-xs text-foreground/90 font-medium">Kessler: Select orbital debris to vaporize...</div>
                    </div>
                    <div className="p-1">
                      {[
                        { label: "node_modules", type: "Node.js", size: "840 MB", selected: true },
                        { label: "target/", type: "Rust", size: "420 MB", selected: true },
                        { label: "dist/", type: "Build", size: "15 MB", selected: false },
                        { label: "venv/", type: "Python", size: "180 MB", selected: true },
                      ].map((item, i) => (
                        <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${item.selected ? 'bg-blue-500/10 text-blue-400' : 'text-muted-foreground'}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded border ${item.selected ? 'bg-blue-500 border-blue-500' : 'border-white/20'}`} />
                            <span className="font-mono">{item.label}</span>
                            <span className="opacity-40 text-[10px] uppercase font-bold tracking-tighter">[{item.type}]</span>
                          </div>
                          <span className="font-mono text-[10px]">{item.size}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-500/5 px-4 py-2 border-t border-white/5 flex justify-between items-center">
                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-400/70">1.44 GB Selected</span>
                        <span className="text-[9px] font-mono text-muted-foreground/40">Press Enter to Vaporize</span>
                    </div>
                  </motion.div>

                  {/* Status Bar Mockup */}
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-blue-600 flex items-center justify-between px-4 z-20">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[9px] text-white font-bold">
                            <Zap className="w-2.5 h-2.5 fill-white" />
                            Main
                        </div>
                        <div className="w-px h-3 bg-white/20" />
                        <div className="text-[9px] text-white/80 font-medium">0 ⚠ 0 ⓧ</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <motion.div 
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center gap-1.5 text-[9px] text-white font-bold bg-white/10 px-2 h-full cursor-pointer hover:bg-white/20 transition-colors"
                        >
                            <span className="text-[10px]">🗑️</span>
                            🛰️ Kessler: 1.44 GB
                        </motion.div>
                        <div className="text-[9px] text-white font-medium">UTF-8</div>
                        <div className="text-[9px] text-white font-medium">TypeScript JSX</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full animate-pulse" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VSCodeExtensionSection;
