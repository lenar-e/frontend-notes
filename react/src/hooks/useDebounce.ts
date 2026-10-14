import { useEffect, useState } from 'react';

/**
 * Возвращает значение, которое обновляется только после `delay` мс без изменений `value`.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebounced(value), delay);

    // Новое value до истечения таймера отменяет предыдущее обновление
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debounced;
}
