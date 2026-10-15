import useBaseUrl from '@docusaurus/useBaseUrl';

import { DEMO_DEV_URL, DEMO_PATH } from '@site/site.config';

/**
 * Ссылка на демо-приложение (website/demo). В dev оно запущено отдельно (`yarn demo`),
 * в проде лежит рядом с сайтом в /demo/.
 *
 * @param id — kebab-case имя файла *.demo.tsx, например `star-rating`
 */
export function useDemoUrl(id?: string): string {
  const prodUrl = useBaseUrl(`/${DEMO_PATH}`);
  const root = process.env.NODE_ENV === 'development' ? DEMO_DEV_URL : prodUrl;
  return id ? `${root}#/${id}` : root;
}
