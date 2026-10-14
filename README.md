# Frontend Notes

[![CI](https://github.com/lenar-e/frontend-notes/actions/workflows/ci.yml/badge.svg)](https://github.com/lenar-e/frontend-notes/actions/workflows/ci.yml)

Решения типовых задач с фронтенд-собеседований: код на TypeScript, тесты на Vitest, разбор и живые демо.

- 🌐 **Сайт:** https://lenar-e.github.io/frontend-notes/
- ⚛️ **Демо React-компонентов:** https://lenar-e.github.io/frontend-notes/demo/

**Прогресс:** ✅ готово · 🚧 в работе · ⬜ в планах

## Содержание

- [JavaScript](#javascript)
- [TypeScript](#typescript)
- [Browser](#browser)
- [React](#react)
- [Алгоритмы](#алгоритмы)
- [System Design](#system-design)
- [CSS](#css)
- [Как устроен проект](#как-устроен-проект)
- [Команды](#команды)
- [Как добавить задачу](#как-добавить-задачу)
- [Деплой](#деплой)

## JavaScript

**Функции высшего порядка**

- ✅ [debounce](javascript/functions/debounce.ts)
- ⬜ throttle
- ⬜ memoize
- ⬜ curry
- ⬜ compose / pipe
- ⬜ once

**Промисы и асинхронность**

- ⬜ Promise.all
- ⬜ Promise.allSettled
- ⬜ Promise.race
- ⬜ Promise.any
- ⬜ promisify
- ⬜ retry с экспоненциальной задержкой
- ⬜ Пул промисов с лимитом параллельности
- ⬜ sleep
- ⬜ Отменяемый запрос через AbortController

**Паттерны**

- ⬜ EventEmitter
- ⬜ LRU Cache
- ⬜ Observable
- ⬜ Pub/Sub

**Объекты и массивы**

- ⬜ deepClone
- ⬜ deepEqual
- ⬜ get / set по пути (`'a.b[0].c'`)
- ⬜ flatten объекта и массива
- ⬜ classnames

**Полифиллы**

- ⬜ Array.prototype.map / filter / reduce
- ⬜ Function.prototype.bind / call / apply
- ⬜ Оператор new
- ⬜ instanceof
- ⬜ JSON.stringify

**Теория и «что выведет консоль?»**

- 🚧 [Event loop: микро- и макрозадачи](javascript/theory/event-loop.md)
- ⬜ Замыкания
- ⬜ this
- ⬜ Прототипы

## TypeScript

**Utility types**

- ✅ [Pick](typescript/utility-types/my-pick.ts)
- ⬜ Omit
- ⬜ Partial
- ⬜ ReturnType
- ⬜ Awaited

**Продвинутые типы**

- ⬜ DeepPartial
- ⬜ DeepReadonly
- ⬜ Типизированный EventEmitter

**Type Challenges**

- ⬜ Задачи уровня easy
- ⬜ Задачи уровня medium

## Browser

- ✅ [Делегирование событий](browser/events/event-delegation.ts)
- ⬜ getElementsByClassName
- ⬜ Простой querySelector
- ⬜ Мини Virtual DOM: createElement, render, diff
- ⬜ SPA-роутер на History API
- ⬜ Обёртка над localStorage с TTL
- ⬜ Ленивая загрузка картинок через IntersectionObserver

## React

**Компоненты**

- ⬜ Autocomplete: debounce, отмена запросов, гонки ответов, клавиатура, кэш, роль combobox
- ⬜ Pagination
- ⬜ Infinite scroll
- ⬜ Virtualized list (10 000 строк)
- ⬜ Modal: портал, focus trap, закрытие по Esc и клику вне
- ⬜ Tabs
- ⬜ Accordion
- ⬜ Tooltip
- ⬜ Toast-уведомления
- ⬜ Таблица с сортировкой и фильтрацией
- ⬜ Форма с валидацией
- ⬜ Дерево / вложенные комментарии
- ⬜ Файловый проводник
- ✅ [Star rating](react/src/components/StarRating/StarRating.tsx)
- ⬜ OTP-инпут
- ⬜ Carousel
- ⬜ Drag-and-drop список
- ⬜ Загрузка файла с прогрессом

**Хуки**

- ✅ [useDebounce](react/src/hooks/useDebounce.ts)
- ⬜ useThrottle
- ⬜ usePrevious
- ⬜ useFetch
- ⬜ useLocalStorage
- ⬜ useClickOutside
- ⬜ useIntersectionObserver
- ⬜ useMediaQuery
- ⬜ useInterval

**Под капотом**

- ⬜ Мини-useState: как React хранит хуки
- ⬜ Redux в 50 строк
- ⬜ Упрощённый React Query с кэшем

## Алгоритмы

**Сортировки**

| Сортировка | Время: среднее / худшее | Память   | Стабильная |     |
| ---------- | ----------------------- | -------- | ---------- | --- |
| Bubble     | O(n²) / O(n²)           | O(1)     | да         | ⬜  |
| Selection  | O(n²) / O(n²)           | O(1)     | нет        | ⬜  |
| Insertion  | O(n²) / O(n²)           | O(1)     | да         | ⬜  |
| Merge      | O(n log n) / O(n log n) | O(n)     | да         | ⬜  |
| Quick      | O(n log n) / O(n²)      | O(log n) | нет        | ⬜  |
| Heap       | O(n log n) / O(n log n) | O(1)     | нет        | ⬜  |
| Counting   | O(n + k) / O(n + k)     | O(n + k) | да         | ⬜  |

**Поиск**

- ✅ [Бинарный поиск](algorithms/searching/binary-search.ts)
- ⬜ Первое и последнее вхождение
- ⬜ Поиск в повёрнутом массиве

**Структуры данных**

- ⬜ Стек
- ⬜ Очередь
- ⬜ Связный список
- ⬜ Хеш-таблица
- ⬜ Куча
- ⬜ Trie
- ⬜ Граф

**Паттерны (3–5 задач на каждый)**

- ⬜ Два указателя
- ⬜ Скользящее окно
- ⬜ BFS / DFS
- ⬜ Рекурсия и backtracking
- ⬜ Динамическое программирование

**Фронтенд-алгоритмы**

- ⬜ Обход DOM-дерева
- ⬜ Trie для автокомплита
- ⬜ Топологическая сортировка зависимостей

## System Design

**Кейсы по RADIO** (Requirements, Architecture, Data model, Interface, Optimizations)

- 🚧 [Лента новостей](frontend-system-design/cases/news-feed.md)
- ⬜ Autocomplete / поиск
- ⬜ Чат
- ⬜ Галерея изображений / Pinterest
- ⬜ Страница товара e-commerce
- ⬜ Совместный редактор (как Google Docs)
- ⬜ Видеоплеер
- ⬜ Дизайн-система / библиотека компонентов

**Сквозные темы**

- ⬜ CSR / SSR / SSG / ISR
- ⬜ Кэширование
- ⬜ Core Web Vitals и производительность
- ⬜ Безопасность: XSS, CSRF, CSP
- ⬜ Доступность
- ⬜ i18n
- ⬜ Управление состоянием
- ⬜ Offline / PWA

## CSS

- ✅ [Центрирование](css/layouts/centering.mdx)
- ⬜ Holy grail layout
- ⬜ Flexbox и Grid
- ⬜ Адаптивная сетка
- ⬜ Специфичность
- ⬜ БЭМ

---

## Как устроен проект

```
frontend-notes/
├── javascript/                 # раздел сайта = папка: страницы, решения и тесты рядом
│   └── functions/
│       ├── _category_.json     # название и порядок категории в сайдбаре
│       ├── debounce.mdx        # условие, разбор, follow-up вопросы
│       ├── debounce.ts         # решение
│       └── debounce.test.ts    # тесты
├── typescript/                 # тесты типов — *.test-d.ts
├── browser/                    # тесты запускаются в jsdom
├── react/
│   ├── components/, hooks/     # страницы
│   ├── src/                    # компоненты и хуки: код, стили, тесты, *.demo.tsx
│   └── demo/                   # Vite-приложение со всеми демо
├── algorithms/
├── frontend-system-design/     # только Markdown и Mermaid
├── css/
├── src/                        # сайт: главная, MDX-компоненты, стили
├── scripts/new.mjs             # генератор заготовок
├── site.config.ts              # GitHub-пользователь, репозиторий, адреса
└── docusaurus.config.ts
```

- Каждая папка-раздел — отдельный инстанс docs-плагина Docusaurus со своим сайдбаром. Сайдбар строится из структуры папок.
- Код на страницы подтягивается из настоящих файлов через `raw-loader` — на сайте всегда та версия, что проходит тесты.
- Демо-приложение само находит все `react/src/**/*.demo.tsx`. Тот же демо-компонент показывается на странице сайта.

В MDX без импорта доступны:

| Компонент                     | Назначение                                               |
| ----------------------------- | -------------------------------------------------------- |
| `<CodeFiles files={{...}} />` | Вкладки с кодом нескольких файлов                        |
| `<LiveDemo id="...">`         | Живое React-демо на странице и ссылка на демо-приложение |
| `<HtmlPreview html css />`    | Превью HTML и CSS в изолированном iframe                 |
| `<Tabs>`, `<TabItem>`         | Вкладки Docusaurus                                       |

## Команды

| Команда              | Что делает                                               |
| -------------------- | -------------------------------------------------------- |
| `npm start`          | Сайт в dev-режиме: http://localhost:3000/frontend-notes/ |
| `npm run demo`       | Демо-приложение: http://localhost:5173                   |
| `npm run test:watch` | Тесты в watch-режиме                                     |
| `npm test`           | Все тесты, включая проверки типов                        |
| `npm run check`      | ESLint + Prettier + typecheck + тесты — то же, что в CI  |
| `npm run build`      | Сборка сайта и демо в `build/`                           |
| `npm run serve`      | Просмотр сборки локально (поиск работает только здесь)   |
| `npm run new`        | Заготовка новой задачи — см. ниже                        |

## Как добавить задачу

```bash
npm run new -- javascript/promises promise-all
```

Генератор создаёт заготовку под тип раздела:

| Аргументы                                  | Что создаётся                                                |
| ------------------------------------------ | ------------------------------------------------------------ |
| `javascript/promises promise-all`          | страница, решение, тесты                                     |
| `typescript/utility-types my-omit`         | страница, тип, тесты типов `*.test-d.ts`                     |
| `algorithms/patterns/two-pointers two-sum` | то же + недостающие категории                                |
| `react/components Autocomplete`            | компонент, CSS-модуль, тест и демо в `react/src/` + страница |
| `react/hooks useThrottle`                  | хук, тест и демо + страница                                  |
| `javascript/theory closures`               | заметка с блоком «что выведет консоль?»                      |
| `frontend-system-design/cases chat`        | шаблон кейса по RADIO с Mermaid-диаграммой                   |
| `css/layouts holy-grail`                   | страница с живым превью HTML и CSS                           |

Дальше: пишете тесты и решение (`npm run test:watch`), условие и разбор смотрите на сайте (`npm start`), отмечаете задачу в этом README.

## Деплой

Сайт и демо деплоятся на GitHub Pages при пуше в `main`, если прошли все проверки. Один раз нужно включить Pages: **Settings → Pages → Source: GitHub Actions**.

Адреса задаются в [`site.config.ts`](site.config.ts).

**Стек:** Docusaurus 3 · React 19 · TypeScript 6 · Vite 8 · Vitest 5 · Testing Library · ESLint 10 · Prettier · GitHub Actions
