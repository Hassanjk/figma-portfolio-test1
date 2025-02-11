import React from 'react';
import { ChevronDown } from 'lucide-react';
import personImage from './assets/images/person.png';

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed w-full p-6 flex justify-between items-center z-50">
        <div className="text-2xl font-bold">Hof.</div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#home" className="hover:text-gray-300">Home</a>
          <a href="#about" className="hover:text-gray-300">About</a>
          <a href="#works" className="hover:text-gray-300">Works</a>
          <a href="#blog" className="hover:text-gray-300">Blog</a>
          <button className="border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
            Hire me
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Image Container */}
        <div className="absolute inset-0 md:right-0 md:w-1/2 h-full">
          <img 
            src={personImage}
            alt="Designer"
            className="w-full h-full object-cover opacity-50 md:opacity-100"
          />
          <div className="absolute inset-0 bg-black/50 md:hidden"></div>
        </div>
        
        {/* Text Content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6 md:px-16 lg:px-24">
          <h1 className="text-5xl md:text-7xl lg:text-[8rem] leading-tight font-bold tracking-tight md:mr-[-26%]">
            Digital
            <br />
            <span className="block md:ml-24 -mt-4">Product</span>
            <span className="block md:ml-12 -mt-4">Designer</span>
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="text-sm">Scroll to find more</span>
          <ChevronDown className="animate-bounce" />
        </div>
      </div>
    </div>
  );
}

export default App;