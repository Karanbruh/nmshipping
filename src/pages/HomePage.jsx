import Hero from '../components/Hero'
import HomeCricketNews from '../components/HomeCricketNews'
import HomePromoBanner from '../components/HomePromoBanner'
import About from '../components/About'
import TournamentUpdateSection from '../components/TournamentUpdateSection'
import SponsorsSection from '../components/SponsorsSection'
import GalleryPreview from '../components/GalleryPreview'
import ContactCTA from '../components/ContactCTA'

function HomePage() {
  return (
    <>
      <Hero />
      <HomeCricketNews />
      <HomePromoBanner variant="cricket" />
      <About />
      <TournamentUpdateSection />
      <GalleryPreview />
      <SponsorsSection />
      <ContactCTA />
    </>
  )
}

export default HomePage
