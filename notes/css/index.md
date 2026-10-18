---
slug: /
sidebar_position: 0
sidebar_label: About
title: CSS
---

Classic layouts and the theory interviews ask about.

Live examples use the `<HtmlPreview>` component: it renders HTML and CSS in an isolated iframe and shows the code below the preview.

```mdx
<HtmlPreview
  html={`<div class="box">Hello</div>`}
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

## What's inside

- **Layouts** — centering every way, the holy grail layout, a responsive grid
- **Fundamentals** — Flexbox and Grid, specificity, BEM
