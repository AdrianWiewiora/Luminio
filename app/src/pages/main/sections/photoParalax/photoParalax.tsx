import './photoParalax.scss';
import { paralax1, paralax2, paralax3, paralax4, paralax5, paralax6, paralax7, paralax8, paralax9, paralax10, paralax11, paralax12 } from '../../../../assets/img/imgExport';
import { useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const paralaxColumn1 = [
  { id: 0, name: paralax1 },
  { id: 1, name: paralax2 },
  { id: 2, name: paralax3 },
  { id: 3, name: paralax4 },
]

const paralaxColumn2 = [
  { id: 4, name: paralax5 },
  { id: 5, name: paralax6 },
  { id: 6, name: paralax7 },
  { id: 7, name: paralax8 },
]

const paralaxColumn3 = [
  { id: 8, name: paralax9 },
  { id: 9, name: paralax10 },
  { id: 10, name: paralax11 },
  { id: 11, name: paralax12 },
]

const initSmoothScrolling = () => {
  const lenis = new Lenis({
    duration: 1.2,
    lerp: 0.15,
    smoothWheel: true
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);
};

const scrollPage = () => {
  const grid = document.querySelector('.columns') as HTMLElement | null;
  if (!grid) return;
  
  const columns = Array.from(grid.querySelectorAll('.column'));
  const items = columns.map((column, pos) => {
    return Array.from(column.querySelectorAll('.column__item')).map(item => ({
      element: item as HTMLElement,
      column: pos,
      wrapper: item.querySelector('.column__item--imgwrap') as HTMLElement,
      image: item.querySelector('.column__item-img') as HTMLImageElement,
    }));
  });

  const mergedItems = items.flat();

  gsap.to(columns[1], {
    ease: 'none',
    scrollTrigger: {
      trigger: grid,
      start: 'clamp(top bottom)',
      end: 'clamp(bottom top)',
      scrub: true
    },
    yPercent: -20
  });

  mergedItems.forEach(item => {
    if (item.column === 1) return;
    
    gsap.to(item.wrapper, {
      ease: 'none',
      scrollTrigger: {
        trigger: item.element,
        start: 'clamp(top bottom)',
        end: 'clamp(bottom top)',
        scrub: true
      },
      rotation: item.column === 0 ? -6 : 6,
      xPercent: item.column === 0 ? -10 : 10,
    });
  });
};

function PhotoParalax() {
  useEffect(() => {
    initSmoothScrolling();
    scrollPage();
  }, []);

  return (
    <section className="photo-parallax section">
      <div className="columns">
        {[paralaxColumn1, paralaxColumn2, paralaxColumn3].map((column, colIndex) => (
          <div className="column" key={colIndex}>
            {column.map(({ id, name }) => (
              <figure key={id} className="column__item">
                <div className="column__item--imgwrap">
                  <img src={name} className="column__item--img" alt="Parallax" />
                </div>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default PhotoParalax;
