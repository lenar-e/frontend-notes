import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import { sections } from '@site/src/data/sections';
import { useDemoUrl } from '@site/src/hooks/useDemoUrl';

import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const demoUrl = useDemoUrl();

  return (
    <Layout description={siteConfig.tagline}>
      <header className={styles.hero}>
        <div className="container">
          <Heading as="h1" className={styles.title}>
            {siteConfig.title}
          </Heading>
          <p className={styles.tagline}>{siteConfig.tagline}</p>
          <div className={styles.actions}>
            <Link className="button button--secondary button--lg" to="/javascript">
              Начать с JavaScript
            </Link>
            <a className={`button button--outline button--lg ${styles.demoButton}`} href={demoUrl}>
              Демо компонентов
            </a>
          </div>
        </div>
      </header>

      <main className="container margin-vert--xl">
        <div className={styles.grid}>
          {sections.map(({ id, label, emoji, description }) => (
            <Link key={id} to={`/${id}`} className={styles.card}>
              <span className={styles.emoji} aria-hidden>
                {emoji}
              </span>
              <Heading as="h2" className={styles.cardTitle}>
                {label}
              </Heading>
              <p className={styles.cardText}>{description}</p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
