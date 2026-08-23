import SectionBadge from '../components/ui/SectionBadge'
import ContactCTA from '../components/ContactCTA'
import { SPONSORS } from '../constants/sponsors'

function SponsorsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-landing">
          <SectionBadge>Sponsors</SectionBadge>
          <h1 className="page-hero-title">Our Sponsors</h1>
          <p className="page-hero-sub">
            The Sheth Narottam Morarjee Shipping Cricket Tournament is proudly supported by organizations from the shipping and allied industries.
          </p>
        </div>
      </section>

      <section className="sponsors-main-section">
        <div className="container-landing">
          <div className="sponsors-grid">
            {SPONSORS.map((sponsor) => (
              <article key={sponsor.id} className="sponsor-card sponsor-card-static">
                <div className="sponsor-card-inner">
                  <img src={sponsor.logo} alt={sponsor.name} loading="lazy" />
                </div>
                <h3>{sponsor.name}</h3>
                {sponsor.tagline && <p>{sponsor.tagline}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

export default SponsorsPage
