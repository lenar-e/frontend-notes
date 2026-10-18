---
slug: /
sidebar_position: 0
sidebar_label: О разделе
title: TypeScript
---

Типизация на уровне, который проверяют на собеседованиях: свои реализации utility types, рекурсивные и условные типы, дженерики.

## Формат задачи

Тесты для типов пишутся в файлах `*.test-d.ts` через [`expectTypeOf`](https://vitest.dev/guide/testing-types) — Vitest проверяет их компилятором TypeScript при каждом `yarn test`:

```ts
expectTypeOf<MyPick<Todo, 'title'>>().toEqualTypeOf<{ title: string }>();

// @ts-expect-error — такого ключа нет
type _Invalid = MyPick<Todo, 'unknown'>;
```

```bash
yarn new typescript/utility-types my-omit
```

## Что здесь будет

- **Utility types** — свои `Pick`, `Omit`, `Partial`, `ReturnType`, `Awaited`
- **Продвинутые типы** — `DeepPartial`, `DeepReadonly`, типизированный `EventEmitter`
- **Type Challenges** — задачи уровня easy/medium из [type-challenges](https://github.com/type-challenges/type-challenges)
