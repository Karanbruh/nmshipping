import { Link } from 'react-router-dom'

function PillButton({
  children,
  variant = 'primary',
  type = 'button',
  href,
  to,
  className = '',
  onClick,
}) {
  const classes = `pill-btn pill-btn-${variant} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        <span>{children}</span>
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        <span>{children}</span>
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      <span>{children}</span>
    </button>
  )
}

export default PillButton
