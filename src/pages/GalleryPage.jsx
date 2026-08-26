import { useMemo, useState } from 'react'
import SectionBadge from '../components/ui/SectionBadge'
import ContactCTA from '../components/ContactCTA'
import YearFilter from '../components/gallery/YearFilter'
import AlbumGrid from '../components/gallery/AlbumGrid'
import { GALLERY_YEARS } from '../constants/gallery'

function GalleryPage() {
  const years = useMemo(() => GALLERY_YEARS.map((entry) => entry.year), [])
  const [activeYear, setActiveYear] = useState(years[0])
  const activeEntry = useMemo(
    () => GALLERY_YEARS.find((entry) => entry.year === activeYear) ?? GALLERY_YEARS[0],
    [activeYear],
  )

  return (
    <>
      <section className="page-hero">
        <div className="container-landing">
          <SectionBadge>Gallery</SectionBadge>
          <h1 className="page-hero-title">Tournament Gallery</h1>
          <p className="page-hero-sub">
            Relive the moments, matches and memories of the Sheth Narottam Morarjee Shipping Cricket
            Tournament.
          </p>
        </div>
      </section>

      <section className="gallery-main-section">
        <div className="container-landing">
          <YearFilter years={years} activeYear={activeYear} onChange={setActiveYear} />
          <AlbumGrid year={activeEntry.year} albums={activeEntry.albums} />
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

export default GalleryPage
