import { forwardRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const ScrollReveal = forwardRef(function ScrollReveal(
  {
    as: Tag = 'div',
    variant = 'fade-up',
    delay = 0,
    duration,
    className = '',
    stagger,
    children,
    once = true,
    threshold,
    rootMargin,
    ...rest
  },
  forwardedRef,
) {
  const { ref, visible } = useScrollReveal({ once, threshold, rootMargin })

  const setRefs = (node) => {
    ref.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  const classes = [
    'scroll-reveal',
    `scroll-reveal--${variant}`,
    stagger != null ? 'scroll-reveal--stagger' : '',
    visible ? 'scroll-reveal--visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style = {
    ...(delay ? { '--reveal-delay': `${delay}ms` } : {}),
    ...(duration ? { '--reveal-duration': `${duration}ms` } : {}),
    ...(stagger != null ? { '--reveal-stagger': `${stagger}ms` } : {}),
  }

  return (
    <Tag ref={setRefs} className={classes} style={style} {...rest}>
      {children}
    </Tag>
  )
})

export default ScrollReveal
