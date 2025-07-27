import React from 'react';
import { motion } from 'framer-motion';

export const ProfileImage = () => {
  return (
    <motion.div
      className="relative w-[400px] h-[500px]"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-lg blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-b from-neutral-800 to-neutral-900">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80"
          alt="Profile"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <motion.div
        className="absolute -bottom-4 -right-4 w-32 h-32 bg-neutral-900/80 backdrop-blur-sm rounded-lg p-4 border border-neutral-800"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <div className="text-xs tracking-widest text-neutral-500 mb-2">EXPERIENCE</div>
        <div className="text-2xl font-light">8+</div>
        <div className="text-sm text-neutral-400">Years</div>
      </motion.div>
    </motion.div>
  );
};