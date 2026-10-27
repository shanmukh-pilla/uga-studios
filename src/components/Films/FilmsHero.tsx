import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Atmosphere } from '../Atmosphere/Atmosphere'
import { ActionButton } from '../ui/Button'
import { RevealText } from '../ui/Reveal'
import { Container } from '../ui/Section'
import { easeAir } from '../ui/motion'
import { Mountains } from './Mountains'
import styles from './FilmsHero.module.css'

export function FilmsHero({ onWatch }: { onWatch: () => void }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -60])
  const opacity = useTransform(scrollY, [0, 560], [1, reduce ? 1 : 0.2])

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.6, ease: easeAir, delay },
  })

  return (
    <section className={styles.hero} aria-labelledby="films-hero-title">
      <Atmosphere
        mood="dusk"
        eager
        className={styles.sky}
        sun={{ x: '64%', y: '66%', size: 'min(130vw, 1500px)', warm: true }}
        layers={[
          { kind: 'wisps', tile: 2800, top: '12%', opacity: 0.55, drift: 700, depth: 30 },
          { kind: 'puffs', tile: 2600, top: '28%', opacity: 0.4, drift: 560, depth: 50, offset: 900 },
        ]}
      />
      <Mountains />
      {/* Cloud sea resting in the valleys, in front of the far ridges */}
      <Atmosphere
        mood="dusk"
        eager
        className={styles.valley}
        layers={[{ kind: 'bank', tile: 2600, bottom: '-16%', opacity: 0.55, drift: 900, depth: 40, offset: 400 }]}
      />
      <div className={styles.ground} aria-hidden="true" />

      <Container className={styles.inner}>
        <motion.div className={styles.content} style={{ y, opacity }}>
          <motion.p className={styles.eyebrow} {...fade(0.2)}>
            Uga Films
          </motion.p>
          <RevealText
            id="films-hero-title"
            as="h1"
            immediate
            delay={0.35}
            className={styles.title}
            text={'Stories\nworth watching.'}
          />
          <motion.p className={styles.lead} {...fade(1)}>
            Films, visuals and moments that explore people, places, ideas and everything in between.
          </motion.p>
          <motion.div {...fade(1.25)}>
            <ActionButton variant="ghost" icon="play" onClick={onWatch} aria-haspopup="dialog">
              Watch our story
            </ActionButton>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
