export interface Debounced<Args extends unknown[]> {
  (...args: Args): void;
  /** Cancels the scheduled call */
  cancel(): void;
}

/**
 * Postpones calling `fn` until `delay` ms have passed since the last call of the wrapper.
 * `fn` is called with the arguments and `this` of the last call.
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
