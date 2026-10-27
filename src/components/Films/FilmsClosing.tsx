import { filmsChannelUrl } from '../../data/films'
import { Atmosphere } from '../Atmosphere/Atmosphere'
import { Button } from '../ui/Button'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container } from '../ui/Section'
import { Mountains } from './Mountains'
import styles from './FilmsClosing.module.css'

export function FilmsClosing() {
  return (
    <section className={styles.section} aria-labelledby="films-closing-title">
      <Atmosphere
        mood="night"
        stars
        className={styles.sky}
        sun={{ x: '50%', y: '70%', size: 'min(110vw, 1200px)' }}
        layers={[{ kind: 'puffs', tile: 2600, top: '30%', opacity: 0.25, drift: 800, depth: 40, offset: 1400 }]}
      />
      <Mountains tone="night" />
      <Atmosphere
        mood="night"
        className={styles.valley}
        layers={[{ kind: 'bank', tile: 2600, bottom: '-20%', opacity: 0.6, drift: 1000, depth: 30, offset: 1800 }]}
      />

      <Container className={styles.inner}>
        <Reveal>
          <p className={styles.eyebrow}>More stories await</p>
        </Reveal>
        <RevealText
          id="films-closing-title"
          text={'The next story is already\non the horizon.'}
          className={styles.title}
        />
        <Reveal delay={0.3}>
          <Button href={filmsChannelUrl} variant="light" target="_blank" rel="noreferrer">
            Watch more on YouTube
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
