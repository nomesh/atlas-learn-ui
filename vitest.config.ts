import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// UI/component tests only (*.spec.ts[x]). Existing node:test suites keep running via `npm run test:node`.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.spec.{ts,tsx}'],
    globals: false,
  },
});
