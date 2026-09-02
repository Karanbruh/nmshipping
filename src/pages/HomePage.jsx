import PresentingSponsors from '../components/PresentingSponsors'
import Hero from '../components/Hero'
import HomePromoBanner from '../components/HomePromoBanner'
import HomeVenueCarousel from '../components/HomeVenueCarousel'
import About from '../components/About'
import TournamentUpdateSection from '../components/TournamentUpdateSection'
import SponsorsSection from '../components/SponsorsSection'
import GalleryPreview from '../components/GalleryPreview'
import ContactCTA from '../components/ContactCTA'

function HomePage() {
  return (
    <>
      <PresentingSponsors />
      <Hero />
      <HomePromoBanner variant="cricket" />
      <HomeVenueCarousel />
      <About />
      <TournamentUpdateSection />
      <GalleryPreview />
      <SponsorsSection />
      <ContactCTA />
    </>
  )
}

export default HomePage
