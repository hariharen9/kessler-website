import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Brain, Trash2, Palette, Terminal, GitBranch, Settings } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Blazingly Fast",
    description: "Written in Go with concurrent directory scanning. Processes massive trees in milliseconds.",
    color: "primary",
  },
  {
    icon: Brain,
    title: "Context-Aware Engine",
    description: "Looks for trigger files like package.json or Cargo.toml to identify ecosystems before targeting artifacts.",
    color: "primary",
  },
  {
    icon: GitBranch,
    title: ".gitignore Intelligence",
    description: "Dynamically queries Git to discover ignored directories unique to your project. Surfaces them for optional cleanup.",
    color: "accent",
  },
  {
    icon: Shield,
    title: "The Git Safety Net",
    description: "Before flagging any folder, it queries git ls-files. If Git tracks it, Kessler won't touch it.",
    color: "primary",
  },
  {
    icon: Trash2,
    title: "OS Trash Integration",
    description: "Moves debris to your native Trash instead of rm -rf. Mistakes are an easy undo, not catastrophic.",
    color: "accent",
  },
  {
    icon: Palette,
    title: "Beautiful TUI",
    description: "Powered by Bubble Tea with an interactive dashboard, live telemetry, ecosystem icons, and visual tracking.",
    color: "primary",
  },
  {
    icon: Terminal,
    title: "CI / Scripting Mode",
    description: "Non-interactive commands with JSON output, dry-run, filtering by size and age for automation.",
    color: "accent",
  },
  {
    icon: Settings,
    title: "Custom Rules",
    description: "Extend the built-in engine with your own rules.yaml — add ecosystems or targets without forking.",
    color: "primary",
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
          feature.color === "accent" 
            ? "bg-accent/10 text-accent" 
            : "bg-primary/10 text-primary"
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative z-10 py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">Engineered</span> for safety
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Not just another <code className="text-primary/80 bg-secondary/50 px-1.5 py-0.5 rounded text-xs">rm -rf</code> wrapper.
            Kessler understands your projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
