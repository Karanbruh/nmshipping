import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchCricketNewsFeed } from './lib/cricketNewsFeed.js'

function cricketNewsDevApi(env) {
  return {
    name: 'cricket-news-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/cricket-news', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ status: 'error', message: 'Method not allowed' }))
          return
        }

        const apiKey = env.VITE_RSS2JSON_API_KEY || env.RSS2JSON_API_KEY || ''
        if (!apiKey) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              status: 'error',
              message: 'News feed is not configured. Set VITE_RSS2JSON_API_KEY in .env',
            }),
          )
          return
        }

        try {
          const url = new URL(req.url || '', 'http://localhost')
          const count = Number(url.searchParams.get('count')) || 12
          const data = await fetchCricketNewsFeed({ apiKey, count })
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(data))
        } catch (error) {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              status: 'error',
              message:
                error instanceof Error
                  ? error.message
                  : 'Unable to load cricket news right now. Please try again later.',
            }),
          )
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), cricketNewsDevApi(env)],
  }
})
