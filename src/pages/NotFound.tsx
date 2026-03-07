import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket } from "lucide-react";
import StarField from "@/components/StarField";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-background text-foreground flex items-center justify-center overflow-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <StarField />
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-2xl mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="text-[12rem] md:text-[16rem] font-display font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-foreground/10 to-foreground/5 select-none"
        >
          404
        </motion.div>
        
        <div className="-mt-12 sm:-mt-16 md:-mt-24 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-black uppercase tracking-widest mb-6">
            <Rocket className="w-4 h-4 animate-bounce-slow" /> Lost in Deep Space
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">
            Trajectory <span className="text-red-400">Failed</span>.
          </h1>
          
          <p className="text-lg text-muted-foreground font-medium mb-10 max-w-lg mx-auto">
            The coordinates <code className="text-primary bg-primary/10 px-2 py-0.5 rounded ml-1 font-mono">{location.pathname}</code> lead to empty vacuum. This sector has likely been swept by the Kessler Engine.
          </p>

          <Button variant="hero" size="xl" className="rounded-full shadow-[0_0_20px_-5px_rgba(0,230,195,0.4)]" asChild>
            <a href="/">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Base
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Decorative framing */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/5" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/5" />
    </div>
  );
};

export default NotFound;
