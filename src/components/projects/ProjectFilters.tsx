import React, { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../../data/projectData';

interface ProjectFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const componentId = useId();
  
  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className="relative group"
          >
            <span className={`text-sm tracking-wider px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category 
                ? 'text-white' 
                : 'text-neutral-500 hover:text-white'
            }`}>
              {category}
            </span>
            <AnimatePresence mode="wait">
              {selectedCategory === category && (
                <motion.div
                  layoutId={`activeCategory-${componentId}`}
                  className="absolute inset-0 bg-white/10 rounded-full -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    type: "spring", 
                    bounce: 0.2, 
                    duration: 0.4,
                    layout: { duration: 0.2 }
                  }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </div>
  );
};