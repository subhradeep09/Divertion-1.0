import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: true, // generate external source maps instead of using eval
  },
  server: {
    hmr: {
      overlay: false, // optional: disables full-page error overlay
    },
  },
})