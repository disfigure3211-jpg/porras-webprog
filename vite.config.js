import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 5173,
    strictPort: true, // fail if port is busy instead of trying others
    hmr: false, // disable hot module replacement websocket
  },
})
