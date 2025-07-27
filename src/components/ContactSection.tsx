import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, Send } from 'lucide-react';

interface ContactSectionProps {
  onBack: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onBack }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-16 px-8"
    >
      <div className="max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-16"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wider">BACK</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-light mb-8">Let's Connect</h2>
              <p className="text-neutral-400 leading-relaxed max-w-md">
                Have a project in mind? Let's discuss how we can work together to create something amazing.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-neutral-500" />
                <p className="text-neutral-400">hello@martinanderson.dev</p>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-neutral-500" />
                <p className="text-neutral-400">Stockholm, Sweden</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <label className="text-xs tracking-wider text-neutral-500 mb-2 block">NAME</label>
              <input
                type="text"
                className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-neutral-600 transition-colors"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="text-xs tracking-wider text-neutral-500 mb-2 block">EMAIL</label>
              <input
                type="email"
                className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-neutral-600 transition-colors"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="text-xs tracking-wider text-neutral-500 mb-2 block">MESSAGE</label>
              <textarea
                rows={6}
                className="w-full bg-neutral-900/50 border border-neutral-800 rounded-lg px-4 py-3 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
              />
            </motion.div>

            <motion.button
              variants={itemVariants}
              className="group relative overflow-hidden px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              type="submit"
            >
              <span className="flex items-center gap-2 text-sm tracking-wider">
                <span>SEND MESSAGE</span>
                <Send className="w-4 h-4" />
              </span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
};
