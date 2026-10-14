import CodeFiles from '@site/src/components/CodeFiles';

import styles from './styles.module.css';

interface Props {
  html: string;
  css?: string;
  /** Высота превью в пикселях */
  height?: number;
}

const BASE_STYLES = 'body { margin: 0; padding: 12px; font-family: system-ui, sans-serif; }';

/** Живое превью HTML + CSS в изолированном iframe и код под ним — для раздела CSS */
export default function HtmlPreview({ html, css = '', height = 200 }: Props) {
  const srcDoc = `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_STYLES}\n${css}</style></head><body>${html}</body></html>`;

  return (
    <div className={styles.preview}>
      {/* sandbox без флагов: скрипты внутри превью запрещены, нужны только стили */}
      <iframe
        title="Превью"
        className={styles.frame}
        srcDoc={srcDoc}
        sandbox=""
        style={{ height }}
      />
      <CodeFiles files={css ? { 'index.html': html, 'styles.css': css } : { 'index.html': html }} />
    </div>
  );
}
