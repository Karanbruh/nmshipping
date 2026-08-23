import { Link } from 'react-router-dom'
import { CONTACT } from '../constants/content'

function ContactCTA() {
  return (
    <section className="contact-cta-section">
      <div className="container-landing text-center">
        <h2 className="cta-heading">Get In Touch</h2>
        <p className="cta-sub">
          Have questions about the tournament? Want to participate or sponsor? We would love to hear from you.
        </p>
        <div className="cta-buttons">
          <Link to="/contact" className="pill-btn pill-btn-gold">
            <span>Contact Us</span>
          </Link>
          <a href={CONTACT.whatsapp} className="pill-btn pill-btn-white" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-whatsapp" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
