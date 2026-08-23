import { useCallback, useEffect, useMemo, useState } from 'react'
import { SPONSORS } from '../constants/sponsors'

const AUTO_PLAY_MS = 3500

function getVisibleCount(width) {
  if (width >= 992) return Math.min(5, SPONSORS.length)
  if (width >= 768) return 3
  if (width >= 480) return 2
  return 1
}

function SponsorsCarousel({ showHeader = true }) {
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== 'undefined' ? getVisibleCount(window.innerWidth) : 5,
  )
  const [trackIndex, setTrackIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const loopItems = useMemo(() => [...SPONSORS, ...SPONSORS], [])

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount(window.innerWidth))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setTrackIndex(0)
    setIsAnimating(true)
  }, [visibleCount])

  const advance = useCallback(() => {
    setIsAnimating(true)
    setTrackIndex((prev) => prev + 1)
  }, [])

  const handleTransitionEnd = useCallback(() => {
    if (trackIndex >= SPONSORS.length) {
      setIsAnimating(false)
      setTrackIndex(0)
    }
  }, [trackIndex])

  useEffect(() => {
    if (!isAnimating) {
      const frame = requestAnimationFrame(() => setIsAnimating(true))
      return () => cancelAnimationFrame(frame)
    }
  }, [isAnimating])

  useEffect(() => {
    if (isPaused) return undefined

    const timer = window.setInterval(advance, AUTO_PLAY_MS)
    return () => window.clearInterval(timer)
  }, [advance, isPaused, trackIndex])

  return (
    <div
      className="sponsors-carousel"
      style={{
        '--visible-count': visibleCount,
        '--track-index': trackIndex,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {showHeader && (
        <div className="sponsors-carousel-header">
          <h3 className="sponsors-carousel-title">Our Sponsors</h3>
        </div>
      )}

      <div className="sponsors-carousel-viewport">
        <div
          className={`sponsors-carousel-track${isAnimating ? '' : ' sponsors-carousel-track-instant'}`}
          onTransitionEnd={handleTransitionEnd}
        >
          {loopItems.map((sponsor, index) => (
            <article
              key={`${sponsor.id}-${index}`}
              className="sponsor-card sponsor-slide-card"
              aria-hidden={index >= SPONSORS.length && trackIndex === 0 ? true : undefined}
            >
              <div className="sponsor-card-inner">
                <img src={sponsor.logo} alt={sponsor.name} loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SponsorsCarousel
