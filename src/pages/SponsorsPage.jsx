import { useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageHero from '../components/ui/PageHero'
import ContactCTA from '../components/ContactCTA'
import YearFilter from '../components/gallery/YearFilter'
import { PAGE_HERO_IMAGES } from '../constants/content'
import {
  DEFAULT_SPONSORS_YEAR,
  SPONSORS_YEARS,
} from '../constants/sponsors'

function SponsorsPage() {
  const { year: yearParam } = useParams()
  const navigate = useNavigate()

  const years = useMemo(() => SPONSORS_YEARS.map((entry) => entry.year), [])

  const activeYear = useMemo(() => {
    const parsed = Number(yearParam)
    if (years.includes(parsed)) return parsed
    return DEFAULT_SPONSORS_YEAR
  }, [yearParam, years])

  const activeEntry = useMemo(
    () => SPONSORS_YEARS.find((entry) => entry.year === activeYear) ?? SPONSORS_YEARS[0],
    [activeYear],
  )

  const handleYearChange = (year) => {
    navigate(`/sponsors/${year}`)
  }

  if (!yearParam || !years.includes(Number(yearParam))) {
    return <Navigate to={`/sponsors/${DEFAULT_SPONSORS_YEAR}`} replace />
  }

  return (
    <>
      <PageHero
        badge="Sponsors"
        title={`Our Sponsors ${activeYear}`}
        subtitle="The Sheth Narottam Morarjee Shipping Cricket Tournament is proudly supported by organizations from the shipping and allied industries."
        imageSrc={PAGE_HERO_IMAGES.sponsors}
      />

      <section className="sponsors-main-section">
        <div className="container-landing">
          <ScrollReveal variant="fade-up">
            <YearFilter years={years} activeYear={activeYear} onChange={handleYearChange} />
          </ScrollReveal>

          <ScrollReveal
            variant="fade-up"
            stagger={70}
            className={`sponsors-grid sponsors-grid--count-${activeEntry.sponsors.length}`}
          >
            {activeEntry.sponsors.map((sponsor) => (
              <article key={sponsor.id} className="sponsor-logo-tile">
                <img src={sponsor.logo} alt={sponsor.name} loading="lazy" />
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

export default SponsorsPage
