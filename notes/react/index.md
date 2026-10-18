---
slug: /
sidebar_position: 0
sidebar_label: About
title: React
---

The components and hooks you are most often asked to build in interviews — with Testing Library tests and live demos.

## How the section is organized

Like every other section, a page lives next to its code:

```
react/
├── components/
│   ├── star-rating.mdx              # site page
│   └── StarRating/                  # component: code, styles, tests, demo
│       ├── StarRating.tsx
│       ├── StarRating.module.css
│       ├── StarRating.test.tsx
│       └── StarRating.demo.tsx      # shown both on the page and in the demo app
└── hooks/
    ├── use-debounce.mdx
    ├── useDebounce.ts
    ├── useDebounce.test.ts
    └── useDebounce.demo.tsx
```

The demo app (`yarn start demo`) picks up every `*.demo.tsx` file automatically — nothing to register.

```bash
yarn new react/components Autocomplete
yarn new react/hooks useThrottle
```

## What's inside

- **Components** — Autocomplete, Pagination, Infinite scroll, Virtualized list, Modal, Tabs, Accordion, Tooltip, Toast, a sortable table, a validated form, nested comments, OTP input, Carousel, Drag-and-drop, file upload
- **Hooks** — `useDebounce`, `useThrottle`, `usePrevious`, `useFetch`, `useLocalStorage`, `useClickOutside`, `useIntersectionObserver`, `useMediaQuery`, `useInterval`
- **Under the hood** — how React stores hooks (a mini `useState`), Redux in 50 lines, a simplified React Query
