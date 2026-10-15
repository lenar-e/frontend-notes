---
slug: /
sidebar_position: 0
sidebar_label: О разделе
title: JavaScript
---

Ядро подготовки: реализации утилит, промисов, паттернов и полифиллов, а также короткие заметки по теории.

## Формат задачи

Каждая задача — три файла рядом друг с другом:

| Файл               | Что внутри                                              |
| ------------------ | ------------------------------------------------------- |
| `debounce.mdx`     | Условие, разбор и follow-up вопросы — страница сайта    |
| `debounce.ts`      | Решение                                                 |
| `debounce.test.ts` | Тесты на Vitest: граничные случаи, о которых спрашивают |

Код на страницу подтягивается прямо из файлов, поэтому на сайте всегда та же версия, что проходит тесты.

Новая задача создаётся командой:

```bash
npm run new -- javascript/promises promise-all
```

## Что здесь будет

- **Функции высшего порядка** — `debounce`, `throttle`, `memoize`, `curry`, `compose`/`pipe`, `once`
- **Промисы** — `Promise.all`/`allSettled`/`race`/`any`, `promisify`, `retry`, пул с лимитом параллельности, отмена через `AbortController`
- **Паттерны** — `EventEmitter`, LRU Cache, Observable, Pub/Sub
- **Объекты и массивы** — `deepClone`, `deepEqual`, `get`/`set` по пути, `flatten`, `classnames`
- **Полифиллы** — `map`, `filter`, `reduce`, `bind`, `call`, `apply`, `new`, `instanceof`, `JSON.stringify`
- **Теория** — event loop, замыкания, `this`, прототипы и задачки «что выведет консоль?»
