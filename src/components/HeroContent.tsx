import React from 'react';
import { motion } from 'framer-motion';
import { ProfileImage } from './ProfileImage';
import { ArrowRight, Code, Rocket, Palette } from 'lucide-react';
import { FloatingIcons } from './FloatingIcons';
import { StatsBar } from './StatsBar';

interface HeroContentProps {
  onViewProjects: () => void;
  onContact: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ onViewProjects, onContact }) => {
  const badges = [
    { icon: Code, text: 'Full Stack Developer' },
    { icon: Rocket, text: 'Tech Enthusiast' },
    { icon: Palette, text: 'UI/UX Designer' }
  ];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative min-h-screen">
      <FloatingIcons />
      
      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <motion.div 
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div variants={textVariants}>
              <p className="text-sm tracking-widest text-neutral-500 mb-4">CREATIVE DEVELOPER</p>
              <h1 className="text-7xl font-light tracking-tight text-white/90">
                Martin<br />Anderson
              </h1>
            </motion.div>

            <motion.p 
              variants={textVariants}
              className="text-lg text-neutral-400 max-w-md leading-relaxed"
            >
              Crafting digital experiences through elegant code and thoughtful design. 
              Based in Stockholm, working worldwide.
            </motion.p>

            <motion.div 
              variants={textVariants}
              className="flex gap-4 flex-wrap"
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 rounded-full border border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <badge.icon className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm text-neutral-400">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={textVariants}
              className="flex items-center gap-8 pt-4"
            >
              <motion.button 
                onClick={onViewProjects}
                className="group relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 text-sm tracking-wider text-white py-4">
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 h-[1px] bottom-4 bg-neutral-800 transition-all duration-300 group-hover:h-full"></div>
              </motion.button>
              
              <motion.button 
                onClick={onContact}
                className="text-sm tracking-wider text-neutral-500 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.button>
            </motion.div>
          </motion.div>

          <div className="flex justify-center items-center">
            <ProfileImage />
          </div>
        </div>

        {/* Stats Bar in its own row */}
        <div className="mt-8 md:mt-16">
          <StatsBar />
        </div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div 
          className="flex items-center gap-4"
          animate={{ 
            x: [0, 10, 0],
            y: [0, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-8 h-[1px] bg-neutral-800"></div>
          <p className="text-xs tracking-widest text-neutral-500">SCROLL</p>
        </motion.div>
      </motion.div>
    </div>
  );
};