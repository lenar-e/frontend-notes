import CodeBlock from '@theme/CodeBlock';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

interface Props {
  /**
   * File name → source code. The code is pulled from the real files with raw-loader,
   * so the page always shows the same version the tests run against:
   *
   * import solution from '!!raw-loader!./debounce.ts';
   * <CodeFiles files={{ 'debounce.ts': solution }} />
   */
  files: Record<string, string>;
}

function getLanguage(fileName: string): string {
  const extension = fileName.split('.').pop() ?? '';
  return extension === 'mjs' || extension === 'cjs' ? 'js' : extension;
}

export default function CodeFiles({ files }: Props) {
  const entries = Object.entries(files);

  if (entries.length === 1) {
    const [[name, code]] = entries;
    return (
      <CodeBlock language={getLanguage(name)} title={name}>
        {code.trim()}
      </CodeBlock>
    );
  }

  return (
    <Tabs>
      {entries.map(([name, code]) => (
        <TabItem key={name} value={name} label={name}>
          <CodeBlock language={getLanguage(name)}>{code.trim()}</CodeBlock>
        </TabItem>
      ))}
    </Tabs>
  );
}
