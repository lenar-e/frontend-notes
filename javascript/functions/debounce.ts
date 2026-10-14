export interface Debounced<Args extends unknown[]> {
  (...args: Args): void;
  /** Отменяет запланированный вызов */
  cancel(): void;
}

/**
 * Откладывает вызов `fn`, пока с момента последнего вызова обёртки не пройдёт `delay` мс.
 * Вызов происходит с аргументами и `this` последнего вызова.
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
): Debounced<Args> {
  let timerId: ReturnType<typeof setTimeout> | undefined;

  function debounced(this: unknown, ...args: Args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = undefined;
      fn.apply(this, args);
    }, delay);
  }

  debounced.cancel = () => {
    clearTimeout(timerId);
    timerId = undefined;
  };

  return debounced;
}
