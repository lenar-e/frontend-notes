/// <reference types="vite/types/importMeta.d.ts" />
import type { ComponentType } from 'react';

// Every *.demo.tsx file in notes/react is picked up automatically
const modules = import.meta.glob<{ default: ComponentType }>('../../notes/react/**/*.demo.tsx', {
  eager: true,
});

export interface Demo {
  /** kebab-case file name: StarRating.demo.tsx → star-rating. Used in the URL: #/star-rating */
  id: string;
  title: string;
  /** Folder in notes/react (components, hooks, advanced) — matches the site section */
  folder: string;
  Component: ComponentType;
}

export const GROUP_LABELS: Record<string, string> = {
  components: 'Components',
  hooks: 'Hooks',
  advanced: 'Under the hood',
};

// The same function lives in website/scripts/new.mjs — demo ids and page URLs must match
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
