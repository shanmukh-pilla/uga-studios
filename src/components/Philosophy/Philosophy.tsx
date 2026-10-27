import { Atmosphere } from '../Atmosphere/Atmosphere'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container, SectionLabel } from '../ui/Section'
import styles from './Philosophy.module.css'

export function Philosophy() {
  return (
    <section id="philosophy" className={styles.section} aria-labelledby="philosophy-title">
      <Atmosphere
        mood="morning"
        className={styles.sky}
        layers={[{ kind: 'wisps', tile: 2800, top: '4%', opacity: 0.55, drift: 500, depth: 60, offset: 1200 }]}
      />
      <Container className={styles.inner}>
        <Reveal>
          <SectionLabel index="02">Our vision</SectionLabel>
        </Reveal>

        <div className={styles.grid}>
          <RevealText id="philosophy-title"
            text={'Every era begins\nwith an idea.'}
            className={styles.title}
            as="h2"
          />
          <div className={styles.copy}>
            <Reveal delay={0.2}>
              <p className={styles.lead}>
                Uga Studios is a creative technology and entertainment company exploring new ways to build,
                create and tell stories.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <p className={styles.triad}>
                Technology <span aria-hidden="true">×</span>
                <span className="visually-hidden">,</span> Creativity <span aria-hidden="true">×</span>
                <span className="visually-hidden">,</span> Entertainment
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className={styles.horizon} y={0}>
          <span />
        </Reveal>
      </Container>
    </section>
  )
}
