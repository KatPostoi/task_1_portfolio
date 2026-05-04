import { useEffect, useState } from 'react';
import './scroll-to-top-button.css';

const SCROLL_THRESHOLD = 1500;

const getScrollButtonVisibility = () => window.scrollY > SCROLL_THRESHOLD;

const getScrollBehavior = (): ScrollBehavior => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'auto';
  }

  return 'smooth';
};

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const syncVisibility = () => {
      const nextIsVisible = getScrollButtonVisibility();

      setIsVisible((currentIsVisible) => {
        if (currentIsVisible === nextIsVisible) {
          return currentIsVisible;
        }

        return nextIsVisible;
      });
    };

    const handleScroll = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        syncVisibility();
      });
    };

    syncVisibility();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: getScrollBehavior(),
    });
  };

  return (
    <button
      aria-label="Наверх"
      className={`scroll-to-top-button${isVisible ? ' scroll-to-top-button--visible' : ''}`}
      onClick={handleClick}
      tabIndex={isVisible ? 0 : -1}
      type="button"
    >
      <svg aria-hidden="true" className="scroll-to-top-button__icon" fill="none" viewBox="0 0 24 24">
        <path d="M12 18V6" stroke="currentColor" strokeLinecap="square" strokeLinejoin="bevel" strokeWidth="1" />
        <path d="m7 11 5-5 5 5" stroke="currentColor" strokeLinecap="square" strokeLinejoin="bevel" strokeWidth="1" />
      </svg>
    </button>
  );
};
