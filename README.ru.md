# Frontend Notes

[![CI](https://github.com/lenar-e/frontend-notes/actions/workflows/ci.yml/badge.svg)](https://github.com/lenar-e/frontend-notes/actions/workflows/ci.yml)

[English](README.md) · **Русский**

Решения типовых задач с фронтенд-собеседований: код на TypeScript, тесты на Vitest, разбор и живые демо.

- 🌐 **Сайт на русском:** https://lenar-e.github.io/frontend-notes/ru/ (английская версия — [основная](https://lenar-e.github.io/frontend-notes/))
- ⚛️ **Демо React-компонентов:** https://lenar-e.github.io/frontend-notes/demo/

📋 **Список задач и прогресс** ведутся в одном месте — в [README.md](README.md#javascript), чтобы не отмечать каждую задачу дважды.

## Разделы

| Раздел               | Что внутри                                                                    |
| -------------------- | ----------------------------------------------------------------------------- |
| **JavaScript**       | debounce, throttle, промисы, EventEmitter, deepClone, полифиллы, event loop   |
| **TypeScript**       | Свои utility types, DeepPartial, типизированный EventEmitter, type-challenges |
| **Browser**          | Делегирование событий, querySelector, Virtual DOM, роутер на History API      |
| **React**            | Компоненты и хуки с живыми демо, мини-реализации useState, Redux, React Query |
| **Computer Science** | Алгоритмы, структуры данных, безопасность (XSS, CSRF, CSP, CORS, cookie)      |
| **System Design**    | Кейсы по RADIO: лента, чат, автокомплит, редактор. Рендеринг, кэширование     |
| **CSS**              | Центрирование, holy grail, Flexbox и Grid, специфичность, БЭМ                 |

## Как устроен проект

```
frontend-notes/
├── notes/                         # 📚 всё содержимое — то, что наполняется (на английском)
│   ├── javascript/
│   │   └── functions/
│   │       ├── _category_.json    # название и порядок категории в сайдбаре
│   │       ├── debounce.mdx       # условие, разбор, follow-up вопросы
│   │       ├── debounce.ts        # решение
│   │       └── debounce.test.ts   # тесты
│   ├── typescript/  browser/  react/  computer-science/  system-design/  css/
└── website/                       # ⚙️ всё, что показывает заметки, — заглядывать редко
    ├── i18n/ru/                   # русские переводы страниц и интерфейса
    ├── src/                       # главная, MDX-компоненты, стили
    ├── demo/                      # Vite-приложение со всеми React-демо
    └── scripts/                   # запуск dev-серверов и генератор заготовок
```

- Каждая папка в `notes/` — раздел сайта со своим сайдбаром. Сайдбар строится из структуры папок.
- Страница всегда лежит рядом с кодом. Код на страницы подтягивается из настоящих файлов, поэтому на сайте всегда та версия, что проходит тесты.
- Демо-приложение само находит все `notes/react/**/*.demo.tsx`.

## Языки

Основной язык — английский, русский доступен по адресу `/ru/`.

| Что                    | Английский (оригинал)          | Русский (перевод)                                                      |
| ---------------------- | ------------------------------ | ---------------------------------------------------------------------- |
| Страницы               | `notes/<раздел>/…`             | `website/i18n/ru/docusaurus-plugin-content-docs-<раздел>/current/…`    |
| Названия категорий     | `_category_.json`              | `website/i18n/ru/docusaurus-plugin-content-docs-<раздел>/current.json` |
| Навбар, футер          | `website/docusaurus.config.ts` | `website/i18n/ru/docusaurus-theme-classic/{navbar,footer}.json`        |
| Главная и надписи в UI | `website/src`                  | `website/i18n/ru/code.json`                                            |

- Если у страницы нет русского перевода, русский сайт показывает английскую версию — переводить необязательно.
- Код, комментарии и тесты общие для обоих языков, поэтому они на английском.
- Переведённые страницы импортируют код через алиас `@notes`: `import solution from '!!raw-loader!@notes/javascript/functions/debounce.ts'`.
- После добавления раздела или категории запустите `yarn write-translations` — новые ключи появятся в русских JSON-файлах.

## Команды

| Команда                   | Что делает                                                    |
| ------------------------- | ------------------------------------------------------------- |
| `yarn start`              | Английский сайт (:3000), русский (:3001) и демо (:5173)       |
| `yarn start site`         | Только английский сайт: http://localhost:3000/frontend-notes/ |
| `yarn start ru`           | Только русский сайт: http://localhost:3001/frontend-notes/ru/ |
| `yarn start demo`         | Только демо-приложение: http://localhost:5173                 |
| `yarn test:watch`         | Тесты в watch-режиме                                          |
| `yarn test`               | Все тесты, включая проверки типов                             |
| `yarn verify`             | ESLint + Prettier + typecheck + тесты — то же, что в CI       |
| `yarn build`              | Сборка сайта (оба языка) и демо в `website/build/`            |
| `yarn serve`              | Просмотр сборки локально (поиск работает только здесь)        |
| `yarn new`                | Заготовка новой задачи — см. ниже                             |
| `yarn write-translations` | Добавляет новые ключи в русские файлы переводов               |

## Как добавить задачу

```bash
yarn new javascript/promises promise-all
```

Генератор создаёт английскую страницу, решение и тесты. Чтобы сразу создать и русскую версию страницы, добавьте `--ru`:

```bash
yarn new javascript/promises promise-all --ru
```

Примеры для других разделов — в [README.md](README.md#adding-a-task).

Дальше: пишете тесты и решение (`yarn test:watch`), смотрите страницу на сайте (`yarn start`) и отмечаете задачу в [README.md](README.md).

## Деплой

Сайт и демо деплоятся на GitHub Pages при пуше в `main`, если прошли все проверки. Один раз нужно включить Pages: **Settings → Pages → Source: GitHub Actions**.

**Стек:** Docusaurus 3 · React 19 · TypeScript 6 · Vite 8 · Vitest 5 · Testing Library · ESLint 10 · Prettier · GitHub Actions
