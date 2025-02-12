import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import imagesLoaded from 'imagesloaded';
import { randomNumber } from '../check-implement-same/js/utils';
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
        await preloadImages();
        
        console.log('Initializing Locomotive Scroll');
        const scrollContainer = document.querySelector('[data-scroll-container]');
        console.log('Scroll container found:', scrollContainer !== null);
        
        scrollRef.current = new LocomotiveScroll({
          el: scrollContainer,
          smooth: true,
          direction: 'horizontal',
          lerp: 0.05,
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

        // Generate random rotations and translations
        const elems = [...document.querySelectorAll('.gallery__item')];
        const rotationsArr = Array.from({length: elems.length}, () => randomNumber(-30,30));
        const translationArr = Array.from({length: elems.length}, () => randomNumber(-100,100));

        scrollRef.current.on('scroll', (obj: any) => {
          for (const key of Object.keys(obj.currentElements)) {
            const el = obj.currentElements[key].el;
            const idx = elems.indexOf(el);
            if (el.classList.contains('gallery__item')) {
              let progress = obj.currentElements[key].progress;
              const rotationVal = progress > 0.6 ? 
                Math.min(Math.max(((progress - 0.6) / 0.4) * rotationsArr[idx], Math.min(0, rotationsArr[idx])), 
                Math.max(0, rotationsArr[idx])) : 0;
              const translationVal = progress > 0.6 ? 
                Math.min(Math.max(((progress - 0.6) / 0.4) * translationArr[idx], Math.min(0, translationArr[idx])), 
                Math.max(0, translationArr[idx])) : 0;
              el.style.transform = `translateY(${translationVal}%) rotate(${rotationVal}deg)`;
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

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <main data-scroll-container className="h-full">
        <div className="content">
          <div className="gallery" id="gallery">
            <div className="gallery__text">
              <span className="gallery__text-inner" data-scroll data-scroll-speed="3" data-scroll-direction="vertical">
                draga
              </span>
              <span data-scroll data-scroll-speed="-4" data-scroll-direction="vertical" className="gallery__text-inner">
                armor
              </span>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <figure key={num} className="gallery__item" data-scroll data-scroll-speed="1">
                <div className="gallery__item-img">
                  <div 
                    className="gallery__item-imginner" 
                    style={{ 
                      backgroundImage: `url(src/assets/img/demo4/${14-num}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: '50% 0'
                    }}
                  />
                </div>
                <figcaption className="gallery__item-caption">
                  <h2 className="gallery__item-title">Project {num}</h2>
                  <span className="gallery__item-number">{String(num).padStart(2, '0')}</span>
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
              <span className="gallery__text-inner" data-scroll data-scroll-speed="-4" data-scroll-direction="vertical">
                Hexed
              </span>
              <span data-scroll data-scroll-speed="3" data-scroll-direction="vertical" className="gallery__text-inner">
                kambu
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