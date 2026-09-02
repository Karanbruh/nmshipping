import SectionBadge from './SectionBadge'
import ScrollReveal from './ScrollReveal'

function PageHero({ badge, title, subtitle, imageSrc, className = '', children }) {
  const classes = ['page-hero', imageSrc ? 'page-hero--cricket' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      className={classes}
      style={imageSrc ? { '--page-hero-bg': `url(${imageSrc})` } : undefined}
    >
      <div className="container-landing">
        <ScrollReveal variant="fade-up" stagger={90}>
          {badge ? <SectionBadge>{badge}</SectionBadge> : null}
          <h1 className="page-hero-title">{title}</h1>
          {subtitle ? <p className="page-hero-sub">{subtitle}</p> : null}
          {children}
        </ScrollReveal>
      </div>
    </section>
  )
}

export default PageHero
