// Site sections. The docs plugin instances, navbar, footer and home page are all built from this list.
// The id matches the folder name in notes/ and the section URL.
// Russian labels live in website/i18n/ru (navbar.json, footer.json, code.json).

export interface Section {
  id: string;
  label: string;
  emoji: string;
  description: string;
  /** If set, the section goes into a navbar dropdown with this label */
  navbarGroup?: string;
}

const BASICS = 'Basics';

export const sections: Section[] = [
  {
    id: 'javascript',
    label: 'JavaScript',
    navbarGroup: BASICS,
    emoji: '🟨',
    description:
      'debounce, throttle, promises, EventEmitter, deepClone, polyfills. Theory: event loop, closures, this, prototypes.',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    navbarGroup: BASICS,
    emoji: '🟦',
    description:
      'Your own utility types, DeepPartial, a typed EventEmitter, tasks from type-challenges.',
  },
  {
    id: 'browser',
    label: 'Browser',
    navbarGroup: BASICS,
    emoji: '🌐',
    description:
      'Event delegation, querySelector, a mini Virtual DOM, a History API router, IntersectionObserver.',
  },
  {
    id: 'react',
    label: 'React',
    emoji: '⚛️',
    description:
      'Components and hooks with live demos: Autocomplete, Modal, a virtualized list. How useState, Redux and React Query work.',
  },
  {
    id: 'computer-science',
    label: 'Computer Science',
    emoji: '🧮',
    description:
      'Algorithms and data structures: sorting, searching, patterns. Security: XSS, CSRF, CSP, CORS, cookies.',
  },
  {
    id: 'system-design',
    label: 'System Design',
    emoji: '🏗️',
    description:
      'RADIO walkthroughs: feed, chat, autocomplete, editor. Rendering, caching, performance.',
  },
  {
    id: 'css',
    label: 'CSS',
    navbarGroup: BASICS,
    emoji: '🎨',
    description: 'Centering, holy grail, Flexbox and Grid, a responsive grid, specificity, BEM.',
  },
];
