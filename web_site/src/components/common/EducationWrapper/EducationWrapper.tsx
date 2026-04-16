import './education-wrapper.css';

export const EducationWrapper = () => {
  return (
    <div className="education-wrapper">
      <h2 className="text-block__xl text-color-dark-blue">Образование</h2>
      <div className="education-steps">
        <div className="education-steps-card">
          <h2 className="text-block__xl text-color-dark-blue">Step 1</h2>
          <h2 className="text-block__m text-color-dark-blue">Ростовское художественное училище им. М. Б. Грекова</h2>
          <h2 className="text-block__s text-color-dark-blue">Направление: Графический дизайн</h2>
          <h2 className="text-block__s text-color-dark-blue">2018-2022</h2>
        </div>
        <div className="education-steps-card">
          <h2 className="text-block__xl text-color-dark-blue">Step 2</h2>
          <h2 className="text-block__m text-color-dark-blue">
            Санкт-Петербургский государственный университет промышленных технологий и дизайна
          </h2>
          <h2 className="text-block__s text-color-dark-blue">Направление: Прикладная информатика (в дизайне)</h2>
          <h2 className="text-block__s text-color-dark-blue">2022-2027</h2>
        </div>
        <div className="education-steps-card">
          <h2 className="text-block__xl">Step 3</h2>
          <h2 className="text-block__m">
            Образовательные курсы, вебинары от Pinkman Experience, Dmitrieva.brand, Brand.design.wellness
          </h2>
          <h2 className="text-block__s">Направление: UX/UI-дизайн</h2>
          <h2 className="text-block__s">2022-2026</h2>
        </div>
      </div>
    </div>
  );
};
