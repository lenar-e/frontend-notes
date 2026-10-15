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
        placeholder="Начните печатать…"
        aria-label="Поисковый запрос"
        style={{ padding: 8, fontSize: 16 }}
      />
      <div>
        Сразу: <code>{text || '—'}</code>
      </div>
      <div>
        Через 500 мс тишины: <code>{debounced || '—'}</code>
      </div>
    </div>
  );
}
