import { Atmosphere } from '../Atmosphere/Atmosphere'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container, SectionLabel } from '../ui/Section'
import styles from './About.module.css'

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <Atmosphere
        mood="dawn"
        sun={{ x: '50%', y: '30%', size: 'min(130vw, 1500px)' }}
        layers={[
          { kind: 'bank', tile: 2600, top: '10%', opacity: 0.55, drift: 640, depth: 120, offset: 700 },
          { kind: 'wisps', tile: 2800, top: '34%', opacity: 0.6, drift: 520, depth: 60, offset: 400 },
        ]}
      />
      <div className={styles.settle} aria-hidden="true" />

      <Container className={styles.inner}>
        <Reveal>
          <SectionLabel index="05">About</SectionLabel>
        </Reveal>

        <div className={styles.grid}>
          <div>
            <RevealText id="about-title" text="Why Uga?" className={styles.title} />
            <RevealText
              as="p"
              delay={0.15}
              className={styles.belief}
              text={'We believe technology should\nexpand creativity — not replace it.'}
            />
          </div>

          <div className={styles.side}>
            <Reveal delay={0.2}>
              <Intersection />
            </Reveal>
            <Reveal delay={0.3}>
              <p className={styles.copy}>
                Uga Studios sits where technology, creativity and entertainment meet. We build tools, make
                things for people and tell our own stories — and each one teaches the others.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className={styles.copy}>
                We're at the beginning. We'd rather show you what we're building than tell you how big we are.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/** Three overlapping circles: where Uga lives. */
function Intersection() {
  return (
    <figure className={styles.venn}>
      <svg viewBox="0 0 300 260" role="img" aria-labelledby="venn-title">
        <title id="venn-title">Uga Studios at the intersection of technology, creativity and entertainment</title>
        <g fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="110" cy="100" r="78" />
          <circle cx="190" cy="100" r="78" />
          <circle cx="150" cy="168" r="78" />
        </g>
        <circle cx="150" cy="124" r="4" fill="currentColor" />
        <g className={styles.vennLabels}>
          <text x="80" y="76" textAnchor="middle">Technology</text>
          <text x="220" y="76" textAnchor="middle">Creativity</text>
          <text x="150" y="214" textAnchor="middle">Entertainment</text>
        </g>
      </svg>
    </figure>
  )
}
