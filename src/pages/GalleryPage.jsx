import SectionBadge from '../components/ui/SectionBadge'
import ContactCTA from '../components/ContactCTA'

function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-landing">
          <SectionBadge>Gallery</SectionBadge>
          <h1 className="page-hero-title">Tournament Gallery</h1>
          <p className="page-hero-sub">
            Relive the moments, matches and memories of the Sheth Narottam Morarjee Shipping Cricket Tournament.
          </p>
        </div>
      </section>

      {/* Gallery Empty State */}
      <section className="gallery-main-section">
        <div className="container-landing text-center">
          <div className="empty-state empty-state-large">
            <i className="bi bi-images" />
            <h2>Gallery Archives Coming Soon</h2>
            <p>
              Photos and highlights from past tournaments will be available here. Stay tuned for updates from our tournament archives.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

export default GalleryPage
