import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 4173, // Use the dynamic port provided by Heroku or a fallback port (e.g., 4173 in this case)
  },
})
