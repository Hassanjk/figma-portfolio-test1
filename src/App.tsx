import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import personImage from './assets/images/person.png';
import Projects from './pages/Projects';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

function AppContent() {
  const [currentView, setCurrentView] = useState(1);
  const isAnimatingRef = useRef(false);
  const observerRef = useRef<any>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const view1Ref = useRef<HTMLDivElement>(null);
  const view2Ref = useRef<HTMLDivElement>(null);

  const handleViewTransition = (direction: 'up' | 'down') => {
    if (isAnimatingRef.current || !view1Ref.current || !view2Ref.current) return;
    isAnimatingRef.current = true;

    // Temporarily disable the observer during animation
    if (observerRef.current) {
      observerRef.current.disable();
    }

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const view1 = view1Ref.current;
    const view2 = view2Ref.current;

    timelineRef.current = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power3.inOut'
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        if (observerRef.current) {
          observerRef.current.enable();
        }
      }
    });

    if (direction === 'down' && currentView === 1) {
      // Going from view 1 to view 2
      gsap.set(view2, {
        yPercent: 100,
        display: 'block',
        autoAlpha: 1
      });

      timelineRef.current
        .to(view1, {
          yPercent: -100,
          autoAlpha: 0
        })
        .to(view2, {
          yPercent: 0
        }, '<')
        .add(() => {
          setCurrentView(2);
          gsap.set(view1, { display: 'none' });
        });
    } else if (direction === 'up' && currentView === 2) {
      // Going from view 2 to view 1
      gsap.set(view1, {
        yPercent: -100,
        display: 'block',
        autoAlpha: 1
      });

      timelineRef.current
        .to(view2, {
          yPercent: 100,
          autoAlpha: 0
        })
        .to(view1, {
          yPercent: 0
        }, '<')
        .add(() => {
          setCurrentView(1);
          gsap.set(view2, { display: 'none' });
        });
    }
  };

  useEffect(() => {
    // Initialize view states
    if (view1Ref.current && view2Ref.current) {
      gsap.set(view2Ref.current, {
        yPercent: 100,
        display: 'none',
        autoAlpha: 0
      });
    }

    // Initialize the GSAP Observer with improved touch handling
    observerRef.current = Observer.create({
      type: 'wheel,touch,pointer',
      onUp: () => handleViewTransition('down'),
      onDown: () => handleViewTransition('up'),
      tolerance: 10,
      wheelSpeed: -1,
      preventDefault: true
    });

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (observerRef.current) {
        observerRef.current.kill();
      }
    };
  }, [currentView]);

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

        {/* View 2 */}
        <div ref={view2Ref} className="view view--2">
          <Projects />
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