import { BASE_URL, DEMO_DEV_URL, DEMO_PATH } from '@site/site.config';

/**
 * Link to the demo app (website/demo). In dev it runs separately (`yarn start demo`),
 * in production it lives next to the site in /demo/.
 *
 * There is one demo app for all locales, so the link is built from the site root
 * rather than the current locale's baseUrl (/frontend-notes/ru/ for Russian).
 *
 * @param id — kebab-case name of the *.demo.tsx file, e.g. `star-rating`
 */
export function getDemoUrl(id?: string): string {
  const root = process.env.NODE_ENV === 'development' ? DEMO_DEV_URL : `${BASE_URL}${DEMO_PATH}`;
  return id ? `${root}#/${id}` : root;
}
