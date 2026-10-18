---
slug: /
sidebar_position: 0
sidebar_label: About
title: Frontend System Design
---

Walkthroughs of typical frontend design cases. Text and [Mermaid](https://mermaid.js.org/) diagrams only — they render both on the site and on GitHub.

## The RADIO framework

Every case follows the same outline — it works just as well for running the interview itself:

| Step                | What to discuss                                                         |
| ------------------- | ----------------------------------------------------------------------- |
| **R**equirements    | Functional and non-functional requirements, scope, devices, load        |
| **A**rchitecture    | System components and how they connect: UI, store, data layer, server   |
| **D**ata model      | Entities and where they live (server, client store, URL), normalization |
| **I**nterface (API) | Contracts between client and server and between components, pagination  |
| **O**ptimizations   | Performance, accessibility, offline, security, i18n                     |

```bash
yarn new system-design/cases chat
yarn new system-design/topics rendering-strategies
```

## What's inside

- **Cases** — news feed, autocomplete, chat, image gallery (Pinterest), e-commerce product page, collaborative editor, video player, design system
- **Cross-cutting topics** — CSR/SSR/SSG/ISR, caching, Core Web Vitals, accessibility, i18n, state management, offline/PWA. Security has its own part in [Computer Science](/computer-science)
