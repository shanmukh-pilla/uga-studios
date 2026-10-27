import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import type { Film } from '../../data/films'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container } from '../ui/Section'
import { easeAir, viewportOnce } from '../ui/motion'
import styles from './FilmGallery.module.css'

/*
 * Column spans (of 12) give the gallery its rhythm: one wide opening frame,
 * then pairs of unequal width. New films simply continue the pattern.
 */
const RHYTHM = [12, 7, 5, 5, 7, 5, 7, 6, 6]
const span = (i: number) => (i < RHYTHM.length ? RHYTHM[i] : RHYTHM[1 + ((i - 1) % (RHYTHM.length - 1))])

export function FilmGallery({ films, onWatch }: { films: Film[]; onWatch: (film: Film) => void }) {
  return (
    <section id="our-films" className={styles.section} aria-labelledby="our-films-title">
      <Container>
        <header className={styles.head}>
          <Reveal>
            <p className={styles.eyebrow}>Our films</p>
          </Reveal>
          <RevealText id="our-films-title" text="Recent Stories" className={styles.title} />
        </header>

        <ul className={styles.grid}>
          {films.map((film, i) => (
            <li key={film.id} className={styles.cell} style={{ '--span': span(i) } as CSSProperties}>
              <FilmCard film={film} large={span(i) >= 7} onWatch={() => onWatch(film)} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function FilmCard({ film, large, onWatch }: { film: Film; large: boolean; onWatch: () => void }) {
  const reduce = useReducedMotion()
  const meta = [film.type, film.year, film.duration].filter(Boolean)

  return (
    <article className={styles.card}>
      <motion.div
        className={styles.frame}
        initial={reduce ? false : { clipPath: 'inset(10% 6% 10% 6% round 18px)', opacity: 0 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 18px)', opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.6, ease: easeAir }}
      >
        <img
          className={styles.image}
          src={film.thumbnail}
          srcSet={`https://i.ytimg.com/vi/${film.youtubeId}/sddefault.jpg 640w, ${film.thumbnail} 1280w`}
          sizes={large ? '(max-width: 760px) 100vw, 60vw' : '(max-width: 760px) 100vw, 42vw'}
          alt=""
          loading="lazy"
          decoding="async"
          width={1280}
          height={720}
        />
        <span className={styles.play} aria-hidden="true">
          <svg width="12" height="14" viewBox="0 0 12 14">
            <path d="M0 0l12 7-12 7z" fill="currentColor" />
          </svg>
        </span>
      </motion.div>

      <div className={styles.caption}>
        <h3 className={styles.filmTitle}>
          <button type="button" className={styles.trigger} onClick={onWatch} aria-haspopup="dialog">
            {film.title}
            <span className="visually-hidden"> — watch film</span>
          </button>
        </h3>
        {meta.length > 0 && (
          <p className={styles.meta}>
            {meta.map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </p>
        )}
      </div>
    </article>
  )
}
