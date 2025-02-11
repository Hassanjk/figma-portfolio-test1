import React from 'react';

const Projects = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="container mx-auto px-6 h-full overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 pt-24">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {/* Sample Project Cards */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div 
              key={index} 
              className="bg-zinc-900 rounded-lg overflow-hidden transform transition-transform hover:scale-[1.02]"
            >
              <div className="aspect-video bg-zinc-800"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Project {index}</h3>
                <p className="text-gray-400">Brief description of the project goes here. This is a sample project card.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;