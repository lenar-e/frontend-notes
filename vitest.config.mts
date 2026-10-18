import react from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

// Security tasks (HTML sanitizing, postMessage) work with the DOM
const SECURITY_TESTS = 'notes/computer-science/security/**/*.test.{ts,tsx}';

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        // Pure logic: utilities, algorithms and type checks
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
        // Everything that works with the DOM: browser tasks, React and security
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
