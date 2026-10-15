import { useRef, useState, type KeyboardEvent } from 'react';

import styles from './StarRating.module.css';

export interface StarRatingProps {
  /** Текущее значение: 0 — ничего не выбрано */
  value: number;
  onChange?: (value: number) => void;
  /** Количество звёзд */
  max?: number;
  readOnly?: boolean;
  /** Подпись группы для скринридеров */
  label?: string;
}

export function StarRating({
  value,
  onChange,
  max = 5,
  readOnly = false,
  label = 'Рейтинг',
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const starsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // При наведении подсвечиваем звёзды до курсора, иначе — до выбранного значения
  const highlighted = hovered ?? value;

  const select = (star: number) => {
    if (readOnly) return;
    onChange?.(star);
    starsRef.current[star - 1]?.focus();
  };

  // Клавиатура как у нативной группы радиокнопок: стрелки, Home и End
  const handleKeyDown = (event: KeyboardEvent) => {
    const current = Math.max(value, 1);
    const next: Record<string, number> = {
      ArrowRight: Math.min(current + 1, max),
      ArrowUp: Math.min(current + 1, max),
      ArrowLeft: Math.max(current - 1, 1),
      ArrowDown: Math.max(current - 1, 1),
      Home: 1,
      End: max,
    };

    if (event.key in next) {
      event.preventDefault();
      select(next[event.key]);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-readonly={readOnly}
      className={styles.rating}
      onKeyDown={handleKeyDown}
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: max }, (_, index) => {
        const star = index + 1;
        const isFilled = star <= highlighted;

        return (
          <button
            key={star}
            ref={(element) => {
              starsRef.current[index] = element;
            }}
            type="button"
            role="radio"
            aria-checked={star === value}
            aria-label={`${star} из ${max}`}
            // Roving tabindex: Tab попадает только на выбранную звезду, дальше — стрелками
            tabIndex={star === Math.max(value, 1) ? 0 : -1}
            disabled={readOnly}
            className={isFilled ? `${styles.star} ${styles.filled}` : styles.star}
            onClick={() => select(star)}
            onMouseEnter={() => !readOnly && setHovered(star)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
