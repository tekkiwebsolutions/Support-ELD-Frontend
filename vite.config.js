import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
 
  server: {
    proxy: {
      // Proxy all requests that start with '/api' to the target server
      '/api': {
        target: 'http://192.168.0.26:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
