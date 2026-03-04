import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaNodeJs, FaPython, FaRust, FaPhp, FaGem, FaJava } from "react-icons/fa";
import { SiGo, SiDotnet, SiElixir, SiTerraform } from "react-icons/si";

const ecosystems = [
  { name: "Node.js", targets: "node_modules, dist, .next, .nuxt", icon: FaNodeJs, color: "text-green-400" },
  { name: "Python", targets: "__pycache__, venv, .pytest_cache", icon: FaPython, color: "text-yellow-400" },
  { name: "Rust", targets: "target", icon: FaRust, color: "text-orange-400" },
  { name: "Go", targets: "vendor", icon: SiGo, color: "text-cyan-400" },
  { name: "Java / JVM", targets: "target, build, .gradle", icon: FaJava, color: "text-red-400" },
  { name: "PHP", targets: "vendor", icon: FaPhp, color: "text-indigo-400" },
  { name: ".NET / C#", targets: "bin, obj, packages", icon: SiDotnet, color: "text-purple-400" },
  { name: "Ruby", targets: "vendor/bundle, .bundle", icon: FaGem, color: "text-rose-400" },
  { name: "Elixir", targets: "deps, _build", icon: SiElixir, color: "text-violet-400" },
  { name: "Terraform", targets: ".terraform, cdk.out", icon: SiTerraform, color: "text-blue-400" },
];

const EcosystemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient-primary">10+ ecosystems</span> supported
          </h2>
          <p className="text-muted-foreground text-lg">
            Context-aware rules engine — add your own via <code className="text-primary/80 bg-secondary/50 px-1.5 py-0.5 rounded text-xs">rules.yaml</code>
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {ecosystems.map((eco, i) => {
            const Icon = eco.icon;
            return (
              <motion.div
                key={eco.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="glass rounded-xl p-4 text-center hover:border-primary/30 transition-all duration-300 group cursor-default"
              >
                <div className={`text-3xl mb-2 flex justify-center ${eco.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon />
                </div>
                <p className="text-sm font-semibold text-foreground">{eco.name}</p>
                <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {eco.targets}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
