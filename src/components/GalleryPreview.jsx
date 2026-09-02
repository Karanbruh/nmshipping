import { Link } from 'react-router-dom'
import SectionBadge from './ui/SectionBadge'
import ScrollReveal from './ui/ScrollReveal'
import { DEFAULT_GALLERY_YEAR, getFeaturedAlbumCovers } from '../constants/gallery'

function GalleryPreview() {
  const featured = getFeaturedAlbumCovers(6)

  return (
    <section className="gallery-preview-section">
      <div className="container-landing text-center">
        <ScrollReveal variant="fade-up">
          <SectionBadge>Gallery</SectionBadge>
          <h2 className="gallery-preview-heading">Tournament Memories</h2>
          <p className="gallery-preview-sub">
            Relive the moments, matches and memories of the Sheth Narottam Morarjee Shipping Cricket
            Tournament.
          </p>
        </ScrollReveal>

        {featured.length > 0 ? (
          <ScrollReveal variant="fade-up" delay={120} stagger={70} className="gallery-preview-strip">
            {featured.map((album) => (
              <Link
                key={`${album.year}-${album.slug}`}
                to={`/gallery/${album.year}/${album.slug}`}
                className="gallery-preview-tile"
              >
                <img src={album.cover} alt="" loading="lazy" />
                <span>
                  {album.year} · {album.title}
                </span>
              </Link>
            ))}
          </ScrollReveal>
        ) : (
          <ScrollReveal variant="fade-up" delay={120}>
            <div className="gallery-preview-placeholder">
              <i className="bi bi-images" />
              <p>Gallery archives will be available here soon.</p>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal variant="fade-up" delay={200}>
          <Link to={`/gallery/${DEFAULT_GALLERY_YEAR}`} className="pill-btn pill-btn-primary mt-4">
            <span>View Full Gallery</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default GalleryPreview
