---
slug: /
sidebar_position: 0
sidebar_label: О разделе
title: React
---

Компоненты и хуки, которые чаще всего просят написать на интервью, — с тестами на Testing Library и живыми демо.

## Как устроен раздел

Как и в остальных разделах, страница лежит рядом с кодом:

```
react/
├── components/
│   ├── star-rating.mdx              # страница сайта
│   └── StarRating/                  # компонент: код, стили, тесты, демо
│       ├── StarRating.tsx
│       ├── StarRating.module.css
│       ├── StarRating.test.tsx
│       └── StarRating.demo.tsx      # показывается и на странице, и в демо-приложении
└── hooks/
    ├── use-debounce.mdx
    ├── useDebounce.ts
    ├── useDebounce.test.ts
    └── useDebounce.demo.tsx
```

Демо-приложение (`yarn demo`) собирает все файлы `*.demo.tsx` автоматически — регистрировать ничего не нужно.

```bash
yarn new react/components Autocomplete
yarn new react/hooks useThrottle
```

## Что здесь будет

- **Компоненты** — Autocomplete, Pagination, Infinite scroll, Virtualized list, Modal, Tabs, Accordion, Tooltip, Toast, таблица с сортировкой, форма с валидацией, дерево комментариев, OTP-инпут, Carousel, Drag-and-drop, загрузка файла
- **Хуки** — `useDebounce`, `useThrottle`, `usePrevious`, `useFetch`, `useLocalStorage`, `useClickOutside`, `useIntersectionObserver`, `useMediaQuery`, `useInterval`
- **Под капотом** — как React хранит хуки (мини `useState`), Redux в 50 строк, упрощённый React Query
