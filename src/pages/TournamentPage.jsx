import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SectionBadge from '../components/ui/SectionBadge'
import ScrollReveal from '../components/ui/ScrollReveal'
import ContactCTA from '../components/ContactCTA'
import TournamentUpdateSection from '../components/TournamentUpdateSection'
import YearFilter from '../components/gallery/YearFilter'
import { IMAGES, TOURNAMENT_EMBEDS } from '../constants/content'

const DEFAULT_YEAR = TOURNAMENT_EMBEDS[0].year

function TournamentPage() {
  const { year: yearParam } = useParams()
  const navigate = useNavigate()

  const years = useMemo(() => TOURNAMENT_EMBEDS.map((entry) => entry.year), [])
  const activeYear = useMemo(() => {
    const parsed = Number(yearParam)
    if (years.includes(parsed)) return parsed
    return DEFAULT_YEAR
  }, [yearParam, years])

  const embed = useMemo(
    () => TOURNAMENT_EMBEDS.find((entry) => entry.year === activeYear) ?? TOURNAMENT_EMBEDS[0],
    [activeYear],
  )

  const handleYearChange = (year) => {
    navigate(`/tournament/${year}`)
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-landing">
          <ScrollReveal variant="fade-up" stagger={90}>
            <SectionBadge>Tournament</SectionBadge>
            <h1 className="page-hero-title">Sheth Narottam Morarjee Shipping Cricket Tournament</h1>
            <p className="page-hero-sub">
              A prestigious annual cricket tournament for corporate teams from the shipping and allied industries.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Venue */}
      <section className="tournament-venue-section">
        <div className="container-landing">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <ScrollReveal variant="fade-right">
              <div className="tournament-venue-image">
                <img src={IMAGES.ground} alt="Oval Maidan cricket ground" />
              </div>
              </ScrollReveal>
            </div>
            <div className="col-lg-6">
              <ScrollReveal variant="fade-left" delay={120}>
              <SectionBadge>Venue</SectionBadge>
              <h2 className="tournament-venue-heading">Oval Maidan (Elphinstone Ground)</h2>
              <p className="tournament-venue-text">
                The tournament is played at the historic Oval Maidan, also known as the Elphinstone Ground, located in the heart of Mumbai. This iconic ground has been the home of the NM Shipping Cricket Tournament, hosting decades of competitive cricket among corporate teams.
              </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Live scores & stats (CricHeroes) */}
      <section className="tournament-embed-section">
        <div className="container-landing">
          <ScrollReveal variant="fade-up">
            <SectionBadge>Scores & Stats</SectionBadge>
            <h2 className="tournament-embed-heading">Tournament {activeYear}</h2>
            <p className="tournament-embed-sub">
              Live matches, results and standings powered by CricHeroes.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={100}>
            <YearFilter years={years} activeYear={activeYear} onChange={handleYearChange} />
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={180}>
            <div className="tournament-embed-frame">
              <iframe
                key={embed.embedUrl}
                title={`Sheth Narottam Morarjee Shipping Cricket Tournament ${activeYear} — CricHeroes`}
                src={embed.embedUrl}
                className="tournament-embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tournament Updates */}
      <TournamentUpdateSection variant="full" />

      <ContactCTA />
    </>
  )
}

export default TournamentPage
