import { motion } from 'framer-motion'
import { pillars, type Pillar } from '../../data/site'
import { Atmosphere, type CloudLayer } from '../Atmosphere/Atmosphere'
import { Arrow } from '../ui/Button'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container, SectionLabel } from '../ui/Section'
import { airTransition, viewportOnce } from '../ui/motion'
import { PillarMotif } from './PillarMotif'
import styles from './Pillars.module.css'

/* Same clouds, different hour — each pillar is a chapter of one sky. */
const skies: Record<string, { layers: CloudLayer[]; sun?: { x: string; y: string; size: string; warm?: boolean }; stars?: boolean }> = {
  technology: {
    sun: { x: '80%', y: '12%', size: '140%' },
    layers: [{ kind: 'bank', tile: 1500, bottom: '-4%', drift: 260, depth: 30, offset: 300 }],
  },
  services: {
    sun: { x: '20%', y: '18%', size: '130%' },
    layers: [
      { kind: 'puffs', tile: 1400, top: '30%', opacity: 0.8, drift: 220, depth: 20, offset: 800 },
      { kind: 'bank', tile: 1700, bottom: '-12%', drift: 300, depth: 30, flip: true },
    ],
  },
  films: {
    sun: { x: '50%', y: '70%', size: '150%', warm: true },
    layers: [{ kind: 'bank', tile: 1500, bottom: '-6%', drift: 280, depth: 30, offset: 1100 }],
  },
  labs: {
    stars: true,
    layers: [{ kind: 'bank', tile: 1600, bottom: '-8%', drift: 340, depth: 30, offset: 500 }],
  },
}

export function Pillars() {
  return (
    <section id="pillars" className={styles.section} aria-labelledby="pillars-title">
      <Container>
        <div className={styles.head}>
          <div>
            <Reveal>
              <SectionLabel index="03">Our world</SectionLabel>
            </Reveal>
            <RevealText id="pillars-title" text={'Four dimensions\nof creation.'} className={styles.title} />
          </div>
          <Reveal delay={0.2}>
            <p className={styles.intro}>
              Technology, services, films and research — four connected chapters of one studio, shaping a more
              imaginative future.
            </p>
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {pillars.map((pillar, i) => (
            <motion.li
              key={pillar.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...airTransition, duration: 1.3, delay: i * 0.1 }}
            >
              <PillarCard pillar={pillar} />
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  const sky = skies[pillar.id]
  const dark = pillar.mood === 'dusk' || pillar.mood === 'night'
  return (
    <a href={pillar.href} className={[styles.card, dark ? styles.dark : ''].join(' ')}>
      <div className={styles.visual}>
        <Atmosphere mood={pillar.mood} layers={sky.layers} sun={sky.sun} stars={sky.stars} />
        <PillarMotif id={pillar.id} />
      </div>
      <div className={styles.body}>
        <span className={styles.index}>{pillar.index}</span>
        <h3 className={styles.cardTitle}>{pillar.title}</h3>
        <p className={styles.subtitle}>{pillar.subtitle}</p>
        <p className={styles.description}>{pillar.description}</p>
        <span className={styles.cta}>
          {pillar.cta} <Arrow />
        </span>
      </div>
    </a>
  )
}
