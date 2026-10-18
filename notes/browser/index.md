---
slug: /
sidebar_position: 0
sidebar_label: About
title: Browser
---

Tasks on the DOM, events and browser APIs — no frameworks, plain TypeScript.

Tests run in [jsdom](https://github.com/jsdom/jsdom), so `document`, `window` and events are available.

```bash
yarn new browser/dom get-elements-by-class-name
```

## What's inside

- **Events** — event delegation
- **DOM** — your own `getElementsByClassName` and a simple `querySelector`
- **Virtual DOM** — `createElement`, `render`, `diff`
- **Browser APIs** — an SPA router on the History API, `localStorage` with TTL, lazy-loading images with `IntersectionObserver`
