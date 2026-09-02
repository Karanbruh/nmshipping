import { Link } from 'react-router-dom'
import SectionBadge from './ui/SectionBadge'
import ScrollReveal from './ui/ScrollReveal'
import { HOME_PROMOS } from '../constants/content'

function HomePromoBanner({ variant }) {
  const promo = HOME_PROMOS[variant]
  if (!promo) return null

  const isVenue = variant === 'venue'

  if (variant === 'cricket') {
    return (
      <section className="home-promo-section home-promo-section--cream" aria-label={promo.title}>
        <div className="container-landing">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <ScrollReveal variant="fade-right">
                <div className="home-promo-section__copy">
                  <SectionBadge>Tournament Update</SectionBadge>
                  <h2 className="home-promo-section__heading">{promo.title}</h2>
                  {promo.subtitle && (
                    <p className="home-promo-section__text">{promo.subtitle}</p>
                  )}
                  <Link
                    to={promo.ctaTo}
                    className={`pill-btn pill-btn-${promo.ctaVariant} mt-4`}
                  >
                    <span>{promo.ctaLabel}</span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            <div className="col-lg-6">
              <ScrollReveal variant="fade-left" delay={120}>
                <div className="home-promo-section__media">
                  <img
                    src={promo.imageSrc}
                    alt={promo.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <ScrollReveal as="section" variant="fade-up" className={`home-promo home-promo--${variant}`} aria-label={promo.title}>
      <div
        className="home-promo__media"
        style={{ backgroundImage: `url(${promo.imageSrc})` }}
        role="img"
        aria-label={promo.imageAlt}
      />
      <div className="home-promo__overlay" aria-hidden="true" />
      <div className="home-promo__content">
        <h2 className={`home-promo__title${isVenue ? ' home-promo__title--venue' : ''}`}>
          {promo.title}
        </h2>
        {promo.subtitle && (
          <p className={`home-promo__subtitle${isVenue ? ' home-promo__subtitle--venue' : ''}`}>
            {promo.subtitle}
          </p>
        )}
        <Link
          to={promo.ctaTo}
          className={`pill-btn pill-btn-${promo.ctaVariant}`}
        >
          <span>{promo.ctaLabel}</span>
        </Link>
      </div>
    </ScrollReveal>
  )
}

export default HomePromoBanner
