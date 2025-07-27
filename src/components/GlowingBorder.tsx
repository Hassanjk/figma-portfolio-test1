import React from 'react';

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
}

export const GlowingBorder: React.FC<GlowingBorderProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
      <div className="relative bg-black/90 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
};