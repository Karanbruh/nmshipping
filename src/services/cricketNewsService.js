const NEWS_API_URL = '/api/cricket-news'

const sessionCache = new Map()

const VIDEO_HINTS = ['youtube.com', 'youtu.be', '/video', 'watch?v=']

function isVideoArticle(url = '', title = '') {
  const combined = `${url} ${title}`.toLowerCase()
  return VIDEO_HINTS.some((hint) => combined.includes(hint))
}

function stripHtml(text = '') {
  return text.replace(/<[^>]*>/g, '').trim()
}

function toHttps(url) {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()
  if (!trimmed) return null
  return trimmed.replace(/^http:\/\//i, 'https://')
}

function extractImageUrl(item) {
  const candidates = [
    item.thumbnail,
    item.image,
    item.imageUrl,
    item.enclosure?.link,
    item.enclosure?.url,
  ]

  for (const candidate of candidates) {
    const httpsUrl = toHttps(candidate)
    if (httpsUrl?.startsWith('https://')) return httpsUrl
  }

  const html = `${item.description || ''}${item.content || ''}`
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return toHttps(imgMatch?.[1] || null)
}

function normalizeItem(item, index) {
  const url = item.link || item.url || ''
  const title = item.title || 'Untitled'
  const excerpt = stripHtml(item.description || item.content || '').slice(0, 220)

  return {
    id: item.guid || url || `news-${index}`,
    title,
    excerpt,
    imageUrl: extractImageUrl(item),
    source: item.author || item.source?.name || 'Cricket News',
    publishedAt: item.pubDate || item.publishedAt || null,
    url,
    isVideo: isVideoArticle(url, title),
  }
}

async function fetchFromProxy({ page = 1, count = 12 }) {
  const params = new URLSearchParams({ page: String(page), count: String(count) })
  const response = await fetch(`${NEWS_API_URL}?${params}`)

  if (!response.ok) {
    throw new Error('Unable to load cricket news right now. Please try again later.')
  }

  const data = await response.json()

  if (data.status && data.status !== 'ok') {
    throw new Error(data.message || 'News feed returned an unexpected response.')
  }

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

  const result = await fetchFromProxy({ page, count })

  sessionCache.set(cacheKey, result)
  return result
}

export function clearCricketNewsCache() {
  sessionCache.clear()
}
