import { useEffect, useEffectEvent, useRef, useState, type CSSProperties } from 'react';
import backgroundImage from '../../../assets/images/background_3.png';
import { WORK_TIMELINE_EVENTS, WORK_TIMELINE_YEARS } from './work-timeline.data';
import './work-wrapper.css';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const AXIS_LABEL_HALF_GAP = 'calc(2ch + var(--work-year-label-padding-inline) + (var(--work-event-line-gap) * 2))';

const createAxisMask = (yearPositions: number[]) => {
  if (yearPositions.length === 0) {
    return 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))';
  }

  const stops = ['rgba(0, 0, 0, 1) 0'];

  yearPositions.forEach((position) => {
    const gapStart = `calc(${position}% - ${AXIS_LABEL_HALF_GAP})`;
    const gapEnd = `calc(${position}% + ${AXIS_LABEL_HALF_GAP})`;

    stops.push(`rgba(0, 0, 0, 1) ${gapStart}`);
    stops.push(`transparent ${gapStart}`);
    stops.push(`transparent ${gapEnd}`);
    stops.push(`rgba(0, 0, 0, 1) ${gapEnd}`);
  });

  stops.push('rgba(0, 0, 0, 1) 100%');

  return `linear-gradient(to right, ${stops.join(', ')})`;
};

const workAxisMask = createAxisMask(WORK_TIMELINE_YEARS.map((year) => year.x));

type WorkWrapperStyle = CSSProperties & {
  '--work-background-image'?: string;
  '--work-axis-mask'?: string;
  '--work-event-x'?: number;
  '--work-year-x'?: number;
};

export const WorkWrapper = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportHeightRef = useRef(0);
  const horizontalOverflowRef = useRef(0);
  const sectionHeightRef = useRef(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  const syncTrackOffset = useEffectEvent(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    const viewportHeight = viewportHeightRef.current;
    const sectionHeightValue = sectionHeightRef.current;
    const horizontalOverflow = horizontalOverflowRef.current;

    if (!viewportHeight || !sectionHeightValue || horizontalOverflow <= 0) {
      track.style.setProperty('--work-track-offset', '0px');
      return;
    }

    const scrollRange = Math.max(sectionHeightValue - viewportHeight, 1);
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const progress = clamp((window.scrollY - sectionTop) / scrollRange, 0, 1);
    const offset = horizontalOverflow * progress;

    track.style.setProperty('--work-track-offset', `${-offset}px`);
  });

  const measureLayout = useEffectEvent(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const nextViewportHeight = viewport.clientHeight || window.innerHeight;
    const horizontalOverflow = Math.max(track.scrollWidth - viewport.clientWidth, 0);
    const nextSectionHeight = Math.max(nextViewportHeight + horizontalOverflow, nextViewportHeight);

    viewportHeightRef.current = nextViewportHeight;
    horizontalOverflowRef.current = horizontalOverflow;
    sectionHeightRef.current = nextSectionHeight;

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

  const sectionStyle = {
    '--work-background-image': `url(${backgroundImage})`,
    height: sectionHeight > 0 ? `${sectionHeight}px` : undefined,
  } as WorkWrapperStyle;

  return (
    <section className="work-wrapper" ref={sectionRef} style={sectionStyle} aria-labelledby="work-wrapper-title">
      <div className="work-wrapper__sticky">
        <div className="work-wrapper__viewport" ref={viewportRef}>
          <div className="work-wrapper__track" ref={trackRef}>
            <div className="work-wrapper__canvas">
              <header className="work-wrapper__header">
                <h2 className="work-wrapper__title text-block__xl" id="work-wrapper-title">
                  work // work // work
                </h2>
              </header>

              <div className="work-wrapper__axis" aria-hidden="true" style={{ '--work-axis-mask': workAxisMask } as WorkWrapperStyle}>
                <span className="work-wrapper__axis-line" />
                <ol className="work-wrapper__years">
                  {WORK_TIMELINE_YEARS.map((year) => (
                    <li
                      className="work-wrapper__year"
                      key={year.value}
                      style={{ '--work-year-x': year.x } as WorkWrapperStyle}
                    >
                      <time className="work-wrapper__year-label text-block__l" dateTime={year.value}>
                        {year.value}
                      </time>
                    </li>
                  ))}
                </ol>
              </div>

              <ol className="work-wrapper__events" aria-label="Selected work timeline">
                {WORK_TIMELINE_EVENTS.map((event) => (
                  <li
                    className="work-wrapper__event"
                    key={event.id}
                    style={{ '--work-event-x': event.x } as WorkWrapperStyle}
                  >
                    <span className="work-wrapper__event-stem" aria-hidden="true" />
                    <a
                      className="work-wrapper__event-card work-wrapper__event-link"
                      href={event.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${event.year}: ${event.description}`}
                    >
                      <p className="work-wrapper__event-description text-block__m">{event.description}</p>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
