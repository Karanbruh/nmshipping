const GOOGLE_NEWS_RSS =
  'https://news.google.com/rss/search?q=indian+cricket&hl=en-IN&gl=IN&ceid=IN:en'

const RSS2JSON_BASE = 'https://api.rss2json.com/v1/api.json'
const NEWS_API_URL =
  import.meta.env.VITE_NEWS_API_URL || (import.meta.env.DEV ? '/api/cricket-news' : '')

const sessionCache = new Map()

const VIDEO_HINTS = ['youtube.com', 'youtu.be', '/video', 'watch?v=']

function isVideoArticle(url = '', title = '') {
  const combined = `${url} ${title}`.toLowerCase()
  return VIDEO_HINTS.some((hint) => combined.includes(hint))
}

function stripHtml(text = '') {
  return text.replace(/<[^>]*>/g, '').trim()
}

function normalizeItem(item, index) {
  const url = item.link || item.url || ''
  const title = item.title || 'Untitled'
  const excerpt = stripHtml(item.description || item.content || '').slice(0, 220)

  return {
    id: item.guid || url || `news-${index}`,
    title,
    excerpt,
    imageUrl: item.thumbnail || item.enclosure?.link || null,
    source: item.author || 'Cricket News',
    publishedAt: item.pubDate || item.publishedAt || null,
    url,
    isVideo: isVideoArticle(url, title),
  }
}

async function fetchFromRss2Json({ page = 1, count = 12 }) {
  const apiKey = import.meta.env.VITE_RSS2JSON_API_KEY

  if (!apiKey) {
    throw new Error('News feed is not configured. Add VITE_RSS2JSON_API_KEY to your environment.')
  }

  const params = new URLSearchParams({
    rss_url: GOOGLE_NEWS_RSS,
    api_key: apiKey,
    count: String(count),
  })

  const response = await fetch(`${RSS2JSON_BASE}?${params}`)

  if (!response.ok) {
    throw new Error('Unable to load cricket news right now. Please try again later.')
  }

  const data = await response.json()

  if (data.status !== 'ok') {
    throw new Error(data.message || 'News feed returned an unexpected response.')
  }

  const items = (data.items || []).map(normalizeItem)

  return {
    items,
    page,
    total: items.length,
  }
}

async function fetchFromProxy({ page = 1, count = 12 }) {
  const params = new URLSearchParams({ page: String(page), count: String(count) })
  const response = await fetch(`${NEWS_API_URL}?${params}`)

  if (!response.ok) {
    throw new Error('Unable to load cricket news right now. Please try again later.')
  }

  const data = await response.json()
  const items = (data.items || data.articles || []).map(normalizeItem)

  return {
    items,
    page,
    total: data.total ?? items.length,
  }
}

export async function fetchCricketNews({ page = 1, count = 12 } = {}) {
  const cacheKey = `${page}-${count}`

  if (sessionCache.has(cacheKey)) {
    return sessionCache.get(cacheKey)
  }

  const result = NEWS_API_URL
    ? await fetchFromProxy({ page, count })
    : await fetchFromRss2Json({ page, count })

  sessionCache.set(cacheKey, result)
  return result
}

export function clearCricketNewsCache() {
  sessionCache.clear()
}
