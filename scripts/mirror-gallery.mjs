/**
 * Mirror gallery images into public/assets/gallery and rewrite gallery.js
 * to local paths. Tries nmshipping.in first; falls back to a cricket photo pool
 * because remote uploads currently 404.
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
const POOL_DIR = path.join(GALLERY_DIR, 'pool')

const POOL_SOURCES = [
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1400',
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1400',
  'https://images.unsplash.com/photo-1593766788373-3e4db1450b59?w=1400',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba6851?w=1400',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400',
  'https://images.unsplash.com/photo-1566577739112-32605b1b0b3b?w=1400',
  'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1400',
  'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e25e?w=1400',
  'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1400',
  'https://images.unsplash.com/photo-1587381477515-6ac4697d3d3b?w=1400',
  'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1400',
  'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1400',
  'https://picsum.photos/seed/nmship1/1400/900',
  'https://picsum.photos/seed/nmship2/1400/900',
  'https://picsum.photos/seed/nmship3/1400/900',
  'https://picsum.photos/seed/nmship4/1400/900',
  'https://picsum.photos/seed/nmship5/1400/900',
  'https://picsum.photos/seed/nmship6/1400/900',
  'https://picsum.photos/seed/nmship7/1400/900',
  'https://picsum.photos/seed/nmship8/1400/900',
]

const LOCAL_SEED = [
  path.join(ROOT, 'public', 'assets', 'about', 'about-legacy.jpg'),
  path.join(ROOT, 'public', 'assets', 'about', 'about-mission.jpg'),
  path.join(ROOT, 'public', 'assets', 'about', 'about-values.jpg'),
  path.join(ROOT, 'public', 'assets', 'about', 'about-vision.jpg'),
  path.join(ROOT, 'public', 'assets', 'video', 'sndm-18-poster.jpg'),
]

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

async function ensurePool() {
  fs.mkdirSync(POOL_DIR, { recursive: true })
  const poolFiles = []

  for (const src of LOCAL_SEED) {
    if (!fs.existsSync(src)) continue
    const name = `seed-${path.basename(src)}`
    const dest = path.join(POOL_DIR, name)
    if (!fs.existsSync(dest)) fs.copyFileSync(src, dest)
    poolFiles.push(dest)
  }

  for (let i = 0; i < POOL_SOURCES.length; i++) {
    const dest = path.join(POOL_DIR, `stock-${String(i + 1).padStart(2, '0')}.jpg`)
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      poolFiles.push(dest)
      continue
    }
    process.stdout.write(`pool ${i + 1}/${POOL_SOURCES.length}... `)
    const buf = await download(POOL_SOURCES[i])
    if (!buf) {
      console.log('FAIL')
      continue
    }
    fs.writeFileSync(dest, buf)
    poolFiles.push(dest)
    console.log(`OK ${buf.length}`)
    await sleep(150)
  }

  if (!poolFiles.length) {
    throw new Error('No pool images available — cannot mirror gallery')
  }
  return poolFiles
}

function pickPool(poolFiles, key) {
  const n = Number.parseInt(hash(key).slice(0, 8), 16)
  return poolFiles[n % poolFiles.length]
}

function publicPathFor(filePath) {
  const rel = path.relative(path.join(ROOT, 'public'), filePath).split(path.sep).join('/')
  return `/${rel}`
}

async function mirrorUrl(remoteUrl, poolFiles, stats) {
  if (remoteUrl.startsWith('/assets/')) {
    stats.cached++
    return remoteUrl
  }

  const id = hash(remoteUrl)
  const mirrored = path.join(GALLERY_DIR, 'files', `${id}.jpg`)

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

  // Point at shared pool file (no per-image copy) when remote is unavailable
  stats.fallback++
  return publicPathFor(pickPool(poolFiles, remoteUrl))
}

function writeGalleryJs(years) {
  const file = `/** Gallery archive - images mirrored under /assets/gallery (remote nmshipping.in uploads 404). */
export const GALLERY_YEARS = ${JSON.stringify(years, null, 2)}

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
  const poolFiles = await ensurePool()
  console.log(`Pool size: ${poolFiles.length}`)

  const stats = { remote: 0, fallback: 0, cached: 0 }
  const urlCache = new Map()

  async function resolve(url) {
    if (!url) return null
    if (urlCache.has(url)) return urlCache.get(url)
    const local = await mirrorUrl(url, poolFiles, stats)
    urlCache.set(url, local)
    return local
  }

  const years = []
  for (const entry of GALLERY_YEARS) {
    const albums = []
    for (const album of entry.albums) {
      const images = []
      for (const src of album.images) {
        images.push(await resolve(src))
        if ((stats.remote + stats.fallback + stats.cached) % 25 === 0) {
          console.log(
            `progress remote=${stats.remote} fallback=${stats.fallback} cached=${stats.cached}`,
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
    `Done remote=${stats.remote} fallback=${stats.fallback} cached=${stats.cached} unique=${urlCache.size}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
