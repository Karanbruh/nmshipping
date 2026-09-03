import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionBadge from './ui/SectionBadge'
import ScrollReveal from './ui/ScrollReveal'
import { HOME_PROMOS, VENUE_CAROUSEL_IMAGES } from '../constants/content'

const AUTO_PLAY_MS = 3000

function HomeVenueCarousel() {
  const promo = HOME_PROMOS.venue
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goToSlide = useCallback((index) => {
    setActiveIndex(index)
  }, [])

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % VENUE_CAROUSEL_IMAGES.length)
  }, [])

  useEffect(() => {
    if (isPaused) return undefined

    const timer = window.setInterval(advance, AUTO_PLAY_MS)
    return () => window.clearInterval(timer)
  }, [advance, isPaused])

  return (
    <section className="home-promo-section" aria-label={promo.title}>
      <div className="container-landing">
        <div
          className="row g-4 align-items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsPaused(false)
            }
          }}
        >
          <div className="col-lg-6">
            <ScrollReveal variant="fade-right">
            <div
              className="home-promo-section__media home-promo-section__media--carousel"
              aria-live="polite"
              aria-atomic="true"
            >
              {VENUE_CAROUSEL_IMAGES.map((image, index) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className={`home-promo-section__slide${
                    index === activeIndex ? ' home-promo-section__slide--active' : ''
                  }`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ))}

              <div className="home-promo-section__dots" role="tablist" aria-label="Venue photos">
                {VENUE_CAROUSEL_IMAGES.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    role="tab"
                    className={`home-promo-section__dot${
                      index === activeIndex ? ' home-promo-section__dot--active' : ''
                    }`}
                    aria-label={`Show photo ${index + 1}: ${image.alt}`}
                    aria-selected={index === activeIndex}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
            </ScrollReveal>
          </div>

          <div className="col-lg-6">
            <ScrollReveal variant="fade-left" delay={120}>
            <div className="home-promo-section__copy">
              <SectionBadge>Venue</SectionBadge>
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
        </div>
      </div>
    </section>
  )
}

export default HomeVenueCarousel
