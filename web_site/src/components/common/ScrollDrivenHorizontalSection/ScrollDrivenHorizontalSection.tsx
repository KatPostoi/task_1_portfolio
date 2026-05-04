import type { CSSProperties, ReactNode, WheelEvent } from 'react';
import {
  type ScrollDrivenHorizontalSectionHeightMode,
  type ScrollDrivenHorizontalSectionMobileScrollMode,
  useScrollDrivenHorizontalSection,
} from './useScrollDrivenHorizontalSection';
import './scroll-driven-horizontal-section.css';

const joinClassNames = (...classNames: Array<string | undefined>) => classNames.filter(Boolean).join(' ');

type ScrollDrivenHorizontalSectionProps = {
  children: ReactNode;
  labelledBy: string;
  canvasClassName?: string;
  canvasStyle?: CSSProperties;
  className?: string;
  heightMode?: ScrollDrivenHorizontalSectionHeightMode;
  mobileScrollMode?: ScrollDrivenHorizontalSectionMobileScrollMode;
  overlay?: ReactNode;
  sectionStyle?: CSSProperties;
};

export const ScrollDrivenHorizontalSection = ({
  children,
  labelledBy,
  canvasClassName,
  canvasStyle,
  className,
  heightMode = 'viewport',
  mobileScrollMode = 'driven',
  overlay,
  sectionStyle,
}: ScrollDrivenHorizontalSectionProps) => {
  const { isNativeScrollActive, sectionHeight, sectionRef, viewportRef, trackRef } = useScrollDrivenHorizontalSection({
    heightMode,
    mobileScrollMode,
  });

  const handleTrackWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!isNativeScrollActive || event.ctrlKey) {
      return;
    }

    const track = event.currentTarget;
    const horizontalOverflow = track.scrollWidth - track.clientWidth;

    if (horizontalOverflow <= 0) {
      return;
    }

    const scrollDelta = Math.abs(event.deltaX) > 0 ? event.deltaX : event.deltaY;

    if (!scrollDelta) {
      return;
    }

    const nextScrollLeft = Math.min(Math.max(track.scrollLeft + scrollDelta, 0), horizontalOverflow);

    if (nextScrollLeft === track.scrollLeft) {
      return;
    }

    event.preventDefault();
    track.scrollLeft = nextScrollLeft;
  };

  const rootStyle = {
    ...sectionStyle,
    height: !isNativeScrollActive && sectionHeight > 0 ? `${sectionHeight}px` : undefined,
  } as CSSProperties;

  return (
    <section
      aria-labelledby={labelledBy}
      className={joinClassNames(
        'scroll-driven-horizontal-section',
        heightMode === 'content' ? 'scroll-driven-horizontal-section--content-height' : undefined,
        isNativeScrollActive ? 'scroll-driven-horizontal-section--native-scroll' : undefined,
        className,
      )}
      ref={sectionRef}
      style={rootStyle}
    >
      <div className="scroll-driven-horizontal-section__sticky">
        <div
          className={joinClassNames(
            'scroll-driven-horizontal-section__viewport',
            overlay ? 'scroll-driven-horizontal-section__viewport--with-overlay' : undefined,
          )}
          ref={viewportRef}
        >
          {overlay ? <div className="scroll-driven-horizontal-section__overlay">{overlay}</div> : null}
          <div className="scroll-driven-horizontal-section__track" onWheel={handleTrackWheel} ref={trackRef}>
            <div
              className={joinClassNames('scroll-driven-horizontal-section__canvas', canvasClassName)}
              style={canvasStyle}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
