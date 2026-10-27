import { work, workChapters, type WorkItem } from '../../data/site'
import { Arrow } from '../ui/Button'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container, SectionLabel } from '../ui/Section'
import styles from './Work.module.css'

export function Work() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <Container>
        <div className={styles.head}>
          <div>
            <Reveal>
              <SectionLabel index="06">Work in progress</SectionLabel>
            </Reveal>
            <RevealText id="work-title" text={"We're building\nthe first chapter."} className={styles.title} />
          </div>
          <Reveal delay={0.2}>
            <p className={styles.lead}>
              {work.length
                ? 'A selection of what we have made so far.'
                : "There's no portfolio here yet — and we won't pretend otherwise. Projects, products, films and experiments will appear as they're finished."}
            </p>
          </Reveal>
        </div>

        {work.length ? <WorkGrid items={work} /> : <Chapters />}
      </Container>
    </section>
  )
}

function Chapters() {
  return (
    <ol className={styles.chapters}>
      {workChapters.map((chapter, i) => (
        <Reveal as="li" key={chapter} delay={i * 0.08} className={styles.chapter}>
          <span className={styles.chapterIndex}>{String(i + 1).padStart(2, '0')}</span>
          <span className={styles.chapterName}>{chapter}</span>
          <span className={styles.chapterState}>Coming</span>
          <span className={styles.progress} aria-hidden="true" />
        </Reveal>
      ))}
    </ol>
  )
}

function WorkGrid({ items }: { items: WorkItem[] }) {
  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li key={item.title} className={styles.work}>
          <a href={item.href ?? '#work'}>
            {item.image && <img src={item.image} alt="" loading="lazy" />}
            <span className={styles.kind}>{item.kind}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <Arrow />
          </a>
        </li>
      ))}
    </ul>
  )
}
