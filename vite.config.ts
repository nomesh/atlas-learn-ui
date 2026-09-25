import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react()],
    server: {
      port: 5174,
      strictPort: true,
      host: true,
      proxy: {
        '/api/tts': {
          target: 'https://translate.google.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tts/, '/translate_tts'),
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            'Referer': 'https://translate.google.com/',
          },
        },
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  }
})
