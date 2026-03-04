import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GitBranch, Lock, Trash2 } from "lucide-react";

const pillars = [
  {
    icon: GitBranch,
    title: "Respects Git",
    description: "A folder named vendor/ might be junk in one project but committed source in another. If Git tracks it, Kessler ignores it.",
  },
  {
    icon: Lock,
    title: "Respects State",
    description: "Never targets lockfiles (package-lock.json, Cargo.lock) or environment secrets (.env). Your reproducibility is sacred.",
  },
  {
    icon: Trash2,
    title: "Respects the OS",
    description: "Moves files to Trash instead of permanent deletion. A mistaken sweep is an easy fix, not catastrophic data loss.",
  },
];

const SafetySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 py-32 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Safety is <span className="text-gradient-accent">non-negotiable</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built with developer trust as its core tenet. Three pillars protect your work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="glass-strong rounded-2xl p-8 text-center group hover:border-accent/30 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
