/**
 * Searches for `target` in an array sorted in ascending order.
 * Time O(log n), space O(1).
 *
 * @returns the index of the element, or -1
 */
export function binarySearch(arr: readonly number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  // Invariant: if target is in the array, it lies within [left, right]
  while (left <= right) {
    // Not (left + right) / 2 — that overflows in languages with fixed-size ints
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
