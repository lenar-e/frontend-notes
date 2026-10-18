---
slug: /
sidebar_position: 0
sidebar_label: About
title: TypeScript
---

Typing at the level interviews check: your own utility types, recursive and conditional types, generics.

## Task format

Type tests live in `*.test-d.ts` files and use [`expectTypeOf`](https://vitest.dev/guide/testing-types) — Vitest checks them with the TypeScript compiler on every `yarn test`:

```ts
expectTypeOf<MyPick<Todo, 'title'>>().toEqualTypeOf<{ title: string }>();

// @ts-expect-error — no such key
type _Invalid = MyPick<Todo, 'unknown'>;
```

```bash
yarn new typescript/utility-types my-omit
```

## What's inside

- **Utility types** — your own `Pick`, `Omit`, `Partial`, `ReturnType`, `Awaited`
- **Advanced types** — `DeepPartial`, `DeepReadonly`, a typed `EventEmitter`
- **Type Challenges** — easy and medium tasks from [type-challenges](https://github.com/type-challenges/type-challenges)
