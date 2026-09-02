import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'

function AlbumGrid({ year, albums }) {
  if (!albums?.length) {
    return (
      <ScrollReveal variant="fade-up">
        <div className="gallery-empty-state">
          <i className="bi bi-images" />
          <p>No albums found for {year}.</p>
        </div>
      </ScrollReveal>
    )
  }

  return (
    <ScrollReveal variant="fade-up" delay={100} stagger={70} className="gallery-album-grid">
      {albums.map((album) => (
        <Link
          key={album.slug}
          to={`/gallery/${year}/${album.slug}`}
          className="gallery-album-card"
        >
          <div className="gallery-album-cover">
            <img src={album.cover} alt="" loading="lazy" />
            <div className="gallery-album-overlay">
              <span className="gallery-album-count">
                <i className="bi bi-images" aria-hidden="true" />
                {album.images.length}
              </span>
              <h3>{album.title}</h3>
              <span className="gallery-album-view">
                View album <i className="bi bi-arrow-right" aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </ScrollReveal>
  )
}

export default AlbumGrid
