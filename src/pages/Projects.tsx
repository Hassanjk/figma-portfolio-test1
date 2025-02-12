import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import imagesLoaded from 'imagesloaded';
import { preloadFonts } from '../check-implement-same/js/utils';
import Cursor from '../check-implement-same/js/cursor';

const Projects = React.forwardRef<HTMLDivElement>((props, ref) => {
  const cursorRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    console.log('Initializing Projects component');
    document.body.classList.add('loading');

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
        // Wait for both images and fonts to load
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

        // Add scroll event for image effects and vertical transitions
        scrollRef.current.on('scroll', (obj: any) => {
          for (const key of Object.keys(obj.currentElements)) {
            const element = obj.currentElements[key];
            
            // Handle image inner effects
            if (element.el.classList.contains('gallery__item-imginner')) {
              let progress = element.progress;
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

        // Force scroll update
        setTimeout(() => {
          scrollRef.current.update();
          console.log('Scroll updated');
        }, 1000);

        // Initialize custom cursor
        console.log('Initializing cursor');
        cursorRef.current = new Cursor(document.querySelector('.cursor'));

        // Mouse effects
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
      if (scrollRef.current) {
        console.log('Destroying Locomotive Scroll');
        scrollRef.current.destroy();
      }
      document.body.classList.remove('loading');
    };
  }, []);

  const projectTitles = [
    'Funambulist', 'Omophagy', 'Conniption', 'Xenology', 
    'Lycanthropy', 'Mudlark', 'Illywhacker', 'Disenthral',
    'Abaya', 'Hallux', 'Lablab', 'Momisom'
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <main data-scroll-container className="h-full">
        <div className="content">
          <div className="gallery" id="gallery">
            <div className="gallery__text">
              <span className="gallery__text-inner" data-scroll data-scroll-speed="-4" data-scroll-direction="vertical">
                Ariel
              </span>
              <span data-scroll data-scroll-speed="3" data-scroll-direction="vertical" className="gallery__text-inner">
                Croze
              </span>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num, idx) => (
              <figure 
                key={num} 
                className="gallery__item" 
                data-scroll 
                data-scroll-speed={idx % 2 === 0 ? "2" : "-2"} 
                data-scroll-direction="vertical"
              >
                <div className="gallery__item-img">
                  <div 
                    className="gallery__item-imginner" 
                    data-scroll 
                    data-scroll-speed="1" 
                    data-scroll-direction="vertical"
                    style={{ 
                      backgroundImage: `url(src/assets/img/demo1/${num}.jpg)`,
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
                  <a className="gallery__item-link">explore</a>
                </figcaption>
              </figure>
            ))}
            <div className="gallery__text">
              <span className="gallery__text-inner" data-scroll data-scroll-speed="3" data-scroll-direction="vertical">
                Daria
              </span>
              <span data-scroll data-scroll-speed="-4" data-scroll-direction="vertical" className="gallery__text-inner">
                Gaita
              </span>
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