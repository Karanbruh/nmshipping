import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SectionBadge from '../components/ui/SectionBadge'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageHero from '../components/ui/PageHero'
import ContactCTA from '../components/ContactCTA'
import TournamentUpdateSection from '../components/TournamentUpdateSection'
import YearFilter from '../components/gallery/YearFilter'
import { PAGE_HERO_IMAGES, TOURNAMENT_EMBEDS } from '../constants/content'

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
      <PageHero
        badge="Tournament"
        title="Sheth Narottam Morarjee Shipping Cricket Tournament"
        subtitle="A prestigious annual cricket tournament for corporate teams from the shipping and allied industries."
        imageSrc={PAGE_HERO_IMAGES.tournament}
      />

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

      <TournamentUpdateSection variant="full" />

      <ContactCTA />
    </>
  )
}

export default TournamentPage
