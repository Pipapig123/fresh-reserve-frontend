import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path'


export default defineConfig({
  plugins: [react(), visualizer({ open: true, filename: 'stats.html' })],
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
  },
  server: {
    host: '0.0.0.0',
    open: true,
  }
})
