import { Link } from 'react-router-dom'
import SectionBadge from './ui/SectionBadge'
import { ABOUT } from '../constants/content'

function About() {
  return (
    <section className="about-section">
      <div className="container-landing">
        <div className="row g-5 align-items-center">
          <div className="col-lg-5">
            <SectionBadge>{ABOUT.badge}</SectionBadge>
            <h2 className="about-heading">{ABOUT.heading}</h2>
          </div>
          <div className="col-lg-7">
            <p className="about-copy">{ABOUT.text}</p>
            <Link to="/about" className="pill-btn pill-btn-primary mt-4">
              <span>Learn More About Our Legacy</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
