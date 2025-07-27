port React from 'react';
import { Code2 } from 'lucide-react';

export const HeroGlyph = () => {
  return (
    <div className="relative w-16 h-16 animate-pulse">
      <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-xl"></div>
      <Code2 className="w-full h-full text-cyan-400" />
    </div>
  );
};