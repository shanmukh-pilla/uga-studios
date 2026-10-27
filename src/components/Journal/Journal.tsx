import { journal, journalCategories, type JournalEntry } from '../../data/site'
import { Atmosphere } from '../Atmosphere/Atmosphere'
import { Arrow } from '../ui/Button'
import { Reveal, RevealText } from '../ui/Reveal'
import { Container, SectionLabel } from '../ui/Section'
import styles from './Journal.module.css'

export function Journal() {
  return (
    <section id="journal" className={styles.section} aria-labelledby="journal-title">
      <Container>
        <div className={styles.head}>
          <div>
            <Reveal>
              <SectionLabel index="07">Journal</SectionLabel>
            </Reveal>
            <RevealText id="journal-title" text="The Uga Journal" className={styles.title} />
          </div>
          <Reveal delay={0.2}>
            <p className={styles.lead}>
              Notes on art, technology and filmmaking — and an honest record of building a studio from its
              first chapter.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className={styles.categories} aria-label="Journal topics">
            {journalCategories.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Reveal>

        {journal.length ? (
          <ul className={styles.entries}>
            {journal.map((entry) => (
              <EntryCard key={entry.href} entry={entry} />
            ))}
          </ul>
        ) : (
          <Reveal delay={0.15}>
            <div className={styles.empty}>
              <Atmosphere
                mood="morning"
                sun={{ x: '85%', y: '20%', size: '90%' }}
                layers={[{ kind: 'bank', tile: 1800, bottom: '-30%', drift: 420, depth: 40, offset: 900 }]}
              />
              <div className={styles.emptyBody}>
                <p className={styles.emptyLabel}>Entry 001</p>
                <p className={styles.emptyTitle}>The first entries are being written.</p>
                <p className={styles.emptyText}>Ideas, experiments and perspectives — coming soon.</p>
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  )
}

function EntryCard({ entry }: { entry: JournalEntry }) {
  return (
    <li className={styles.entry}>
      <a href={entry.href}>
        <span className={styles.entryMeta}>
          {entry.category} · <time dateTime={entry.date}>{entry.date}</time>
        </span>
        <h3>{entry.title}</h3>
        <p>{entry.excerpt}</p>
        <span className={styles.read}>
          Read <Arrow />
        </span>
      </a>
    </li>
  )
}
