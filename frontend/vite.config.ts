import {defineConfig, UserConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup.ts',
    css: true,
    mockReset: true,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
} as UserConfig)
