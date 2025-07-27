import React from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript,
  SiPython, 
  SiNodedotjs, 
  SiTailwindcss,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiMongodb
} from 'react-icons/si';

export const FloatingIcons = () => {
  const icons = [
    { Icon: SiReact, color: '#61DAFB' },      // React blue
    { Icon: SiTypescript, color: '#3178C6' },  // TypeScript blue
    { Icon: SiJavascript, color: '#F7DF1E' },  // JavaScript yellow
    { Icon: SiPython, color: '#3776AB' },      // Python blue
    { Icon: SiNodedotjs, color: '#339933' },   // Node.js green
    { Icon: SiTailwindcss, color: '#06B6D4' }, // Tailwind cyan
    { Icon: SiNextdotjs, color: '#ffffff' },   // Next.js white
    { Icon: SiVuedotjs, color: '#4FC08D' },    // Vue.js green
    { Icon: SiAngular, color: '#DD0031' },     // Angular red
    { Icon: SiMongodb, color: '#47A248' }      // MongoDB green
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {icons.map(({ Icon, color }, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight]
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Icon 
            style={{ color }} 
            className="w-6 h-6 opacity-20 hover:opacity-100 transition-opacity"
          />
        </motion.div>
      ))}
    </div>
  );
};
