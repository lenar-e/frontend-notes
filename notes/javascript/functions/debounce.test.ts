import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { debounce } from './debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls the function once after a pause', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('every call resets the timer', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    vi.advanceTimersByTime(60);
    debounced();
    vi.advanceTimersByTime(60);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(40);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes the arguments of the last call', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('a', 1);
    debounced('b', 2);
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('b', 2);
  });

  it('keeps the this context', () => {
    const fn = vi.fn();
    const obj = { method: debounce(fn, 100) };

    obj.method();
    vi.advanceTimersByTime(100);

    // mock.contexts stores this for every call of the mock
    expect(fn.mock.contexts[0]).toBe(obj);
  });

  it('cancel cancels the scheduled call', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced.cancel();
    vi.advanceTimersByTime(100);

    expect(fn).not.toHaveBeenCalled();
  });

  it('can be called again after a pause', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    vi.advanceTimersByTime(100);
    debounced();
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(2);
  });
});
