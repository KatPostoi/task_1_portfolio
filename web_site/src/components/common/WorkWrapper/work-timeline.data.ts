export type WorkTimelineYear = {
  value: string;
  x: number;
};

export type WorkTimelineEvent = {
  id: string;
  year: string;
  description: string;
  href: string;
  x: number;
};

export const WORK_TIMELINE_YEARS: WorkTimelineYear[] = [
  { value: '2023', x: 6 },
  { value: '2024', x: 33 },
  { value: '2025', x: 49 },
  { value: '2026', x: 67 },
];

export const WORK_TIMELINE_EVENTS: WorkTimelineEvent[] = [
  {
    id: 'vape-zone',
    year: '2023',
    description: 'Оформление полиграфической и рекламной продукции для магазина “Vape Zone”.',
    href: 'https://www.behance.net/gallery/158888999/Vape',
    x: 3.5,
  },
  {
    id: 'nebons-007',
    year: '2024',
    description: 'Ребрендинг сербской компании горизонтального направленного бурения “Nebons.007”, редизайн интерфейса.',
    href: 'https://www.behance.net/gallery/166884491/vrilling-site-design',
    x: 24,
  },
  {
    id: 'logopediya',
    year: '2026',
    description: 'Формирование айдентики бренда для образовательной студии “ЛОГОПЕДиЯ”, создание брендбука, разработка веб-сайта.',
    href: 'https://www.behance.net/dc97db2b',
    x: 63,
  },
  {
    id: 'chatting',
    year: '2026',
    description: 'Разработка веб-сайта “Chatting”.',
    href: 'https://www.behance.net/dc97db2b',
    x: 76,
  },
];
