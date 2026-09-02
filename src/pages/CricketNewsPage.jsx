import SectionBadge from '../components/ui/SectionBadge'
import ScrollReveal from '../components/ui/ScrollReveal'
import NewsCard from '../components/cricket-news/NewsCard'
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

function CricketNewsPage() {
  const { articles, isLoading, error, retry } = useCricketNews({ count: 12 })

  return (
    <>
      <section className="page-hero">
        <div className="container-landing">
          <ScrollReveal variant="fade-up" stagger={90}>
            <SectionBadge>Cricket News</SectionBadge>
            <h1 className="page-hero-title">Latest from Indian Cricket</h1>
            <p className="page-hero-sub">
              Stay updated with the latest Indian cricket headlines, match updates, and stories from trusted sources.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="cricket-news-section">
        <div className="container-landing">
          {isLoading && (
            <div className="row g-4">
              {Array.from({ length: 6 }).map((_, index) => (
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
        </div>
      </section>
    </>
  )
}

export default CricketNewsPage
