import { technologyFocus } from '../../data/site'
import { Atmosphere } from '../Atmosphere/Atmosphere'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container, SectionLabel } from '../ui/Section'
import styles from './Technology.module.css'

export function Technology() {
  return (
    <section id="technology" className={styles.section} aria-labelledby="technology-title">
      <Atmosphere
        mood="day"
        className={styles.sky}
        sun={{ x: '88%', y: '8%', size: 'min(80vw, 900px)' }}
        layers={[
          { kind: 'puffs', tile: 2400, top: '6%', opacity: 0.5, drift: 380, depth: 70, offset: 1500 },
          { kind: 'bank', tile: 2600, bottom: '-18%', opacity: 0.9, drift: 600, depth: 120, offset: 400 },
        ]}
      />
      <Container className={styles.inner}>
        <div className={styles.intro}>
          <Reveal>
            <SectionLabel index="01">Technology</SectionLabel>
          </Reveal>
          <RevealText id="technology-title" text={'We build\nwhat we imagine.'} className={styles.title} />
          <Reveal delay={0.2}>
            <p className={styles.lead}>
              Software, digital products and creative tools — technology made for the people who create,
              and for the ideas that don't fit existing tools yet.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className={styles.status}>
              <span className={styles.pulse} aria-hidden="true" />
              Our first products are in development.
            </p>
          </Reveal>
        </div>

        <ol className={styles.list}>
          {technologyFocus.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08} className={styles.item}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemText}>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  )
}
