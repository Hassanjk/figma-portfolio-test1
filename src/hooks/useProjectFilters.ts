import { useState, useMemo, useCallback, useEffect } from 'react';
import { projects } from '../data/projectData';

export const useProjectFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return projects;
    }
    return projects.filter(project => 
      project.category === selectedCategory
    );
  }, [selectedCategory]);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // Reset to 'All' when component unmounts or remounts
  useEffect(() => {
    return () => {
      setSelectedCategory('All');
    };
  }, []);

  return {
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    filteredProjects
  };
};