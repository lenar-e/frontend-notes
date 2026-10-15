import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { StarRating } from './StarRating';

function ControlledRating({ initial = 0 }: { initial?: number }) {
  const [value, setValue] = useState(initial);
  return <StarRating value={value} onChange={setValue} />;
}

const getStar = (n: number, max = 5) => screen.getByRole('radio', { name: `${n} из ${max}` });

describe('StarRating', () => {
  it('рендерит указанное количество звёзд', () => {
    render(<StarRating value={0} max={10} />);

    expect(screen.getAllByRole('radio')).toHaveLength(10);
  });

  it('отмечает текущее значение', () => {
    render(<StarRating value={3} />);

    expect(getStar(3)).toBeChecked();
    expect(getStar(2)).not.toBeChecked();
  });

  it('вызывает onChange по клику', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StarRating value={0} onChange={onChange} />);

    await user.click(getStar(4));

    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('управляется с клавиатуры', async () => {
    const user = userEvent.setup();
    render(<ControlledRating initial={2} />);

    await user.tab();
    expect(getStar(2)).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(getStar(3)).toBeChecked();
    expect(getStar(3)).toHaveFocus();

    await user.keyboard('{End}');
    expect(getStar(5)).toBeChecked();

    await user.keyboard('{Home}');
    expect(getStar(1)).toBeChecked();
  });

  it('в Tab-порядке только одна звезда', () => {
    render(<StarRating value={3} />);

    const focusable = screen.getAllByRole('radio').filter((star) => star.tabIndex === 0);
    expect(focusable).toEqual([getStar(3)]);
  });

  it('не меняется в режиме readOnly', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StarRating value={2} onChange={onChange} readOnly />);

    await user.click(getStar(5));

    expect(onChange).not.toHaveBeenCalled();
  });
});
