import { describe, expect, it } from 'vitest';

import { binarySearch } from './binary-search';

describe('binarySearch', () => {
  const arr = [1, 3, 5, 7, 9, 11];

  it.each(arr.map((value, index) => [value, index]))('находит %i на позиции %i', (value, index) => {
    expect(binarySearch(arr, value)).toBe(index);
  });

  it('возвращает -1, если элемента нет', () => {
    expect(binarySearch(arr, 4)).toBe(-1);
    expect(binarySearch(arr, 0)).toBe(-1);
    expect(binarySearch(arr, 12)).toBe(-1);
  });

  it('работает с пустым массивом и массивом из одного элемента', () => {
    expect(binarySearch([], 1)).toBe(-1);
    expect(binarySearch([1], 1)).toBe(0);
    expect(binarySearch([1], 2)).toBe(-1);
  });

  it('работает с отрицательными числами', () => {
    expect(binarySearch([-10, -5, 0, 5], -5)).toBe(1);
  });

  it('работает на большом массиве', () => {
    const big = Array.from({ length: 1_000_000 }, (_, i) => i * 2);

    expect(binarySearch(big, 1_999_998)).toBe(999_999);
    expect(binarySearch(big, 1_234_567)).toBe(-1);
  });
});
