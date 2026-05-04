import { useEffect, useEffectEvent, useRef, useState } from 'react';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const NATIVE_SCROLL_BREAKPOINT = 768;

export type ScrollDrivenHorizontalSectionHeightMode = 'viewport' | 'content';
export type ScrollDrivenHorizontalSectionMobileScrollMode = 'driven' | 'native';

type UseScrollDrivenHorizontalSectionOptions = {
  heightMode?: ScrollDrivenHorizontalSectionHeightMode;
  mobileScrollMode?: ScrollDrivenHorizontalSectionMobileScrollMode;
};

export const useScrollDrivenHorizontalSection = ({
  heightMode = 'viewport',
  mobileScrollMode = 'driven',
}: UseScrollDrivenHorizontalSectionOptions = {}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const visibleBlockSizeRef = useRef(0);
  const horizontalOverflowRef = useRef(0);
  const isNativeScrollActiveRef = useRef(false);
  const sectionHeightRef = useRef(0);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [isNativeScrollActive, setIsNativeScrollActive] = useState(false);

  const syncTrackOffset = useEffectEvent(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    if (isNativeScrollActiveRef.current) {
      track.style.setProperty('--scroll-driven-track-offset', '0px');
      return;
    }

    const visibleBlockSize = visibleBlockSizeRef.current;
    const sectionHeightValue = sectionHeightRef.current;
    const horizontalOverflow = horizontalOverflowRef.current;

    if (!visibleBlockSize || !sectionHeightValue || horizontalOverflow <= 0) {
      track.style.setProperty('--scroll-driven-track-offset', '0px');
      return;
    }

    const scrollRange = Math.max(sectionHeightValue - visibleBlockSize, 1);
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const progress = clamp((window.scrollY - sectionTop) / scrollRange, 0, 1);
    const offset = horizontalOverflow * progress;

    track.style.setProperty('--scroll-driven-track-offset', `${-offset}px`);
  });

  const measureLayout = useEffectEvent(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const nextIsNativeScrollActive =
      mobileScrollMode === 'native' && window.innerWidth <= NATIVE_SCROLL_BREAKPOINT;
    const nextVisibleBlockSize =
      heightMode === 'content' || nextIsNativeScrollActive
        ? viewport.getBoundingClientRect().height || viewport.clientHeight
        : viewport.clientHeight || window.innerHeight;
    const horizontalOverflow = nextIsNativeScrollActive ? 0 : Math.max(track.scrollWidth - viewport.clientWidth, 0);
    const nextSectionHeight = nextIsNativeScrollActive
      ? nextVisibleBlockSize
      : Math.max(nextVisibleBlockSize + horizontalOverflow, nextVisibleBlockSize);

    visibleBlockSizeRef.current = nextVisibleBlockSize;
    horizontalOverflowRef.current = horizontalOverflow;
    isNativeScrollActiveRef.current = nextIsNativeScrollActive;
    sectionHeightRef.current = nextSectionHeight;

    setIsNativeScrollActive((currentValue) =>
      currentValue === nextIsNativeScrollActive ? currentValue : nextIsNativeScrollActive,
    );
    setSectionHeight((currentHeight) => (currentHeight === nextSectionHeight ? currentHeight : nextSectionHeight));
    syncTrackOffset();
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    let scrollFrame = 0;
    let measureFrame = 0;

    const scheduleScrollSync = () => {
      if (scrollFrame) {
        return;
      }

      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        syncTrackOffset();
      });
    };

    const scheduleMeasure = () => {
      if (measureFrame) {
        return;
      }

      measureFrame = window.requestAnimationFrame(() => {
        measureFrame = 0;
        measureLayout();
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      scheduleMeasure();
    });

    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    window.addEventListener('scroll', scheduleScrollSync, { passive: true });
    window.addEventListener('resize', scheduleMeasure);
    scheduleMeasure();

    const fontsReady = document.fonts?.ready;
    fontsReady?.then(() => {
      scheduleMeasure();
    }).catch(() => undefined);

    return () => {
      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }

      if (measureFrame) {
        window.cancelAnimationFrame(measureFrame);
      }

      resizeObserver.disconnect();
      window.removeEventListener('scroll', scheduleScrollSync);
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [measureLayout, syncTrackOffset]);

  return {
    isNativeScrollActive,
    sectionHeight,
    sectionRef,
    viewportRef,
    trackRef,
  };
};
