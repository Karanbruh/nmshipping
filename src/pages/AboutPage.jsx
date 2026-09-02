import SectionBadge from '../components/ui/SectionBadge'
import ScrollReveal from '../components/ui/ScrollReveal'
import PageHero from '../components/ui/PageHero'
import AboutSplitRow from '../components/AboutSplitRow'
import ContactCTA from '../components/ContactCTA'
import { ABOUT, MISSION, VISION, VALUES } from '../constants/content'

function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Us"
        title={ABOUT.heading}
        subtitle="Established 1962 • Mumbai, India"
        imageSrc={ABOUT.heroImage}
      />

      <AboutSplitRow
        badge={ABOUT.badge}
        heading={ABOUT.heading}
        imageSrc={ABOUT.image}
        imageAlt={ABOUT.imageAlt}
        stats={ABOUT.stats}
        sectionIndex={1}
      >
        <p className="about-split__text">{ABOUT.text}</p>
        <p className="about-split__text">{ABOUT.textContinued}</p>
      </AboutSplitRow>

      <AboutSplitRow
        badge={MISSION.badge}
        heading={MISSION.heading}
        icon={MISSION.icon}
        imageSrc={MISSION.image}
        imageAlt={MISSION.imageAlt}
        reverse
        tone="cream"
        sectionIndex={2}
      >
        <blockquote className="about-split__quote">
          <p>{MISSION.text}</p>
        </blockquote>
      </AboutSplitRow>

      <AboutSplitRow
        badge={VALUES.badge}
        heading={VALUES.heading}
        imageSrc={VALUES.image}
        imageAlt={VALUES.imageAlt}
        values={VALUES.items}
        sectionIndex={3}
      />

      <AboutSplitRow
        badge={VISION.badge}
        heading={VISION.heading}
        icon={VISION.icon}
        imageSrc={VISION.image}
        imageAlt={VISION.imageAlt}
        reverse
        tone="cream"
        sectionIndex={4}
      >
        <blockquote className="about-split__quote">
          <p>{VISION.text}</p>
        </blockquote>
      </AboutSplitRow>

      <ContactCTA />
    </>
  )
}

export default AboutPage
