import { Link } from 'react-router-dom'
import SectionBadge from './ui/SectionBadge'
import ScrollReveal from './ui/ScrollReveal'
import SponsorsCarousel from './SponsorsCarousel'

function SponsorsSection() {
  return (
    <section className="sponsors-section">
      <div className="container-landing">
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-4 mb-md-5">
            <SectionBadge>Our Sponsors</SectionBadge>
            <h2 className="sponsors-heading">Proudly Supported By</h2>
            <p className="sponsors-sub">
              The tournament is made possible by the generous support of our sponsors from the shipping and allied industries.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={120}>
          <SponsorsCarousel />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={200}>
          <div className="text-center mt-4 mt-md-5">
            <Link to="/sponsors" className="pill-btn pill-btn-primary">
              <span>View All Sponsors</span>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default SponsorsSection
