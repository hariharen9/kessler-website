import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GitBranch, Lock, Trash2, ShieldCheck, AlertCircle, CheckCircle2, XCircle, Activity } from "lucide-react";

const pillars = [
  {
    icon: GitBranch,
    title: "The Git Safety Net",
    description: "Before Kessler flags any folder, it queries 'git ls-files'. If a folder contains files actively tracked by version control, Kessler immediately aborts and ignores it.",
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    icon: Activity,
    title: "Active Project Protection",
    description: "Kessler checks running processes and warns you if you try to clean a project while its dev server is still running. No more accidental mid-dev deletions.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    gadget: (
      <div className="mt-4 flex items-center gap-2 bg-orange-400/5 border border-orange-400/10 p-2 rounded-lg">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400"></span>
        </div>
        <span className="text-[8px] font-mono text-orange-400 font-bold uppercase tracking-widest">PID: 48291 (Vite) ACTIVE</span>
      </div>
    )
  },
  {
    icon: Lock,
    title: "Respects Build State",
    description: "It never targets files required to reproduce a build (like package-lock.json or Cargo.lock) or environment secrets (.env). Your source is sacred.",
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    icon: Trash2,
    title: "OS Trash Integration",
    description: "Moves files to your native Trash/Recycle Bin instead of permanent deletion. A mistaken sweep is an easy fix, not a catastrophic data loss event.",
    color: "text-green-400",
    bg: "bg-green-400/10"
  },
];

const SafetySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 py-32 px-4 overflow-x-clip">
      {/* Decorative background effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3 h-3" /> Security First
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            Developer <span className="text-gradient-primary">Trust</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Kessler is built with a "Safe by Default" philosophy. We protect your work through three non-negotiable pillars.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass-strong rounded-3xl p-8 group hover:border-white/20 transition-all duration-500 relative overflow-hidden"
              >
                <div className={`w-14 h-14 rounded-2xl ${pillar.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${pillar.color}`} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-foreground mb-4">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">{pillar.description}</p>
                {pillar.gadget && pillar.gadget}
              </motion.div>
            );
          })}
        </div>

        {/* Git-Aware Safety Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass-strong rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* The Blind Way */}
            <div className="p-10 border-b md:border-b-0 md:border-r border-white/5 bg-red-500/5">
              <div className="flex items-center gap-3 text-red-400 mb-8">
                <AlertCircle className="w-6 h-6" />
                <span className="text-sm font-black uppercase tracking-widest">Generic Cleanup Tool</span>
              </div>
              <div className="space-y-6">
                <div className="font-mono text-[11px] sm:text-xs bg-black/40 p-5 rounded-xl border border-red-500/20 text-red-200/80 leading-relaxed min-h-[160px]">
                  <div className="flex gap-2">
                    <span className="text-red-500/50">$</span>
                    <span>blind-tool clean .</span>
                  </div>
                  <div className="mt-4 space-y-1">
                    <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-red-400">DELETING bin/kessler.exe ...</motion.div>
                    <div className="text-red-400">DELETING dist/index.js ...</div>
                    <div className="text-red-500 font-bold mt-2 underline">CRITICAL: bin/kessler.exe was tracked by Git!</div>
                    <div className="text-red-500/60 italic">Error: Source file lost. No recovery.</div>
                  </div>
                </div>
                <p className="text-xs text-red-200/40 font-medium text-center uppercase tracking-widest">Generic scripts lack context.</p>
              </div>
            </div>

            {/* The Kessler Way */}
            <div className="p-10 bg-primary/5">
              <div className="flex items-center gap-3 text-primary mb-8">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-sm font-black uppercase tracking-widest">Kessler Git Safety Net</span>
              </div>
              <div className="space-y-6">
                <div className="font-mono text-[11px] sm:text-xs bg-black/40 p-5 rounded-xl border border-primary/20 text-primary/80 leading-relaxed min-h-[160px]">
                  <div className="flex gap-2">
                    <span className="text-primary/50">$</span>
                    <span>kessler clean .</span>
                  </div>
                  <div className="mt-4 space-y-1">
                    <div className="text-muted-foreground/60">{">"} git ls-files --cached --others</div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-400 font-bold flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3 h-3" /> PROTECTED: bin/kessler.exe (Git Tracked)
                    </motion.div>
                    <div className="text-primary">TRASHING node_modules/ ...</div>
                    <div className="text-green-400/60 mt-2 font-black">SCAN COMPLETE: 0 Tracked Files Touched.</div>
                  </div>
                </div>
                <p className="text-xs text-primary/40 font-medium text-center uppercase tracking-widest">Kessler respects your Git index.</p>
              </div>
            </div>

          </div>
        </motion.div>
        
        <div className="mt-12 text-center">
           <p className="text-muted-foreground text-sm font-medium italic">
             "Don't trust your source code to a blind script. Kessler respects your Git index."
           </p>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
