/// <reference types="vite/types/importMeta.d.ts" />
import type { ComponentType } from 'react';

// Все файлы *.demo.tsx из notes/react подхватываются автоматически
const modules = import.meta.glob<{ default: ComponentType }>('../../notes/react/**/*.demo.tsx', {
  eager: true,
});

export interface Demo {
  /** kebab-case имени файла: StarRating.demo.tsx → star-rating. Используется в URL: #/star-rating */
  id: string;
  title: string;
  /** Папка в notes/react (components, hooks, advanced) — совпадает с разделом на сайте */
  folder: string;
  Component: ComponentType;
}

export const GROUP_LABELS: Record<string, string> = {
  components: 'Компоненты',
  hooks: 'Хуки',
  advanced: 'Под капотом',
};

// Та же функция есть в website/scripts/new.mjs — id демо и URL страницы должны совпадать
export const toKebabCase = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

export const demos: Demo[] = Object.entries(modules)
  .map(([path, module]) => {
    // ../../notes/react/components/StarRating/StarRating.demo.tsx → folder: components
    const [folder] = path.split('/notes/react/')[1].split('/');
    const title = path.split('/').at(-1)!.replace('.demo.tsx', '');

    return { id: toKebabCase(title), title, folder, Component: module.default };
  })
  .sort(
    (a, b) =>
      Object.keys(GROUP_LABELS).indexOf(a.folder) - Object.keys(GROUP_LABELS).indexOf(b.folder) ||
      a.title.localeCompare(b.title),
  );
