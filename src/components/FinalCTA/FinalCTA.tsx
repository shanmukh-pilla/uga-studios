import { brand, contactHref } from '../../data/site'
import { Atmosphere } from '../Atmosphere/Atmosphere'
import { Button } from '../ui/Button'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container, SectionLabel } from '../ui/Section'
import styles from './FinalCTA.module.css'

export function FinalCTA() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <Atmosphere
        mood="day"
        sun={{ x: '50%', y: '42%', size: 'min(120vw, 1300px)' }}
        layers={[
          { kind: 'wisps', tile: 2600, top: '12%', opacity: 0.7, drift: 440, depth: 50, offset: 800 },
          { kind: 'puffs', tile: 2400, top: '44%', opacity: 0.7, drift: 340, depth: 100, offset: 1800 },
          { kind: 'bank', tile: 2600, bottom: '-12%', drift: 560, depth: 160, offset: 1200 },
        ]}
      />
      <div className={styles.fadeIn} aria-hidden="true" />

      <Container className={styles.inner}>
        <Reveal>
          <SectionLabel index="08">Let's build</SectionLabel>
        </Reveal>
        <RevealText id="contact-title" text={"Let's build\nwhat's next."} className={styles.title} />
        <Reveal delay={0.25}>
          <p className={styles.lead}>Have an idea, a project or a question? We'd love to hear it.</p>
        </Reveal>
        <Reveal delay={0.4} className={styles.actions}>
          <Button href={contactHref}>Start a project</Button>
          {brand.email && (
            <a href={`mailto:${brand.email}`} className={styles.email}>
              {brand.email}
            </a>
          )}
        </Reveal>
      </Container>
    </section>
  )
}
