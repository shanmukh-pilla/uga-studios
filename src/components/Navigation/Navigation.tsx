import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { brand, contactHref, primaryNav } from '../../data/site'
import { Arrow } from '../ui/Button'
import { easeAir } from '../ui/motion'
import { Wordmark } from './Wordmark'
import styles from './Navigation.module.css'

/** True while a dark chapter ([data-tone="dark"]) sits under the bar. */
function darkUnderBar() {
  const line = 38
  return Array.from(document.querySelectorAll('[data-tone="dark"]')).some((el) => {
    const r = el.getBoundingClientRect()
    return r.top <= line && r.bottom >= line
  })
}

/** `current` is the active page path, e.g. "/films". */
export function Navigation({ current }: { current?: string }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 24)
    setDark(darkUnderBar())
  })

  // Pages that open on a dark sky (e.g. /films) need the light-on-dark bar before any scroll.
  useEffect(() => {
    const id = requestAnimationFrame(() => setDark(darkUnderBar()))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={[styles.header, scrolled && !open ? styles.scrolled : '', dark && !open ? styles.dark : ''].join(' ')}
    >
      <nav className={styles.bar} aria-label="Primary">
        <a href="/#top" className={styles.brand} aria-label={`${brand.name} — home`} onClick={close}>
          <Wordmark />
        </a>

        <ul className={styles.links}>
          {primaryNav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={styles.link}
                aria-current={current === item.path ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={contactHref} className={styles.cta}>
          Let's Build <Arrow />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={[styles.burger, open ? styles.burgerOpen : ''].join(' ')} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.sheet}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeAir }}
          >
            <ul className={styles.sheetLinks}>
              {primaryNav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: easeAir, delay: 0.08 + i * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={close}
                    aria-current={current === item.path ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href={contactHref}
              className={styles.sheetCta}
              onClick={close}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeAir, delay: 0.4 }}
            >
              Let's Build <Arrow />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
