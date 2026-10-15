import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        // Чистая логика: утилиты, алгоритмы и проверки типов
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          include: ['notes/{javascript,typescript,algorithms}/**/*.test.ts'],
          typecheck: {
            enabled: true,
            include: ['notes/typescript/**/*.test-d.ts'],
          },
        },
      },
      {
        // Всё, что работает с DOM: браузерные задачи и React
        extends: true,
        test: {
          name: 'dom',
          environment: 'jsdom',
          include: ['notes/{browser,react}/**/*.test.{ts,tsx}'],
          setupFiles: ['./vitest.setup.ts'],
        },
      },
    ],
  },
});
