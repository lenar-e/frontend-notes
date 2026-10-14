import { describe, expectTypeOf, it } from 'vitest';

import type { MyPick } from './my-pick';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

describe('MyPick', () => {
  it('оставляет только указанные ключи', () => {
    expectTypeOf<MyPick<Todo, 'title' | 'completed'>>().toEqualTypeOf<{
      title: string;
      completed: boolean;
    }>();
  });

  it('совпадает со встроенным Pick', () => {
    expectTypeOf<MyPick<Todo, 'description'>>().toEqualTypeOf<Pick<Todo, 'description'>>();
  });

  it('сохраняет модификаторы readonly и ?', () => {
    interface User {
      readonly id: number;
      name?: string;
      age: number;
    }

    expectTypeOf<MyPick<User, 'id' | 'name'>>().toEqualTypeOf<{
      readonly id: number;
      name?: string;
    }>();
  });

  it('не принимает ключи, которых нет в типе', () => {
    // @ts-expect-error — ключа 'invalid' нет в Todo
    type _Invalid = MyPick<Todo, 'title' | 'invalid'>;
  });
});
