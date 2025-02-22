import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import personImage from './assets/img/person.png';
import Projects from './pages/Projects';
import AboutMe from './pages/AboutMe';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

function AppContent() {
  const [currentView, setCurrentView] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const view1Ref = useRef<HTMLDivElement>(null);
  const view2Ref = useRef<HTMLDivElement>(null);
  const view3Ref = useRef<HTMLDivElement>(null);

  const handleViewTransition = (direction: 'up' | 'down', targetView: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => setIsAnimating(false)
    });

    if (currentView === 1 && targetView === 2) {
      // Home to Projects
      tl.to(view1Ref.current, { yPercent: -100 })
        .fromTo(view2Ref.current, 
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(2));
    } else if (currentView === 2 && targetView === 1) {
      // Projects to Home
      tl.to(view2Ref.current, { yPercent: 100 })
        .fromTo(view1Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(1));
    } else if (currentView === 2 && targetView === 3) {
      // Projects to About
      tl.to(view2Ref.current, { yPercent: -100 })
        .fromTo(view3Ref.current,
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(3));
    } else if (currentView === 3 && targetView === 2) {
      // About to Projects
      tl.to(view3Ref.current, { yPercent: 100 })
        .fromTo(view2Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(2));
    }
  };

  const handleButtonNavigation = () => {
    if (currentView === 2) {
      handleViewTransition('up', 1);
    }
  };

  useEffect(() => {
    // Initial setup
    gsap.set([view1Ref.current, view2Ref.current, view3Ref.current], { 
      visibility: 'visible' 
    });
    gsap.set(view1Ref.current, { yPercent: currentView === 1 ? 0 : -100 });
    gsap.set(view2Ref.current, { yPercent: currentView === 2 ? 0 : 100 });
    gsap.set(view3Ref.current, { yPercent: currentView === 3 ? 0 : 100 });

    // Observer for scroll transitions - only active when not on view 2 (Projects)
    const observer = Observer.create({
      target: window,
      type: 'wheel',
      onChange: (event) => {
        if (isAnimating || currentView === 2) return; // Prevent scroll transitions on view 2
        
        const scrollingDown = event.deltaY > 0;
        
        // Only handle transitions from view 1 to 2, and view 3 to 2
        if (scrollingDown && currentView === 1) {
          handleViewTransition('down', 2);
        } else if (!scrollingDown && currentView === 3) {
          handleViewTransition('up', 2);
        }
      },
      preventDefault: true
    });

    return () => {
      if (observer) observer.kill();
    };
  }, [currentView, isAnimating]);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed w-full p-6 flex justify-between items-center z-50">
        <div className="text-2xl font-bold">Hof.</div>
        <div className="hidden md:flex gap-8 items-center">
          <button className="hover:text-gray-300">Home</button>
          <button className="hover:text-gray-300">Projects</button>
          <a href="#about" className="hover:text-gray-300">About</a>
          <a href="#blog" className="hover:text-gray-300">Blog</a>
          <button className="border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
            Hire me
          </button>
        </div>
      </nav>

      {/* Views Container */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* View 1 */}
        <div ref={view1Ref} className="view view--1">
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
              <h1 className="hero-title text-6xl md:text-8xl lg:text-[6.4rem] w-full md:mr-[-79%]">
                Digital
                <br />
                <span className="block md:ml-32">Product</span>
                <span className="block md:ml-16">Designer</span>
              </h1>
              <p className="hero-sub text-xl md:text-2xl mt-8 text-gray-400 max-w-md">
                Crafting immersive digital experiences through innovative design solutions
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20">
              <span className="text-sm">Scroll to find more</span>
              <ChevronDown className="animate-bounce" />
            </div>
          </div>
        </div>

        {/* View 2 */}
        <div ref={view2Ref} className="view view--2">
          <Projects 
            onNavigateBack={() => handleViewTransition('up', 1)}
            onNavigateToAbout={() => handleViewTransition('down', 3)}
          />
        </div>

        {/* View 3 */}
        <div ref={view3Ref} className="view view--3">
          <AboutMe onNavigateBack={() => handleViewTransition('up', 2)} />
        </div>
      </div>
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

export default App;