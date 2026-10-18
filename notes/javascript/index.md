---
slug: /
sidebar_position: 0
sidebar_label: About
title: JavaScript
---

The core of interview prep: implementations of utilities, promises, patterns and polyfills, plus short theory notes.

## Task format

Every task is three files side by side:

| File               | Contents                                                 |
| ------------------ | -------------------------------------------------------- |
| `debounce.mdx`     | Problem, explanation and follow-up questions — site page |
| `debounce.ts`      | Solution                                                 |
| `debounce.test.ts` | Vitest tests: the edge cases interviewers ask about      |

The page pulls the code straight from the files, so the site always shows the version that passes the tests.

Create a new task with:

```bash
yarn new javascript/promises promise-all
```

## What's inside

- **Higher-order functions** — `debounce`, `throttle`, `memoize`, `curry`, `compose`/`pipe`, `once`
- **Promises** — `Promise.all`/`allSettled`/`race`/`any`, `promisify`, `retry`, a concurrency-limited pool, cancellation with `AbortController`
- **Patterns** — `EventEmitter`, LRU Cache, Observable, Pub/Sub
- **Objects and arrays** — `deepClone`, `deepEqual`, `get`/`set` by path, `flatten`, `classnames`
- **Polyfills** — `map`, `filter`, `reduce`, `bind`, `call`, `apply`, `new`, `instanceof`, `JSON.stringify`
- **Theory** — event loop, closures, `this`, prototypes and "what will the console print?" puzzles
