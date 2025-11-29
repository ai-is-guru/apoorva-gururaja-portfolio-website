
import React, { useRef, useEffect } from 'react';

interface ParticleBackgroundProps {
  darkMode: boolean;
}

class Bird {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  size: number;
  color: string;
  speed: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(w: number, h: number, color: string) {
    this.canvasWidth = w;
    this.canvasHeight = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.vx = Math.random() * 4 - 2;
    this.vy = Math.random() * 4 - 2;
    this.ax = 0;
    this.ay = 0;
    this.size = Math.random() * 2 + 2;
    this.color = color;
    this.speed = Math.random() * 1 + 1;
  }

  update(birds: Bird[], mouseX: number, mouseY: number) {
    this.flock(birds);
    
    // Mouse interaction (avoidance)
    if (mouseX !== -1 && mouseY !== -1) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 200) {
        this.ax += dx / d * 0.5;
        this.ay += dy / d * 0.5;
      }
    }

    this.vx += this.ax;
    this.vy += this.ay;

    // Limit speed
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > this.speed) {
      this.vx = (this.vx / speed) * this.speed;
      this.vy = (this.vy / speed) * this.speed;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Wrap around
    if (this.x < 0) this.x = this.canvasWidth;
    if (this.x > this.canvasWidth) this.x = 0;
    if (this.y < 0) this.y = this.canvasHeight;
    if (this.y > this.canvasHeight) this.y = 0;

    this.ax = 0;
    this.ay = 0;
  }

  flock(birds: Bird[]) {
    let alignX = 0, alignY = 0;
    let cohesionX = 0, cohesionY = 0;
    let separationX = 0, separationY = 0;
    let total = 0;
    const perceptionRadius = 50;
    const separationRadius = 25;

    for (let other of birds) {
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (other !== this && d < perceptionRadius) {
        alignX += other.vx;
        alignY += other.vy;
        cohesionX += other.x;
        cohesionY += other.y;
        total++;
      }
      
      if (other !== this && d < separationRadius) {
        separationX += dx / d;
        separationY += dy / d;
      }
    }

    if (total > 0) {
      alignX /= total;
      alignY /= total;
      alignX = (alignX / Math.sqrt(alignX * alignX + alignY * alignY)) * this.speed;
      alignY = (alignY / Math.sqrt(alignX * alignX + alignY * alignY)) * this.speed;
      alignX -= this.vx;
      alignY -= this.vy;

      cohesionX /= total;
      cohesionY /= total;
      cohesionX -= this.x;
      cohesionY -= this.y;
      const cohesionDist = Math.sqrt(cohesionX * cohesionX + cohesionY * cohesionY);
      if (cohesionDist > 0) {
        cohesionX = (cohesionX / cohesionDist) * this.speed;
        cohesionY = (cohesionY / cohesionDist) * this.speed;
      }
      cohesionX -= this.vx;
      cohesionY -= this.vy;
    }

    // Force weights
    this.ax += alignX * 0.05;
    this.ay += alignY * 0.05;
    this.ax += cohesionX * 0.01;
    this.ay += cohesionY * 0.01;
    this.ax += separationX * 0.1;
    this.ay += separationY * 0.1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const angle = Math.atan2(this.vy, this.vx);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(angle);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.size * 2, 0);
    ctx.lineTo(-this.size, -this.size);
    ctx.lineTo(-this.size, this.size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const birdsRef = useRef<Bird[]>([]);
  const mouseRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialize birds if dimensions change significantly to keep them on screen
      // Or just let them wrap naturally
      birdsRef.current.forEach(bird => {
        bird.canvasWidth = canvas.width;
        bird.canvasHeight = canvas.height;
      });
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Initialize birds
    const birdCount = 35; // Reduced count for performance
    const color1 = darkMode ? '#404040' : '#808080';
    
    if (birdsRef.current.length === 0) {
        birdsRef.current = Array.from({ length: birdCount }, () => 
            new Bird(canvas.width, canvas.height, color1)
        );
    }

    const animate = () => {
      // Clear with transparency for trail effect or solid for clean look
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Optional: Background color fill if not handled by parent
      // ctx.fillStyle = darkMode ? '#0a0a0a' : '#f5f5f5';
      // ctx.fillRect(0, 0, canvas.width, canvas.height);

      birdsRef.current.forEach(bird => {
        bird.color = darkMode ? '#404040' : '#a0a0a0'; // Update color based on mode
        bird.update(birdsRef.current, mouseRef.current.x, mouseRef.current.y);
        bird.draw(ctx);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [darkMode]);

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none transition-colors duration-1000 ${darkMode ? 'bg-[#020617]' : 'bg-gray-100'}`}>
        <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default React.memo(ParticleBackground);
