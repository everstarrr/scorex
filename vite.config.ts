import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts:["2f5d-185-121-234-196.ngrok-free.app", "ea62-2a01-e5c0-255c-00-2.ngrok-free.app"]
  }
})
