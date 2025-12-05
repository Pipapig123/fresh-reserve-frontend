import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),
      "hooks": resolve(__dirname, 'src/hooks'),
    }
  },
  build: {
    rollupOptions:{
      output: {
        manualChunks: {
          mui: ['@mui/material', '@mui/icons-material']
        }
      }
    }
  }
})
