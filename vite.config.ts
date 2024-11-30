import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/SFE_frontend",
  server: {
    host: '0.0.0.0', 
    port: 5173,
    proxy: {
      "/api": {
        target: "http://172.20.10.2:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"), 
      },
    },
  },

  plugins: [react()],
})