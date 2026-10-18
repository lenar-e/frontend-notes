import react from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

// Задачи по безопасности (санитизация HTML, postMessage) работают с DOM
const SECURITY_TESTS = 'notes/computer-science/security/**/*.test.{ts,tsx}';

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
          include: ['notes/{javascript,typescript,computer-science}/**/*.test.ts'],
          exclude: [...configDefaults.exclude, SECURITY_TESTS],
          typecheck: {
            enabled: true,
            include: ['notes/typescript/**/*.test-d.ts'],
          },
        },
      },
      {
        // Всё, что работает с DOM: браузерные задачи, React и безопасность
        extends: true,
        test: {
          name: 'dom',
          environment: 'jsdom',
          include: ['notes/{browser,react}/**/*.test.{ts,tsx}', SECURITY_TESTS],
          setupFiles: ['./vitest.setup.ts'],
        },
      },
    ],
  },
});
