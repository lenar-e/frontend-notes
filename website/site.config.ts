// Project URLs in one place: used by docusaurus.config.ts, site components
// and the demo app config (website/demo/vite.config.ts).

export const GITHUB_USER = 'lenar-e';
export const REPO = 'frontend-notes';

export const REPO_URL = `https://github.com/${GITHUB_USER}/${REPO}`;
export const SITE_URL = `https://${GITHUB_USER}.github.io`;
export const BASE_URL = `/${REPO}/`;

/** Demo app path relative to BASE_URL (in production it lives in build/demo) */
export const DEMO_PATH = 'demo/';

/**
 * Dev server ports. In dev, Docusaurus serves one locale per server,
 * so `yarn start` runs English and Russian side by side and the language switcher links between them.
 */
export const DEV_PORTS = { en: 3000, ru: 3001, demo: 5173 } as const;

export const SITE_DEV_URL = `http://localhost:${DEV_PORTS.en}${BASE_URL}`;
export const DEMO_DEV_URL = `http://localhost:${DEV_PORTS.demo}/`;
