import { Link } from 'react-router-dom'
import SectionBadge from '../components/ui/SectionBadge'
import ScrollReveal from '../components/ui/ScrollReveal'
import { BOOKING } from '../constants/content'

function BookingPage() {
  const { venue, unavailable } = BOOKING

  return (
    <section className="booking-page">
      <div className="container-landing">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <ScrollReveal variant="fade-right">
              <div className="booking-page__media">
                <img src={venue.imageSrc} alt={venue.imageAlt} />
                <div className="booking-page__media-badge">
                  <i className="bi bi-geo-alt-fill" aria-hidden="true" />
                  <span>{venue.location}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-lg-6">
            <ScrollReveal variant="fade-left" delay={120}>
              <div className="booking-page__copy">
                <SectionBadge>Booking</SectionBadge>
                <h1 className="booking-page__heading">{venue.title}</h1>
                <p className="booking-page__description">{venue.description}</p>

                <div className="booking-page__status" role="status">
                  <div className="booking-page__status-icon" aria-hidden="true">
                    <i className="bi bi-calendar-x" />
                  </div>
                  <div className="booking-page__status-body">
                    <h2>{unavailable.title}</h2>
                    <p>{unavailable.message}</p>
                  </div>
                </div>

                <div className="booking-page__actions">
                  <Link to="/contact" className="pill-btn pill-btn-primary">
                    <span>Contact Us</span>
                  </Link>
                  <Link to="/tournament" className="pill-btn pill-btn-outline">
                    <span>View Tournament</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingPage
