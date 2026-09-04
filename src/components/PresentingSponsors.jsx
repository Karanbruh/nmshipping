import { Link } from 'react-router-dom'
import { PRESENTING_SPONSORS } from '../constants/sponsors'
import ScrollReveal from './ui/ScrollReveal'

function PresentingSponsors() {
  return (
    <ScrollReveal as="section" variant="fade-down" className="presenting-sponsors" aria-label="Presenting partners">
      <div className="container-landing">
        <p className="presenting-sponsors__label">Presenting Partners</p>
        <ScrollReveal as="ul" variant="fade-up" stagger={120} className="presenting-sponsors__list">
          {PRESENTING_SPONSORS.map((sponsor) => (
            <li key={sponsor.id} className="presenting-sponsors__item">
              <Link to="/sponsors" className="presenting-sponsors__link" title={sponsor.name}>
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="presenting-sponsors__logo"
                  loading="eager"
                />
              </Link>
            </li>
          ))}
        </ScrollReveal>
      </div>
    </ScrollReveal>
  )
}

export default PresentingSponsors
