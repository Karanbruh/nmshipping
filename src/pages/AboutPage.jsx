import SectionBadge from '../components/ui/SectionBadge'
import AboutSplitRow from '../components/AboutSplitRow'
import ContactCTA from '../components/ContactCTA'
import { ABOUT, MISSION, VISION, VALUES } from '../constants/content'

function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container-landing">
          <SectionBadge>About Us</SectionBadge>
          <h1 className="page-hero-title">{ABOUT.heading}</h1>
          <p className="page-hero-sub">Established 1962 &bull; Mumbai, India</p>
        </div>
      </section>

      <AboutSplitRow
        badge={ABOUT.badge}
        heading={ABOUT.heading}
        imageSrc={ABOUT.image}
        imageAlt={ABOUT.imageAlt}
      >
        <p className="about-split__text">{ABOUT.text}</p>
        <p className="about-split__text">{ABOUT.textContinued}</p>
      </AboutSplitRow>

      <AboutSplitRow
        heading={MISSION.heading}
        imageSrc={MISSION.image}
        imageAlt={MISSION.imageAlt}
        reverse
        tone="cream"
      >
        <p className="about-split__text">{MISSION.text}</p>
      </AboutSplitRow>

      <AboutSplitRow
        heading={VALUES.heading}
        imageSrc={VALUES.image}
        imageAlt={VALUES.imageAlt}
      >
        <ul className="about-split__list">
          {VALUES.items.map((item) => (
            <li key={item.title} className="about-split__list-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </AboutSplitRow>

      <AboutSplitRow
        heading={VISION.heading}
        imageSrc={VISION.image}
        imageAlt={VISION.imageAlt}
        reverse
        tone="cream"
      >
        <p className="about-split__text">{VISION.text}</p>
      </AboutSplitRow>

      <ContactCTA />
    </>
  )
}

export default AboutPage
