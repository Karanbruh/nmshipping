import { Link } from 'react-router-dom'
import SectionBadge from './ui/SectionBadge'
import ScrollReveal from './ui/ScrollReveal'
import { ABOUT } from '../constants/content'

function About() {
  return (
    <section className="about-section">
      <div className="container-landing">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <ScrollReveal variant="fade-right">
              <div className="about-split__copy">
                <SectionBadge>{ABOUT.badge}</SectionBadge>
                <h2 className="about-heading">{ABOUT.heading}</h2>
                <p className="about-copy">{ABOUT.text}</p>
                <Link to="/about" className="pill-btn pill-btn-primary mt-4">
                  <span>Know more</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
          <div className="col-lg-6">
            <ScrollReveal variant="fade-left" delay={120}>
              <div className="about-split__media">
                <div className="about-split__media-frame">
                  <img src={ABOUT.image} alt={ABOUT.imageAlt} loading="lazy" />
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

export default About
