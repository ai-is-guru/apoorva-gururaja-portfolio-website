
import React, { useRef, useEffect, useState } from 'react';

interface ParticleBackgroundProps {
  darkMode: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ darkMode }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);
  const widgetPositionsRef = useRef<Map<string, { x: number; y: number; width: number; height: number }>>(new Map());
  const avoidanceActiveRef = useRef<boolean>(false);
  const hoveredWidgetRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for widget position updates
  useEffect(() => {
    const handleWidgetPosition = (e: CustomEvent<{ id: string; x: number; y: number; width: number; height: number }>) => {
      const { id, x, y, width, height } = e.detail;
      widgetPositionsRef.current.set(id, { x, y, width, height });
    };

    const handleWidgetHover = (e: CustomEvent<{ x: number; y: number; active: boolean; width?: number; height?: number }>) => {
      avoidanceActiveRef.current = e.detail.active;
      if (e.detail.active && e.detail.width && e.detail.height) {
        hoveredWidgetRef.current = {
          x: e.detail.x - e.detail.width / 2,
          y: e.detail.y - e.detail.height / 2,
          width: e.detail.width,
          height: e.detail.height
        };
      } else {
        hoveredWidgetRef.current = null;
      }
    };

    window.addEventListener('widgetPosition' as any, handleWidgetPosition as EventListener);
    window.addEventListener('widgetHover' as any, handleWidgetHover as EventListener);
    
    return () => {
      window.removeEventListener('widgetPosition' as any, handleWidgetPosition as EventListener);
      window.removeEventListener('widgetHover' as any, handleWidgetHover as EventListener);
    };
  }, []);

  // Create avoidance zones only when widgets are actively hovered (very minimal)
  useEffect(() => {
    const setupAvoidance = () => {
      if (!vantaEffectRef.current || !vantaRef.current) return;

      const interval = setInterval(() => {
        if (!vantaEffectRef.current || !vantaRef.current) return;

        // Only create very gentle avoidance when a widget is actively being hovered
        // This allows birds to fly freely across the screen otherwise
        if (avoidanceActiveRef.current && hoveredWidgetRef.current) {
          const widget = hoveredWidgetRef.current;
          const centerX = widget.x + widget.width / 2;
          const centerY = widget.y + widget.height / 2;
          
          // Create a very gentle repulsion zone - only trigger occasionally
          // Use a random chance to make it less aggressive
          if (Math.random() > 0.7) { // Only 30% of the time
            const event = new MouseEvent('mousemove', {
              clientX: centerX,
              clientY: centerY,
              bubbles: true,
            });
            vantaRef.current.dispatchEvent(event);
          }
        }
      }, 300); // Update less frequently to allow natural movement

      return interval;
    };

    let interval: NodeJS.Timeout | null = null;
    
    // Try to setup immediately if Vanta is ready
    if (vantaEffectRef.current) {
      interval = setupAvoidance();
    } else {
      // Wait for Vanta to initialize
      const checkInterval = setInterval(() => {
        if (vantaEffectRef.current) {
          interval = setupAvoidance();
          clearInterval(checkInterval);
        }
      }, 200);
      
      setTimeout(() => clearInterval(checkInterval), 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  // Initialize Vanta effect
  useEffect(() => {
    const initVanta = () => {
      if (vantaEffectRef.current || !(window as any).VANTA || !vantaRef.current) {
        return;
      }
      
      try {
        // Optimize for mobile: reduce quantity and disable on very small screens
        const currentIsMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const shouldRender = !currentIsMobile || window.innerWidth >= 375;
        const birdQuantity = currentIsMobile ? 1.00 : 2.00;
        
        if (shouldRender) {
          const effect = (window as any).VANTA.BIRDS({
            el: vantaRef.current,
            mouseControls: !currentIsMobile,
            touchControls: currentIsMobile,
            gyroControls: false,
            minHeight: 0.00,
            minWidth: 0.00,
            scale: currentIsMobile ? 0.8 : 1.00,
            scaleMobile: 0.8,
            backgroundColor: darkMode ? 0x020617 : 0xf5f5f5,
            color1: 0x404040,
            color2: 0x808080,
            colorMode: "variance",
            birdSize: currentIsMobile ? 0.8 : 1.0,
            wingSpan: currentIsMobile ? 15.00 : 20.00,
            speedLimit: currentIsMobile ? 2.50 : 4.00,
            separation: currentIsMobile ? 40.00 : 60.00,
            alignment: currentIsMobile ? 15.00 : 25.00,
            cohesion: currentIsMobile ? 10.00 : 15.00,
            quantity: currentIsMobile ? 1.00 : 3.00,
            backgroundAlpha: 1.0
          });
          vantaEffectRef.current = effect;
        }
      } catch (e) {
        console.error("Failed to initialize Vanta", e);
      }
    };

    // Try to initialize immediately if Vanta is already loaded
    if ((window as any).VANTA) {
      initVanta();
    } else {
      // Wait for Vanta to load
      const checkVanta = setInterval(() => {
        if ((window as any).VANTA) {
          initVanta();
          clearInterval(checkVanta);
        }
      }, 200);
      
      // Cleanup after 10 seconds if Vanta doesn't load
      const timeout = setTimeout(() => {
        clearInterval(checkVanta);
      }, 10000);
      
      return () => {
        clearInterval(checkVanta);
        clearTimeout(timeout);
      };
    }

    // Cleanup on unmount
    return () => {
      if (vantaEffectRef.current) {
        try {
          vantaEffectRef.current.destroy();
        } catch (e) {
          console.error("Error destroying Vanta effect", e);
        }
        vantaEffectRef.current = null;
      }
    };
  }, []); // Only run once on mount

  // Update background color when darkMode changes
  useEffect(() => {
    if (vantaEffectRef.current) {
      vantaEffectRef.current.setOptions({
        backgroundColor: darkMode ? 0x020617 : 0xf5f5f5,
        color1: darkMode ? 0x404040 : 0x808080,
      });
    }
  }, [darkMode]);

  return <div ref={vantaRef} className="fixed inset-0 pointer-events-none transition-colors duration-1000" style={{ zIndex: 5 }} />;
};

export default React.memo(ParticleBackground);
