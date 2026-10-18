import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { StarRating } from './StarRating';

function ControlledRating({ initial = 0 }: { initial?: number }) {
  const [value, setValue] = useState(initial);
  return <StarRating value={value} onChange={setValue} />;
}

const getStar = (n: number, max = 5) => screen.getByRole('radio', { name: `${n} of ${max}` });

describe('StarRating', () => {
  it('renders the given number of stars', () => {
    render(<StarRating value={0} max={10} />);

    expect(screen.getAllByRole('radio')).toHaveLength(10);
  });

  it('marks the current value', () => {
    render(<StarRating value={3} />);

    expect(getStar(3)).toBeChecked();
    expect(getStar(2)).not.toBeChecked();
  });

  it('calls onChange on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StarRating value={0} onChange={onChange} />);

    await user.click(getStar(4));

    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('is keyboard accessible', async () => {
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

  it('has only one star in the tab order', () => {
    render(<StarRating value={3} />);

    const focusable = screen.getAllByRole('radio').filter((star) => star.tabIndex === 0);
    expect(focusable).toEqual([getStar(3)]);
  });

  it('does not change in readOnly mode', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StarRating value={2} onChange={onChange} readOnly />);

    await user.click(getStar(5));

    expect(onChange).not.toHaveBeenCalled();
  });
});
