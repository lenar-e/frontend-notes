import { describe, expectTypeOf, it } from 'vitest';

import type { MyPick } from './my-pick';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

describe('MyPick', () => {
  it('keeps only the given keys', () => {
    expectTypeOf<MyPick<Todo, 'title' | 'completed'>>().toEqualTypeOf<{
      title: string;
      completed: boolean;
    }>();
  });

  it('matches the built-in Pick', () => {
    expectTypeOf<MyPick<Todo, 'description'>>().toEqualTypeOf<Pick<Todo, 'description'>>();
  });

  it('keeps the readonly and ? modifiers', () => {
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

  it('rejects keys that are not in the type', () => {
    // @ts-expect-error — Todo has no 'invalid' key
    type _Invalid = MyPick<Todo, 'title' | 'invalid'>;
  });
});
