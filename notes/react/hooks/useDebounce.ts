import { useEffect, useState } from 'react';

/**
 * Returns a value that updates only after `value` has not changed for `delay` ms.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), delay);

    // A new value before the timer fires cancels the previous update
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debounced;
}
