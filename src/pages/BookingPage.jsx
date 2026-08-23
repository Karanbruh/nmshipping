import { Link } from 'react-router-dom'
import SectionBadge from '../components/ui/SectionBadge'

function BookingPage() {
  return (
    <section className="placeholder-page">
      <div className="container-landing">
        <div className="placeholder-content">
          <SectionBadge>Booking</SectionBadge>
          <div className="placeholder-icon">
            <i className="bi bi-calendar2-check" />
          </div>
          <h1>Functionality Not Available</h1>
          <p>
            Booking functionality is currently unavailable. Please check back later or contact us for more information.
          </p>
          <Link to="/contact" className="pill-btn pill-btn-primary">
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BookingPage
