import SectionBadge from '../components/ui/SectionBadge'
import ContactCTA from '../components/ContactCTA'
import { ABOUT, MISSION, VISION, VALUES, IMAGES } from '../constants/content'

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-landing">
          <SectionBadge>About Us</SectionBadge>
          <h1 className="page-hero-title">{ABOUT.heading}</h1>
          <p className="page-hero-sub">Established 1962 &bull; Mumbai, India</p>
        </div>
      </section>

      {/* Legacy */}
      <section className="about-legacy-section">
        <div className="container-landing">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="about-legacy-image">
                <img src={IMAGES.cricket} alt="Cricket at Oval Maidan" />
              </div>
            </div>
            <div className="col-lg-6">
              <SectionBadge>{ABOUT.badge}</SectionBadge>
              <h2 className="about-legacy-heading">Tournament Legacy</h2>
              <p className="about-legacy-text">{ABOUT.text}</p>
              <p className="about-legacy-text">{ABOUT.textContinued}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mv-section">
        <div className="container-landing">
          <div className="row g-4">
            <div className="col-lg-6">
              <article className="mv-card">
                <SectionBadge>{MISSION.badge}</SectionBadge>
                <p className="mv-text">{MISSION.text}</p>
              </article>
            </div>
            <div className="col-lg-6">
              <article className="mv-card">
                <SectionBadge>{VISION.badge}</SectionBadge>
                <p className="mv-text">{VISION.text}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values-section">
        <div className="container-landing">
          <div className="text-center mb-5">
            <SectionBadge>{VALUES.badge}</SectionBadge>
            <h2 className="values-heading">What Drives Us</h2>
          </div>
          <div className="row g-4">
            {VALUES.items.map((item) => (
              <div key={item.title} className="col-md-6 col-lg-3">
                <article className="value-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maritime Heritage */}
      <section className="about-heritage-section">
        <div className="container-landing">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <SectionBadge>Heritage</SectionBadge>
              <h2 className="heritage-heading">Cricket & Maritime Identity</h2>
              <p className="heritage-text">
                Initiated by Late Smt. Sumati Morarjee, the then Director and ex-Chairperson of the Scindia Steam Navigation Co Ltd, the tournament was founded with the vision of fostering a platform for corporate teams engaged in shipping and allied industries to compete and connect.
              </p>
              <p className="heritage-text">
                The event stands as a testament to the enduring legacy of the shipping industry and its commitment to promoting sports and fostering relationships across organizations worldwide.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="heritage-image">
                <img src={IMAGES.maritime} alt="Maritime heritage" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}

export default AboutPage
