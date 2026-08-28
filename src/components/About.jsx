import { Link } from 'react-router-dom'
import SectionBadge from './ui/SectionBadge'
import { ABOUT } from '../constants/content'

function About() {
  return (
    <section className="about-section">
      <div className="container-landing">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="about-split__copy">
              <SectionBadge>{ABOUT.badge}</SectionBadge>
              <h2 className="about-heading">{ABOUT.heading}</h2>
              <p className="about-copy">{ABOUT.text}</p>
              <Link to="/about" className="pill-btn pill-btn-primary mt-4">
                <span>Know more</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-split__media">
              <img src={ABOUT.image} alt={ABOUT.imageAlt} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
