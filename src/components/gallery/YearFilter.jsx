function YearFilter({ years, activeYear, onChange }) {
  return (
    <div className="gallery-year-filter" role="tablist" aria-label="Gallery year">
      {years.map((year) => {
        const isActive = year === activeYear
        return (
          <button
            key={year}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`pill-btn ${isActive ? 'pill-btn-gold' : 'pill-btn-outline-dark'}`}
            onClick={() => onChange(year)}
          >
            <span>{year}</span>
          </button>
        )
      })}
    </div>
  )
}

export default YearFilter
