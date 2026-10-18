---
title: Event loop
sidebar_position: 1
description: Microtasks and macrotasks, execution order and "what will the console print?" puzzles
---

## In short

JavaScript is single-threaded: code runs on one call stack. Async callbacks wait in queues, and the event loop decides what runs next.

One "turn" of the loop:

1. All synchronous code runs until the stack is empty.
2. **All** microtasks run — including the ones added along the way:
   - promise callbacks (`then`, `catch`, `finally`);
   - the continuation of an async function after `await`;
   - `queueMicrotask`, `MutationObserver`.
3. The browser may render a frame: `requestAnimationFrame` → styles → layout → paint.
4. **One** macrotask is taken (`setTimeout`, `setInterval`, events, `MessageChannel`), then all microtasks again.

:::tip How to answer "what will the console print?"

Walk through the code top to bottom and sort the calls into three lists: synchronous code, microtasks, macrotasks. Then print them in that order.

:::

## What will the console print?

```js
console.log(1);

setTimeout(() => console.log(2));

Promise.resolve().then(() => console.log(3));

queueMicrotask(() => console.log(4));

(async () => {
  console.log(5);
  await null;
  console.log(6);
})();

console.log(7);
```

<details>
<summary>Answer</summary>

`1 5 7 3 4 6 2`

- Synchronous: `1`, `5` (an async function body runs synchronously up to the first `await`), `7`.
- Microtasks in the order they were queued: `3`, `4`, `6`.
- Macrotask: `2`.

</details>
