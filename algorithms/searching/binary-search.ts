/**
 * Ищет `target` в массиве, отсортированном по возрастанию.
 * Время O(log n), память O(1).
 *
 * @returns индекс найденного элемента или -1
 */
export function binarySearch(arr: readonly number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  // Инвариант: если target есть в массиве, он находится в [left, right]
  while (left <= right) {
    // Не (left + right) / 2 — в языках с фиксированными int это переполнение
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) return mid;

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
