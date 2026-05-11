import React, { useEffect, useRef, useCallback } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import imagesLoaded from 'imagesloaded';
import { preloadFonts } from '../check-implement-same/js/utils';
import Cursor from '../check-implement-same/js/cursor';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollStore } from '../store/useScrollStore';

interface ProjectsProps {
  onNavigateBack: () => void;
  onNavigateToAbout: () => void;
  onSelectProject: (projectId: number) => void;
}

const Projects = React.forwardRef<HTMLDivElement, ProjectsProps>(({ onNavigateBack, onNavigateToAbout, onSelectProject }, ref) => {
  const cursorRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  
  // Use refs for callbacks to avoid stale closures
  const onNavigateBackRef = useRef(onNavigateBack);
  const onNavigateToAboutRef = useRef(onNavigateToAbout);
  
  useEffect(() => {
    onNavigateBackRef.current = onNavigateBack;
    onNavigateToAboutRef.current = onNavigateToAbout;
  }, [onNavigateBack, onNavigateToAbout]);

  useEffect(() => {
    console.log('Initializing Projects component');
    document.body.classList.add('loading');

    // Scroll boundary detection state
    let scrollX = 0;
    let scrollMaxX = 0;
    let overScrollDelta = 0;
    const TRIGGER_THRESHOLD = 200;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;
    let scrollReady = false;

    const preloadImages = () => {
      return new Promise((resolve) => {
        console.log('Starting image preload');
        const images = document.querySelectorAll('.gallery__item-imginner');
        console.log('Number of images found:', images.length);
        
        imagesLoaded(images, { background: true }, (instance) => {
          console.log('Images loaded successfully:', instance.images.length);
          resolve(true);
        });
      });
    };

    // Wheel handler for boundary detection
    const handleBoundaryWheel = (e: WheelEvent) => {
      const { isAnimating } = useScrollStore.getState();
      if (isAnimating || !scrollReady) {
        overScrollDelta = 0;
        return;
      }

      const nearStart = scrollX <= 30;
      const nearEnd = scrollMaxX > 0 && scrollX >= scrollMaxX - 30;

      if (nearStart && e.deltaY < 0) {
        // At the start, user scrolling "up/backward" → go to previous view
        overScrollDelta += Math.abs(e.deltaY);
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => { overScrollDelta = 0; }, 600);
        
        if (overScrollDelta >= TRIGGER_THRESHOLD) {
          overScrollDelta = 0;
          onNavigateBackRef.current();
        }
      } else if (nearEnd && e.deltaY > 0) {
        // At the end, user scrolling "down/forward" → go to next view
        overScrollDelta += Math.abs(e.deltaY);
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(() => { overScrollDelta = 0; }, 600);
        
        if (overScrollDelta >= TRIGGER_THRESHOLD) {
          overScrollDelta = 0;
          onNavigateToAboutRef.current();
        }
      } else {
        // Not at boundary or wrong direction → reset
        overScrollDelta = 0;
        if (resetTimer) clearTimeout(resetTimer);
      }
    };

    const initializeScrollAndCursor = async () => {
      try {
        await Promise.all([preloadImages(), preloadFonts()]);
        
        console.log('Initializing Locomotive Scroll');
        const scrollContainer = document.querySelector('[data-scroll-container]');
        console.log('Scroll container found:', scrollContainer !== null);
        
        scrollRef.current = new LocomotiveScroll({
          el: scrollContainer,
          smooth: true,
          direction: 'horizontal',
          multiplier: 0.9,
          lerp: 0.1,
          tablet: {
            smooth: true,
            direction: 'horizontal',
            horizontalGesture: true
          },
          smartphone: {
            smooth: true,
            direction: 'horizontal',
            horizontalGesture: true
          }
        });

        scrollRef.current.on('scroll', (obj: any) => {
          // Track scroll position for boundary detection
          scrollX = obj.scroll?.x ?? 0;
          scrollMaxX = obj.limit?.x ?? 0;
          
          if (!scrollReady && scrollMaxX > 0) {
            scrollReady = true;
            console.log('Scroll ready, max:', scrollMaxX);
          }

          for (const key of Object.keys(obj.currentElements)) {
            const element = obj.currentElements[key];
            
            if (element.el.classList.contains('gallery__item-imginner')) {
              const progress = element.progress;
              const saturateVal = progress < 0.5 ? 
                Math.max(0, Math.min(1, progress * 2)) : 
                Math.max(0, Math.min(1, (1 - progress) * 2));
              const brightnessVal = progress < 0.5 ? 
                Math.max(0, Math.min(1, progress * 2)) : 
                Math.max(0, Math.min(1, (1 - progress) * 2));
              element.el.style.filter = 
                `saturate(${saturateVal}) brightness(${brightnessVal})`;
            }
          }
        });

        setTimeout(() => {
          scrollRef.current.update();
          // Also try to get initial limit
          if (scrollRef.current.scroll?.instance) {
            scrollMaxX = scrollRef.current.scroll.instance.limit?.x ?? 0;
            if (scrollMaxX > 0) scrollReady = true;
          }
          console.log('Scroll updated, limit:', scrollMaxX);
        }, 1000);

        cursorRef.current = new Cursor(document.querySelector('.cursor'));

        [...document.querySelectorAll('a,.gallery__item-img,.gallery__item-number')].forEach(link => {
          link.addEventListener('mouseenter', () => cursorRef.current?.enter());
          link.addEventListener('mouseleave', () => cursorRef.current?.leave());
        });

        // Add boundary wheel listener on the view container
        const viewContainer = document.querySelector('.view--2');
        if (viewContainer) {
          viewContainer.addEventListener('wheel', handleBoundaryWheel, { passive: true });
        }

        document.body.classList.remove('loading');
        console.log('Initialization complete');

      } catch (error) {
        console.error('Error during initialization:', error);
        document.body.classList.remove('loading');
      }
    };

    initializeScrollAndCursor();

    return () => {
      if (scrollRef.current) {
        console.log('Destroying Locomotive Scroll');
        scrollRef.current.destroy();
      }
      const viewContainer = document.querySelector('.view--2');
      if (viewContainer) {
        viewContainer.removeEventListener('wheel', handleBoundaryWheel);
      }
      if (resetTimer) clearTimeout(resetTimer);
      document.body.classList.remove('loading');
    };
  }, []);

  const projectTitles = [
    'Funambulist', 'Omophagy', 'Conniption', 'Xenology', 
    'Lycanthropy', 'Mudlark', 'Illywhacker', 'Disenthral'
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <main data-scroll-container className="h-full">
        <div className="content">
          <div className="gallery" id="gallery">
            {/* Scroll boundary hint - start */}
            <div className="scroll-boundary-hint scroll-boundary-hint--start">
              <ChevronLeft className="boundary-arrow" />
              <span>Home</span>
            </div>

            <div className="scroll-start-spacer">
              <div className="scroll-indicator">
                <ArrowRight />
                <span>scroll to explore</span>
              </div>
            </div>

            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, idx) => (
              <figure 
                key={num} 
                className="gallery__item" 
                data-scroll 
                data-scroll-speed={idx % 2 === 0 ? "2" : "-2"} 
                data-scroll-direction="vertical"
              >
                <div 
                  className="gallery__item-img"
                  onClick={() => onSelectProject(num)}
                  style={{ cursor: 'pointer' }}
                >
                  <div 
                    className="gallery__item-imginner" 
                    data-scroll 
                    data-scroll-speed="1" 
                    data-scroll-direction="vertical"
                    style={{ 
                      backgroundImage: `url(/assets/img/demo1/${num}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: '50% 25%'
                    }}
                  />
                </div>
                <figcaption className="gallery__item-caption">
                  <h2 
                    className="gallery__item-title" 
                    data-scroll 
                    data-scroll-speed={idx % 2 === 0 ? "1.5" : "-1.5"}
                    data-scroll-direction="vertical"
                  >
                    {projectTitles[num-1]}
                  </h2>
                  <span 
                    className="gallery__item-number"
                    data-scroll 
                    data-scroll-speed={idx % 2 === 0 ? "2" : "-2"}
                    data-scroll-direction="vertical"
                  >
                    {String(num).padStart(2, '0')}
                  </span>
                  <p className="gallery__item-tags">
                    <span>#design</span>
                    <span>#creative</span>
                    <span>#development</span>
                  </p>
                  <a 
                    className="gallery__item-link" 
                    onClick={() => onSelectProject(num)}
                    style={{ cursor: 'pointer' }}
                  >
                    explore
                  </a>
                </figcaption>
              </figure>
            ))}

            {/* Scroll boundary hint - end */}
            <div className="scroll-boundary-hint scroll-boundary-hint--end">
              <span>About Me</span>
              <ChevronRight className="boundary-arrow" />
            </div>
          </div>
        </div>
      </main>
      <svg className="cursor" width="20" height="20" viewBox="0 0 20 20">
        <circle className="cursor__inner" cx="10" cy="10" r="5"/>
      </svg>
    </div>
  );
});

export default Projects;