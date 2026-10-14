---
slug: /
sidebar_position: 0
sidebar_label: О разделе
title: React
---

Компоненты и хуки, которые чаще всего просят написать на интервью, — с тестами на Testing Library и живыми демо.

## Как устроен раздел

```
react/
├── components/, hooks/, advanced/   # страницы сайта (.mdx)
├── src/                             # код: как в обычном React-проекте
│   ├── components/StarRating/
│   │   ├── StarRating.tsx
│   │   ├── StarRating.module.css
│   │   ├── StarRating.test.tsx
│   │   └── StarRating.demo.tsx      # демо: показывается и на сайте, и в демо-приложении
│   └── hooks/
└── demo/                            # Vite-приложение со всеми демо
```

Демо-приложение собирает все файлы `*.demo.tsx` автоматически — регистрировать ничего не нужно. Запуск: `npm run demo`.

```bash
npm run new -- react/components Autocomplete
npm run new -- react/hooks useThrottle
```

## Что здесь будет

- **Компоненты** — Autocomplete, Pagination, Infinite scroll, Virtualized list, Modal, Tabs, Accordion, Tooltip, Toast, таблица с сортировкой, форма с валидацией, дерево комментариев, OTP-инпут, Carousel, Drag-and-drop, загрузка файла
- **Хуки** — `useDebounce`, `useThrottle`, `usePrevious`, `useFetch`, `useLocalStorage`, `useClickOutside`, `useIntersectionObserver`, `useMediaQuery`, `useInterval`
- **Под капотом** — как React хранит хуки (мини `useState`), Redux в 50 строк, упрощённый React Query
