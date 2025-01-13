import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/SFE_frontend",
  server: {
    host: '0.0.0.0', // Делает сервер доступным в локальной сети
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"), // Убираем /api из пути
      },
    },
  },
  
  plugins: [react()],
})