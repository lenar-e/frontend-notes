import { translate } from '@docusaurus/Translate';

import CodeFiles from '@site/src/components/CodeFiles';

import styles from './styles.module.css';

interface Props {
  html: string;
  css?: string;
  /** Preview height in pixels */
  height?: number;
}

const BASE_STYLES = 'body { margin: 0; padding: 12px; font-family: system-ui, sans-serif; }';

/** A live HTML + CSS preview in an isolated iframe with the code below it — for the CSS section */
export default function HtmlPreview({ html, css = '', height = 200 }: Props) {
  const srcDoc = `<!doctype html><html><head><meta charset="utf-8"><style>${BASE_STYLES}\n${css}</style></head><body>${html}</body></html>`;

  return (
    <div className={styles.preview}>
      {/* sandbox without flags: scripts inside the preview are blocked, only styles are needed */}
      <iframe
        title={translate({ id: 'htmlPreview.title', message: 'Preview' })}
        className={styles.frame}
        srcDoc={srcDoc}
        sandbox=""
        style={{ height }}
      />
      <CodeFiles files={css ? { 'index.html': html, 'styles.css': css } : { 'index.html': html }} />
    </div>
  );
}
