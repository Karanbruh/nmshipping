import { Link } from 'react-router-dom'

function AlbumGrid({ year, albums }) {
  if (!albums?.length) {
    return (
      <div className="empty-state">
        <i className="bi bi-images" />
        <p>No albums found for {year}.</p>
      </div>
    )
  }

  return (
    <div className="gallery-album-grid">
      {albums.map((album) => (
        <Link
          key={album.slug}
          to={`/gallery/${year}/${album.slug}`}
          className="gallery-album-card"
        >
          <div className="gallery-album-cover">
            <img src={album.cover} alt="" loading="lazy" />
          </div>
          <div className="gallery-album-meta">
            <h3>{album.title}</h3>
            <span>
              {album.images.length} photo{album.images.length === 1 ? '' : 's'}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default AlbumGrid
