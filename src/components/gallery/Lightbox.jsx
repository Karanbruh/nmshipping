import { useEffect, useCallback } from 'react'

function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const src = images[index]

  const onKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  if (!src) return null

  return (
    <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <button type="button" className="gallery-lightbox-backdrop" aria-label="Close" onClick={onClose} />
      <button type="button" className="gallery-lightbox-close" aria-label="Close" onClick={onClose}>
        <i className="bi bi-x-lg" />
      </button>
      {images.length > 1 && (
        <>
          <button type="button" className="gallery-lightbox-nav gallery-lightbox-prev" aria-label="Previous" onClick={onPrev}>
            <i className="bi bi-chevron-left" />
          </button>
          <button type="button" className="gallery-lightbox-nav gallery-lightbox-next" aria-label="Next" onClick={onNext}>
            <i className="bi bi-chevron-right" />
          </button>
        </>
      )}
      <div className="gallery-lightbox-stage">
        <img src={src} alt={`Photo ${index + 1} of ${images.length}`} />
        <p className="gallery-lightbox-count">
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  )
}

export default Lightbox
