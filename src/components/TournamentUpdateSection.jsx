import SectionBadge from './ui/SectionBadge'
import ScrollReveal from './ui/ScrollReveal'
import { CONTACT, TOURNAMENT_UPDATE } from '../constants/content'

function TournamentUpdateSection({ variant = 'compact' }) {
  const isFull = variant === 'full'

  return (
    <section className={`tournament-update-section ${isFull ? 'tournament-update-section--full' : ''}`}>
      <div className="container-landing">
        <ScrollReveal variant="fade-up">
          <div className={`text-center ${isFull ? 'mb-5' : 'mb-4'}`}>
            <SectionBadge>Tournament Update</SectionBadge>
            <h2 className="tournament-update-heading">
              {TOURNAMENT_UPDATE.title}
            </h2>
            {isFull && (
              <p className="tournament-update-sub">
                Scan the QR code or use the contact details below for more information about the {TOURNAMENT_UPDATE.year} tournament.
              </p>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={100}>
          <div className="tournament-update-poster-wrap">
            <img
              src={TOURNAMENT_UPDATE.posterSrc}
              alt={`${TOURNAMENT_UPDATE.title} promotional poster with QR code`}
              className="tournament-update-poster"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={180} stagger={80}>
          <div className="tournament-update-meta">
            <div className="tournament-update-meta__item">
              <i className="bi bi-telephone-fill" aria-hidden="true" />
              <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
            </div>
            <div className="tournament-update-meta__item">
              <i className="bi bi-globe2" aria-hidden="true" />
              <a href={`https://${TOURNAMENT_UPDATE.website}`} target="_blank" rel="noopener noreferrer">
                {TOURNAMENT_UPDATE.website}
              </a>
            </div>
            <div className="tournament-update-meta__item">
              <i className="bi bi-geo-alt-fill" aria-hidden="true" />
              <span>{TOURNAMENT_UPDATE.location}</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade" delay={280}>
          <p className="tournament-update-caption">{TOURNAMENT_UPDATE.qrCaption}</p>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default TournamentUpdateSection
