// Scaffolds a new task in notes/: the site page, the solution and the tests.
//
//   yarn new javascript/promises promise-all
//   yarn new typescript/utility-types my-omit
//   yarn new computer-science/algorithms/patterns/two-pointers valid-palindrome
//   yarn new computer-science/security/vulnerabilities xss   (vulnerabilities, protection → note)
//   yarn new computer-science/security/practice escape-html  (practice → task with code)
//   yarn new react/components Autocomplete     (PascalCase → component)
//   yarn new react/hooks useThrottle           (use* → hook)
//   yarn new react/advanced mini-redux         (otherwise → module)
//   yarn new javascript/theory closures        (theory → note)
//   yarn new system-design/cases chat          (cases → RADIO template)
//
// Add --ru to also create the Russian translation of the page:
//   yarn new javascript/promises promise-all --ru
// Without it, the Russian site shows the English page until a translation exists.

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as prettier from 'prettier';

/** Repo root: the script lives in website/scripts/ */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SECTIONS = [
  'javascript',
  'typescript',
  'browser',
  'css',
  'react',
  'computer-science',
  'system-design',
];

// ---------- helpers ----------

// The same function lives in website/demo/registry.ts — demo ids and page URLs must match
const toKebabCase = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
const toCamelCase = (name) =>
  toKebabCase(name).replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
const toPascalCase = (name) => {
  const camel = toCamelCase(name);
  return camel[0].toUpperCase() + camel.slice(1);
};
const humanize = (name) => {
  const text = toKebabCase(name).replace(/-/g, ' ');
  return text[0].toUpperCase() + text.slice(1);
};

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  console.error('Usage:   yarn new <section>/<category> <name> [--ru]');
  console.error('Example: yarn new javascript/promises promise-all\n');
  console.error(`Sections: ${SECTIONS.join(', ')}\n`);
  process.exit(1);
}

// ---------- page text in both languages ----------

const TEXT = {
  en: {
    problem: 'Problem',
    problemHint: 'The problem as stated in an interview, plus a usage example',
    solution: 'Solution',
    explanation: 'Explanation',
    idea: 'Idea:',
    complexity: 'Complexity: time O(?), space O(?)',
    followUp: 'Follow-up questions',
    followUpQuestion: 'A question you may get after solving it',
    answer: 'Answer',
    answerBody: 'The answer and an explanation.',
    inShort: 'In short',
    gistInterview: '_The gist in a few points — the way you would answer in an interview._',
    gist: '_The gist in a few points._',
    console: 'What will the console print?',
    inDepth: 'In depth',
    interview: 'What to ask or mention in an interview',
    statement: 'The problem as stated by the interviewer.',
    functional: 'Functional:',
    nonFunctional: 'Non-functional:',
    questions: 'Questions for the interviewer:',
    dataTable: ['Entity', 'Fields', 'Lives in'],
    optimizations: ['Performance', 'UX', 'Network', 'Accessibility', 'Security'],
    task: 'Task',
    block: 'Block',
  },
  ru: {
    problem: 'Условие',
    problemHint: 'Формулировка, как на собеседовании, и пример использования',
    solution: 'Решение',
    explanation: 'Разбор',
    idea: 'Идея решения:',
    complexity: 'Сложность: время O(?), память O(?)',
    followUp: 'Follow-up вопросы',
    followUpQuestion: 'Вопрос, который могут задать после решения',
    answer: 'Ответ',
    answerBody: 'Ответ и объяснение.',
    inShort: 'Коротко',
    gistInterview: '_Суть в нескольких пунктах — так, как вы бы ответили на интервью._',
    gist: '_Суть в нескольких пунктах._',
    console: 'Что выведет консоль?',
    inDepth: 'Подробнее',
    interview: 'Что спросить или упомянуть на интервью',
    statement: 'Формулировка задачи от интервьюера.',
    functional: 'Функциональные:',
    nonFunctional: 'Нефункциональные:',
    questions: 'Вопросы интервьюеру:',
    dataTable: ['Сущность', 'Поля', 'Где живёт'],
    optimizations: ['Производительность', 'UX', 'Сеть', 'Доступность', 'Безопасность'],
    task: 'Задача',
    block: 'Блок',
  },
};

// ---------- page templates ----------

/** A task page with code. sources: [file name, variable, raw-loader path] */
const codePage =
  ({ title, sources, demo }) =>
  (t) => {
    const demoImport = demo ? `import ${demo.component} from '${demo.path}';\n` : '';
    const rawImports = sources
      .map(([, variable, path]) => `import ${variable} from '!!raw-loader!${path}';`)
      .join('\n');
    // Prettier doesn't format MDX, so a long file list is split into lines right away
    const entries = sources.map(([file, variable]) => `'${file}': ${variable}`);
    const codeFiles =
      entries.length <= 2
        ? `<CodeFiles files={{ ${entries.join(', ')} }} />`
        : `<CodeFiles\n  files={{\n${entries.map((entry) => `    ${entry},`).join('\n')}\n  }}\n/>`;
    const liveDemo = demo
      ? `\n<LiveDemo id="${demo.id}">\n  <${demo.component} />\n</LiveDemo>\n`
      : '';

    return `---
title: ${title}
---

${demoImport}${rawImports}

## ${t.problem}

{/* ${t.problemHint} */}
${liveDemo}
## ${t.solution}

${codeFiles}

## ${t.explanation}

- ${t.idea}
- ${t.complexity}

## ${t.followUp}

<details>
<summary>${t.followUpQuestion}</summary>

${t.answer}

</details>
`;
  };

const notePage = (title) => (t) => `---
title: ${title}
---

## ${t.inShort}

${t.gistInterview}

## ${t.console}

\`\`\`js
console.log('?');
\`\`\`

<details>
<summary>${t.answer}</summary>

${t.answerBody}

</details>
`;

const topicPage = (title) => (t) => `---
title: ${title}
---

## ${t.inShort}

${t.gist}

## ${t.inDepth}

## ${t.interview}
`;

const radioPage = (title) => (t) => `---
title: ${title}
---

> ${t.statement}

## Requirements

**${t.functional}**

-

**${t.nonFunctional}**

-

**${t.questions}**

## Architecture

\`\`\`mermaid
flowchart LR
  Server[(API)] <--> Data[Data layer]
  Data <--> Store[Client store]
  Store --> UI[UI]
\`\`\`

## Data model

| ${t.dataTable.join(' | ')} |
| --- | --- | --- |
|     |     |     |

## Interface (API)

\`\`\`http
GET /resource
\`\`\`

## Optimizations

${t.optimizations.map((item) => `- **${item}:**`).join('\n')}
`;

const cssPage = (title) => (t) => `---
title: ${title}
---

## ${t.task}

<HtmlPreview
  html={\`<div class="parent">
  <div class="child">${t.block}</div>
</div>\`}
  css={\`.parent {
  display: flex;
}\`}
/>

## ${t.explanation}
`;

// ---------- code templates ----------

const fnModule = (fn) => `export function ${fn}() {
  throw new Error('Not implemented');
}
`;

const fnTest = (fn, file) => `import { describe, expect, it } from 'vitest';

import { ${fn} } from './${file}';

describe('${fn}', () => {
  it('exports a function', () => {
    expect(${fn}).toBeTypeOf('function');
  });

  it.todo('basic case');
  it.todo('edge cases');
});
`;

const typeModule = (type) => `export type ${type}<T> = T;
`;

const typeTest = (type, file) => `import { describe, expectTypeOf, it } from 'vitest';

import type { ${type} } from './${file}';

describe('${type}', () => {
  it('TODO: replace with real checks', () => {
    expectTypeOf<${type}<string>>().toEqualTypeOf<string>();
  });
});
`;

const component = (name) => `import styles from './${name}.module.css';

export interface ${name}Props {
  className?: string;
}

export function ${name}({ className }: ${name}Props) {
  return <div className={className ? \`\${styles.root} \${className}\` : styles.root}>${name}</div>;
}
`;

const componentCss = () => `.root {
  display: block;
}
`;

const componentTest = (name) => `import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders', () => {
    render(<${name} />);

    expect(screen.getByText('${name}')).toBeInTheDocument();
  });
});
`;

const componentDemo = (name) => `import { ${name} } from './${name}';

export default function ${name}Demo() {
  return <${name} />;
}
`;

const hook = (name) => `import { useState } from 'react';

export function ${name}<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);
  return [value, setValue] as const;
}
`;

const hookTest = (name) => `import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ${name} } from './${name}';

describe('${name}', () => {
  it('returns the initial value', () => {
    const { result } = renderHook(() => ${name}(1));

    expect(result.current[0]).toBe(1);
  });
});
`;

const hookDemo = (name) => `import { ${name} } from './${name}';

export default function ${toPascalCase(name)}Demo() {
  const [value] = ${name}('Hello');

  return <div>{value}</div>;
}
`;

// ---------- planning the files ----------

/**
 * Returns the code files (repo-relative path → content) and the page:
 * its file name inside the category and a template that renders it for a language.
 * The page always sits next to the code.
 */
function plan(section, categoryParts, rawName) {
  const docDir = join('notes', section, ...categoryParts);
  const kebab = toKebabCase(rawName);
  const code = {};
  const result = (fileName, render) => ({ code, page: { fileName, render } });

  // react/hooks useThrottle → hook, test and demo next to the page
  if (section === 'react' && /^use[A-Z0-9]/.test(rawName)) {
    const name = rawName;
    code[join(docDir, `${name}.ts`)] = hook(name);
    code[join(docDir, `${name}.test.ts`)] = hookTest(name);
    code[join(docDir, `${name}.demo.tsx`)] = hookDemo(name);
    return result(
      `${kebab}.mdx`,
      codePage({
        title: name,
        demo: { id: kebab, component: `${toPascalCase(name)}Demo`, path: `./${name}.demo` },
        sources: [
          [`${name}.ts`, 'hook', `./${name}.ts`],
          [`${name}.test.ts`, 'tests', `./${name}.test.ts`],
          [`${name}.demo.tsx`, 'demo', `./${name}.demo.tsx`],
        ],
      }),
    );
  }

  // react/components Autocomplete → the page + the component folder next to it
  if (section === 'react' && /^[A-Z]/.test(rawName)) {
    const name = rawName;
    const dir = join(docDir, name);
    code[join(dir, `${name}.tsx`)] = component(name);
    code[join(dir, `${name}.module.css`)] = componentCss();
    code[join(dir, `${name}.test.tsx`)] = componentTest(name);
    code[join(dir, `${name}.demo.tsx`)] = componentDemo(name);
    return result(
      `${kebab}.mdx`,
      codePage({
        title: name,
        demo: { id: kebab, component: `${name}Demo`, path: `./${name}/${name}.demo` },
        sources: [
          [`${name}.tsx`, 'component', `./${name}/${name}.tsx`],
          [`${name}.module.css`, 'styles', `./${name}/${name}.module.css`],
          [`${name}.test.tsx`, 'tests', `./${name}/${name}.test.tsx`],
          [`${name}.demo.tsx`, 'demo', `./${name}/${name}.demo.tsx`],
        ],
      }),
    );
  }

  if (section === 'system-design') {
    const page = categoryParts[0] === 'cases' ? radioPage : topicPage;
    return result(`${kebab}.md`, page(humanize(rawName)));
  }

  if (section === 'css') {
    return result(`${kebab}.mdx`, cssPage(humanize(rawName)));
  }

  if (categoryParts[0] === 'theory') {
    return result(`${kebab}.md`, notePage(humanize(rawName)));
  }

  // computer-science/security/{vulnerabilities,protection} → note; security/practice → task with code
  if (
    section === 'computer-science' &&
    categoryParts[0] === 'security' &&
    categoryParts[1] !== 'practice'
  ) {
    return result(`${kebab}.md`, topicPage(humanize(rawName)));
  }

  if (section === 'typescript') {
    const type = toPascalCase(rawName);
    code[join(docDir, `${kebab}.ts`)] = typeModule(type);
    code[join(docDir, `${kebab}.test-d.ts`)] = typeTest(type, kebab);
    return result(
      `${kebab}.mdx`,
      codePage({
        title: type,
        sources: [
          [`${kebab}.ts`, 'solution', `./${kebab}.ts`],
          [`${kebab}.test-d.ts`, 'tests', `./${kebab}.test-d.ts`],
        ],
      }),
    );
  }

  // javascript, browser, computer-science and other modules (e.g. react/advanced mini-redux)
  const fn = toCamelCase(rawName);
  code[join(docDir, `${kebab}.ts`)] = fnModule(fn);
  code[join(docDir, `${kebab}.test.ts`)] = fnTest(fn, kebab);
  return result(
    `${kebab}.mdx`,
    codePage({
      title: fn,
      sources: [
        [`${kebab}.ts`, 'solution', `./${kebab}.ts`],
        [`${kebab}.test.ts`, 'tests', `./${kebab}.test.ts`],
      ],
    }),
  );
}

// ---------- main ----------

const args = process.argv.slice(2);
const withRussian = args.includes('--ru');
const [categoryArg, rawName] = args.filter((arg) => !arg.startsWith('--'));

if (!categoryArg || !rawName) fail('Missing arguments.');

const [section, ...categoryParts] = categoryArg.replace(/\\/g, '/').replace(/\/+$/, '').split('/');

if (!SECTIONS.includes(section)) fail(`Unknown section "${section}".`);
if (categoryParts.length === 0)
  fail('Specify a category inside the section, e.g. javascript/promises.');
if (!/^[A-Za-z][A-Za-z0-9-]*$/.test(rawName))
  fail(`Invalid name "${rawName}": Latin letters, digits and hyphens only.`);

const { code, page } = plan(section, categoryParts, rawName);
const categoryPath = categoryParts.join('/');

const files = { ...code };
files[join('notes', section, ...categoryParts, page.fileName)] = page.render(TEXT.en);

if (withRussian) {
  // The translation lives in website/i18n, so relative imports are rewritten to the @notes alias
  const notesDir = `@notes/${section}/${categoryPath}/`;
  const russian = page
    .render(TEXT.ru)
    .replaceAll("from './", `from '${notesDir}`)
    .replaceAll('raw-loader!./', `raw-loader!${notesDir}`);
  const translationDir = join(
    'website',
    'i18n',
    'ru',
    `docusaurus-plugin-content-docs-${section}`,
    'current',
    ...categoryParts,
  );
  files[join(translationDir, page.fileName)] = russian;
}

const existing = Object.keys(files).filter((file) => existsSync(join(ROOT, file)));
if (existing.length > 0) fail(`Files already exist:\n  ${existing.join('\n  ')}`);

// Missing categories get a _category_.json — the label can be edited later
let newCategories = false;
for (let depth = 1; depth <= categoryParts.length; depth++) {
  const categoryDir = join('notes', section, ...categoryParts.slice(0, depth));
  if (!existsSync(join(ROOT, categoryDir))) {
    newCategories = true;
    mkdirSync(join(ROOT, categoryDir), { recursive: true });
    const label = humanize(categoryParts[depth - 1]);
    writeFileSync(
      join(ROOT, categoryDir, '_category_.json'),
      `${JSON.stringify({ label }, null, 2)}\n`,
    );
    console.log(`+ ${join(categoryDir, '_category_.json')}`);
  }
}

for (const [file, content] of Object.entries(files)) {
  const absolute = join(ROOT, file);
  // MDX is in .prettierignore: Prettier doesn't support MDX 3 and breaks template literals in JSX
  const formatted = file.endsWith('.mdx')
    ? content
    : await prettier.format(content, {
        ...(await prettier.resolveConfig(absolute)),
        filepath: absolute,
      });

  mkdirSync(dirname(absolute), { recursive: true });
  writeFileSync(absolute, formatted);
  console.log(`+ ${file}`);
}

console.log('\nDone! Next:');
console.log('  1. yarn test:watch  — write the solution against the tests');
console.log('  2. yarn start       — see the page on the site');
console.log('  3. Mark the task as done in README.md');
if (newCategories) {
  console.log('  4. yarn write-translations — add the Russian label for the new category');
}
