import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Atmosphere } from '../Atmosphere/Atmosphere'
import { Button } from '../ui/Button'
import { RevealText } from '../ui/Reveal'
import { Container, Eyebrow } from '../ui/Section'
import { easeAir } from '../ui/motion'
import styles from './Hero.module.css'

const triad = ['Creativity', 'Technology', 'Entertainment']

export function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -90])
  const contentOpacity = useTransform(scrollY, [0, 600], [1, reduce ? 1 : 0.15])

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.4, ease: easeAir, delay },
  })

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <Atmosphere
        mood="day"
        eager
        sun={{ x: '70%', y: '26%', size: 'min(90vw, 1100px)' }}
        layers={[
          { kind: 'wisps', tile: 2600, top: '9%', opacity: 0.7, drift: 420, depth: 30 },
          { kind: 'puffs', tile: 2200, top: '26%', opacity: 0.85, drift: 300, depth: 80, offset: 600 },
          { kind: 'bank', tile: 2400, bottom: '-6%', drift: 520, depth: 140 },
          { kind: 'bank', tile: 3200, bottom: '-30%', drift: 700, depth: 260, flip: true, offset: 900 },
        ]}
      />
      <div className={styles.fade} aria-hidden="true" />

      <Container className={styles.inner}>
        <motion.div className={styles.content} style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div {...fade(0.1)}>
            <Eyebrow className={styles.eyebrow}>A new beginning</Eyebrow>
          </motion.div>
          <RevealText id="hero-title"
            as="h1"
            immediate
            delay={0.25}
            className={styles.title}
            text={'A new era of\ncreative technology.'}
          />
          <motion.p className={styles.lead} {...fade(0.9)}>
            We build products, services, stories and experiments for a more imaginative tomorrow.
          </motion.p>
          <motion.div className={styles.actions} {...fade(1.1)}>
            <Button href="#pillars">Explore Uga</Button>
            <Button href="#philosophy" variant="outline">
              Watch our story
            </Button>
          </motion.div>
        </motion.div>

        <motion.ul className={styles.triad} {...fade(1.3)} aria-label="Creativity, technology and entertainment">
          {triad.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </motion.ul>

        <motion.a href="#philosophy" className={styles.scroll} {...fade(1.6)}>
          <span>Scroll</span>
          <span className={styles.scrollLine} aria-hidden="true" />
        </motion.a>
      </Container>
    </section>
  )
}
