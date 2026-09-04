import { Link } from 'react-router-dom'
import SectionBadge from './ui/SectionBadge'

const HIGHLIGHTS = [
  {
    icon: 'bi-calendar-event',
    title: 'Established 1962',
    description: 'Over six decades of cricketing excellence in the maritime industry.',
  },
  {
    icon: 'bi-building',
    title: 'Corporate Participation',
    description: 'Renowned organizations from shipping and allied industries compete annually.',
  },
  {
    icon: 'bi-geo-alt',
    title: 'Oval Maidan',
    description: 'Played at the historic Oval Maidan in the heart of Mumbai.',
  },
]

function TournamentHighlights() {
  return (
    <section className="highlights-section">
      <div className="container-landing">
        <div className="text-center mb-5">
          <SectionBadge>Tournament Highlights</SectionBadge>
          <h2 className="highlights-heading">
            A Tradition of Excellence Since 1962
          </h2>
        </div>
        <div className="row g-4">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="col-md-4">
              <article className="highlight-card">
                <div className="highlight-icon">
                  <i className={`bi ${item.icon}`} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link to="/tournament" className="pill-btn pill-btn-primary">
            <span>View Tournament Details</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TournamentHighlights
