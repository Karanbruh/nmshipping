import ScrollReveal from '../components/ui/ScrollReveal'
import PageHero from '../components/ui/PageHero'
import ContactCTA from '../components/ContactCTA'
import { PAGE_HERO_IMAGES } from '../constants/content'
import { ALL_SPONSORS } from '../constants/sponsors'

function SponsorsPage() {
  return (
    <>
      <PageHero
        badge="Sponsors"
        title="Our Sponsors"
        subtitle="The Sheth Narottam Morarjee Shipping Cricket Tournament is proudly supported by organizations from the shipping and allied industries."
        imageSrc={PAGE_HERO_IMAGES.sponsors}
      />

      <section className="sponsors-main-section">
        <div className="container-landing">
          <ScrollReveal
            variant="fade-up"
            stagger={70}
            className={`sponsors-grid sponsors-grid--count-${ALL_SPONSORS.length}`}
          >
            {ALL_SPONSORS.map((sponsor) => (
              <article key={sponsor.id} className="sponsor-logo-tile" tabIndex={0}>
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
