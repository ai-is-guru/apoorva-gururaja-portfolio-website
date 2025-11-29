import React, { useEffect, useState, useRef, useCallback } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Throttle mouse move using requestAnimationFrame
  const moveCursor = useCallback((e: MouseEvent) => {
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    
    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(() => {
        const { x, y } = lastMousePosRef.current;
        
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
        }
        
        if (ringRef.current) {
          ringRef.current.style.transform = `translate(${x}px, ${y}px) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`;
        }
        
        animationFrameRef.current = null;
      });
    }
  }, [isHovering]);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || target.classList.contains('cursor-pointer')) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  }, []);

  useEffect(() => {
    // Add class to body to hide default cursor
    document.body.classList.add('custom-cursor-active');

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [moveCursor, handleMouseOver]);

  // Hide on mobile/touch devices
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    // Check if device supports touch
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    setIsTouchDevice(checkTouch());
  }, []);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Main Dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -ml-1 -mt-1"
        style={{ willChange: 'transform' }}
      />
      {/* Trailing Ring */}
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference -ml-4 -mt-4 transition-colors duration-200 ${isHovering ? 'bg-white/20 border-transparent' : ''}`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default React.memo(CustomCursor);