import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
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

  // The real application build (learn.neuralworks.lk) must never contain prototype curriculum or the scripted
  // offline Tutor. Every import of those modules resolves to an empty production stub instead. Only the GitHub
  // Pages demo build (VITE_DEPLOYMENT_TARGET=pages-demo), the dev server and the tests use the real mock modules.
  const deploymentTarget = (process.env.VITE_DEPLOYMENT_TARGET || env.VITE_DEPLOYMENT_TARGET || '').trim().toLowerCase()
  const realProductionBuild = command === 'build' && deploymentTarget !== 'pages-demo'
  const productionStubs = realProductionBuild
    ? [
        {
          find: /^(?:\.{1,2}\/)+(?:[\w-]+\/)*mocks\/curriculumData$/,
          replacement: fileURLToPath(new URL('./src/mocks/curriculumData.production.ts', import.meta.url)),
        },
        {
          find: /^\.\/mockTutorAdapter$/,
          replacement: fileURLToPath(new URL('./src/api/mockTutorAdapter.production.ts', import.meta.url)),
        },
        {
          find: /^\.\/mockTutorContent$/,
          replacement: fileURLToPath(new URL('./src/features/tutor/mockTutorContent.production.ts', import.meta.url)),
        },
        {
          find: /^\.\/MockCurriculumCompanionPane$/,
          replacement: fileURLToPath(new URL('./src/features/tutor/MockCurriculumCompanionPane.production.tsx', import.meta.url)),
        },
      ]
    : []

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react()],
    resolve: { alias: productionStubs },
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
