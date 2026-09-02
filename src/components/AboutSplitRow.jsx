import SectionBadge from './ui/SectionBadge'
import ScrollReveal from './ui/ScrollReveal'

function AboutSplitRow({
  badge,
  heading,
  children,
  imageSrc,
  imageAlt,
  reverse = false,
  tone = 'default',
  icon,
  stats,
  values,
  sectionIndex,
}) {
  const toneClass = tone === 'cream' ? ' about-split--cream' : ''
  const rowClass = reverse
    ? 'row g-5 align-items-center flex-lg-row-reverse'
    : 'row g-5 align-items-center'

  const copyVariant = reverse ? 'fade-right' : 'fade-left'
  const mediaVariant = reverse ? 'fade-left' : 'fade-right'

  return (
    <section className={`about-split${toneClass}`}>
      {sectionIndex != null && (
        <span className="about-split__watermark" aria-hidden="true">
          {String(sectionIndex).padStart(2, '0')}
        </span>
      )}
      <div className="container-landing">
        <div className={rowClass}>
          <div className="col-lg-6">
            <ScrollReveal variant={copyVariant}>
            <div className="about-split__copy">
              {badge && <SectionBadge>{badge}</SectionBadge>}
              {heading && (
                <div className="about-split__heading-wrap">
                  {icon && (
                    <span className="about-split__icon" aria-hidden="true">
                      <i className={`bi ${icon}`} />
                    </span>
                  )}
                  <h2 className="about-split__heading">{heading}</h2>
                </div>
              )}
              {stats?.length > 0 && (
                <ScrollReveal as="ul" variant="fade-up" stagger={80} className="about-split__stats">
                  {stats.map((stat) => (
                    <li key={stat.label} className="about-split__stat">
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </li>
                  ))}
                </ScrollReveal>
              )}
              {values?.length > 0 ? (
                <ScrollReveal as="ul" variant="fade-up" stagger={80} className="about-values-grid">
                  {values.map((item) => (
                    <li key={item.title} className="about-value-card">
                      <span className="about-value-card__icon" aria-hidden="true">
                        <i className={`bi ${item.icon}`} />
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ScrollReveal>
              ) : (
                children
              )}
            </div>
            </ScrollReveal>
          </div>
          <div className="col-lg-6">
            <ScrollReveal variant={mediaVariant} delay={120}>
            <div className="about-split__media">
              <div className="about-split__media-frame">
                <img src={imageSrc} alt={imageAlt} loading="lazy" />
              </div>
              <span className="about-split__media-accent" aria-hidden="true" />
            </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSplitRow
