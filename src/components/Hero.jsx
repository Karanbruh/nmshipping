import { useEffect, useState } from 'react'
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
    <section id="home" className="hero-banner home-video" aria-label="Tournament highlight video">
      {reduceMotion ? (
        <img
          className="hero-bg"
          src={HERO.posterSrc}
          alt="Cricket match at Oval Maidan"
        />
      ) : (
        <video
          className="hero-bg"
          autoPlay
          muted
          loop
          playsInline
          controls
          poster={HERO.posterSrc}
          aria-label="Tournament highlight video"
        >
          <source src={HERO.videoSrc} type="video/mp4" />
        </video>
      )}
    </section>
  )
}

export default Hero
