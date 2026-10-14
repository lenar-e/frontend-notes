import MDXComponents from '@theme-original/MDXComponents';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

import CodeFiles from '@site/src/components/CodeFiles';
import HtmlPreview from '@site/src/components/HtmlPreview';
import LiveDemo from '@site/src/components/LiveDemo';

// Компоненты, доступные в любом .md/.mdx без импорта
export default {
  ...MDXComponents,
  Tabs,
  TabItem,
  CodeFiles,
  HtmlPreview,
  LiveDemo,
};
