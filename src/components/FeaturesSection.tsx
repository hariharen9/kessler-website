import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Brain, Trash2, Palette, Terminal, GitBranch, Settings, Cpu, Gauge } from "lucide-react";

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bentoCards = [
    {
      title: "Blazingly Fast",
      desc: "Written in Go with concurrent scanning. Processes massive trees in milliseconds.",
      icon: Zap,
      className: "md:col-span-2 md:row-span-1 bg-primary/5 border-primary/20",
      iconColor: "text-primary",
    },
    {
      title: "Git Safety Net",
      desc: "Queries git ls-files to ensure tracked files are never touched.",
      icon: Shield,
      className: "md:col-span-1 md:row-span-1 bg-accent/5 border-accent/20",
      iconColor: "text-accent",
    },
    {
      title: "Context-Aware",
      desc: "Identifies ecosystems before targeting artifacts.",
      icon: Brain,
      className: "md:col-span-1 md:row-span-2 bg-white/5 border-white/10",
      iconColor: "text-purple-400",
    },
    {
      title: "Beautiful TUI",
      desc: "Interactive dashboard with live telemetry.",
      icon: Palette,
      className: "md:col-span-1 md:row-span-1 bg-white/5 border-white/10",
      iconColor: "text-pink-400",
    },
    {
      title: "OS Trash Integration",
      desc: "Safety first. Mistakes are an easy undo.",
      icon: Trash2,
      className: "md:col-span-2 md:row-span-1 bg-green-500/5 border-green-500/20",
      iconColor: "text-green-400",
    },
    {
      title: "Custom Rules",
      desc: "Extend the built-in engine with your own rules.yaml.",
      icon: Settings,
      className: "md:col-span-1 md:row-span-1 bg-white/5 border-white/10",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <section id="features" className="relative z-10 py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            <Gauge className="w-3 h-3" /> Performance
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            Engineered for <span className="text-gradient-primary">Power</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Kessler isn't just another script. It's a high-performance engine designed to manage the chaos of modern development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto md:auto-rows-[180px]">
          {bentoCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`glass rounded-[2rem] p-6 sm:p-8 border relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 ${card.className} md:min-h-0 min-h-[160px]`}
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${card.iconColor} group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-foreground mb-2">{card.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-medium line-clamp-2">{card.desc}</p>
                </div>
              </div>
              
              {/* Subtle background glow */}
              <div className={`absolute -right-4 -bottom-4 w-24 h-24 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity ${card.className.split(' ')[2]}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
