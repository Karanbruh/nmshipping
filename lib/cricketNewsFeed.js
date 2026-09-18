/**
 * Shared cricket news feed fetcher (rss2json).
 * Uses publisher RSS feeds that include media enclosures — Google News does not.
 */

export const CRICKET_RSS_FEEDS = [
  {
    url: 'https://www.espncricinfo.com/rss/content/story/feeds/6.xml',
    source: 'ESPNcricinfo',
  },
  {
    url: 'https://www.thehindu.com/sport/cricket/feeder/default.rss',
    source: 'The Hindu',
  },
]

function toHttps(url) {
  if (!url || typeof url !== 'string') return null
  return url.replace(/^http:\/\//i, 'https://')
}

function decodeEntities(text = '') {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function extractImage(item) {
  const candidates = [
    item.thumbnail,
    item.enclosure?.link,
    item.enclosure?.url,
    ...(Array.isArray(item.enclosures) ? item.enclosures.map((e) => e.link || e.url) : []),
  ]

  for (const candidate of candidates) {
    const httpsUrl = toHttps(candidate)
    if (httpsUrl?.startsWith('https://')) return httpsUrl
  }

  const html = `${item.description || ''}${item.content || ''}`
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return toHttps(imgMatch?.[1] || null)
}

function normalizeFeedItem(item, index, sourceLabel) {
  const link = item.link || item.url || ''
  const title = decodeEntities((item.title || 'Untitled').trim())
  const author = decodeEntities((item.author || '').trim())
  const shortAuthor = author && author.length <= 40 ? author : ''

  return {
    guid: item.guid || link || `news-${index}`,
    title,
    description: item.description || item.content || '',
    link,
    url: link,
    pubDate: item.pubDate || null,
    author: shortAuthor || sourceLabel,
    thumbnail: extractImage(item),
    enclosure: item.enclosure?.link ? { link: toHttps(item.enclosure.link) } : undefined,
  }
}

function dedupeKey(item) {
  const title = (item.title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .slice(0, 80)
  return title || item.link || item.guid
}

async function fetchOneFeed(feed, apiKey, count) {
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&api_key=${apiKey}&count=${count}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`rss2json HTTP ${response.status}`)
  }

  const data = await response.json()
  if (data.status && data.status !== 'ok') {
    throw new Error(data.message || 'rss2json returned an error')
  }

  return (data.items || []).map((item, index) => normalizeFeedItem(item, index, feed.source))
}

/**
 * @param {{ apiKey: string, count?: number }} options
 */
export async function fetchCricketNewsFeed({ apiKey, count = 12 }) {
  const perFeed = Math.min(Math.max(Number(count) || 12, 1), 20)

  const results = await Promise.allSettled(
    CRICKET_RSS_FEEDS.map((feed) => fetchOneFeed(feed, apiKey, perFeed)),
  )

  const merged = []
  const seen = new Set()

  for (const result of results) {
    if (result.status !== 'fulfilled') continue
    for (const item of result.value) {
      const key = dedupeKey(item)
      if (!key || seen.has(key)) continue
      seen.add(key)
      merged.push(item)
    }
  }

  if (!merged.length) {
    const firstError = results.find((r) => r.status === 'rejected')
    const message =
      firstError?.status === 'rejected'
        ? firstError.reason?.message || 'Unable to load cricket news'
        : 'No cricket news articles are available right now.'
    throw new Error(message)
  }

  merged.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0
    return db - da
  })

  const items = merged.slice(0, perFeed)

  return {
    status: 'ok',
    items,
    total: items.length,
  }
}
