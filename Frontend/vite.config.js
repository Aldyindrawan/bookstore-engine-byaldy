import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    host: true, // Ini penting biar Vite dengerin semua koneksi
    allowedHosts: ['bookstore-byaldy'] // Ini biar Vite gak nolak nama host baru kamu
  }
})