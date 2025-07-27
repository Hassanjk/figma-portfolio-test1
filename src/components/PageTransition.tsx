import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  isTransitioning: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ isTransitioning }) => {
  // Create 5 slices for a more dynamic effect
  const slices = Array.from({ length: 5 });
  
  return (
    <>
      {slices.map((_, index) => (
        <motion.div
          key={index}
          className="fixed inset-0 bg-[#0A0A0A] z-[90]"
          style={{
            originY: index % 2 === 0 ? 0 : '100%',
            top: `${(index / slices.length) * 100}%`,
            height: `${100 / slices.length}%`
          }}
          initial={{ scaleY: 0 }}
          animate={{ 
            scaleY: isTransitioning ? 1 : 0,
            transition: {
              duration: 0.8,
              ease: [0.645, 0.045, 0.355, 1.000],
              delay: index * 0.1
            }
          }}
          transition={{
            duration: 0.8,
            ease: [0.645, 0.045, 0.355, 1.000],
            delay: isTransitioning ? index * 0.1 : (slices.length - index - 1) * 0.1
          }}
        />
      ))}
    </>
  );
};