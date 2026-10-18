/**
 * Waits for all values to settle and resolves with their results in the original order.
 * Rejects as soon as any value rejects, with that reason.
 * Accepts any iterable; non-promise values are treated as already resolved.
 */
export function promiseAll<T extends readonly unknown[] | []>(
  values: T,
): Promise<{ -readonly [K in keyof T]: Awaited<T[K]> }>;
export function promiseAll<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]>;
export function promiseAll(values: Iterable<unknown>): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    // Inside the executor: if the iterator throws, the promise rejects instead of throwing
    const items = Array.from(values);
    const results: unknown[] = new Array(items.length);
    let pending = items.length;

    if (pending === 0) {
      resolve(results);
      return;
    }

    items.forEach((item, index) => {
      // Promise.resolve wraps plain values and adopts thenables
      Promise.resolve(item).then((value) => {
        results[index] = value;
        pending -= 1;
        if (pending === 0) {
          resolve(results);
        }
      }, reject);
    });
  });
}
