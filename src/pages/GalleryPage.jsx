import { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import SectionBadge from '../components/ui/SectionBadge'
import ScrollReveal from '../components/ui/ScrollReveal'
import ContactCTA from '../components/ContactCTA'
import YearFilter from '../components/gallery/YearFilter'
import AlbumGrid from '../components/gallery/AlbumGrid'
import { DEFAULT_GALLERY_YEAR, GALLERY_YEARS } from '../constants/gallery'

function GalleryPage() {
  const { year: yearParam } = useParams()
  const navigate = useNavigate()

  const years = useMemo(() => GALLERY_YEARS.map((entry) => entry.year), [])

  const activeYear = useMemo(() => {
    const parsed = Number(yearParam)
    if (years.includes(parsed)) return parsed
    return DEFAULT_GALLERY_YEAR
  }, [yearParam, years])

  const activeEntry = useMemo(
    () => GALLERY_YEARS.find((entry) => entry.year === activeYear) ?? GALLERY_YEARS[0],
    [activeYear],
  )

  const totalPhotos = useMemo(
    () => activeEntry.albums.reduce((sum, album) => sum + album.images.length, 0),
    [activeEntry],
  )

  const handleYearChange = (year) => {
    navigate(`/gallery/${year}`)
  }

  if (!yearParam || !years.includes(Number(yearParam))) {
    return <Navigate to={`/gallery/${DEFAULT_GALLERY_YEAR}`} replace />
  }

  return (
    <>
      <section className="page-hero page-hero--gallery">
        <div className="container-landing">
          <ScrollReveal variant="fade-up" stagger={90}>
            <SectionBadge>Gallery</SectionBadge>
            <h1 className="page-hero-title">Tournament Gallery {activeYear}</h1>
            <p className="page-hero-sub">
              Relive the moments, matches and memories from the Sheth Narottam Morarjee Shipping
              Cricket Tournament.
            </p>
            <div className="gallery-hero-stats">
              <span>
                <i className="bi bi-collection" aria-hidden="true" />
                {activeEntry.albums.length} album{activeEntry.albums.length === 1 ? '' : 's'}
              </span>
              <span>
                <i className="bi bi-images" aria-hidden="true" />
                {totalPhotos} photo{totalPhotos === 1 ? '' : 's'}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="gallery-main-section">
        <div className="container-landing">
          <ScrollReveal variant="fade-up">
            <YearFilter years={years} activeYear={activeYear} onChange={handleYearChange} />
          </ScrollReveal>
          <AlbumGrid year={activeEntry.year} albums={activeEntry.albums} />
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

export default GalleryPage
