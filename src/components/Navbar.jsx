import { Link, useLocation } from 'react-router-dom'
import { BRAND, NAV_LINKS } from '../constants/content'
import NavDropdown from './NavDropdown'

function isLinkActive(location, to) {
  if (to === '/') return location.pathname === '/'
  return location.pathname === to || location.pathname.startsWith(`${to}/`)
}

function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar navbar-expand-lg navbar-light site-nav sticky-top">
      <div className="container-landing d-flex align-items-center w-100">
        <Link className="navbar-brand d-flex align-items-center me-auto" to="/">
          <img src={BRAND.logo} alt={BRAND.logoAlt} className="brand-logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="mainNav">
          <div className="nav-center d-flex flex-column flex-lg-row align-items-lg-center">
            {NAV_LINKS.map((item) => {
              if (item.children?.length) {
                return <NavDropdown key={item.label} item={item} />
              }

              const isActive = isLinkActive(location, item.to)
              return (
                <Link key={item.to} to={item.to} className={isActive ? 'active' : ''}>
                  {item.label}
                </Link>
              )
            })}
            <Link
              to="/contact"
              className={`nav-contact-btn d-lg-none ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              <span className="nav-contact-btn__icon" aria-hidden="true">
                <i className="bi bi-envelope-fill" />
              </span>
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

        <div className="contact-cluster d-none d-lg-flex ms-auto">
          <Link
            to="/contact"
            className={`nav-contact-btn ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            <span className="nav-contact-btn__icon" aria-hidden="true">
              <i className="bi bi-envelope-fill" />
            </span>
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
