import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useMemo } from "react";

const OrbitalScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Camera & Earth Transforms
  const scale = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [1.8, 1.3, 1.1, 0.9, 0.8]);
  const earthOpacity = useTransform(smoothProgress, [0, 0.05], [0.9, 1]);
  const rotate = useTransform(smoothProgress, [0, 1], [0, 45]);
  
  // Debris Multi-layers
  const debrisOpacity = useTransform(smoothProgress, [0.15, 0.35], [0, 1]);
  const debrisCount = useTransform(smoothProgress, [0.2, 0.6], [0, 1]);
  
  // Parallax Layers for debris
  const layer1Y = useTransform(smoothProgress, [0, 1], [0, -200]);
  const layer2Y = useTransform(smoothProgress, [0, 1], [0, -400]);
  const layer3Y = useTransform(smoothProgress, [0, 1], [0, 150]);
  
  // Cleanup Pulse & Fade
  const cleanOpacity = useTransform(smoothProgress, [0.72, 0.85], [0, 1]);
  const debrisFade = useTransform(smoothProgress, [0.75, 0.95], [1, 0]);
  const flashOpacity = useTransform(smoothProgress, [0.75, 0.8, 0.85], [0, 1, 0]);

  // Text overlays
  const text1Opacity = useTransform(smoothProgress, [0, 0.05, 0.15, 0.22], [1, 1, 1, 0]);
  const text2Opacity = useTransform(smoothProgress, [0.2, 0.28, 0.42, 0.48], [0, 1, 1, 0]);
  const text3Opacity = useTransform(smoothProgress, [0.5, 0.58, 0.68, 0.75], [0, 1, 1, 0]);
  const text4Opacity = useTransform(smoothProgress, [0.78, 0.85, 0.95, 1], [0, 1, 1, 0]);

  const satellites = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i,
    size: 2 + Math.random() * 4,
    orbitRadius: 130 + i * 20,
    speed: 10 + Math.random() * 15,
    delay: Math.random() * -20,
    color: i % 4 === 0 ? "hsl(var(--accent))" : "hsl(var(--primary))",
    hasBeam: i % 5 === 0,
  })), []);

  const createDebrisLayer = (count: number, range: number) => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * range,
      y: (Math.random() - 0.5) * range,
      size: 1 + Math.random() * 4,
      rotation: Math.random() * 360,
      delay: Math.random() * 3,
      duration: 5 + Math.random() * 10,
    }));

  const debrisLayer1 = useMemo(() => createDebrisLayer(25, 600), []);
  const debrisLayer2 = useMemo(() => createDebrisLayer(20, 800), []);
  const debrisLayer3 = useMemo(() => createDebrisLayer(15, 500), []);

  return (
    <div ref={containerRef} className="h-[300vh] relative z-10">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Top Fade for Seamless Transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent h-96 pointer-events-none z-20" />
        
        {/* Background Haze */}
        <div className="absolute inset-0 bg-radial-at-t from-primary/10 via-transparent to-transparent opacity-30" />
        
        {/* Lens Flare Group */}
        <div className="absolute top-1/4 right-1/4 w-0 h-0 pointer-events-none opacity-40">
          <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute w-32 h-32 bg-white/10 rounded-full blur-[40px] -translate-x-1/2 -translate-y-1/2" />
        </div>

        <motion.div
          style={{ scale, rotate }}
          className="relative w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] flex items-center justify-center"
        >
          {/* Earth / Hard Drive */}
          <motion.div
            style={{ opacity: earthOpacity }}
            className="absolute w-32 h-32 sm:w-56 sm:h-56 rounded-full"
          >
            {/* Atmospheric Glow */}
            <div className="absolute -inset-12 rounded-full bg-primary/20 blur-[60px] animate-pulse-glow" />
            
            {/* Earth Body */}
            <div className="absolute inset-0 rounded-full overflow-hidden border border-white/5 shadow-2xl">
              {/* Base Ocean */}
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 30%, 
                    hsl(200 80% 40%), 
                    hsl(215 70% 25%) 40%, 
                    hsl(230 60% 10%) 70%, 
                    hsl(230 50% 5%))`,
                }}
              />
              
              {/* Continents / Data Blocks */}
              <div className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage: `
                    radial-gradient(ellipse 40% 20% at 20% 40%, hsl(150 40% 45%), transparent),
                    radial-gradient(ellipse 30% 25% at 70% 30%, hsl(150 40% 40%), transparent),
                    radial-gradient(ellipse 50% 30% at 50% 75%, hsl(150 40% 35%), transparent)
                  `
                }}
              />

              {/* City Lights (Dark Side) - Simplified to a single glow */}
              <div className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 75% 60%, hsl(var(--accent) / 0.4) 40px, transparent 100px)
                  `,
                }}
              />

              {/* Clouds Layer */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 opacity-30 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, white / 0.1, transparent),
                    url("https://www.transparenttextures.com/patterns/natural-paper.png")`
                }}
              />
            </div>

            {/* Shield Rings */}
            <div className="absolute -inset-3 rounded-full border border-primary/20 animate-spin-slow" />
            <div className="absolute -inset-6 rounded-full border border-primary/5 animate-spin-reverse opacity-40" />
          </motion.div>

          {/* Orbit rings */}
          {satellites.map((sat) => (
            <div
              key={`ring-${sat.id}`}
              className="absolute rounded-full border border-primary/10"
              style={{
                width: sat.orbitRadius * 2,
                height: sat.orbitRadius * 2,
                left: `calc(50% - ${sat.orbitRadius}px)`,
                top: `calc(50% - ${sat.orbitRadius}px)`,
              }}
            />
          ))}

          {/* Satellites */}
          {satellites.map((sat, i) => (
            <motion.div
              key={sat.id}
              className="absolute"
              style={{
                width: sat.orbitRadius * 2,
                height: sat.orbitRadius * 2,
                left: `calc(50% - ${sat.orbitRadius}px)`,
                top: `calc(50% - ${sat.orbitRadius}px)`,
                opacity: i === 0 ? 1 : debrisCount,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: sat.speed,
                repeat: Infinity,
                ease: "linear",
                delay: sat.delay,
              }}
            >
              <div
                className="absolute rounded-full"
                style={{
                  width: sat.size,
                  height: sat.size,
                  background: sat.color,
                  boxShadow: `0 0 ${sat.size * 4}px ${sat.color}`,
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {sat.hasBeam && (
                  <div className="absolute h-[100px] w-px bg-gradient-to-t from-primary/40 to-transparent top-full left-1/2 -translate-x-1/2 origin-top" />
                )}
              </div>
            </motion.div>
          ))}

          {/* Debris cloud - Multi-layered Parallax */}
          <motion.div style={{ opacity: debrisFade, y: layer1Y }} className="absolute inset-0">
            {debrisLayer1.map((piece) => (
              <DebrisPiece key={`d1-${piece.id}`} piece={piece} opacity={debrisOpacity} />
            ))}
          </motion.div>

          <motion.div style={{ opacity: debrisFade, y: layer2Y }} className="absolute inset-0 scale-125 pointer-events-none">
            {debrisLayer2.map((piece) => (
              <DebrisPiece key={`d2-${piece.id}`} piece={piece} opacity={debrisOpacity} isMuted />
            ))}
          </motion.div>

          <motion.div style={{ opacity: debrisFade, y: layer3Y }} className="absolute inset-0 scale-75 blur-[1px]">
            {debrisLayer3.map((piece) => (
              <DebrisPiece key={`d3-${piece.id}`} piece={piece} opacity={debrisOpacity} />
            ))}
          </motion.div>

          {/* Kessler cleanup effect */}
          <motion.div
            style={{ opacity: cleanOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]"
              animate={{ scale: [0.8, 1.5], opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute w-[120%] h-[2px] bg-primary/40 shadow-[0_0_30px_hsl(var(--primary))]"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute w-[500px] h-[500px] rounded-full border border-primary/20 animate-ping" />
          </motion.div>

          {/* Cleanup Flash Wipe */}
          <motion.div
            style={{ opacity: flashOpacity }}
            className="absolute inset-0 bg-white z-50 pointer-events-none rounded-full blur-3xl scale-150"
          />
        </motion.div>

        {/* Scroll text overlays */}
        <div className="absolute inset-0 flex items-end justify-center pb-20 sm:pb-24 pointer-events-none z-20 px-4">
          <div className="text-center space-y-2 w-full">
            <motion.p
              style={{ opacity: text1Opacity }}
              className="text-primary/70 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.4em] font-bold uppercase absolute bottom-20 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              ↓ Scroll to witness the Kessler Syndrome
            </motion.p>
            <motion.div
              style={{ opacity: text2Opacity }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full max-w-[280px] sm:max-w-none"
            >
              <p className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Orbit is getting crowded.</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground mt-1 px-4">Just like your artifacts and build caches.</p>
            </motion.div>
            <motion.div
              style={{ opacity: text3Opacity }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full max-w-[280px] sm:max-w-none"
            >
              <p className="text-xl sm:text-2xl font-bold text-accent tracking-tight underline decoration-accent/30 underline-offset-8">Collision. Debris everywhere.</p>
              <p className="text-[10px] sm:text-sm text-muted-foreground mt-2 font-medium px-4">Your hard drive is choking on space junk.</p>
            </motion.div>
            <motion.div
              style={{ opacity: text4Opacity }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full max-w-[280px] sm:max-w-none"
            >
              <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter">KESSLER CLEARS THE ORBIT.</p>
              <p className="text-[10px] sm:text-sm text-primary font-bold mt-1 uppercase tracking-widest">Intelligent. Safe. Fast.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DebrisPiece = ({ piece, opacity, isMuted = false }: { piece: any; opacity: any; isMuted?: boolean }) => (
  <motion.div
    className="absolute"
    style={{
      left: `calc(50% + ${piece.x}px)`,
      top: `calc(50% + ${piece.y}px)`,
      opacity: opacity,
    }}
    animate={{
      x: [0, piece.x * 0.1, -piece.x * 0.05, 0],
      y: [0, piece.y * 0.1, -piece.y * 0.05, 0],
      rotate: [0, piece.rotation, piece.rotation * 2, 0],
    }}
    transition={{
      duration: piece.duration,
      repeat: Infinity,
      delay: piece.delay,
    }}
  >
    <div
      className="rounded-sm"
      style={{
        width: piece.size,
        height: piece.size,
        background: isMuted 
          ? "hsl(var(--muted-foreground) / 0.3)" 
          : piece.id % 3 === 0 ? "hsl(var(--accent) / 0.8)" : "hsl(var(--primary) / 0.6)",
        boxShadow: !isMuted && piece.id % 3 === 0
          ? "0 0 10px hsl(var(--accent) / 0.6)"
          : "none",
        filter: isMuted ? "blur(1px)" : "none",
      }}
    />
  </motion.div>
);

export default OrbitalScene;
