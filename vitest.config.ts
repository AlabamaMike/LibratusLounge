import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/*',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts', 'tests/**/*.spec.ts'],
    exclude: ['node_modules', 'dist', '.wrangler'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@agents': path.resolve(__dirname, './src/agents'),
      '@strategies': path.resolve(__dirname, './src/strategies'),
      '@personality': path.resolve(__dirname, './src/personality'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
});