import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import SectionBadge from '../ui/SectionBadge'
import ScrollReveal from '../ui/ScrollReveal'
import ContactCTA from '../ContactCTA'
import Lightbox from './Lightbox'
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

  return (
    <>
      <section className="page-hero">
        <div className="container-landing">
          <ScrollReveal variant="fade-up" stagger={90}>
            <SectionBadge>Gallery {year}</SectionBadge>
            <h1 className="page-hero-title">{album.title}</h1>
            <p className="page-hero-sub">
              {album.images.length} photo{album.images.length === 1 ? '' : 's'} from the tournament archive.
            </p>
            <Link to={`/gallery/${year}`} className="pill-btn pill-btn-outline-dark mt-3">
              <span>
                <i className="bi bi-arrow-left" /> Back to {year} Gallery
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

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
