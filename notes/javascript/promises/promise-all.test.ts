import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { promiseAll } from './promise-all';

const delay = <T>(ms: number, value: T) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), ms));

const fail = (ms: number, reason: unknown) =>
  new Promise<never>((_, reject) => setTimeout(() => reject(reason), ms));

describe('promiseAll', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves with the results of all promises', async () => {
    const result = promiseAll([delay(10, 1), delay(20, 2), delay(30, 3)]);
    await vi.advanceTimersByTimeAsync(30);

    await expect(result).resolves.toEqual([1, 2, 3]);
  });

  it('keeps the input order, not the order of resolution', async () => {
    const result = promiseAll([delay(30, 'slow'), delay(10, 'fast'), delay(20, 'medium')]);
    await vi.advanceTimersByTimeAsync(30);

    await expect(result).resolves.toEqual(['slow', 'fast', 'medium']);
  });

  it('waits for the slowest promise', async () => {
    const onResolve = vi.fn();
    promiseAll([delay(10, 1), delay(50, 2)]).then(onResolve);

    await vi.advanceTimersByTimeAsync(49);
    expect(onResolve).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    expect(onResolve).toHaveBeenCalledWith([1, 2]);
  });

  it('treats plain values as resolved promises', async () => {
    await expect(promiseAll([1, 'two', Promise.resolve(3), null])).resolves.toEqual([
      1,
      'two',
      3,
      null,
    ]);
  });

  it('resolves an empty array with an empty array', async () => {
    await expect(promiseAll([])).resolves.toEqual([]);
  });

  it('rejects with the reason of the first rejection', async () => {
    const result = promiseAll([delay(30, 1), fail(20, 'second'), fail(10, 'first')]);
    const assertion = expect(result).rejects.toBe('first');
    await vi.advanceTimersByTimeAsync(30);

    await assertion;
  });

  it('rejects without waiting for the remaining promises', async () => {
    const onReject = vi.fn();
    promiseAll([delay(1000, 1), fail(10, 'error')]).catch(onReject);

    await vi.advanceTimersByTimeAsync(10);
    expect(onReject).toHaveBeenCalledWith('error');
  });

  it('adopts thenables', async () => {
    const thenable = {
      then(resolve: (value: number) => void) {
        resolve(42);
      },
    };

    await expect(promiseAll([thenable])).resolves.toEqual([42]);
  });

  it('accepts any iterable', async () => {
    function* generate() {
      yield 1;
      yield Promise.resolve(2);
    }

    await expect(promiseAll(new Set([Promise.resolve('a'), 'b']))).resolves.toEqual(['a', 'b']);
    await expect(promiseAll(generate())).resolves.toEqual([1, 2]);
  });

  it('rejects instead of throwing when the iterator throws', async () => {
    const broken = {
      [Symbol.iterator]() {
        throw new Error('broken iterator');
      },
    } as Iterable<number>;

    await expect(promiseAll(broken)).rejects.toThrow('broken iterator');
  });

  it('returns a new array and does not mutate the input', async () => {
    const input = [1, Promise.resolve(2)];
    const result = await promiseAll(input);

    expect(result).not.toBe(input);
    expect(input[0]).toBe(1);
    expect(input[1]).toBeInstanceOf(Promise);
  });

  it('behaves like the native Promise.all', async () => {
    const input = () => [1, Promise.resolve('two'), { then: (r: (v: boolean) => void) => r(true) }];

    expect(await promiseAll(input())).toEqual(await Promise.all(input()));
  });
});
