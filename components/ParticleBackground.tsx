
import React, { useRef, useEffect } from 'react';

interface ParticleBackgroundProps {
  darkMode: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ darkMode }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);

  // Initialize Vanta effect
  useEffect(() => {
    const initVanta = () => {
      if (vantaEffectRef.current || !(window as any).VANTA || !vantaRef.current) {
        return;
      }
      
      try {
        const effect = (window as any).VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: darkMode ? 0x0a0a0a : 0xf5f5f5,
          color1: 0x404040,
          color2: 0x808080,
          colorMode: "variance",
          birdSize: 1.5,
          wingSpan: 20.00,
          speedLimit: 4.00,
          separation: 50.00,
          alignment: 20.00,
          cohesion: 20.00,
          quantity: 4.00,
          backgroundAlpha: 1.0
        });
        vantaEffectRef.current = effect;
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
        backgroundColor: darkMode ? 0x0a0a0a : 0xf5f5f5,
      });
    }
  }, [darkMode]);

  return <div ref={vantaRef} className="fixed inset-0 z-0 pointer-events-none transition-colors duration-1000" />;
};

export default React.memo(ParticleBackground);
