import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { isLoopbackUrl } from './src/api/apiBase'

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // The browser API base must never be a loopback address in a built bundle: on a student's
  // machine localhost is their own computer. Production uses same-origin /api (nginx proxies it).
  if (command === 'build' && isLoopbackUrl(env.VITE_API_BASE_URL)) {
    throw new Error(
      `VITE_API_BASE_URL=${env.VITE_API_BASE_URL} would make the browser call its own machine. ` +
        'Leave it unset for same-origin /api; set ATLAS_DEV_API_PROXY_TARGET for the local dev proxy instead.',
    )
  }

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
        // Development only: where `npm run dev` forwards same-origin /api requests. Not a VITE_
        // variable, so it is never exposed to (or compiled into) the browser bundle.
        '/api': {
          target: env.ATLAS_DEV_API_PROXY_TARGET || 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  }
})
