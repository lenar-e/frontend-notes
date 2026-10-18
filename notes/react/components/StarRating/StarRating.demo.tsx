import { useState } from 'react';

import { StarRating } from './StarRating';

export default function StarRatingDemo() {
  const [value, setValue] = useState(3);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div>
        <StarRating value={value} onChange={setValue} label="Your rating" />
        <div>Rating: {value} of 5. Try the arrow keys.</div>
      </div>
      <div>
        <StarRating value={4} readOnly label="Average rating" />
        <div>Read-only</div>
      </div>
    </div>
  );
}
