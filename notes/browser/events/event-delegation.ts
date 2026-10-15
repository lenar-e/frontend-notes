/**
 * Вешает один обработчик на `root` и вызывает `handler` только для событий,
 * которые всплыли от элемента, подходящего под `selector`.
 * Работает и для элементов, добавленных после подписки.
 *
 * @returns функция, снимающая обработчик
 */
export function delegate<K extends keyof HTMLElementEventMap>(
  root: Node,
  eventType: K,
  selector: string,
  handler: (event: HTMLElementEventMap[K], target: Element) => void,
): () => void {
  const listener = (event: Event) => {
    if (!(event.target instanceof Element)) return;

    // closest ищет вверх по дереву, начиная с самого элемента
    const target = event.target.closest(selector);

    // closest может найти предка за пределами root — такие совпадения игнорируем
    if (target && root.contains(target)) {
      handler(event as HTMLElementEventMap[K], target);
    }
  };

  root.addEventListener(eventType, listener);

  return () => root.removeEventListener(eventType, listener);
}
