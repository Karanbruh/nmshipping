import SectionBadge from './ui/SectionBadge'

function AboutSplitRow({
  badge,
  heading,
  children,
  imageSrc,
  imageAlt,
  reverse = false,
  tone = 'default',
}) {
  const toneClass = tone === 'cream' ? ' about-split--cream' : ''
  const rowClass = reverse
    ? 'row g-5 align-items-center flex-lg-row-reverse'
    : 'row g-5 align-items-center'

  return (
    <section className={`about-split${toneClass}`}>
      <div className="container-landing">
        <div className={rowClass}>
          <div className="col-lg-6">
            <div className="about-split__copy">
              {badge && <SectionBadge>{badge}</SectionBadge>}
              {heading && <h2 className="about-split__heading">{heading}</h2>}
              {children}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-split__media">
              <img src={imageSrc} alt={imageAlt} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSplitRow
