import { Link } from 'react-router-dom'
import { HOME_PROMOS } from '../constants/content'

function HomePromoBanner({ variant }) {
  const promo = HOME_PROMOS[variant]
  if (!promo) return null

  const isVenue = variant === 'venue'

  return (
    <section
      className={`home-promo home-promo--${variant}`}
      aria-label={promo.title}
    >
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
    </section>
  )
}

export default HomePromoBanner
