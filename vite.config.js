import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/cricket-news': {
          target: 'https://api.rss2json.com',
          changeOrigin: true,
          rewrite: (path) => {
            const rssUrl = encodeURIComponent(
              'https://news.google.com/rss/search?q=indian+cricket&hl=en-IN&gl=IN&ceid=IN:en',
            )
            const apiKey = env.VITE_RSS2JSON_API_KEY || ''
            return `/v1/api.json?rss_url=${rssUrl}&api_key=${apiKey}&count=12`
          },
        },
      },
    },
  }
})
