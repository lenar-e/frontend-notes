// Разделы сайта. Из этого списка строятся инстансы docs-плагина, навбар, футер и главная.
// id совпадает с именем папки в notes/ и с URL раздела.

export interface Section {
  id: string;
  label: string;
  emoji: string;
  description: string;
  /** Если указано — раздел попадает в выпадающее меню навбара с этим названием */
  navbarGroup?: string;
}

const BASICS = 'Основы';

export const sections: Section[] = [
  {
    id: 'javascript',
    label: 'JavaScript',
    navbarGroup: BASICS,
    emoji: '🟨',
    description:
      'debounce, throttle, промисы, EventEmitter, deepClone, полифиллы. Теория: event loop, замыкания, this, прототипы.',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    navbarGroup: BASICS,
    emoji: '🟦',
    description:
      'Свои utility types, DeepPartial, типизированный EventEmitter, задачи из type-challenges.',
  },
  {
    id: 'browser',
    label: 'Browser',
    navbarGroup: BASICS,
    emoji: '🌐',
    description:
      'Делегирование событий, querySelector, мини Virtual DOM, роутер на History API, IntersectionObserver.',
  },
  {
    id: 'react',
    label: 'React',
    emoji: '⚛️',
    description:
      'Компоненты и хуки с живыми демо: Autocomplete, Modal, виртуальный список. Как устроены useState, Redux, React Query.',
  },
  {
    id: 'computer-science',
    label: 'Computer Science',
    emoji: '🧮',
    description:
      'Алгоритмы и структуры данных: сортировки, поиск, паттерны. Безопасность: XSS, CSRF, CSP, CORS, cookie.',
  },
  {
    id: 'system-design',
    label: 'System Design',
    emoji: '🏗️',
    description:
      'Разбор кейсов по RADIO: лента, чат, автокомплит, редактор. Рендеринг, кэширование, производительность.',
  },
  {
    id: 'css',
    label: 'CSS',
    navbarGroup: BASICS,
    emoji: '🎨',
    description: 'Центрирование, holy grail, Flexbox и Grid, адаптивная сетка, специфичность, БЭМ.',
  },
];
