import { Link } from 'react-router-dom'
import { BRAND, CONTACT, FOOTER_LINKS, SOCIAL_LINKS } from '../constants/content'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-landing">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="footer-brand">
              <img
                src={BRAND.logo}
                alt={BRAND.logoAlt}
                className="footer-brand-logo"
              />
            </div>
            <p className="footer-tagline">{BRAND.tagline}</p>
            <div className="footer-contact-info">
              <div><i className="bi bi-telephone" /> <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a></div>
              <div><i className="bi bi-envelope" /> <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
            </div>
          </div>
          <div className="col-lg-4">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              {FOOTER_LINKS.primary.map((link) => (
                <Link key={link.label} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-lg-3">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-social">
              {SOCIAL_LINKS.map((item) => (
                <a key={item.label} href={item.href} className="social-circle" aria-label={item.label} target="_blank" rel="noopener noreferrer">
                  <i className={`bi ${item.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
            <a href={CONTACT.whatsapp} className="pill-btn pill-btn-outline pill-btn-sm mt-3" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-whatsapp" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{BRAND.copyright}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
