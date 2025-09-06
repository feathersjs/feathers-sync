import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 30000,
    hookTimeout: 30000,
    teardownTimeout: 5000,
    include: ['src/**/*.test.{ts,js}'],
    exclude: ['lib/**', 'node_modules/**']
  }
})
