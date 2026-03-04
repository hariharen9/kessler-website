import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

const installMethods = [
  { label: "npm", command: "npm install -g kessler", alt: "npx kessler ~/Projects" },
  { label: "Homebrew", command: "brew tap hariharen9/tap && brew install kessler" },
  { label: "Go", command: "go install github.com/hariharen9/kessler@latest" },
  { label: "Scoop", command: "scoop bucket add hariharen9 https://github.com/hariharen9/scoop-bucket && scoop install kessler" },
  { label: "AUR", command: "yay -S kessler-bin" },
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="text-muted-foreground hover:text-primary transition-colors">
      {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};

const InstallSection = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="install" className="relative z-10 py-32 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="text-gradient-accent">Install</span> in seconds
          </h2>
          <p className="text-muted-foreground text-lg">
            Available on every platform. Pick your weapon.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-2xl overflow-hidden"
        >
          {/* Tabs */}
          <div className="flex border-b border-border/50 overflow-x-auto">
            {installMethods.map((method, i) => (
              <button
                key={method.label}
                onClick={() => setActive(i)}
                className={`px-5 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                  active === i
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>

          {/* Command */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="font-mono text-sm">
                <span className="text-primary mr-2">$</span>
                <span className="text-foreground/90">{installMethods[active].command}</span>
              </div>
              <CopyButton text={installMethods[active].command} />
            </div>
            {installMethods[active].alt && (
              <div className="mt-4 pt-4 border-t border-border/30 font-mono text-sm">
                <span className="text-muted-foreground mr-2"># or use without installing</span>
                <br />
                <span className="text-primary mr-2">$</span>
                <span className="text-foreground/90">{installMethods[active].alt}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Usage preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 glass rounded-2xl p-6"
        >
          <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Quick Start</p>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <span className="text-primary">$</span>{" "}
              <span className="text-foreground/80">kessler ~/Projects</span>
              <span className="text-muted-foreground ml-4"># Launch interactive TUI</span>
            </div>
            <div>
              <span className="text-primary">$</span>{" "}
              <span className="text-foreground/80">kessler scan ~/Projects --json</span>
              <span className="text-muted-foreground ml-4"># CI mode with JSON</span>
            </div>
            <div>
              <span className="text-primary">$</span>{" "}
              <span className="text-foreground/80">kessler clean ~/Projects --dry-run</span>
              <span className="text-muted-foreground ml-4"># Preview cleanup</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstallSection;
