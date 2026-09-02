import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import PageHero from '../ui/PageHero'
import ContactCTA from '../ContactCTA'
import Lightbox from './Lightbox'
import { PAGE_HERO_IMAGES } from '../../constants/content'
import { getGalleryAlbum } from '../../constants/gallery'

function AlbumPage() {
  const { year, slug } = useParams()
  const album = useMemo(() => getGalleryAlbum(year, slug), [year, slug])
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!album) {
    return <Navigate to={`/gallery/${year}`} replace />
  }

  const openAt = (index) => setLightboxIndex(index)
  const close = () => setLightboxIndex(null)
  const prev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + album.images.length) % album.images.length))
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % album.images.length))

  const heroImage = album.images[0] ?? PAGE_HERO_IMAGES.album

  return (
    <>
      <PageHero
        badge={`Gallery ${year}`}
        title={album.title}
        subtitle={`${album.images.length} photo${album.images.length === 1 ? '' : 's'} from the tournament archive.`}
        imageSrc={heroImage}
      >
        <Link to={`/gallery/${year}`} className="pill-btn pill-btn-outline mt-3">
          <span>
            <i className="bi bi-arrow-left" /> Back to {year} Gallery
          </span>
        </Link>
      </PageHero>

      <section className="gallery-main-section">
        <div className="container-landing">
          <ScrollReveal variant="fade-up" stagger={50} className="gallery-photo-grid">
            {album.images.map((src, index) => (
              <button
                key={src}
                type="button"
                className="gallery-photo-tile"
                onClick={() => openAt(index)}
                aria-label={`Open photo ${index + 1}`}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={album.images}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}

      <ContactCTA />
    </>
  )
}

export default AlbumPage
