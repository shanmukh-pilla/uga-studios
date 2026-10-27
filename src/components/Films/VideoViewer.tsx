import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { youtubeUrl, type Film } from '../../data/films'
import { Atmosphere } from '../Atmosphere/Atmosphere'
import { easeAir } from '../ui/motion'
import styles from './VideoViewer.module.css'

type VideoViewerProps = {
  film: Film | null
  onClose: () => void
}

/**
 * Minimal cinematic player. The YouTube iframe exists only while the viewer
 * is open, so the page never loads more than one player.
 */
export function VideoViewer({ film, onClose }: VideoViewerProps) {
  const opener = useRef<HTMLElement | null>(null)

  // Opening: remember what had focus and lock the page behind the viewer.
  // Layout effect, so the opener is read before the viewer focuses its close button.
  useLayoutEffect(() => {
    if (!film) return
    if (!opener.current) opener.current = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [film])

  // Every way out (Escape, close button, backdrop) releases the page at once,
  // before the exit animation, and returns focus to where the viewer was opened.
  const close = useCallback(() => {
    document.body.style.overflow = ''
    opener.current?.focus()
    opener.current = null
    onClose()
  }, [onClose])

  return (
    <AnimatePresence>
      {film && <Viewer key={film.id} film={film} onClose={close} />}
    </AnimatePresence>
  )
}

function Viewer({ film, onClose }: { film: Film; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [version, setVersion] = useState(0)
  const current = film.versions?.[version] ?? { label: '', youtubeId: film.youtubeId, duration: film.duration }
  const meta = [film.type, film.language, film.year, current.duration].filter(Boolean)

  // Escape and focus trap while the viewer is up.
  useEffect(() => {
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], iframe, [tabindex]:not([tabindex="-1"])',
      )
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const src =
    `https://www.youtube-nocookie.com/embed/${current.youtubeId}` +
    '?autoplay=1&rel=0&modestbranding=1&playsinline=1&color=white'

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: easeAir } }}
      transition={{ duration: 0.6, ease: easeAir }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <Atmosphere
        mood="night"
        className={styles.sky}
        layers={[{ kind: 'bank', tile: 2600, bottom: '-18%', opacity: 0.45, drift: 900, offset: 700 }]}
      />

      <motion.div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="viewer-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99, transition: { duration: 0.35, ease: easeAir } }}
        transition={{ duration: 0.9, ease: easeAir }}
      >
        <button ref={closeRef} type="button" className={styles.close} onClick={onClose}>
          <span className="visually-hidden">Close video</span>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

        <div className={styles.screen}>
          <iframe
            key={current.youtubeId}
            src={src}
            title={`${film.title}${current.label ? ` — ${current.label}` : ''}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className={styles.info}>
          <div>
            <h2 id="viewer-title" className={styles.title}>
              {film.title}
            </h2>
            {meta.length > 0 && (
              <p className={styles.meta}>
                {meta.map((m, i) => (
                  <span key={i}>{m}</span>
                ))}
              </p>
            )}
          </div>

          <div className={styles.side}>
            {film.versions && film.versions.length > 1 && (
              <div className={styles.versions} role="group" aria-label="Version">
                {film.versions.map((v, i) => (
                  <button
                    key={v.youtubeId}
                    type="button"
                    aria-pressed={i === version}
                    className={styles.version}
                    onClick={() => setVersion(i)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}
            <a className={styles.youtube} href={youtubeUrl(current.youtubeId)} target="_blank" rel="noreferrer">
              Watch on YouTube
            </a>
          </div>

          {(film.description || film.director) && (
            <div className={styles.notes}>
              {film.description && <p>{film.description}</p>}
              {film.director && <p className={styles.credit}>Directed by {film.director}</p>}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
