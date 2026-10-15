import { describe, expect, it, vi } from 'vitest';

import { delegate } from './event-delegation';

function setup() {
  document.body.innerHTML = `
    <ul id="list">
      <li class="item" data-id="1"><span>Первый</span></li>
      <li class="item" data-id="2">Второй</li>
      <li class="separator"></li>
    </ul>
  `;

  const list = document.getElementById('list')!;
  const getItem = (id: string) => list.querySelector<HTMLElement>(`[data-id="${id}"]`)!;

  return { list, getItem };
}

describe('delegate', () => {
  it('вызывает обработчик для подходящего элемента', () => {
    const { list, getItem } = setup();
    const handler = vi.fn();
    delegate(list, 'click', '.item', handler);

    getItem('2').click();

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent), getItem('2'));
  });

  it('находит подходящего предка при клике на вложенный элемент', () => {
    const { list, getItem } = setup();
    const handler = vi.fn();
    delegate(list, 'click', '.item', handler);

    getItem('1').querySelector('span')!.click();

    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent), getItem('1'));
  });

  it('игнорирует элементы, не подходящие под селектор', () => {
    const { list } = setup();
    const handler = vi.fn();
    delegate(list, 'click', '.item', handler);

    list.querySelector<HTMLElement>('.separator')!.click();

    expect(handler).not.toHaveBeenCalled();
  });

  it('игнорирует совпадения за пределами root', () => {
    const { list } = setup();
    // Оборачиваем список в элемент, который сам подходит под селектор
    const wrapper = document.createElement('div');
    wrapper.className = 'item';
    list.before(wrapper);
    wrapper.append(list);

    const handler = vi.fn();
    delegate(list, 'click', '.item', handler);

    // Для .separator closest('.item') найдёт wrapper — он снаружи root
    list.querySelector<HTMLElement>('.separator')!.click();

    expect(handler).not.toHaveBeenCalled();
  });

  it('работает для элементов, добавленных после подписки', () => {
    const { list } = setup();
    const handler = vi.fn();
    delegate(list, 'click', '.item', handler);

    const newItem = document.createElement('li');
    newItem.className = 'item';
    list.append(newItem);
    newItem.click();

    expect(handler).toHaveBeenCalledWith(expect.any(MouseEvent), newItem);
  });

  it('возвращает функцию для отписки', () => {
    const { list, getItem } = setup();
    const handler = vi.fn();
    const unsubscribe = delegate(list, 'click', '.item', handler);

    unsubscribe();
    getItem('1').click();

    expect(handler).not.toHaveBeenCalled();
  });
});
