import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { preloadImages } from '../check-implement-same/js/utils';
import Cursor from '../check-implement-same/js/cursor';

const Projects = React.forwardRef<HTMLDivElement>((props, ref) => {
  const cursorRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Locomotive Scroll
    scrollRef.current = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      direction: 'horizontal'
    });

    // Initialize custom cursor
    cursorRef.current = new Cursor(document.querySelector('.cursor'));

    // Mouse effects on all links and others
    [...document.querySelectorAll('a,.gallery__item-img,.gallery__item-number')].forEach(link => {
      link.addEventListener('mouseenter', () => cursorRef.current?.enter());
      link.addEventListener('mouseleave', () => cursorRef.current?.leave());
    });

    // Preload images
    Promise.all([preloadImages('.gallery__item-imginner')]).then(() => {
      document.body.classList.remove('loading');
    });

    return () => {
      scrollRef.current?.destroy();
      document.body.classList.remove('loading');
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      <main data-scroll-container>
        <div className="content">
          <div className="gallery" id="gallery">
            <div className="gallery__text">
              <span className="gallery__text-inner" data-scroll data-scroll-speed="3" data-scroll-direction="vertical">
                Creative
              </span>
              <span data-scroll data-scroll-speed="-4" data-scroll-direction="vertical" className="gallery__text-inner">
                Works
              </span>
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <figure key={num} className="gallery__item" data-scroll data-scroll-speed="1">
                <div className="gallery__item-img">
                  <div 
                    className="gallery__item-imginner" 
                    style={{ backgroundImage: `url(/src/assets/img/demo4/${num}.jpg)` }}
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
                Portfolio
              </span>
              <span data-scroll data-scroll-speed="3" data-scroll-direction="vertical" className="gallery__text-inner">
                2025
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