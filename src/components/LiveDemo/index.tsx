import BrowserOnly from '@docusaurus/BrowserOnly';
import type { ReactNode } from 'react';

import { useDemoUrl } from '@site/src/hooks/useDemoUrl';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  /** id демо в Vite-приложении — kebab-case имени файла *.demo.tsx. Если указан, появится ссылка «Открыть отдельно» */
  id?: string;
}

/** Рамка для живого React-демо прямо на странице документации */
export default function LiveDemo({ children, id }: Props) {
  const demoUrl = useDemoUrl(id);

  return (
    <div className={styles.demo}>
      <div className={styles.toolbar}>
        <span>Демо</span>
        {id && (
          <a href={demoUrl} target="_blank" rel="noreferrer">
            Открыть отдельно ↗
          </a>
        )}
      </div>
      <div className={styles.canvas}>
        {/* Демо рендерится только в браузере: компоненты могут обращаться к window/document */}
        <BrowserOnly fallback={<span className={styles.fallback}>Загрузка демо…</span>}>
          {() => <>{children}</>}
        </BrowserOnly>
      </div>
    </div>
  );
}
