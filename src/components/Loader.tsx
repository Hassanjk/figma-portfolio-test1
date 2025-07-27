import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-[200] flex items-center justify-center"
    >
      <div className="relative w-32 h-32">
        {/* Rotating outer ring */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent border-t-neutral-800 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity
          }}
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Pulsing icon */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            <Code2 className="w-8 h-8 text-white mb-2" />
          </motion.div>
          
          {/* Centered text */}
          <motion.p
            className="text-xs tracking-widest text-neutral-500"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity
            }}
          >
            LOADING
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};
