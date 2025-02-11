import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import personImage from './assets/images/person.png';
import Projects from './pages/Projects';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

function AppContent() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentView, setCurrentView] = useState(1);

  useEffect(() => {
    let timeline: gsap.core.Timeline;

    const handleScroll = () => {
      if (isAnimating) return;
      setIsAnimating(true);

      const view1 = document.querySelector('.view--1');
      const view2 = document.querySelector('.view--2');

      if (!view1 || !view2) return;

      timeline = gsap.timeline({
        defaults: {
          duration: 1.6,
          ease: 'power3.inOut'
        },
        onComplete: () => {
          setIsAnimating(false);
        }
      });

      if (currentView === 1) {
        // Going from view 1 to view 2
        timeline
          .set(view2, {
            yPercent: 100,
            opacity: 0
          })
          .to(view1, {
            yPercent: -100
          })
          .to(view2, {
            yPercent: 0,
            opacity: 1
          }, '<')
          .add(() => {
            setCurrentView(2);
          });
      } else {
        // Going from view 2 to view 1
        timeline
          .to(view2, {
            yPercent: 100
          })
          .to(view1, {
            yPercent: 0
          }, '<')
          .add(() => {
            setCurrentView(1);
          });
      }
    };

    // Initialize the GSAP Observer
    Observer.create({
      type: 'wheel,touch,pointer',
      onUp: () => {
        if (currentView === 1 && !isAnimating) {
          handleScroll();
        }
      },
      onDown: () => {
        if (currentView === 2 && !isAnimating) {
          handleScroll();
        }
      },
      tolerance: 10,
      wheelSpeed: -1
    });

    return () => {
      if (timeline) {
        timeline.kill();
      }
    };
  }, [isAnimating, currentView]);

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

      {/* Views */}
      <div className="view view--1">
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

      <div className="view view--2">
        <Projects />
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