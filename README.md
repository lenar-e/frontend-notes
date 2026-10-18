# Frontend Notes

[![CI](https://github.com/lenar-e/frontend-notes/actions/workflows/ci.yml/badge.svg)](https://github.com/lenar-e/frontend-notes/actions/workflows/ci.yml)

**English** · [Русский](README.ru.md)

Solutions to common frontend interview tasks: TypeScript code, Vitest tests, explanations and live demos.

- 🌐 **Site:** https://lenar-e.github.io/frontend-notes/ (Russian: [/ru/](https://lenar-e.github.io/frontend-notes/ru/))
- ⚛️ **React component demo:** https://lenar-e.github.io/frontend-notes/demo/

**Progress:** ✅ done · 🚧 in progress · ⬜ planned

## Contents

- [JavaScript](#javascript)
- [TypeScript](#typescript)
- [Browser](#browser)
- [React](#react)
- [Computer Science](#computer-science)
- [System Design](#system-design)
- [CSS](#css)
- [Project structure](#project-structure)
- [Languages](#languages)
- [Commands](#commands)
- [Adding a task](#adding-a-task)
- [Deployment](#deployment)

## JavaScript

**Higher-order functions**

- ✅ [debounce](notes/javascript/functions/debounce.ts)
- ⬜ throttle
- ⬜ memoize
- ⬜ curry
- ⬜ compose / pipe
- ⬜ once

**Promises and async**

- ⬜ Promise.all
- ⬜ Promise.allSettled
- ⬜ Promise.race
- ⬜ Promise.any
- ⬜ promisify
- ⬜ retry with exponential backoff
- ⬜ Promise pool with a concurrency limit
- ⬜ sleep
- ⬜ Cancellable request with AbortController

**Patterns**

- ⬜ EventEmitter
- ⬜ LRU Cache
- ⬜ Observable
- ⬜ Pub/Sub

**Objects and arrays**

- ⬜ deepClone
- ⬜ deepEqual
- ⬜ get / set by path (`'a.b[0].c'`)
- ⬜ flatten an object and an array
- ⬜ classnames

**Polyfills**

- ⬜ Array.prototype.map / filter / reduce
- ⬜ Function.prototype.bind / call / apply
- ⬜ The new operator
- ⬜ instanceof
- ⬜ JSON.stringify

**Theory and "what will the console print?"**

- 🚧 [Event loop: microtasks and macrotasks](notes/javascript/theory/event-loop.md)
- ⬜ Closures
- ⬜ this
- ⬜ Prototypes

## TypeScript

**Utility types**

- ✅ [Pick](notes/typescript/utility-types/my-pick.ts)
- ⬜ Omit
- ⬜ Partial
- ⬜ ReturnType
- ⬜ Awaited

**Advanced types**

- ⬜ DeepPartial
- ⬜ DeepReadonly
- ⬜ Typed EventEmitter

**Type Challenges**

- ⬜ Easy tasks
- ⬜ Medium tasks

## Browser

- ✅ [Event delegation](notes/browser/events/event-delegation.ts)
- ⬜ getElementsByClassName
- ⬜ A simple querySelector
- ⬜ Mini Virtual DOM: createElement, render, diff
- ⬜ SPA router on the History API
- ⬜ localStorage wrapper with TTL
- ⬜ Lazy-loading images with IntersectionObserver

## React

**Components**

- ⬜ Autocomplete: debounce, request cancellation, response races, keyboard, cache, combobox role
- ⬜ Pagination
- ⬜ Infinite scroll
- ⬜ Virtualized list (10,000 rows)
- ⬜ Modal: portal, focus trap, closing on Esc and outside click
- ⬜ Tabs
- ⬜ Accordion
- ⬜ Tooltip
- ⬜ Toast notifications
- ⬜ Table with sorting and filtering
- ⬜ Form with validation
- ⬜ Tree / nested comments
- ⬜ File explorer
- ✅ [Star rating](notes/react/components/StarRating/StarRating.tsx)
- ⬜ OTP input
- ⬜ Carousel
- ⬜ Drag-and-drop list
- ⬜ File upload with progress

**Hooks**

- ✅ [useDebounce](notes/react/hooks/useDebounce.ts)
- ⬜ useThrottle
- ⬜ usePrevious
- ⬜ useFetch
- ⬜ useLocalStorage
- ⬜ useClickOutside
- ⬜ useIntersectionObserver
- ⬜ useMediaQuery
- ⬜ useInterval

**Under the hood**

- ⬜ Mini useState: how React stores hooks
- ⬜ Redux in 50 lines
- ⬜ A simplified React Query with a cache

## Computer Science

### Algorithms

**Sorting**

| Algorithm | Time: average / worst   | Space    | Stable |     |
| --------- | ----------------------- | -------- | ------ | --- |
| Bubble    | O(n²) / O(n²)           | O(1)     | yes    | ⬜  |
| Selection | O(n²) / O(n²)           | O(1)     | no     | ⬜  |
| Insertion | O(n²) / O(n²)           | O(1)     | yes    | ⬜  |
| Merge     | O(n log n) / O(n log n) | O(n)     | yes    | ⬜  |
| Quick     | O(n log n) / O(n²)      | O(log n) | no     | ⬜  |
| Heap      | O(n log n) / O(n log n) | O(1)     | no     | ⬜  |
| Counting  | O(n + k) / O(n + k)     | O(n + k) | yes    | ⬜  |

**Searching**

- ✅ [Binary search](notes/computer-science/algorithms/searching/binary-search.ts)
- ⬜ First and last occurrence
- ⬜ Search in a rotated array

**Patterns (3–5 tasks each)**

- ⬜ Two pointers
- ⬜ Sliding window
- ⬜ BFS / DFS
- ⬜ Recursion and backtracking
- ⬜ Dynamic programming

**Frontend algorithms**

- ⬜ DOM tree traversal
- ⬜ Trie for autocomplete
- ⬜ Topological sorting of dependencies

### Data structures

- ⬜ Stack
- ⬜ Queue
- ⬜ Linked list
- ⬜ Hash table
- ⬜ Heap
- ⬜ Trie
- ⬜ Graph

### Security

**Vulnerabilities**

- ⬜ XSS: stored, reflected, DOM-based
- ⬜ CSRF
- ⬜ Clickjacking
- ⬜ Open redirect
- ⬜ Prototype pollution

**Protection**

- ⬜ Content Security Policy (CSP)
- ⬜ CORS
- ⬜ Cookie flags: HttpOnly, Secure, SameSite
- ⬜ Where to store tokens: cookies vs localStorage
- ⬜ Subresource Integrity (SRI)
- ⬜ Supply chain: dependencies and lock files

**Practice**

- ⬜ Escaping HTML
- ⬜ Allowlist-based HTML sanitizing
- ⬜ Checking URLs for `javascript:` and open redirects
- ⬜ Building a CSP header
- ⬜ Safe `postMessage`

## System Design

**RADIO cases** (Requirements, Architecture, Data model, Interface, Optimizations)

- 🚧 [News feed](notes/system-design/cases/news-feed.md)
- ⬜ Autocomplete / search
- ⬜ Chat
- ⬜ Image gallery / Pinterest
- ⬜ E-commerce product page
- ⬜ Collaborative editor (like Google Docs)
- ⬜ Video player
- ⬜ Design system / component library

**Cross-cutting topics**

- ⬜ CSR / SSR / SSG / ISR
- ⬜ Caching
- ⬜ Core Web Vitals and performance
- ⬜ Accessibility
- ⬜ i18n
- ⬜ State management
- ⬜ Offline / PWA

## CSS

- ✅ [Centering](notes/css/layouts/centering.mdx)
- ⬜ Holy grail layout
- ⬜ Flexbox and Grid
- ⬜ Responsive grid
- ⬜ Specificity
- ⬜ BEM

---

## Project structure

```
frontend-notes/
├── notes/                         # 📚 all the content — the part you fill in (English)
│   ├── javascript/
│   │   └── functions/
│   │       ├── _category_.json    # category label and order in the sidebar
│   │       ├── debounce.mdx       # problem, explanation, follow-up questions
│   │       ├── debounce.ts        # solution
│   │       └── debounce.test.ts   # tests
│   ├── typescript/                # type tests — *.test-d.ts
│   ├── browser/                   # tests run in jsdom
│   ├── react/
│   │   ├── components/
│   │   │   ├── star-rating.mdx
│   │   │   └── StarRating/        # component, styles, tests, *.demo.tsx
│   │   └── hooks/
│   ├── computer-science/          # algorithms, data structures, security
│   ├── system-design/             # Markdown and Mermaid only
│   └── css/
└── website/                       # ⚙️ everything that presents the notes — rarely touched
    ├── docusaurus.config.ts
    ├── site.config.ts             # GitHub user, repository, URLs
    ├── i18n/ru/                   # Russian translations of pages and UI
    ├── src/                       # home page, MDX components, styles
    ├── demo/                      # Vite app with every React demo
    └── scripts/                   # dev server launcher and task generator
```

The root only holds tool configs (`package.json`, TypeScript, ESLint, Prettier, Vitest).

- Every folder in `notes/` is a site section: a separate Docusaurus docs plugin instance with its own sidebar. The sidebar is built from the folder structure.
- A page always sits next to its code — the same way in every section.
- Pages pull code from the real files with `raw-loader`, so the site always shows the version that passes the tests.
- The demo app finds every `notes/react/**/*.demo.tsx` on its own. The same demo component is shown on the site page.

Available in MDX without an import:

| Component                     | Purpose                                             |
| ----------------------------- | --------------------------------------------------- |
| `<CodeFiles files={{...}} />` | Tabs with the code of several files                 |
| `<LiveDemo id="...">`         | A live React demo on the page and a link to the app |
| `<HtmlPreview html css />`    | An HTML and CSS preview in an isolated iframe       |
| `<Tabs>`, `<TabItem>`         | Docusaurus tabs                                     |

## Languages

English is the default; Russian is served under `/ru/`.

| What                     | English (source)               | Russian (translation)                                                   |
| ------------------------ | ------------------------------ | ----------------------------------------------------------------------- |
| Pages                    | `notes/<section>/…`            | `website/i18n/ru/docusaurus-plugin-content-docs-<section>/current/…`    |
| Category labels          | `_category_.json`              | `website/i18n/ru/docusaurus-plugin-content-docs-<section>/current.json` |
| Navbar, footer           | `website/docusaurus.config.ts` | `website/i18n/ru/docusaurus-theme-classic/{navbar,footer}.json`         |
| Home page and UI strings | `website/src`                  | `website/i18n/ru/code.json`                                             |

- A page without a Russian translation is shown in English on the Russian site — translations are optional.
- Code, comments and tests are shared by both languages, so they are in English.
- Translated pages import code through the `@notes` alias: `import solution from '!!raw-loader!@notes/javascript/functions/debounce.ts'`.
- After adding a section or a category, run `yarn write-translations` to get the new keys into the Russian JSON files.

## Commands

| Command                   | What it does                                                        |
| ------------------------- | ------------------------------------------------------------------- |
| `yarn start`              | English site (:3000), Russian site (:3001) and demo (:5173)         |
| `yarn start site`         | English site only: http://localhost:3000/frontend-notes/            |
| `yarn start ru`           | Russian site only: http://localhost:3001/frontend-notes/ru/         |
| `yarn start demo`         | Demo app only: http://localhost:5173                                |
| `yarn test:watch`         | Tests in watch mode                                                 |
| `yarn test`               | All tests, including type checks                                    |
| `yarn verify`             | ESLint + Prettier + typecheck + tests — the same as CI              |
| `yarn build`              | Builds the site (both languages) and the demo into `website/build/` |
| `yarn serve`              | Serves the build locally (search only works here)                   |
| `yarn new`                | Scaffolds a new task — see below                                    |
| `yarn write-translations` | Adds new keys to the Russian translation files                      |

## Adding a task

```bash
yarn new javascript/promises promise-all
```

The generator scaffolds a task based on the section:

| Arguments                                                   | What gets created                                     |
| ----------------------------------------------------------- | ----------------------------------------------------- |
| `javascript/promises promise-all`                           | page, solution, tests                                 |
| `typescript/utility-types my-omit`                          | page, type, type tests `*.test-d.ts`                  |
| `computer-science/algorithms/patterns/two-pointers two-sum` | the same + missing categories                         |
| `computer-science/security/vulnerabilities xss`             | note (in `practice` — a task with code and tests)     |
| `react/components Autocomplete`                             | component, CSS module, test and demo next to the page |
| `react/hooks useThrottle`                                   | hook, test and demo + page                            |
| `javascript/theory closures`                                | note with a "what will the console print?" block      |
| `system-design/cases chat`                                  | RADIO case template with a Mermaid diagram            |
| `css/layouts holy-grail`                                    | page with a live HTML and CSS preview                 |

Add `--ru` to also create the Russian translation of the page: `yarn new javascript/promises promise-all --ru`.

Then: write the tests and the solution (`yarn test:watch`), check the problem and explanation on the site (`yarn start`), and mark the task in this README.

## Deployment

The site and the demo deploy to GitHub Pages on every push to `main` once all checks pass. Enable Pages once: **Settings → Pages → Source: GitHub Actions**.

URLs are configured in [`website/site.config.ts`](website/site.config.ts).

**Stack:** Docusaurus 3 · React 19 · TypeScript 6 · Vite 8 · Vitest 5 · Testing Library · ESLint 10 · Prettier · GitHub Actions
