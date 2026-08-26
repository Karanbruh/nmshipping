import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HERO } from '../constants/content'

function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return (
    <section id="home" className="hero-banner">
      {reduceMotion ? (
        <img className="hero-bg" src={HERO.posterSrc} alt="Cricket match at Oval Maidan" />
      ) : (
        <video
          className="hero-bg"
          autoPlay
          muted
          loop
          playsInline
          poster={HERO.posterSrc}
          aria-label="Tournament highlight video"
        >
          <source src={HERO.videoSrc} type="video/mp4" />
        </video>
      )}
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
