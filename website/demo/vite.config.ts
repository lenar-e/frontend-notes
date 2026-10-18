import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

import { BASE_URL, DEMO_PATH } from '../site.config';

// Demo app with every React component and hook from notes/react.
// In production it is built into website/build/demo and deployed with the site.
export default defineConfig(({ command }) => ({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: command === 'build' ? `${BASE_URL}${DEMO_PATH}` : '/',
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: '../build/demo',
    emptyOutDir: true,
  },
}));
