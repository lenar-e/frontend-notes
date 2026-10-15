// Создаёт в notes/ заготовку новой задачи: страницу сайта, решение и тесты.
//
//   npm run new -- javascript/promises promise-all
//   npm run new -- typescript/utility-types my-omit
//   npm run new -- computer-science/patterns/two-pointers valid-palindrome
//   npm run new -- react/components Autocomplete     (PascalCase → компонент)
//   npm run new -- react/hooks useThrottle           (use* → хук)
//   npm run new -- react/advanced mini-redux         (иначе → модуль)
//   npm run new -- javascript/theory closures        (theory → заметка)
//   npm run new -- system-design/cases chat          (cases → шаблон RADIO)

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as prettier from 'prettier';

/** Корень репозитория: скрипт лежит в website/scripts/ */
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

// ---------- утилиты ----------

// Та же функция есть в website/demo/registry.ts — id демо и URL страницы должны совпадать
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
  console.error('Использование: npm run new -- <раздел>/<категория> <имя>');
  console.error('Пример:        npm run new -- javascript/promises promise-all\n');
  console.error(`Разделы: ${SECTIONS.join(', ')}\n`);
  process.exit(1);
}

// ---------- шаблоны страниц ----------

const followUp = `## Follow-up вопросы

<details>
<summary>Вопрос, который могут задать после решения</summary>

Ответ

</details>
`;

/** Страница задачи с кодом. sources: [имя файла, переменная, путь для raw-loader] */
function codePage({ title, sources, demo }) {
  const demoImport = demo ? `import ${demo.component} from '${demo.path}';\n` : '';
  const rawImports = sources
    .map(([, variable, path]) => `import ${variable} from '!!raw-loader!${path}';`)
    .join('\n');
  // MDX не форматируется Prettier'ом, поэтому длинный список файлов сразу переносим по строкам
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

## Условие

{/* Формулировка, как на собеседовании, и пример использования */}
${liveDemo}
## Решение

${codeFiles}

## Разбор

- Идея решения:
- Сложность: время O(?), память O(?)

${followUp}`;
}

const notePage = (title) => `---
title: ${title}
---

## Коротко

_Суть в нескольких пунктах — так, как вы бы ответили на интервью._

## Что выведет консоль?

\`\`\`js
console.log('?');
\`\`\`

<details>
<summary>Ответ</summary>

Ответ и объяснение.

</details>
`;

const topicPage = (title) => `---
title: ${title}
---

## Коротко

_Суть в нескольких пунктах._

## Подробнее

## Что спросить или упомянуть на интервью
`;

const radioPage = (title) => `---
title: ${title}
---

> Формулировка задачи от интервьюера.

## Requirements

**Функциональные:**

-

**Нефункциональные:**

-

**Вопросы интервьюеру:**

## Architecture

\`\`\`mermaid
flowchart LR
  Server[(API)] <--> Data[Data layer]
  Data <--> Store[Client store]
  Store --> UI[UI]
\`\`\`

## Data model

| Сущность | Поля | Где живёт |
| -------- | ---- | --------- |
|          |      |           |

## Interface (API)

\`\`\`http
GET /resource
\`\`\`

## Optimizations

- **Производительность:**
- **UX:**
- **Сеть:**
- **Доступность:**
- **Безопасность:**
`;

const cssPage = (title) => `---
title: ${title}
---

## Задача

<HtmlPreview
  html={\`<div class="parent">
  <div class="child">Блок</div>
</div>\`}
  css={\`.parent {
  display: flex;
}\`}
/>

## Разбор
`;

// ---------- шаблоны кода ----------

const fnModule = (fn) => `export function ${fn}() {
  throw new Error('Not implemented');
}
`;

const fnTest = (fn, file) => `import { describe, expect, it } from 'vitest';

import { ${fn} } from './${file}';

describe('${fn}', () => {
  it('экспортирует функцию', () => {
    expect(${fn}).toBeTypeOf('function');
  });

  it.todo('базовый случай');
  it.todo('граничные случаи');
});
`;

const typeModule = (type) => `export type ${type}<T> = T;
`;

const typeTest = (type, file) => `import { describe, expectTypeOf, it } from 'vitest';

import type { ${type} } from './${file}';

describe('${type}', () => {
  it('TODO: замените на настоящие проверки', () => {
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
  it('рендерится', () => {
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
  it('возвращает начальное значение', () => {
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

// ---------- сборка списка файлов ----------

// Все пути — относительно корня репозитория. Страница всегда лежит рядом с кодом.
function planFiles(section, categoryParts, rawName) {
  const docDir = join('notes', section, ...categoryParts);
  const kebab = toKebabCase(rawName);
  const files = {};

  // react/hooks useThrottle → хук, тест и демо рядом со страницей
  if (section === 'react' && /^use[A-Z0-9]/.test(rawName)) {
    const name = rawName;
    files[join(docDir, `${name}.ts`)] = hook(name);
    files[join(docDir, `${name}.test.ts`)] = hookTest(name);
    files[join(docDir, `${name}.demo.tsx`)] = hookDemo(name);
    files[join(docDir, `${kebab}.mdx`)] = codePage({
      title: name,
      demo: { id: kebab, component: `${toPascalCase(name)}Demo`, path: `./${name}.demo` },
      sources: [
        [`${name}.ts`, 'hook', `./${name}.ts`],
        [`${name}.test.ts`, 'tests', `./${name}.test.ts`],
        [`${name}.demo.tsx`, 'demo', `./${name}.demo.tsx`],
      ],
    });
    return files;
  }

  // react/components Autocomplete → страница + папка компонента рядом с ней
  if (section === 'react' && /^[A-Z]/.test(rawName)) {
    const name = rawName;
    const dir = join(docDir, name);
    files[join(dir, `${name}.tsx`)] = component(name);
    files[join(dir, `${name}.module.css`)] = componentCss();
    files[join(dir, `${name}.test.tsx`)] = componentTest(name);
    files[join(dir, `${name}.demo.tsx`)] = componentDemo(name);
    files[join(docDir, `${kebab}.mdx`)] = codePage({
      title: name,
      demo: { id: kebab, component: `${name}Demo`, path: `./${name}/${name}.demo` },
      sources: [
        [`${name}.tsx`, 'component', `./${name}/${name}.tsx`],
        [`${name}.module.css`, 'styles', `./${name}/${name}.module.css`],
        [`${name}.test.tsx`, 'tests', `./${name}/${name}.test.tsx`],
        [`${name}.demo.tsx`, 'demo', `./${name}/${name}.demo.tsx`],
      ],
    });
    return files;
  }

  if (section === 'system-design') {
    const page = categoryParts[0] === 'cases' ? radioPage : topicPage;
    files[join(docDir, `${kebab}.md`)] = page(humanize(rawName));
    return files;
  }

  if (section === 'css') {
    files[join(docDir, `${kebab}.mdx`)] = cssPage(humanize(rawName));
    return files;
  }

  if (categoryParts[0] === 'theory') {
    files[join(docDir, `${kebab}.md`)] = notePage(humanize(rawName));
    return files;
  }

  if (section === 'typescript') {
    const type = toPascalCase(rawName);
    files[join(docDir, `${kebab}.ts`)] = typeModule(type);
    files[join(docDir, `${kebab}.test-d.ts`)] = typeTest(type, kebab);
    files[join(docDir, `${kebab}.mdx`)] = codePage({
      title: type,
      sources: [
        [`${kebab}.ts`, 'solution', `./${kebab}.ts`],
        [`${kebab}.test-d.ts`, 'tests', `./${kebab}.test-d.ts`],
      ],
    });
    return files;
  }

  // javascript, browser, computer-science и прочие модули (например, react/advanced mini-redux)
  const fn = toCamelCase(rawName);
  files[join(docDir, `${kebab}.ts`)] = fnModule(fn);
  files[join(docDir, `${kebab}.test.ts`)] = fnTest(fn, kebab);
  files[join(docDir, `${kebab}.mdx`)] = codePage({
    title: fn,
    sources: [
      [`${kebab}.ts`, 'solution', `./${kebab}.ts`],
      [`${kebab}.test.ts`, 'tests', `./${kebab}.test.ts`],
    ],
  });
  return files;
}

// ---------- main ----------

const [categoryArg, rawName] = process.argv.slice(2);

if (!categoryArg || !rawName) fail('Не хватает аргументов.');

const [section, ...categoryParts] = categoryArg.replace(/\\/g, '/').replace(/\/+$/, '').split('/');

if (!SECTIONS.includes(section)) fail(`Неизвестный раздел «${section}».`);
if (categoryParts.length === 0)
  fail('Укажите категорию внутри раздела, например javascript/promises.');
if (!/^[A-Za-z][A-Za-z0-9-]*$/.test(rawName))
  fail(`Некорректное имя «${rawName}»: только латиница, цифры и дефис.`);

const files = planFiles(section, categoryParts, rawName);

const existing = Object.keys(files).filter((file) => existsSync(join(ROOT, file)));
if (existing.length > 0) fail(`Файлы уже существуют:\n  ${existing.join('\n  ')}`);

// Недостающие категории получают _category_.json — название можно поправить потом
for (let depth = 1; depth <= categoryParts.length; depth++) {
  const categoryDir = join('notes', section, ...categoryParts.slice(0, depth));
  if (!existsSync(join(ROOT, categoryDir))) {
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
  // MDX в .prettierignore: Prettier не поддерживает MDX 3 и ломает шаблонные строки в JSX
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

console.log('\nГотово! Дальше:');
console.log('  1. npm run test:watch  — пишите решение по тестам');
console.log('  2. npm start           — смотрите страницу на сайте');
console.log('  3. Отметьте задачу в README.md');
