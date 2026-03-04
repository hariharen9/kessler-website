import { useEffect, useRef } from "react";

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    resize();
    window.addEventListener("resize", resize);

    const stars: { 
      x: number; 
      y: number; 
      z: number; 
      r: number; 
      a: number; 
      speed: number; 
      hue: number 
    }[] = [];

    // Increase star count for better depth feel
    for (let i = 0; i < 600; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 10, // Tall virtual field
        z: Math.random() * 5 + 1, // Depth factor
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.01 + 0.002,
        hue: Math.random() > 0.9 ? 185 : 210,
      });
    }

    let frame: number;
    let lastScrollY = window.scrollY;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      stars.forEach((s) => {
        // Twinkle
        s.a += s.speed;
        const alpha = 0.1 + Math.abs(Math.sin(s.a)) * 0.7;
        
        // Scroll Parallax Logic: 
        // Stars move vertically based on their depth (s.z)
        // Foreground stars (low z) move faster, background stars (high z) move slower
        // We wrap the Y position to keep stars visible
        const parallaxOffset = currentScrollY * (1 / s.z);
        let drawY = (s.y - parallaxOffset) % (height * 2);
        if (drawY < -50) drawY += height * 2;
        if (drawY > height + 50) drawY -= height * 2;

        // Perspective scaling
        const scale = 1.5 / s.z;
        const size = s.r * scale;

        ctx.beginPath();
        ctx.arc(s.x, drawY, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 30%, 85%, ${alpha})`;
        
        // Add subtle glow to closer stars
        if (s.z < 2) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = `hsla(${s.hue}, 80%, 60%, ${alpha * 0.5})`;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });
      
      frame = requestAnimationFrame(draw);
    };
    
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none transition-opacity duration-1000"
      style={{ zIndex: 0, background: 'radial-gradient(circle at center, #0a0c14 0%, #020408 100%)' }}
    />
  );
};

export default StarField;
