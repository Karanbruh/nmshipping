import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function NavDropdown({ item }) {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const isChildActive = item.children?.some(
    (child) =>
      location.pathname === child.to || location.pathname.startsWith(`${child.to}/`),
  )
  const isParentActive =
    isChildActive ||
    location.pathname === item.to ||
    location.pathname.startsWith(`${item.to}/`)

  const close = () => setOpen(false)

  return (
    <div
      className={`nav-dropdown${open ? ' is-open' : ''}${isParentActive ? ' active' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="nav-dropdown-trigger">
        <Link to={item.to} className={isParentActive ? 'active' : ''} onClick={close}>
          {item.label}
        </Link>
        <button
          type="button"
          className="nav-dropdown-chevron"
          aria-expanded={open}
          aria-label={`${item.label} submenu`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <i className="bi bi-chevron-down" aria-hidden="true" />
        </button>
      </div>

      <ul className="nav-dropdown-menu" role="menu">
        {item.children.map((child) => {
          const childActive =
            location.pathname === child.to || location.pathname.startsWith(`${child.to}/`)
          return (
            <li key={child.to} role="none">
              <Link
                to={child.to}
                role="menuitem"
                className={childActive ? 'active' : ''}
                onClick={close}
              >
                {child.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NavDropdown
