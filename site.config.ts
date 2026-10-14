// Адреса проекта в одном месте: используются в docusaurus.config.ts, в компонентах сайта
// и в конфиге демо-приложения (react/demo/vite.config.ts).

export const GITHUB_USER = 'lenar-e';
export const REPO = 'frontend-notes';

export const REPO_URL = `https://github.com/${GITHUB_USER}/${REPO}`;
export const SITE_URL = `https://${GITHUB_USER}.github.io`;
export const BASE_URL = `/${REPO}/`;

/** Путь демо-приложения относительно BASE_URL (в проде оно лежит в build/demo) */
export const DEMO_PATH = 'demo/';

/** Адреса dev-серверов: `npm start` (сайт) и `npm run demo` (демо) */
export const SITE_DEV_URL = `http://localhost:3000${BASE_URL}`;
export const DEMO_DEV_URL = 'http://localhost:5173/';
