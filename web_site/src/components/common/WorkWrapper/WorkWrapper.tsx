import type { CSSProperties } from 'react';
import backgroundImage from '../../../assets/images/background_3.png';
import { ScrollDrivenHorizontalSection } from '../ScrollDrivenHorizontalSection';
import { WORK_TIMELINE_EVENTS, WORK_TIMELINE_YEARS } from './work-timeline.data';
import './work-wrapper.css';

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
  '--work-axis-mask'?: string;
  '--work-background-image'?: string;
  '--work-event-x'?: number;
  '--work-year-x'?: number;
};

export const WorkWrapper = () => {
  const sectionStyle = {
    '--work-background-image': `url(${backgroundImage})`,
  } as WorkWrapperStyle;

  return (
    <ScrollDrivenHorizontalSection
      canvasClassName="work-wrapper__canvas"
      className="work-wrapper"
      labelledBy="work-wrapper-title"
      sectionStyle={sectionStyle}
    >
      <header className="work-wrapper__header">
        <h2 className="work-wrapper__title text-block__xl" id="work-wrapper-title">
          work // work // work
        </h2>
      </header>

      <div className="work-wrapper__axis" aria-hidden="true" style={{ '--work-axis-mask': workAxisMask } as WorkWrapperStyle}>
        <span className="work-wrapper__axis-line" />
        <ol className="work-wrapper__years">
          {WORK_TIMELINE_YEARS.map((year) => (
            <li className="work-wrapper__year" key={year.value} style={{ '--work-year-x': year.x } as WorkWrapperStyle}>
              <time className="work-wrapper__year-label text-block__l" dateTime={year.value}>
                {year.value}
              </time>
            </li>
          ))}
        </ol>
      </div>

      <ol className="work-wrapper__events" aria-label="Selected work timeline">
        {WORK_TIMELINE_EVENTS.map((event) => (
          <li className="work-wrapper__event" key={event.id} style={{ '--work-event-x': event.x } as WorkWrapperStyle}>
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
    </ScrollDrivenHorizontalSection>
  );
};
