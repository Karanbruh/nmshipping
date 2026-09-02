import { CONTACT } from '../constants/content'

function WhatsAppFab() {
  return (
    <a
      href={CONTACT.whatsapp}
      className="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <i className="bi bi-whatsapp" aria-hidden="true" />
    </a>
  )
}

export default WhatsAppFab
