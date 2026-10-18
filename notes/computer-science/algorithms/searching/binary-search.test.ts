import { describe, expect, it } from 'vitest';

import { binarySearch } from './binary-search';

describe('binarySearch', () => {
  const arr = [1, 3, 5, 7, 9, 11];

  it.each(arr.map((value, index) => [value, index]))('finds %i at index %i', (value, index) => {
    expect(binarySearch(arr, value)).toBe(index);
  });

  it('returns -1 when the element is missing', () => {
    expect(binarySearch(arr, 4)).toBe(-1);
    expect(binarySearch(arr, 0)).toBe(-1);
    expect(binarySearch(arr, 12)).toBe(-1);
  });

  it('handles empty and single-element arrays', () => {
    expect(binarySearch([], 1)).toBe(-1);
    expect(binarySearch([1], 1)).toBe(0);
    expect(binarySearch([1], 2)).toBe(-1);
  });

  it('handles negative numbers', () => {
    expect(binarySearch([-10, -5, 0, 5], -5)).toBe(1);
  });

  it('handles a large array', () => {
    const big = Array.from({ length: 1_000_000 }, (_, i) => i * 2);

    expect(binarySearch(big, 1_999_998)).toBe(999_999);
    expect(binarySearch(big, 1_234_567)).toBe(-1);
  });
});
