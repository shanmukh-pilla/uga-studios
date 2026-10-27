import { contactHref, serviceGroups } from '../../data/site'
import { Button } from '../ui/Button'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container, SectionLabel } from '../ui/Section'
import styles from './Services.module.css'

export function Services() {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <Container>
        <div className={styles.head}>
          <div>
            <Reveal>
              <SectionLabel index="02">Services</SectionLabel>
            </Reveal>
            <RevealText id="services-title" text="Ideas need to be seen." className={styles.title} />
          </div>
          <Reveal delay={0.2} className={styles.headAside}>
            <p className={styles.lead}>
              We help businesses, creators and organizations turn ideas into digital experiences.
            </p>
            <Button href={contactHref}>Start a project</Button>
          </Reveal>
        </div>

        <div className={styles.groups}>
          {serviceGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.12} className={styles.group}>
              <div className={styles.groupHead}>
                <span className={styles.groupIndex}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={styles.groupTitle}>{group.title}</h3>
              </div>
              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
