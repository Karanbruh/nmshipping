import { Link } from 'react-router-dom'
import ScrollReveal from './ui/ScrollReveal'
import { BRAND, CONTACT, FOOTER_LINKS } from '../constants/content'

function Footer() {
  return (
    <ScrollReveal as="footer" variant="fade-up" className="site-footer">
      <div className="container-landing">
        <ScrollReveal variant="fade-up" stagger={100} className="row g-5">
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
            <a href={CONTACT.whatsapp} className="pill-btn pill-btn-outline pill-btn-sm" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-whatsapp" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade" delay={200}>
          <div className="footer-bottom">
            <span>{BRAND.copyright}</span>
          </div>
        </ScrollReveal>
      </div>
    </ScrollReveal>
  )
}

export default Footer
