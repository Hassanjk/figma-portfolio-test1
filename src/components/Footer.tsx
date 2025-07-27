import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Code2, Camera } from 'lucide-react';

interface FooterProps {
  compact?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ compact = false }) => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' }
  ];

  return (
    <motion.footer 
      className={`relative border-t border-neutral-800/50 bg-black/50 backdrop-blur-sm ${
        compact ? 'mt-8' : 'mt-auto'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      {/* Gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-600 to-transparent" />
      
      <div className={`container mx-auto px-6 ${compact ? 'py-3' : 'py-6'}`}>
        <div className={`flex ${compact ? 'flex-row items-center justify-between' : 'flex-col md:flex-row items-center justify-between'} ${compact ? 'gap-4' : 'gap-6'}`}>
          
          {/* Left section - Brand/Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="relative">
              <Code2 className="w-6 h-6 text-neutral-400" />
              <motion.div
                className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <span className="text-sm font-light text-neutral-300">
              Portfolio {currentYear}
            </span>
          </motion.div>

          {/* Center section - Copyright & Attribution */}
          <motion.div 
            className="flex flex-col items-center gap-2 text-xs text-neutral-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-3 h-3 text-red-400 fill-current" />
              </motion.div>
              <span>by Martin Anderson</span>
            </div>
            
            {/* Unsplash Attribution */}
            <motion.div 
              className="flex items-center gap-2 text-xs text-neutral-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Camera className="w-3 h-3" />
              <span>Images courtesy of</span>
              <a 
                href="https://unsplash.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors underline"
              >
                Unsplash
              </a>
            </motion.div>
          </motion.div>

          {/* Right section - Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-lg bg-neutral-900/50 border border-neutral-800 hover:border-neutral-600 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                aria-label={label}
              >
                <Icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-neutral-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {label}
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom decorative line */}
        <motion.div 
          className="mt-6 pt-4 border-t border-neutral-800/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center justify-center">
            <motion.div 
              className="h-[1px] bg-gradient-to-r from-transparent via-neutral-600 to-transparent"
              style={{ width: '200px' }}
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scaleX: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
