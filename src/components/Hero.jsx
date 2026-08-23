import { Link } from 'react-router-dom'
import { HERO, IMAGES } from '../constants/content'

function Hero() {
  return (
    <section id="home" className="hero-banner">
      <img className="hero-bg" src={IMAGES.hero} alt="Cricket match at Oval Maidan" />
      <div className="hero-content">
        <span className="hero-venue">
          <i className="bi bi-geo-alt-fill" /> {HERO.venue}
        </span>
        <h1>{HERO.title}</h1>
        <p>{HERO.subtitle}</p>
        <div className="hero-ctas">
          <Link to="/tournament" className="pill-btn pill-btn-gold">
            <span>View Tournament</span>
          </Link>
          <Link to="/gallery" className="pill-btn pill-btn-white">
            <span>View Gallery</span>
          </Link>
          <Link to="/contact" className="pill-btn pill-btn-outline">
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
      <div className="hero-established">
        <span>Est. 1962</span>
      </div>
    </section>
  )
}

export default Hero
