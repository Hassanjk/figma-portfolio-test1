import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Coffee, Code2, Users } from 'lucide-react';

export const StatsBar = () => {
  const stats = [
    { icon: Trophy, value: '50+', label: 'Projects' },
    { icon: Coffee, value: '1.2K', label: 'Coffees' },
    { icon: Code2, value: '500K', label: 'Lines' },
    { icon: Users, value: '30+', label: 'Clients' }
  ];

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
        {stats.map(({ icon: Icon, value, label }, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg border border-neutral-800"
            whileHover={{ scale: 1.02 }}
          >
            <Icon className="w-5 h-5 text-neutral-500" />
            <div>
              <div className="text-base md:text-lg font-light">{value}</div>
              <div className="text-xs text-neutral-500">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
