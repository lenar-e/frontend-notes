import { useState } from 'react';

import { StarRating } from './StarRating';

export default function StarRatingDemo() {
  const [value, setValue] = useState(3);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div>
        <StarRating value={value} onChange={setValue} label="Ваша оценка" />
        <div>Оценка: {value} из 5. Попробуйте стрелки на клавиатуре.</div>
      </div>
      <div>
        <StarRating value={4} readOnly label="Средняя оценка" />
        <div>Только для чтения</div>
      </div>
    </div>
  );
}
