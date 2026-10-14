import type { Options as DocsOptions } from '@docusaurus/plugin-content-docs';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config, PluginConfig } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

import {
  BASE_URL,
  DEMO_DEV_URL,
  DEMO_PATH,
  GITHUB_USER,
  REPO,
  REPO_URL,
  SITE_URL,
} from './site.config';
import { sections } from './src/data/sections';

// Конфиг выполняется в Node.js — здесь нельзя использовать браузерные API и JSX.

const isDev = process.env.NODE_ENV === 'development';

// В dev-режиме демо-приложение крутится отдельно на Vite (`npm run demo`),
// в проде оно собирается в build/demo и живёт рядом с сайтом.
const demoHref = isDev ? DEMO_DEV_URL : `pathname:///${DEMO_PATH}`;

// Каждая папка-раздел (javascript/, typescript/, ...) — отдельный инстанс docs-плагина
// со своим сайдбаром и URL. Код задач и тесты лежат рядом с .mdx-страницами.
const docsPlugins: PluginConfig[] = sections.map(({ id }) => [
  '@docusaurus/plugin-content-docs',
  {
    id,
    path: id,
    routeBasePath: id,
    sidebarPath: './sidebars.ts',
    editUrl: `${REPO_URL}/edit/main/`,
    showLastUpdateTime: true,
  } satisfies DocsOptions,
]);

interface NavItem {
  type?: string;
  label?: string;
  position?: 'left' | 'right';
  items?: NavItem[];
  [key: string]: unknown;
}

// Разделы с navbarGroup собираются в выпадающие меню, остальные — отдельными пунктами
function buildSectionNavItems(): NavItem[] {
  const items: NavItem[] = [];
  const dropdowns = new Map<string, NavItem[]>();

  for (const { id, label, navbarGroup } of sections) {
    const item: NavItem = { type: 'docSidebar', sidebarId: 'main', docsPluginId: id, label };

    if (!navbarGroup) {
      items.push({ ...item, position: 'left' });
      continue;
    }

    let dropdownItems = dropdowns.get(navbarGroup);
    if (!dropdownItems) {
      dropdownItems = [];
      dropdowns.set(navbarGroup, dropdownItems);
      items.push({ type: 'dropdown', label: navbarGroup, position: 'left', items: dropdownItems });
    }
    dropdownItems.push(item);
  }

  return items;
}

const config: Config = {
  title: 'Frontend Notes',
  tagline: 'Решения типовых задач с фронтенд-собеседований: код, тесты, разбор и живые демо',
  favicon: 'img/logo.svg',

  future: {
    // Включает флаги будущей v4, в том числе быструю сборку на Rspack + SWC
    v4: true,
  },

  url: SITE_URL,
  baseUrl: BASE_URL,
  organizationName: GITHUB_USER,
  projectName: REPO,
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  presets: [
    [
      'classic',
      {
        // Документация подключается ниже отдельными инстансами — по одному на раздел
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: docsPlugins,

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['ru', 'en'],
        indexBlog: false,
        docsRouteBasePath: sections.map(({ id }) => id),
        docsDir: sections.map(({ id }) => id),
        // У нас нет docs-инстанса с id "default" — поиску нужен любой существующий
        docsPluginIdForPreferredVersion: sections[0].id,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Frontend Notes',
      logo: {
        alt: 'Frontend Notes',
        src: 'img/logo.svg',
      },
      items: [
        ...buildSectionNavItems(),
        { href: demoHref, label: 'Демо', position: 'right' },
        {
          href: REPO_URL,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'Репозиторий на GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Разделы',
          items: sections.map(({ id, label }) => ({ label, to: `/${id}` })),
        },
        {
          title: 'Проект',
          items: [
            { label: 'Демо компонентов', href: demoHref },
            { label: 'GitHub', href: REPO_URL },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Frontend Notes. Сделано на Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json', 'http'],
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
