import { useState } from 'react'
import SectionBadge from '../components/ui/SectionBadge'
import { CONTACT } from '../constants/content'

const CONTACT_ITEMS = [
  {
    id: 'phone',
    icon: 'bi-telephone-fill',
    label: 'Phone',
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/\s/g, '')}`,
  },
  {
    id: 'email',
    icon: 'bi-envelope-fill',
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    id: 'address',
    icon: 'bi-geo-alt-fill',
    label: 'Address',
    value: CONTACT.address,
  },
  {
    id: 'whatsapp',
    icon: 'bi-whatsapp',
    label: 'WhatsApp',
    value: 'Chat with us on WhatsApp',
    href: CONTACT.whatsapp,
    external: true,
  },
]

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', lastName: '', phone: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container-landing">
          <SectionBadge>Contact Us</SectionBadge>
          <h1 className="page-hero-title">Get In Touch</h1>
          <p className="page-hero-sub">
            We would love to speak with you. Feel free to reach out using the below details.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="contact-main-section">
        <div className="container-landing">
          <div className="row g-4 g-xl-5 align-items-start">
            <div className="col-lg-5">
              <div className="contact-info-panel">
                <div className="contact-info-panel__header">
                  <h2>Contact Information</h2>
                  <p>Reach out through any of the channels below.</p>
                </div>

                <ul className="contact-info-list">
                  {CONTACT_ITEMS.map((item) => (
                    <li key={item.id} className="contact-info-list__item">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="contact-info-list__link"
                          target={item.external ? '_blank' : undefined}
                          rel={item.external ? 'noopener noreferrer' : undefined}
                        >
                          <span className="contact-info-list__icon" aria-hidden="true">
                            <i className={`bi ${item.icon}`} />
                          </span>
                          <span className="contact-info-list__content">
                            <span className="contact-info-list__label">{item.label}</span>
                            <span className="contact-info-list__value">{item.value}</span>
                          </span>
                          <i className="bi bi-arrow-up-right contact-info-list__arrow" aria-hidden="true" />
                        </a>
                      ) : (
                        <div className="contact-info-list__link contact-info-list__link--static">
                          <span className="contact-info-list__icon" aria-hidden="true">
                            <i className={`bi ${item.icon}`} />
                          </span>
                          <span className="contact-info-list__content">
                            <span className="contact-info-list__label">{item.label}</span>
                            <span className="contact-info-list__value">{item.value}</span>
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact-form-wrap">
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="contact-name">Your Name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contact-lastname">Last Name</label>
                      <input
                        id="contact-lastname"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contact-phone">Phone Number</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="pill-btn pill-btn-primary">
                        <span>Submit</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage
