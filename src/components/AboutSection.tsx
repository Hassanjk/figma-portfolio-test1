import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Code2, Palette, Globe2, Zap } from 'lucide-react';
import { GlowingBorder } from './GlowingBorder';

interface AboutSectionProps {
  onBack: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBack }) => {
  const skills = [
    { icon: Code2, title: 'Development', items: ['React', 'TypeScript', 'Node.js', 'Python'] },
    { icon: Palette, title: 'Design', items: ['UI/UX', 'Figma', 'Motion Design'] },
    { icon: Globe2, title: 'Languages', items: ['English', 'Swedish', 'German'] },
    { icon: Zap, title: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel'] },
  ];

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
          {/* Left Column - About Text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-light mb-8">About Me</h2>
              <p className="text-neutral-400 leading-relaxed">
                I'm a creative developer based in Stockholm, Sweden, with over 8 years 
                of experience in crafting digital experiences. My work spans from 
                interactive web applications to brand identity systems.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-light mb-4">My Approach</h3>
              <p className="text-neutral-400 leading-relaxed">
                I believe in the perfect blend of form and function. Every pixel 
                and line of code serves a purpose, creating experiences that are 
                both beautiful and meaningful.
              </p>
            </div>

            <GlowingBorder className="mt-8">
              <p className="text-sm text-neutral-400 leading-relaxed">
                "The details are not the details. They make the design." 
                <span className="block mt-2 text-neutral-500">— Charles Eames</span>
              </p>
            </GlowingBorder>
          </motion.div>

          {/* Right Column - Skills Grid */}
          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="p-6 bg-neutral-900/50 rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors">
                  <skill.icon className="w-6 h-6 text-neutral-500 mb-4" />
                  <h3 className="text-lg font-light mb-4">{skill.title}</h3>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li key={item} className="text-sm text-neutral-400">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
