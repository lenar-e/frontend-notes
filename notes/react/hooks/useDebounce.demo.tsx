import { useState } from 'react';

import { useDebounce } from './useDebounce';

export default function UseDebounceDemo() {
  const [text, setText] = useState('');
  const debounced = useDebounce(text, 500);

  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Start typing…"
        aria-label="Search query"
        style={{ padding: 8, fontSize: 16 }}
      />
      <div>
        Instant: <code>{text || '—'}</code>
      </div>
      <div>
        After 500 ms of silence: <code>{debounced || '—'}</code>
      </div>
    </div>
  );
}
