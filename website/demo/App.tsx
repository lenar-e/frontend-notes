import { Component, useSyncExternalStore, type ReactNode } from 'react';

import { BASE_URL, SITE_DEV_URL } from '../site.config';
import styles from './App.module.css';
import { demos, GROUP_LABELS } from './registry';

const DOCS_URL = import.meta.env.DEV ? SITE_DEV_URL : BASE_URL;

// Hash-роутинг (#/star-rating): работает на GitHub Pages без настройки сервера
const subscribe = (callback: () => void) => {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
};
const getDemoId = () => window.location.hash.replace(/^#\/?/, '');

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    return error ? <pre className={styles.error}>{error.message}</pre> : this.props.children;
  }
}

export function App() {
  const demoId = useSyncExternalStore(subscribe, getDemoId);
  const active = demos.find((demo) => demo.id === demoId) ?? demos[0];

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <a className={styles.logo} href={DOCS_URL}>
          ← Frontend Notes
        </a>
        {Object.entries(GROUP_LABELS).map(([folder, label]) => {
          const items = demos.filter((demo) => demo.folder === folder);
          if (items.length === 0) return null;

          return (
            <nav key={folder} aria-label={label}>
              <h2 className={styles.group}>{label}</h2>
              <ul className={styles.list}>
                {items.map((demo) => (
                  <li key={demo.id}>
                    <a
                      className={styles.link}
                      href={`#/${demo.id}`}
                      aria-current={demo === active ? 'page' : undefined}
                    >
                      {demo.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          );
        })}
      </aside>

      <main className={styles.main}>
        {active ? (
          <>
            <header className={styles.header}>
              <h1>{active.title}</h1>
              <a href={`${DOCS_URL}react/${active.folder}/${active.id}`}>Разбор решения →</a>
            </header>
            <section className={styles.canvas}>
              <ErrorBoundary key={active.id}>
                <active.Component />
              </ErrorBoundary>
            </section>
          </>
        ) : (
          <p>Демо пока нет — создайте первое: npm run new -- react/components MyComponent</p>
        )}
      </main>
    </div>
  );
}
