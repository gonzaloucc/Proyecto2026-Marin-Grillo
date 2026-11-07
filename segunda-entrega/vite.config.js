import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@pages': path.resolve(import.meta.dirname, './src/pages'),
      '@styles': path.resolve(import.meta.dirname, './src/styles'),
      '@assets': path.resolve(import.meta.dirname, './src/assets'),
      '@api': path.resolve(import.meta.dirname, './src/api'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
    },
  },
})
