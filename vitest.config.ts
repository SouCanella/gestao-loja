import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'lcov'],
      lines: 70,
      functions: 70,
      statements: 70,
      branches: 60
    }
  }
})
