import type { Options as DocsOptions } from '@docusaurus/plugin-content-docs';
import type * as Preset from '@docusaurus/preset-classic';
import type { Config, Plugin, PluginConfig } from '@docusaurus/types';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { themes as prismThemes } from 'prism-react-renderer';

import {
  BASE_URL,
  DEMO_DEV_URL,
  DEMO_PATH,
  DEV_PORTS,
  GITHUB_USER,
  REPO,
  REPO_URL,
  SITE_URL,
} from './site.config';
import { sections } from './src/data/sections';

// This config runs in Node.js — no browser APIs or JSX here.

const isDev = process.env.NODE_ENV === 'development';

// In dev the demo app runs separately on Vite (`yarn start demo`),
// in production it is built into build/demo and lives next to the site.
// The URL is absolute: a relative link would get the locale prefix (/ru/demo/) on the Russian site.
const demoHref = isDev ? DEMO_DEV_URL : `${SITE_URL}${BASE_URL}${DEMO_PATH}`;

// In dev, each locale runs on its own server (see website/scripts/start.mjs).
// Giving every locale its own url makes the language switcher jump between the servers;
// without it, switching leads to /ru/ on the English server — a 404. Production uses the defaults.
const devLocaleUrls = (locale: keyof typeof DEV_PORTS) =>
  isDev
    ? {
        url: `http://localhost:${DEV_PORTS[locale]}`,
        baseUrl: locale === 'en' ? BASE_URL : `${BASE_URL}${locale}/`,
      }
    : {};

// Content lives outside the site — in the notes/ folder at the repo root
const NOTES_DIR = '../notes';

// Translated pages: website/i18n/<locale>/docusaurus-plugin-content-docs-<section>/current/
const translatedDocsDir = (locale: string, sectionId: string) =>
  `i18n/${locale}/docusaurus-plugin-content-docs-${sectionId}/current`;

// Every section folder (notes/javascript/, notes/typescript/, ...) is a separate docs plugin
// instance with its own sidebar and URL. Task code and tests sit next to the .mdx pages.
const docsPlugins: PluginConfig[] = sections.map(({ id }) => [
  '@docusaurus/plugin-content-docs',
  {
    id,
    path: `${NOTES_DIR}/${id}`,
    routeBasePath: id,
    sidebarPath: './sidebars.ts',
    // "Edit this page" leads to the translation if it exists, otherwise to the English original
    editUrl: ({ locale, docPath }) => {
      const translated = `${translatedDocsDir(locale, id)}/${docPath}`;
      return locale !== 'en' && existsSync(path.join(__dirname, translated))
        ? `${REPO_URL}/edit/main/website/${translated}`
        : `${REPO_URL}/edit/main/notes/${id}/${docPath}`;
    },
    showLastUpdateTime: true,
  } satisfies DocsOptions,
]);

// The @notes alias lets translated pages import code from notes/:
// import solution from '!!raw-loader!@notes/javascript/functions/debounce.ts';
const notesAliasPlugin = (): Plugin => ({
  name: 'notes-alias',
  configureWebpack: () => ({
    resolve: { alias: { '@notes': path.resolve(__dirname, NOTES_DIR) } },
  }),
});

interface NavItem {
  type?: string;
  label?: string;
  position?: 'left' | 'right';
  items?: NavItem[];
  [key: string]: unknown;
}

// Sections with a navbarGroup go into dropdowns, the rest become separate items
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
  tagline: 'Solutions to common frontend interview tasks: code, tests, explanations and live demos',
  favicon: 'img/logo.svg',

  future: {
    // Enables the upcoming v4 flags, including the fast Rspack + SWC build
    v4: true,
  },

  url: SITE_URL,
  baseUrl: BASE_URL,
  organizationName: GITHUB_USER,
  projectName: REPO,
  trailingSlash: false,

  onBrokenLinks: 'throw',

  // English is the default locale, Russian is served under /ru/.
  // A page without a Russian translation falls back to the English version.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeConfigs: {
      en: { label: 'English', htmlLang: 'en', ...devLocaleUrls('en') },
      ru: { label: 'Русский', htmlLang: 'ru', ...devLocaleUrls('ru') },
    },
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
        // Docs are registered below as separate instances — one per section
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [...docsPlugins, notesAliasPlugin],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'ru'],
        indexBlog: false,
        docsRouteBasePath: sections.map(({ id }) => id),
        docsDir: sections.map(({ id }) => `${NOTES_DIR}/${id}`),
        // There is no docs instance with the "default" id — search needs any existing one
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
        { href: demoHref, label: 'Demo', position: 'right' },
        { type: 'localeDropdown', position: 'right' },
        {
          href: REPO_URL,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Sections',
          items: sections.map(({ id, label }) => ({ label, to: `/${id}` })),
        },
        {
          title: 'Project',
          items: [
            { label: 'Component demo', href: demoHref },
            { label: 'GitHub', href: REPO_URL },
          ],
        },
      ],
      // No year here: footer.json keeps a translated copy of this string, and a year would go stale
      copyright: 'Frontend Notes · Built with Docusaurus',
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
