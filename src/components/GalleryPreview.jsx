import { Link } from 'react-router-dom'
import SectionBadge from './ui/SectionBadge'
import { getFeaturedAlbumCovers } from '../constants/gallery'

function GalleryPreview() {
  const featured = getFeaturedAlbumCovers(6)

  return (
    <section className="gallery-preview-section">
      <div className="container-landing text-center">
        <SectionBadge>Gallery</SectionBadge>
        <h2 className="gallery-preview-heading">Tournament Memories</h2>
        <p className="gallery-preview-sub">
          Relive the moments, matches and memories of the Sheth Narottam Morarjee Shipping Cricket
          Tournament.
        </p>

        {featured.length > 0 ? (
          <div className="gallery-preview-strip">
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
          </div>
        ) : (
          <div className="gallery-preview-placeholder">
            <i className="bi bi-images" />
            <p>Gallery archives will be available here soon.</p>
          </div>
        )}

        <Link to="/gallery" className="pill-btn pill-btn-primary mt-4">
          <span>View Full Gallery</span>
        </Link>
      </div>
    </section>
  )
}

export default GalleryPreview
