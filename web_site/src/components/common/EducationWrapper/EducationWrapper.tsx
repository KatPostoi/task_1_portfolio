import { ScrollDrivenHorizontalSection } from '../ScrollDrivenHorizontalSection';
import { EDUCATION_STEPS } from './education-steps.data';
import './education-wrapper.css';

export const EducationWrapper = () => {
  return (
    <ScrollDrivenHorizontalSection
      canvasClassName="education-wrapper__canvas"
      className="education-wrapper"
      heightMode="content"
      labelledBy="education-wrapper-title"
      mobileScrollMode="native"
      overlay={
        <header className="education-wrapper__header">
          <h2 className="education-wrapper__title text-block__xl text-color-dark-blue" id="education-wrapper-title">
            Образование
          </h2>
        </header>
      }
    >
      <ol className="education-wrapper__steps" aria-label="Образование">
        {EDUCATION_STEPS.map(({ direction, id, institution, period, stepLabel, tone }) => (
          <li className="education-wrapper__step" key={id}>
            <article className={`education-wrapper__card education-wrapper__card--${tone}`}>
              <p className="education-wrapper__step-label text-block__xl">{stepLabel}</p>
              <p className="education-wrapper__institution text-block__m">{institution}</p>
              <p className="education-wrapper__meta text-block__s">{direction}</p>
              <p className="education-wrapper__period education-wrapper__meta text-block__s">{period}</p>
            </article>
          </li>
        ))}
      </ol>
    </ScrollDrivenHorizontalSection>
  );
};
