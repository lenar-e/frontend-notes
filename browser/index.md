---
slug: /
sidebar_position: 0
sidebar_label: О разделе
title: Browser
---

Задачи на DOM, события и браузерные API — без фреймворков, на чистом TypeScript.

Тесты запускаются в окружении [jsdom](https://github.com/jsdom/jsdom), поэтому в них доступны `document`, `window` и события.

```bash
npm run new -- browser/dom get-elements-by-class-name
```

## Что здесь будет

- **События** — делегирование событий
- **DOM** — свои `getElementsByClassName` и простой `querySelector`
- **Virtual DOM** — `createElement`, `render`, `diff`
- **Браузерные API** — SPA-роутер на History API, `localStorage` с TTL, ленивая загрузка картинок через `IntersectionObserver`
