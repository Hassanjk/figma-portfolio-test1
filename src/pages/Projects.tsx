import React, { useCallback, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import imagesLoaded from 'imagesloaded';
import { preloadFonts } from '../check-implement-same/js/utils';
import Cursor from '../check-implement-same/js/cursor';
import { ArrowUp, ArrowRight } from 'lucide-react';
import { useScrollStore } from '../store/useScrollStore';

const EDGE_THRESHOLD = 40;
const EDGE_INTENT_THRESHOLD = 90;
const EDGE_LOCK_MS = 1700;

type GalleryEdge = 'start' | 'end';

type CursorInstance = {
  enter: () => void;
  leave: () => void;
};

type ScrollElementState = {
  el: Element;
  progress: number;
};

type LocomotiveScrollEvent = {
  currentElements?: Record<string, ScrollElementState>;
  limit?: { x?: number };
  scroll?: { x?: number };
};

type LocomotiveScrollInstance = {
  destroy: () => void;
  on: (event: 'scroll', callback: (event: LocomotiveScrollEvent) => void) => void;
  scroll?: {
    instance?: {
      limit?: { x?: number };
      scroll?: { x?: number };
    };
  };
  start?: () => void;
  stop?: () => void;
  update: () => void;
};

interface ProjectsProps {
  onNavigateBack: () => void;
  onNavigateToAbout: () => void;
  onSelectProject: (projectId: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onNavigateBack, onNavigateToAbout, onSelectProject }) => {
  const cursorRef = useRef<CursorInstance | null>(null);
  const scrollRef = useRef<LocomotiveScrollInstance | null>(null);
  const edgeStateRef = useRef({ x: 0, limit: 0 });
  const edgeIntentRef = useRef({ start: 0, end: 0 });
  const transitionLockRef = useRef(false);
  const navigateBackRef = useRef(onNavigateBack);
  const navigateToAboutRef = useRef(onNavigateToAbout);
  const { currentView, isAnimating } = useScrollStore();
  const scrollStateRef = useRef({ currentView, isAnimating });

  useEffect(() => {
    navigateBackRef.current = onNavigateBack;
  }, [onNavigateBack]);

  useEffect(() => {
    navigateToAboutRef.current = onNavigateToAbout;
  }, [onNavigateToAbout]);

  useEffect(() => {
    scrollStateRef.current = { currentView, isAnimating };
  }, [currentView, isAnimating]);

  const resetEdgeIntent = useCallback(() => {
    edgeIntentRef.current = { start: 0, end: 0 };
  }, [resetEdgeIntent, syncEdgeState, triggerEdgeTransition]);

  const syncEdgeState = useCallback((scrollEvent?: LocomotiveScrollEvent) => {
    const instance = scrollRef.current?.scroll?.instance;

    edgeStateRef.current = {
      x: scrollEvent?.scroll?.x ?? instance?.scroll?.x ?? 0,
      limit: scrollEvent?.limit?.x ?? instance?.limit?.x ?? 0,
    };
  }, []);

  const triggerEdgeTransition = useCallback((edge: GalleryEdge) => {
    if (transitionLockRef.current) return;

    transitionLockRef.current = true;
    resetEdgeIntent();
    scrollRef.current?.stop?.();

    if (edge === 'start') {
      navigateBackRef.current();
    } else {
      navigateToAboutRef.current();
    }

    window.setTimeout(() => {
      transitionLockRef.current = false;
    }, EDGE_LOCK_MS);
  }, [resetEdgeIntent]);

  useEffect(() => {
    console.log('Initializing Projects component');
    document.body.classList.add('loading');
    let scrollContainer: Element | null = null;
    let handleWheelAtEdges: ((event: WheelEvent) => void) | null = null;
    let isMounted = true;

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

    const initializeScrollAndCursor = async () => {
      try {
        await Promise.all([preloadImages(), preloadFonts()]);
        if (!isMounted) return;
        
        console.log('Initializing Locomotive Scroll');
        scrollContainer = document.querySelector('[data-scroll-container]');
        console.log('Scroll container found:', scrollContainer !== null);
        if (!scrollContainer) {
          throw new Error('Projects scroll container was not found.');
        }
        
        scrollRef.current = new LocomotiveScroll({
          el: scrollContainer,
          smooth: true,
          direction: 'horizontal',
          gestureDirection: 'both',
          scrollFromAnywhere: true,
          multiplier: 0.9,
          lerp: 0.1,
          getDirection: true,
          getSpeed: true,
          tablet: {
            smooth: true,
            direction: 'horizontal',
            gestureDirection: 'both',
            horizontalGesture: true
          },
          smartphone: {
            smooth: true,
            direction: 'horizontal',
            gestureDirection: 'both',
            horizontalGesture: true
          }
        }) as LocomotiveScrollInstance;

        scrollRef.current.on('scroll', (obj: LocomotiveScrollEvent) => {
          syncEdgeState(obj);

          for (const key of Object.keys(obj.currentElements ?? {})) {
            const element = obj.currentElements?.[key];
            if (!element) continue;
            
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

        syncEdgeState();

        if (scrollStateRef.current.currentView !== 2) {
          scrollRef.current.stop?.();
        }

        handleWheelAtEdges = (event: WheelEvent) => {
          const { currentView, isAnimating } = scrollStateRef.current;
          if (currentView !== 2 || isAnimating || transitionLockRef.current) return;

          const dominantDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX)
            ? event.deltaY
            : event.deltaX;

          if (Math.abs(dominantDelta) < 1) return;

          const { x, limit } = edgeStateRef.current;
          const atStart = x <= EDGE_THRESHOLD;
          const atEnd = limit > 0 && limit - x <= EDGE_THRESHOLD;

          if (atStart && dominantDelta < 0) {
            edgeIntentRef.current.start += Math.abs(dominantDelta);
            edgeIntentRef.current.end = 0;

            if (edgeIntentRef.current.start >= EDGE_INTENT_THRESHOLD) {
              event.preventDefault();
              triggerEdgeTransition('start');
            }

            return;
          }

          if (atEnd && dominantDelta > 0) {
            edgeIntentRef.current.end += Math.abs(dominantDelta);
            edgeIntentRef.current.start = 0;

            if (edgeIntentRef.current.end >= EDGE_INTENT_THRESHOLD) {
              event.preventDefault();
              triggerEdgeTransition('end');
            }

            return;
          }

          resetEdgeIntent();
        };

        window.addEventListener('wheel', handleWheelAtEdges, { passive: false });

        setTimeout(() => {
          scrollRef.current?.update();
          syncEdgeState();
          console.log('Scroll updated');
        }, 1000);

        cursorRef.current = new Cursor(document.querySelector('.cursor')) as CursorInstance;

        [...document.querySelectorAll('a,.gallery__item-img,.gallery__item-number')].forEach(link => {
          link.addEventListener('mouseenter', () => cursorRef.current?.enter());
          link.addEventListener('mouseleave', () => cursorRef.current?.leave());
        });

        document.body.classList.remove('loading');
        console.log('Initialization complete');

      } catch (error) {
        console.error('Error during initialization:', error);
        document.body.classList.remove('loading');
      }
    };

    initializeScrollAndCursor();

    return () => {
      isMounted = false;
      if (scrollRef.current) {
        console.log('Destroying Locomotive Scroll');
        scrollRef.current.destroy();
      }
      if (handleWheelAtEdges) {
        window.removeEventListener('wheel', handleWheelAtEdges);
      }
      document.body.classList.remove('loading');
    };
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;

    if (currentView === 2) {
      scrollRef.current.start?.();

      const updateTimer = window.setTimeout(() => {
        scrollRef.current?.update?.();
        syncEdgeState();
      }, 120);

      return () => window.clearTimeout(updateTimer);
    }

    scrollRef.current.stop?.();
    resetEdgeIntent();
  }, [currentView, resetEdgeIntent, syncEdgeState]);

  const projectTitles = [
    'Funambulist', 'Omophagy', 'Conniption', 'Xenology', 
    'Lycanthropy', 'Mudlark', 'Illywhacker', 'Disenthral'
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <main data-scroll-container className="h-full">
        <div className="content" data-scroll-section>
          <div className="gallery" id="gallery">
            <div className="navigation-container">
              <div className="back-arrow-container" data-nav-edge="start" aria-hidden="true">
                <div 
                  className="back-arrow back-arrow--passive"
                  data-scroll 
                  data-scroll-speed="-4" 
                  data-scroll-direction="vertical"
                >
                  <ArrowUp />
                  <div className="rotating-text">
                    <svg viewBox="0 0 100 100" width="100" height="100">
                      <defs>
                        <path id="circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"/>
                      </defs>
                      <text>
                        <textPath href="#circle">
                          back to main • back to main • 
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="scroll-indicator">
                <ArrowRight />
                <span>selected work</span>
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
            <div className="about-me-container" data-nav-edge="end">
              <div 
                className="about-me-card about-me-card--passive"
                data-scroll 
                data-scroll-speed="2"
                data-scroll-direction="vertical"
                aria-hidden="true"
              >
                <p className="about-me-kicker">Next</p>
                <h3 className="about-me-title">About Me</h3>
                <p className="about-me-subtitle">Let's work together</p>
                <div className="about-me-circle">
                  <ArrowRight />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <svg className="cursor" width="20" height="20" viewBox="0 0 20 20">
        <circle className="cursor__inner" cx="10" cy="10" r="5"/>
      </svg>
    </div>
  );
};

export default Projects;
