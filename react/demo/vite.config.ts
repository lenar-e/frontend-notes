import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

import { BASE_URL, DEMO_PATH } from '../../site.config';

// Демо-приложение со всеми React-компонентами и хуками.
// В проде собирается в build/demo и деплоится вместе с сайтом.
export default defineConfig(({ command }) => ({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: command === 'build' ? `${BASE_URL}${DEMO_PATH}` : '/',
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: '../../build/demo',
    emptyOutDir: true,
  },
}));
