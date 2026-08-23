import SectionBadge from '../components/ui/SectionBadge'
import ContactCTA from '../components/ContactCTA'
import TournamentUpdateSection from '../components/TournamentUpdateSection'
import { IMAGES } from '../constants/content'

function TournamentPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-landing">
          <SectionBadge>Tournament</SectionBadge>
          <h1 className="page-hero-title">Sheth Narottam Morarjee Shipping Cricket Tournament</h1>
          <p className="page-hero-sub">
            A prestigious annual cricket tournament for corporate teams from the shipping and allied industries.
          </p>
        </div>
      </section>

      {/* Venue */}
      <section className="tournament-venue-section">
        <div className="container-landing">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="tournament-venue-image">
                <img src={IMAGES.ground} alt="Oval Maidan cricket ground" />
              </div>
            </div>
            <div className="col-lg-6">
              <SectionBadge>Venue</SectionBadge>
              <h2 className="tournament-venue-heading">Oval Maidan (Elphinstone Ground)</h2>
              <p className="tournament-venue-text">
                The tournament is played at the historic Oval Maidan, also known as the Elphinstone Ground, located in the heart of Mumbai. This iconic ground has been the home of the NM Shipping Cricket Tournament, hosting decades of competitive cricket among corporate teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Updates */}
      <TournamentUpdateSection variant="full" />

      <ContactCTA />
    </>
  )
}

export default TournamentPage
