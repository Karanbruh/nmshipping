/**
 * One-time scrape of nmshipping.in gallery album pages → src/constants/gallery.js
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'src', 'constants', 'gallery.js')

const ALBUMS = [
  // 2024
  { year: 2024, slug: 'finals', title: 'Finals', url: 'https://nmshipping.in/finals/' },
  { year: 2024, slug: 'semi-finals', title: 'Semi Finals', url: 'https://nmshipping.in/semi-finals/' },
  { year: 2024, slug: 'best-batsman', title: 'Best Batsman', url: 'https://nmshipping.in/winners-2/' },
  { year: 2024, slug: 'best-bowler', title: 'Best Bowler', url: 'https://nmshipping.in/best-bowler/' },
  // 2025 matches 1–38
  ...Array.from({ length: 38 }, (_, i) => {
    const n = i + 1
    return {
      year: 2025,
      slug: `match-${n}`,
      title: `Match ${n}`,
      url: `https://nmshipping.in/match-${n}/`,
    }
  }),
  // 2026 — award cards on landing page + dedicated match albums
  { year: 2026, slug: 'semi-finals', title: 'Semi Finals', url: 'https://nmshipping.in/semi-finals-2026/' },
  { year: 2026, slug: 'finals', title: 'Finals', url: 'https://nmshipping.in/finals-2026/' },
]

/** 2026 award albums — single hero images from the /2026-3/ landing page */
const ALBUMS_2026_AWARDS = [
  { slug: 'best-wicket-keeper', title: 'Best Wicket-Keeper', pattern: /Best-wicketkeeper-2026/i },
  { slug: 'best-fielder', title: 'Best Fielder', pattern: /Best-Fielder/i },
  { slug: 'best-bowler', title: 'Best Bowler', pattern: /Best-Bowler-2026/i },
  { slug: 'best-batsman', title: 'Best Batsman', pattern: /Best-Batsman-2026/i },
]

const LANDING_2026_URL = 'https://nmshipping.in/2026-3/'

function toFullRes(url) {
  return url
    .replace(/-\d+x\d+(\.(jpe?g|png|webp|gif))$/i, '$1')
    .replace(/-scaled(\.(jpe?g|png|webp|gif))$/i, '$1')
}

function isChromeAsset(url) {
  return (
    /Screenshot-2024-09-26/i.test(url) ||
    /NMSS_Wheel/i.test(url) ||
    /cropped-cropped/i.test(url) ||
    /favicon/i.test(url) ||
    /whatsapp.*button/i.test(url) ||
    (/logo/i.test(url) &&
      !/match|final|best|award|toss|summary|wicket|fielder|batsman|bowler/i.test(url))
  )
}

function extractImages(html) {
  const urls = new Set()
  const re = /https:\/\/nmshipping\.in\/wp-content\/uploads\/[^"'\\\s>]+\.(?:jpe?g|png|webp|gif)/gi
  let m
  while ((m = re.exec(html)) !== null) {
    const raw = m[0].replace(/&amp;/g, '&')
    if (isChromeAsset(raw)) continue
    urls.add(toFullRes(raw))
  }
  return [...urls]
}

async function fetchAlbum(album) {
  const res = await fetch(album.url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; NMShippingGalleryScraper/1.0)',
      Accept: 'text/html',
    },
  })
  if (!res.ok) {
    console.warn(`FAIL ${res.status} ${album.url}`)
    return { ...album, images: [], cover: null }
  }
  const html = await res.text()
  const images = extractImages(html)
  console.log(`OK  ${album.year}/${album.slug}: ${images.length} images`)
  return {
    year: album.year,
    slug: album.slug,
    title: album.title,
    cover: images[0] || null,
    images,
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetch2026AwardAlbums() {
  const res = await fetch(LANDING_2026_URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; NMShippingGalleryScraper/1.0)',
      Accept: 'text/html',
    },
  })
  if (!res.ok) {
    console.warn(`FAIL ${res.status} ${LANDING_2026_URL}`)
    return []
  }
  const html = await res.text()
  const allImages = extractImages(html)
  const awards = []
  for (const award of ALBUMS_2026_AWARDS) {
    const image = allImages.find((url) => award.pattern.test(url))
    if (!image) {
      console.warn(`SKIP missing image for 2026/${award.slug}`)
      continue
    }
    console.log(`OK  2026/${award.slug}: 1 image (landing page)`)
    awards.push({
      year: 2026,
      slug: award.slug,
      title: award.title,
      cover: image,
      images: [image],
    })
  }
  return awards
}

async function main() {
  const results = []

  const awardAlbums = await fetch2026AwardAlbums()
  results.push(...awardAlbums)
  await sleep(200)

  for (const album of ALBUMS) {
    results.push(await fetchAlbum(album))
    await sleep(200)
  }

  const byYear = new Map()
  const albumOrder2026 = [
    'best-wicket-keeper',
    'best-fielder',
    'best-bowler',
    'best-batsman',
    'semi-finals',
    'finals',
  ]

  for (const album of results) {
    if (!album.images.length) {
      console.warn(`SKIP empty ${album.year}/${album.slug}`)
      continue
    }
    if (!byYear.has(album.year)) byYear.set(album.year, [])
    byYear.get(album.year).push({
      slug: album.slug,
      title: album.title,
      cover: album.cover,
      images: album.images,
    })
  }

  const year2026 = byYear.get(2026)
  if (year2026) {
    year2026.sort(
      (a, b) => albumOrder2026.indexOf(a.slug) - albumOrder2026.indexOf(b.slug),
    )
  }

  const years = [...byYear.keys()].sort((a, b) => b - a)
  const GALLERY_YEARS = years.map((year) => ({
    year,
    albums: byYear.get(year),
  }))

  const file = `/** Auto-generated gallery archive from nmshipping.in — do not edit by hand. */
export const GALLERY_YEARS = ${JSON.stringify(GALLERY_YEARS, null, 2)}

export const DEFAULT_GALLERY_YEAR = GALLERY_YEARS[0]?.year ?? 2026

export const GALLERY_NAV_YEARS = GALLERY_YEARS.map(({ year }) => year)

export function getGalleryYear(year) {
  const y = Number(year)
  return GALLERY_YEARS.find((entry) => entry.year === y) ?? null
}

export function getGalleryAlbum(year, slug) {
  const entry = getGalleryYear(year)
  if (!entry) return null
  return entry.albums.find((album) => album.slug === slug) ?? null
}

export function getFeaturedAlbumCovers(limit = 6) {
  const covers = []
  for (const entry of GALLERY_YEARS) {
    for (const album of entry.albums) {
      if (album.cover) covers.push({ year: entry.year, ...album })
      if (covers.length >= limit) return covers
    }
  }
  return covers
}
`

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, file, 'utf8')
  console.log(`Wrote ${OUT}`)
  console.log(
    `Years: ${GALLERY_YEARS.map((y) => `${y.year}(${y.albums.length})`).join(', ')}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
