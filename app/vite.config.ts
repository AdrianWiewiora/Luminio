import { defineConfig } from 'vite'
import deno from '@deno/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import process from "node:process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [deno(), react()],
  server: {
    host: process.env.IS_DOCKER === 'true' ? '0.0.0.0' : '127.0.0.1',
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.IS_DOCKER === 'true' ? 'http://server:8000' : 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path,
      }
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
})
