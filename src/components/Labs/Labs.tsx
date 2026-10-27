import { labsAreas } from '../../data/site'
import { Atmosphere } from '../Atmosphere/Atmosphere'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container, SectionLabel } from '../ui/Section'
import styles from './Labs.module.css'

export function Labs() {
  return (
    <section id="labs" className={styles.section} data-tone="dark" aria-labelledby="labs-title">
      <Atmosphere
        mood="night"
        stars
        layers={[
          { kind: 'puffs', tile: 2600, top: '38%', opacity: 0.35, drift: 520, depth: 90, offset: 300 },
          { kind: 'bank', tile: 2800, bottom: '-14%', opacity: 0.9, drift: 700, depth: 160, offset: 1600 },
        ]}
      >
        <svg className={styles.orbit} viewBox="0 0 800 800" fill="none">
          <ellipse cx="400" cy="400" rx="380" ry="120" transform="rotate(-14 400 400)" />
          <ellipse cx="400" cy="400" rx="300" ry="90" transform="rotate(24 400 400)" />
        </svg>
      </Atmosphere>

      <Container className={styles.inner}>
        <div className={styles.head}>
          <div>
            <Reveal>
              <SectionLabel index="04" tone="light">
                Uga Labs
              </SectionLabel>
            </Reveal>
            <RevealText id="labs-title" text={"Where we explore\nwhat's next."} className={styles.title} />
          </div>
          <Reveal delay={0.2}>
            <p className={styles.lead}>
              Uga Labs is the experimental side of the studio — where we research, prototype and test ideas
              before we know what they will become. Some will turn into products and stories. Many won't.
              That's the point.
            </p>
          </Reveal>
        </div>

        <ul className={styles.areas}>
          {labsAreas.map((area, i) => (
            <Reveal as="li" key={area.title} delay={(i % 3) * 0.1} className={styles.area}>
              <span className={styles.areaIndex}>L—{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.areaTitle}>{area.title}</h3>
              <p className={styles.areaText}>{area.text}</p>
              <span className={styles.status}>Exploring</span>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
