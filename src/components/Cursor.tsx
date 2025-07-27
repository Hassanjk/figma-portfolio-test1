import React, { useEffect, useState } from 'react';

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      {/* Large cursor */}
      <div 
        className="fixed w-8 h-8 pointer-events-none mix-blend-difference transition-transform duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`
        }}
      >
        <div className="absolute inset-0 border border-white rounded-full"></div>
      </div>
      
      {/* Small cursor dot */}
      <div 
        className="fixed w-1 h-1 bg-white rounded-full pointer-events-none mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
    </>
  );
};