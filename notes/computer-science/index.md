---
slug: /
sidebar_position: 0
sidebar_label: О разделе
title: Computer Science
---

Фундамент, который спрашивают на фронтенд-собеседованиях помимо фреймворков: алгоритмы, структуры данных и безопасность. Для каждого алгоритма указывается сложность по времени и памяти.

```bash
yarn new computer-science/algorithms/sorting merge-sort
yarn new computer-science/algorithms/patterns/two-pointers valid-palindrome
yarn new computer-science/security/practice escape-html
```

Вложенные категории (как `patterns/two-pointers`) создаются автоматически.

## Что здесь будет

**Алгоритмы**

- **Сортировки** — bubble, selection, insertion, merge, quick, heap, counting: сложность и стабильность
- **Поиск** — бинарный поиск и вариации: первое/последнее вхождение, поиск в повёрнутом массиве
- **Паттерны** — два указателя, скользящее окно, BFS/DFS, рекурсия и backtracking, динамическое программирование
- **Фронтенд-алгоритмы** — обход DOM-дерева, trie для автокомплита, топологическая сортировка зависимостей

**Структуры данных** — стек, очередь, связный список, хеш-таблица, куча, trie, граф

**Безопасность**

- **Уязвимости** — XSS (stored, reflected, DOM-based), CSRF, clickjacking, open redirect, prototype pollution
- **Защита** — CSP, CORS, флаги cookie (`HttpOnly`, `Secure`, `SameSite`), где хранить токены, SRI, supply chain
- **Практика** — экранирование и санитизация HTML, проверка URL на `javascript:`, сборка заголовка CSP, безопасный `postMessage`
