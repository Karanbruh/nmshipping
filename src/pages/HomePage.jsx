import Hero from '../components/Hero'
import About from '../components/About'
import TournamentHighlights from '../components/TournamentHighlights'
import TournamentUpdateSection from '../components/TournamentUpdateSection'
import SponsorsSection from '../components/SponsorsSection'
import GalleryPreview from '../components/GalleryPreview'
import ContactCTA from '../components/ContactCTA'

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <TournamentHighlights />
      <TournamentUpdateSection />
      <GalleryPreview />
      <SponsorsSection />
      <ContactCTA />
    </>
  )
}

export default HomePage
