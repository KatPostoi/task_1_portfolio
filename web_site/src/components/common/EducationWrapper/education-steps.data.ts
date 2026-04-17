type EducationStepTone = 'dark' | 'light';

type EducationStep = {
  direction: string;
  id: string;
  institution: string;
  period: string;
  stepLabel: string;
  tone: EducationStepTone;
};

export const EDUCATION_STEPS: EducationStep[] = [
  {
    id: 'grekov-college',
    stepLabel: 'Step 1',
    institution: 'Ростовское художественное училище им. М. Б. Грекова',
    direction: 'Направление: Графический дизайн',
    period: '2018-2022',
    tone: 'light',
  },
  {
    id: 'spgutd',
    stepLabel: 'Step 2',
    institution: 'Санкт-Петербургский государственный университет промышленных технологий и дизайна',
    direction: 'Направление: Прикладная информатика (в дизайне)',
    period: '2022-2027',
    tone: 'light',
  },
  {
    id: 'courses-and-webinars',
    stepLabel: 'Step 3',
    institution: 'Образовательные курсы и вебинары от Pinkman Experience, Dmitrieva.brand, Brand.design.wellness',
    direction: 'Направление: UX/UI-дизайн',
    period: '2022-2026',
    tone: 'dark',
  },
];
