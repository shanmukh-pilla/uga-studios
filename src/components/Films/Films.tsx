import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { filmsChannelUrl } from '../../data/films'
import { filmForms } from '../../data/site'
import { Atmosphere } from '../Atmosphere/Atmosphere'
import { Button } from '../ui/Button'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container, SectionLabel } from '../ui/Section'
import styles from './Films.module.css'

export function Films() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Letterbox bars close in as the chapter takes over the screen.
  const bar = useTransform(scrollYProgress, [0.15, 0.4, 0.8, 1], reduce ? ['0vh', '0vh', '0vh', '0vh'] : ['0vh', '6vh', '6vh', '0vh'])
  const screenScale = useTransform(scrollYProgress, [0.35, 0.7], [reduce ? 1 : 0.94, 1])

  return (
    <section id="films" ref={ref} className={styles.section} data-tone="dark" aria-labelledby="films-title">
      <Atmosphere
        mood="dusk"
        className={styles.sky}
        sun={{ x: '50%', y: '64%', size: 'min(120vw, 1400px)', warm: true }}
        layers={[
          { kind: 'wisps', tile: 2800, top: '14%', opacity: 0.6, drift: 480, depth: 60 },
          { kind: 'puffs', tile: 2400, top: '36%', opacity: 0.55, drift: 360, depth: 110, offset: 900 },
          { kind: 'bank', tile: 2600, bottom: '-10%', drift: 560, depth: 180, offset: 200 },
        ]}
      />
      <div className={styles.duskToNight} aria-hidden="true" />
      <motion.div className={`${styles.bar} ${styles.barTop}`} style={{ height: bar }} aria-hidden="true" />
      <motion.div className={`${styles.bar} ${styles.barBottom}`} style={{ height: bar }} aria-hidden="true" />

      <Container className={styles.inner}>
        <Reveal>
          <SectionLabel index="03" tone="light">
            Stories & Entertainment
          </SectionLabel>
        </Reveal>

        <div className={styles.head}>
          <RevealText id="films-title" text="Uga Films" as="h2" className={styles.name} />
          <RevealText text="Stories worth watching." as="p" className={styles.statement} delay={0.2} />
        </div>

        <Reveal delay={0.2}>
          <ul className={styles.forms} aria-label="What Uga Films makes">
            {filmForms.map((form) => (
              <li key={form}>{form}</li>
            ))}
          </ul>
        </Reveal>

        <motion.figure className={styles.screen} style={{ scale: screenScale }}>
          <Atmosphere
            mood="dusk"
            sun={{ x: '62%', y: '78%', size: '120%', warm: true }}
            layers={[
              { kind: 'wisps', tile: 1800, top: '12%', opacity: 0.7, drift: 300 },
              { kind: 'bank', tile: 1800, bottom: '-26%', drift: 380, depth: 40, offset: 1300, flip: true },
            ]}
          />
          <figcaption className={styles.caption}>
            <span className={styles.badge}>Now showing</span>
            <p className={styles.captionTitle}>Short films, stories and moments.</p>
            <p className={styles.captionText}>The Uga Films catalogue, in one quiet place.</p>
            <div className={styles.captionActions}>
              <Button href="/films" variant="light" size="sm">
                Explore Films
              </Button>
              <Button href={filmsChannelUrl} variant="ghost" size="sm" target="_blank" rel="noreferrer">
                YouTube
              </Button>
            </div>
          </figcaption>
          <div className={styles.frameMarks} aria-hidden="true" />
        </motion.figure>
      </Container>
    </section>
  )
}
