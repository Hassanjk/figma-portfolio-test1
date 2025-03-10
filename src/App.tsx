import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Projects from './pages/Projects';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import SingleProject from './pages/SingleProject'; // Import the SingleProject component
import NavigationMenu from './components/NavigationMenu';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useScrollStore } from './store/useScrollStore';
import './styles/singleProject.css'; // Import single project styles

gsap.registerPlugin(Observer);

function AppContent() {
  const { currentView, setCurrentView, isAnimating, setIsAnimating } = useScrollStore();
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null); // Add this state
  const view1Ref = useRef<HTMLDivElement>(null);
  const view2Ref = useRef<HTMLDivElement>(null);
  const view3Ref = useRef<HTMLDivElement>(null);
  const view4Ref = useRef<HTMLDivElement>(null);
  const projectViewRef = useRef<HTMLDivElement>(null); // Add this ref

  const handleViewTransition = (direction: 'up' | 'down', targetView: number) => {
    if (isAnimating) return;
    
    // Prevent invalid transitions
    if (currentView === 1 && targetView !== 2) return;
    if (currentView === 2 && targetView !== 1 && targetView !== 3) return;
    if (currentView === 3 && targetView !== 2 && targetView !== 4) return;
    if (currentView === 4 && targetView !== 3) return;

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
    } else if (currentView === 3 && targetView === 4) {
      // About to Contact
      tl.to(view3Ref.current, { yPercent: -100 })
        .fromTo(view4Ref.current,
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(4));
    } else if (currentView === 4 && targetView === 3) {
      // Contact to About
      tl.to(view4Ref.current, { yPercent: 100 })
        .fromTo(view3Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(3));
    }
  };

  // Add this function to handle project selection
  const handleProjectSelect = (projectId: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSelectedProjectId(projectId);

    // Animate the project view in
    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => setIsAnimating(false)
    });

    tl.set(projectViewRef.current, { visibility: 'visible', zIndex: 100 })
      .fromTo(projectViewRef.current, 
        { xPercent: 100 },
        { xPercent: 0 }
      );
  };

  // Add this function to handle returning from project detail
  const handleReturnFromProject = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => {
        setIsAnimating(false);
        setSelectedProjectId(null);
      }
    });

    tl.to(projectViewRef.current, { xPercent: 100 })
      .set(projectViewRef.current, { visibility: 'hidden', zIndex: -1 });
  };

  const handleButtonNavigation = () => {
    if (currentView === 2) {
      handleViewTransition('up', 1);
    }
  };

  useEffect(() => {
    // Initial setup
    gsap.set([view1Ref.current, view2Ref.current, view3Ref.current, view4Ref.current], { 
      visibility: 'visible' 
    });
    gsap.set(view1Ref.current, { yPercent: currentView === 1 ? 0 : -100 });
    gsap.set(view2Ref.current, { yPercent: currentView === 2 ? 0 : 100 });
    gsap.set(view3Ref.current, { yPercent: currentView === 3 ? 0 : 100 });
    gsap.set(view4Ref.current, { yPercent: currentView === 4 ? 0 : 100 });

    // Observer for scroll transitions - only active when not on view 2 (Projects)
    const observer = Observer.create({
      target: window,
      type: 'wheel',
      onChange: (event) => {
        if (isAnimating || currentView === 2) return; // Prevent scroll transitions on view 2
        
        const scrollingDown = event.deltaY > 0;
        
        // Updated scroll transition logic
        if (scrollingDown && currentView === 1) {
          handleViewTransition('down', 2);
        } else if (!scrollingDown && currentView === 3) {
          handleViewTransition('up', 2);
        } else if (!scrollingDown && currentView === 4) {
          handleViewTransition('up', 3);
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
      {/* Navigation Menu */}
      <NavigationMenu onNavigate={(view) => handleViewTransition(view > currentView ? 'down' : 'up', view)} />

      {/* Views Container */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* View 1 */}
        <div ref={view1Ref} className="view view--1">
          <div className="relative min-h-screen">
            {/* Image Container */}
            <div className="absolute inset-0 md:right-0 md:w-1/2 h-full">
              <img 
                src="/assets/img/person.png"
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
            onSelectProject={handleProjectSelect} // Add this prop
          />
        </div>

        {/* View 3 */}
        <div ref={view3Ref} className="view view--3">
          <AboutMe 
            onNavigateBack={() => handleViewTransition('up', 2)}
            onNavigateToContact={() => handleViewTransition('down', 4)}
          />
        </div>

        {/* View 4 */}
        <div ref={view4Ref} className="view view--4">
          <Contact onNavigateBack={() => handleViewTransition('up', 3)} />
        </div>

        {/* Project Detail View */}
        <div 
          ref={projectViewRef} 
          className="view project-view"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            visibility: 'hidden',
            zIndex: -1
          }}
        >
          {selectedProjectId !== null && (
            <SingleProject 
              projectId={selectedProjectId}
              onNavigateBack={handleReturnFromProject}
            />
          )}
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