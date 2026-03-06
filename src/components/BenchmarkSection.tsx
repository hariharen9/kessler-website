import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Timer, Zap, Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

const benchmarks = [
  { name: "Kessler", time: 0.8, color: "bg-primary", logo: "🛰️", isKessler: true, note: "Concurrent Go" },
  { name: "cargo clean", time: 2.4, color: "bg-orange-500/40", logo: "🦀", note: "Standard Recursive" },
  { name: "npkill", time: 8.2, color: "bg-blue-500/40", logo: "📦", note: "Single-threaded JS" },
  { name: "Manual rm -rf", time: 12.5, color: "bg-red-500/40", logo: "🗑️", note: "I/O Bound" },
];

const BenchmarkSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section className="relative z-10 py-32 sm:py-48 px-4 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
            <Gauge className="w-3 h-3" /> Performance Telemetry
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
            The <span className="text-gradient-primary">Go</span> Advantage
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
            Benchmarked against a 500GB drive with 120+ projects. Kessler's concurrent worker pool delivers sub-second discovery.
          </p>
        </div>

        <div ref={ref} className="glass-strong rounded-[2.5rem] border border-white/10 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
          
          <div className="relative z-10 space-y-8">
            {benchmarks.map((item, i) => (
              <div key={item.name} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.logo}</span>
                    <span className={cn("font-black uppercase tracking-tight", item.isKessler ? "text-primary text-lg" : "text-foreground/60")}>
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">{item.note}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-sm font-bold">
                    <Timer className="w-3 h-3 text-muted-foreground/40" />
                    <span className={item.isKessler ? "text-primary" : "text-muted-foreground"}>{item.time}s</span>
                  </div>
                </div>
                
                <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${(item.time / 13) * 100}%` } : {}}
                    transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                    className={cn(
                      "h-full rounded-full relative",
                      item.color,
                      item.isKessler && "shadow-[0_0_20px_hsl(var(--primary))]"
                    )}
                  >
                    {item.isKessler && (
                      <motion.div 
                        animate={{ x: ["0%", "100%"], opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" 
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
                Kessler Engine
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                Competition
              </div>
            </div>
            <div className="text-[10px] font-mono text-primary font-bold bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              UP TO 15X FASTER DISCOVERY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenchmarkSection;
