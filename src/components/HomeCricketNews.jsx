import { Link } from 'react-router-dom'
import SectionBadge from './ui/SectionBadge'
import ScrollReveal from './ui/ScrollReveal'
import NewsCard from './cricket-news/NewsCard'
import { useCricketNews } from '../hooks/useCricketNews'

function NewsCardSkeleton() {
  return (
    <article className="news-card news-card--skeleton" aria-hidden="true">
      <div className="news-card__media skeleton-block" />
      <div className="news-card__body">
        <div className="skeleton-line skeleton-line--sm" />
        <div className="skeleton-line skeleton-line--lg" />
        <div className="skeleton-line skeleton-line--md" />
        <div className="skeleton-line skeleton-line--full" />
      </div>
    </article>
  )
}

function HomeCricketNews() {
  const { articles, isLoading, error, retry } = useCricketNews({ count: 3 })

  return (
    <section className="cricket-news-section home-cricket-news">
      <div className="container-landing">
        <ScrollReveal variant="fade-up" className="home-cricket-news__header">
          <SectionBadge>Cricket News</SectionBadge>
          <h2 className="home-cricket-news__heading">Latest from Indian Cricket</h2>
          <p className="home-cricket-news__sub">
            Stay updated with the latest Indian cricket headlines, match updates, and stories from
            trusted sources.
          </p>
        </ScrollReveal>

        {isLoading && (
          <div className="row g-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="col-md-6 col-lg-4">
                <NewsCardSkeleton />
              </div>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <ScrollReveal variant="fade-up">
            <div className="cricket-news-empty">
              <i className="bi bi-newspaper" aria-hidden="true" />
              <p>{error}</p>
              <button type="button" className="pill-btn pill-btn-primary" onClick={retry}>
                <span>Try Again</span>
              </button>
            </div>
          </ScrollReveal>
        )}

        {!isLoading && !error && articles.length === 0 && (
          <ScrollReveal variant="fade-up">
            <div className="cricket-news-empty">
              <i className="bi bi-newspaper" aria-hidden="true" />
              <p>No cricket news articles are available right now.</p>
              <button type="button" className="pill-btn pill-btn-primary" onClick={retry}>
                <span>Refresh</span>
              </button>
            </div>
          </ScrollReveal>
        )}

        {!isLoading && !error && articles.length > 0 && (
          <ScrollReveal variant="fade-up" stagger={80} className="row g-4">
            {articles.map((article) => (
              <div key={article.id} className="col-md-6 col-lg-4">
                <NewsCard article={article} />
              </div>
            ))}
          </ScrollReveal>
        )}

        <ScrollReveal variant="fade-up" delay={160} className="home-cricket-news__cta">
          <Link to="/cricket-news" className="pill-btn pill-btn-primary">
            <span>See more</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default HomeCricketNews
