import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { ProjectGrid } from './projects/ProjectGrid';
import { ProjectFilters } from './projects/ProjectFilters';
import { useProjectFilters } from '../hooks/useProjectFilters';

export const ProjectsSection: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { 
    selectedCategory,
    setSelectedCategory,
    filteredProjects 
  } = useProjectFilters();

  // Reset filters when component mounts
  useEffect(() => {
    setSelectedCategory('All');
  }, [setSelectedCategory]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-16 px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm tracking-wider">BACK</span>
            </button>
            <h2 className="text-4xl font-light">Selected Projects</h2>
          </div>
        </div>

        {/* Filters */}
        <ProjectFilters 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Projects Grid */}
        <ProjectGrid projects={filteredProjects} />
      </div>
    </motion.div>
  );
};