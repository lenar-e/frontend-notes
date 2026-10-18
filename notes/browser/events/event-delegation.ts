/**
 * Attaches a single listener to `root` and calls `handler` only for events
 * that bubbled up from an element matching `selector`.
 * Also works for elements added after subscribing.
 *
 * @returns a function that removes the listener
 */
export function delegate<K extends keyof HTMLElementEventMap>(
  root: Node,
  eventType: K,
  selector: string,
  handler: (event: HTMLElementEventMap[K], target: Element) => void,
): () => void {
  const listener = (event: Event) => {
    if (!(event.target instanceof Element)) return;

    // closest walks up the tree, starting from the element itself
    const target = event.target.closest(selector);

    // closest may find an ancestor outside root — ignore such matches
    if (target && root.contains(target)) {
      handler(event as HTMLElementEventMap[K], target);
    }
  };

  root.addEventListener(eventType, listener);

  return () => root.removeEventListener(eventType, listener);
}
