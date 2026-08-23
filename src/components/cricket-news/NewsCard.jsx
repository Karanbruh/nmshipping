import { IMAGES } from '../../constants/content'

function formatDate(dateString) {
  if (!dateString) return ''

  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function NewsCard({ article }) {
  const imageSrc = article.imageUrl || IMAGES.cricket

  return (
    <article className="news-card">
      <a
        href={article.url}
        className="news-card__media"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read: ${article.title}`}
      >
        <img src={imageSrc} alt="" loading="lazy" />
        {article.isVideo && (
          <span className="news-card__badge">
            <i className="bi bi-play-fill" aria-hidden="true" />
            Video
          </span>
        )}
      </a>

      <div className="news-card__body">
        <div className="news-card__meta">
          <span className="news-card__source">{article.source}</span>
          {article.publishedAt && (
            <span className="news-card__date">{formatDate(article.publishedAt)}</span>
          )}
        </div>

        <h3 className="news-card__title">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>

        {article.excerpt && <p className="news-card__excerpt">{article.excerpt}</p>}

        <a
          href={article.url}
          className="news-card__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
          <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

export default NewsCard
