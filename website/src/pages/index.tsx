import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import { sections } from '@site/src/data/sections';
import { getDemoUrl } from '@site/src/utils/demoUrl';

import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const tagline = translate({ id: 'homepage.tagline', message: siteConfig.tagline });

  return (
    <Layout description={tagline}>
      <header className={styles.hero}>
        <div className="container">
          <Heading as="h1" className={styles.title}>
            {siteConfig.title}
          </Heading>
          <p className={styles.tagline}>{tagline}</p>
          <div className={styles.actions}>
            <Link className="button button--secondary button--lg" to="/javascript">
              <Translate id="homepage.start">Start with JavaScript</Translate>
            </Link>
            <a
              className={`button button--outline button--lg ${styles.demoButton}`}
              href={getDemoUrl()}
            >
              <Translate id="homepage.demo">Component demo</Translate>
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
                {translate({ id: `section.${id}.label`, message: label })}
              </Heading>
              <p className={styles.cardText}>
                {translate({ id: `section.${id}.description`, message: description })}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
