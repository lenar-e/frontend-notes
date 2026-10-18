---
slug: /
sidebar_position: 0
sidebar_label: О разделе
title: CSS
---

Классические вёрстки и теория, которую спрашивают на собеседованиях.

Для живых примеров используется компонент `<HtmlPreview>`: он рендерит HTML и CSS в изолированном iframe и показывает код под превью.

```mdx
<HtmlPreview
  html={`<div class="box">Привет</div>`}
  css={`
    .box {
      color: rebeccapurple;
    }
  `}
/>
```

```bash
yarn new css/layouts holy-grail
```

## Что здесь будет

- **Раскладки** — центрирование всеми способами, holy grail layout, адаптивная сетка
- **Основы** — Flexbox и Grid, специфичность, БЭМ
