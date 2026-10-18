import { describe, expect, it, vi } from 'vitest';

import { delegate } from './event-delegation';

function setup() {
  document.body.innerHTML = `
    <ul id="list">
      <li class="item" data-id="1"><span>First</span></li>
      <li class="item" data-id="2">Second</li>
      <li class="separator"></li>
    </ul>
  `;

  const list = document.getElementById('list')!;
  const getItem = (id: string) => list.querySelector<HTMLElement>(`[data-id="${id}"]`)!;

  return { list, getItem };
}

describe('delegate', () => {
  it('calls the handler for a matching element', () => {
    const { list, getItem } = setup();
    const handler = vi.fn();
    delegate(list, 'click', '.item', handler);

    getItem('2').click();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent), getItem('2'));
  });

  it('finds the matching ancestor when a nested element is clicked', () => {
    const { list, getItem } = setup();
    const handler = vi.fn();
    delegate(list, 'click', '.item', handler);

    getItem('1').querySelector('span')!.click();

    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent), getItem('1'));
  });

  it('ignores elements that do not match the selector', () => {
    const { list } = setup();
    const handler = vi.fn();
    delegate(list, 'click', '.item', handler);

    list.querySelector<HTMLElement>('.separator')!.click();

    expect(handler).not.toHaveBeenCalled();
  });

  it('ignores matches outside root', () => {
    const { list } = setup();
    // Wrap the list in an element that itself matches the selector
    const wrapper = document.createElement('div');
    wrapper.className = 'item';
    list.before(wrapper);
    wrapper.append(list);

    const handler = vi.fn();
    delegate(list, 'click', '.item', handler);

    // For .separator, closest('.item') finds the wrapper, which is outside root
    list.querySelector<HTMLElement>('.separator')!.click();

    expect(handler).not.toHaveBeenCalled();
  });

  it('works for elements added after subscribing', () => {
    const { list } = setup();
    const handler = vi.fn();
    delegate(list, 'click', '.item', handler);

    const newItem = document.createElement('li');
    newItem.className = 'item';
    list.append(newItem);
    newItem.click();

    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent), newItem);
  });

  it('returns an unsubscribe function', () => {
    const { list, getItem } = setup();
    const handler = vi.fn();
    const unsubscribe = delegate(list, 'click', '.item', handler);

    unsubscribe();
    getItem('1').click();

    expect(handler).not.toHaveBeenCalled();
  });
});
