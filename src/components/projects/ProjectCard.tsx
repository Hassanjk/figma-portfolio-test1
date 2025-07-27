import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <div className="relative h-[400px] mb-6 overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-neutral-900/50 group-hover:bg-neutral-900/30 transition-colors z-10"></div>
        <motion.div
          className="w-full h-full relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-light">{project.title}</h3>
          <a href={project.link} className="text-neutral-500 hover:text-white transition-colors">
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        
        <p className="text-neutral-400 text-sm leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex gap-2 flex-wrap">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 text-xs tracking-wider text-neutral-400 border border-neutral-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};