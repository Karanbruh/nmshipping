import { fetchCricketNewsFeed } from '../lib/cricketNewsFeed.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ status: 'error', message: 'Method not allowed' })
  }

  const apiKey = process.env.RSS2JSON_API_KEY

  if (!apiKey) {
    return res.status(500).json({
      status: 'error',
      message: 'News feed is not configured. Set RSS2JSON_API_KEY in Vercel environment variables.',
    })
  }

  const count = Number(req.query.count) || 12

  try {
    const data = await fetchCricketNewsFeed({ apiKey, count })

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')

    return res.status(200).json(data)
  } catch (error) {
    return res.status(502).json({
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Unable to load cricket news right now. Please try again later.',
    })
  }
}
