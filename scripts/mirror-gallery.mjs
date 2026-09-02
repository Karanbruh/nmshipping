/**
 * Mirror gallery images from nmshipping.in into public/assets/gallery/files
 * and rewrite gallery.js to use local paths.
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { GALLERY_YEARS } from '../src/constants/gallery.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_JS = path.join(ROOT, 'src', 'constants', 'gallery.js')
const GALLERY_DIR = path.join(ROOT, 'public', 'assets', 'gallery')

function hash(input) {
  return crypto.createHash('sha1').update(input).digest('hex').slice(0, 12)
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function isImageBuffer(buf) {
  if (!buf || buf.length < 4) return false
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8) return true
  // PNG
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true
  // WEBP (RIFF....WEBP)
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46) return true
  return false
}

async function download(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      Referer: 'https://nmshipping.in/',
    },
    redirect: 'follow',
  })
  if (!res.ok) return null
  const buf = Buffer.from(await res.arrayBuffer())
  return isImageBuffer(buf) ? buf : null
}

function publicPathFor(filePath) {
  const rel = path.relative(path.join(ROOT, 'public'), filePath).split(path.sep).join('/')
  return `/${rel}`
}

async function mirrorUrl(remoteUrl, stats) {
  if (remoteUrl.startsWith('/assets/')) {
    stats.cached++
    return remoteUrl
  }

  const id = hash(remoteUrl)
  const ext = path.extname(new URL(remoteUrl).pathname).replace(/^\./, '') || 'jpg'
  const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext.toLowerCase()) ? ext : 'jpg'
  const mirrored = path.join(GALLERY_DIR, 'files', `${id}.${safeExt}`)

  if (fs.existsSync(mirrored) && fs.statSync(mirrored).size > 1000) {
    stats.cached++
    return publicPathFor(mirrored)
  }

  const buf = await download(remoteUrl)
  if (buf) {
    fs.mkdirSync(path.dirname(mirrored), { recursive: true })
    fs.writeFileSync(mirrored, buf)
    stats.remote++
    return publicPathFor(mirrored)
  }

  stats.failed++
  console.warn(`FAIL download: ${remoteUrl}`)
  return remoteUrl
}

function writeGalleryJs(years) {
  const file = `/** Gallery archive — images mirrored from nmshipping.in under /assets/gallery/files */
export const GALLERY_YEARS = ${JSON.stringify(years, null, 2)}

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
  fs.writeFileSync(OUT_JS, file, 'utf8')
}

async function main() {
  const stats = { remote: 0, failed: 0, cached: 0 }
  const urlCache = new Map()

  async function resolve(url) {
    if (!url) return null
    if (urlCache.has(url)) return urlCache.get(url)
    const local = await mirrorUrl(url, stats)
    urlCache.set(url, local)
    await sleep(100)
    return local
  }

  const years = []
  for (const entry of GALLERY_YEARS) {
    const albums = []
    for (const album of entry.albums) {
      const images = []
      for (const src of album.images) {
        images.push(await resolve(src))
        if ((stats.remote + stats.failed + stats.cached) % 25 === 0) {
          console.log(
            `progress remote=${stats.remote} failed=${stats.failed} cached=${stats.cached}`,
          )
        }
      }
      const cover = album.cover ? await resolve(album.cover) : images[0] || null
      albums.push({
        slug: album.slug,
        title: album.title,
        cover,
        images,
      })
    }
    years.push({ year: entry.year, albums })
  }

  writeGalleryJs(years)
  console.log(`Wrote ${OUT_JS}`)
  console.log(
    `Done remote=${stats.remote} failed=${stats.failed} cached=${stats.cached} unique=${urlCache.size}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
