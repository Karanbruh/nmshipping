const GOOGLE_NEWS_RSS =
  'https://news.google.com/rss/search?q=indian+cricket&hl=en-IN&gl=IN&ceid=IN:en'

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

  const count = req.query.count || '12'
  const rssUrl = encodeURIComponent(GOOGLE_NEWS_RSS)
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&api_key=${apiKey}&count=${count}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')

    return res.status(response.ok ? 200 : response.status).json(data)
  } catch {
    return res.status(502).json({
      status: 'error',
      message: 'Unable to load cricket news right now. Please try again later.',
    })
  }
}
