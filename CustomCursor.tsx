import { useEffect, useState, useCallback, useRef } from 'react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);

  // Throttle mouse position updates for better performance
  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdateRef.current > 16) { // ~60fps
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
        lastUpdateRef.current = now;
      });
    }
  }, []);

  // Simplified hover detection with better performance
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.closest) {
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], .interactive, .hover-target, .cursor-pointer');
      setIsHovering(!!isInteractive);
    }
  }, []);

  useEffect(() => {
    // Only add essential event listeners
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Initialize cursor
    setIsVisible(true);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateMousePosition, handleMouseOver]);

  if (!isVisible) return null;

  return (
    <div
      className={`windows-cursor ${isHovering ? 'hover' : ''}`}
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: 'translate(-15%, -15%)',
        opacity: 1,
      }}
    />
  );
}