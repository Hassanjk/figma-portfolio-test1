import React, { useState } from 'react';
import { Github, Twitter, Linkedin, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  onContact: () => void;
  onAbout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onContact, onAbout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleAbout = () => {
    onAbout();
    closeMobileMenu();
  };

  const handleContact = () => {
    onContact();
    closeMobileMenu();
  };

  const socialLinks = [
    { Icon: Github, href: 'https://github.com' },
    { Icon: Twitter, href: 'https://twitter.com' },
    { Icon: Linkedin, href: 'https://linkedin.com' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] px-8 py-6 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-sm tracking-widest text-neutral-500">MARTIN</p>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={onAbout}
              className="text-sm tracking-widest text-neutral-500 hover:text-white transition-colors"
            >
              ABOUT
            </button>
            <button 
              onClick={onContact}
              className="text-sm tracking-widest text-neutral-500 hover:text-white transition-colors"
            >
              CONTACT
            </button>
            {socialLinks.map(({ Icon }, index) => (
              <button 
                key={index} 
                className="text-neutral-500 hover:text-white transition-colors duration-300"
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-neutral-500 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/80 z-[90] md:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-neutral-900/95 backdrop-blur-lg z-[95] md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center p-8 border-b border-neutral-800">
                  <p className="text-sm tracking-widest text-neutral-500">MARTIN</p>
                  <button 
                    onClick={closeMobileMenu}
                    className="text-neutral-500 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <div className="flex flex-col flex-1 justify-center px-8 space-y-8">
                  <motion.button 
                    onClick={handleAbout}
                    className="text-2xl tracking-widest text-neutral-500 hover:text-white transition-colors text-left"
                    whileHover={{ x: 10 }}
                    transition={{ type: 'tween', duration: 0.2 }}
                  >
                    ABOUT
                  </motion.button>
                  
                  <motion.button 
                    onClick={handleContact}
                    className="text-2xl tracking-widest text-neutral-500 hover:text-white transition-colors text-left"
                    whileHover={{ x: 10 }}
                    transition={{ type: 'tween', duration: 0.2 }}
                  >
                    CONTACT
                  </motion.button>
                </div>

                {/* Mobile Social Links */}
                <div className="p-8 border-t border-neutral-800">
                  <p className="text-xs tracking-widest text-neutral-600 mb-4">CONNECT</p>
                  <div className="flex gap-6">
                    {socialLinks.map(({ Icon, href }, index) => (
                      <motion.a
                        key={index}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};