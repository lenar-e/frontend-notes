import BrowserOnly from '@docusaurus/BrowserOnly';
import Translate from '@docusaurus/Translate';
import type { ReactNode } from 'react';

import { getDemoUrl } from '@site/src/utils/demoUrl';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  /** Demo id in the Vite app — kebab-case name of the *.demo.tsx file. Adds an "Open separately" link */
  id?: string;
}

/** A frame for a live React demo right on the docs page */
export default function LiveDemo({ children, id }: Props) {
  return (
    <div className={styles.demo}>
      <div className={styles.toolbar}>
        <span>
          <Translate id="liveDemo.title">Demo</Translate>
        </span>
        {id && (
          <a href={getDemoUrl(id)} target="_blank" rel="noreferrer">
            <Translate id="liveDemo.openSeparately">Open separately ↗</Translate>
          </a>
        )}
      </div>
      <div className={styles.canvas}>
        {/* Demos render in the browser only: components may touch window/document */}
        <BrowserOnly
          fallback={
            <span className={styles.fallback}>
              <Translate id="liveDemo.loading">Loading demo…</Translate>
            </span>
          }
        >
          {() => <>{children}</>}
        </BrowserOnly>
      </div>
    </div>
  );
}
