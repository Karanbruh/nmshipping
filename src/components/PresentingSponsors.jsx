import { Link } from 'react-router-dom'
import { PRESENTING_SPONSORS } from '../constants/sponsors'

function PresentingSponsors() {
  return (
    <section className="presenting-sponsors" aria-label="Presenting partners">
      <div className="container-landing">
        <p className="presenting-sponsors__label">Presenting Partners</p>
        <ul className="presenting-sponsors__list">
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
        </ul>
      </div>
    </section>
  )
}

export default PresentingSponsors
