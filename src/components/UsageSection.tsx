import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, Shield, Scan, Cpu, Zap, Search, Globe, PowerOff } from "lucide-react";

const commands = [
  {
    category: "Interactive Interface",
    items: [
      {
        cmd: "kessler",
        desc: "Launch the full interactive TUI dashboard. Auto-scans the current directory.",
        icon: Terminal
      },
      {
        cmd: "kessler ~/Projects",
        desc: "Scan a specific directory and launch the dashboard.",
        icon: Search
      }
    ]
  },
  {
    category: "Non-Interactive / CI",
    items: [
      {
        cmd: "kessler scan --json",
        desc: "Scan and report all artifacts in JSON format (perfect for piping to jq).",
        icon: Cpu
      },
      {
        cmd: "kessler clean . --confirm",
        desc: "Execute safe cleanup without asking for confirmation (script-friendly).",
        icon: Zap
      },
      {
        cmd: "kessler clean . --deep --force",
        desc: "Execute deep cleanup (including builds & binaries) and skip safety checks.",
        icon: PowerOff
      }
    ]
  },
  {
    category: "Auto-Pilot Daemon",
    items: [
      {
        cmd: "kessler daemon --start",
        desc: "Install background daemon. Runs weekly, sweeping stale debris >1GB.",
        icon: Shield
      },
      {
        cmd: "kessler daemon --status",
        desc: "Check the current status and schedule of your background monitor.",
        icon: Scan
      }
    ]
  },
  {
    category: "Rules Engine",
    items: [
      {
        cmd: "kessler rules update",
        desc: "Fetch and merge the latest crowd-sourced rules from the community.",
        icon: Globe
      }
    ]
  }
];

const UsageSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="usage" className="relative z-10 py-24 px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            <Terminal className="w-3 h-3" /> Command Line
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            Engine <span className="text-gradient-primary">Directives</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Kessler provides a comprehensive CLI for both interactive exploration and headless CI/CD automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {commands.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
              className="glass-strong rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col gap-6"
            >
              <h3 className="text-sm font-black text-foreground uppercase tracking-widest border-b border-white/5 pb-4">
                {group.category}
              </h3>
              
              <div className="space-y-6 flex-1">
                {group.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group/cmd">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-muted-foreground group-hover/cmd:text-primary group-hover/cmd:border-primary/30 group-hover/cmd:bg-primary/5 transition-all">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <code className="text-xs sm:text-sm font-bold text-primary/90 font-mono mb-1 block group-hover/cmd:text-primary transition-colors select-all">
                        {item.cmd}
                      </code>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsageSection;