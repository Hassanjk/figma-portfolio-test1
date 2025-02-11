import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import personImage from './assets/images/person.png';
import Projects from './pages/Projects';
import TransitionOverlay from './components/TransitionOverlay';

function AppContent() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (location.pathname === path) return;
    setIsAnimating(true);
    setNextPath(path);
  };

  const handleMidpoint = () => {
    if (nextPath) {
      navigate(nextPath);
      // Reset animation state immediately after navigation
      setNextPath(null);
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  // Add cleanup effect
  useEffect(() => {
    return () => {
      setIsAnimating(false);
      setNextPath(null);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <TransitionOverlay 
        isAnimating={isAnimating} 
        onAnimationComplete={handleAnimationComplete}
        onMidpointReached={handleMidpoint}
      />

      {/* Navigation */}
      <nav className="fixed w-full p-6 flex justify-between items-center z-50">
        <div className="text-2xl font-bold">Hof.</div>
        <div className="hidden md:flex gap-8 items-center">
          <button onClick={() => handleNavigation('/')} className="hover:text-gray-300">Home</button>
          <button onClick={() => handleNavigation('/projects')} className="hover:text-gray-300">Projects</button>
          <a href="#about" className="hover:text-gray-300">About</a>
          <a href="#blog" className="hover:text-gray-300">Blog</a>
          <button className="border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
            Hire me
          </button>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Home component (moved from the main App component)
const Home = () => (
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
);

export default App;