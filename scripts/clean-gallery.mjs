import fs from 'node:fs'
import { GALLERY_YEARS } from '../src/constants/gallery.js'

function isChrome(url) {
  return (
    /Screenshot-2024-09-26/i.test(url) ||
    /NMSS_Wheel/i.test(url) ||
    /cropped-cropped/i.test(url) ||
    /favicon/i.test(url)
  )
}

const cleaned = GALLERY_YEARS.map((entry) => ({
  year: entry.year,
  albums: entry.albums
    .map((album) => {
      const images = album.images.filter((u) => !isChrome(u))
      return {
        slug: album.slug,
        title: album.title,
        cover: images[0] || null,
        images,
      }
    })
    .filter((a) => a.images.length > 0),
}))

const file = `/** Auto-generated gallery archive from nmshipping.in — do not edit by hand. */
export const GALLERY_YEARS = ${JSON.stringify(cleaned, null, 2)}

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

fs.writeFileSync(new URL('../src/constants/gallery.js', import.meta.url), file)
console.log(
  cleaned
    .map(
      (y) =>
        `${y.year}(${y.albums.length} albums, sample: ${y.albums[0]?.cover?.split('/').pop()})`,
    )
    .join('\n'),
)
