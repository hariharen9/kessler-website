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

    // Shooting Stars
    type ShootingStar = {
      x: number;
      y: number;
      len: number;
      speed: number;
      opacity: number;
      active: boolean;
      hue: number;
      angle: number;
    };

    const shootingStars: ShootingStar[] = Array.from({ length: 3 }, () => ({
      x: 0, y: 0, len: 0, speed: 0, opacity: 0, active: false, hue: 185, angle: 0
    }));

    const resetShootingStar = (star: ShootingStar) => {
      // Pick a random starting point slightly off-screen (top, left, or right)
      const startEdge = Math.floor(Math.random() * 3); 
      
      if (startEdge === 0) { // Top
        star.x = Math.random() * width;
        star.y = -50;
        star.angle = (Math.random() * 60 + 60) * (Math.PI / 180); // 60 to 120 degrees (straight down)
      } else if (startEdge === 1) { // Right
        star.x = width + 50;
        star.y = Math.random() * height * 0.5;
        star.angle = (Math.random() * 40 + 140) * (Math.PI / 180); // 140 to 180 degrees (down-left)
      } else { // Left
        star.x = -50;
        star.y = Math.random() * height * 0.5;
        star.angle = (Math.random() * 40 + 0) * (Math.PI / 180); // 0 to 40 degrees (down-right)
      }

      star.len = Math.random() * 40 + 20; // Shorter tail for subtlety
      star.speed = Math.random() * 4 + 3; // Much slower speed
      star.opacity = 0;
      star.active = true;
      star.hue = Math.random() > 0.5 ? 185 : 210;
    };

    let frame: number;
    let lastScrollY = window.scrollY;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      // Draw background stars
      stars.forEach((s) => {
        // Twinkle
        s.a += s.speed;
        const alpha = 0.1 + Math.abs(Math.sin(s.a)) * 0.7;
        
        // Scroll Parallax Logic
        const parallaxOffset = currentScrollY * (1 / s.z);
        let drawY = (s.y - parallaxOffset) % (height * 2);
        if (drawY < -50) drawY += height * 2;
        if (drawY > height + 50) drawY -= height * 2;

        const scale = 1.5 / s.z;
        const size = s.r * scale;

        ctx.beginPath();
        ctx.arc(s.x, drawY, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 30%, 85%, ${alpha})`;
        
        if (s.z < 2) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = `hsla(${s.hue}, 80%, 60%, ${alpha * 0.5})`;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });

      // Draw Shooting Stars
      ctx.shadowBlur = 0; 
      
      shootingStars.forEach(star => {
        if (!star.active && Math.random() < 0.001) { // 5x less frequent
          resetShootingStar(star);
        }

        if (star.active) {
          // Move based on angle
          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;

          // Fade in slowly, cap at a low max opacity
          star.opacity += 0.008;
          if (star.opacity > 0.35) star.opacity = 0.35; 

          // Deactivate if far off screen
          if (star.x < -100 || star.x > width + 100 || star.y > height + 100) {
             star.active = false;
             return;
          }

          const tailX = star.x - Math.cos(star.angle) * star.len;
          const tailY = star.y - Math.sin(star.angle) * star.len;

          // Draw the trail
          ctx.beginPath();
          const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
          gradient.addColorStop(0, `hsla(${star.hue}, 100%, 80%, ${star.opacity})`);
          gradient.addColorStop(0.2, `hsla(${star.hue}, 80%, 60%, ${star.opacity * 0.5})`);
          gradient.addColorStop(1, `hsla(${star.hue}, 50%, 20%, 0)`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5; // Thinner
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        }
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
