import { brand, footerNav, socialLinks } from '../../data/site'
import { Wordmark } from '../Navigation/Wordmark'
import { Container } from '../ui/Section'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <p className={styles.tagline}>{brand.tagline}</p>
          <nav aria-label="Footer">
            <ul className={styles.links}>
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          {socialLinks.length > 0 && (
            <ul className={styles.links} aria-label="Social">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <a href="/#top" className={styles.mark} aria-label={`${brand.name} — back to top`}>
          <Wordmark size="xl" />
        </a>

        <div className={styles.bottom}>
          <p>
            © {brand.year} {brand.name}
          </p>
          <p>Art · Technology · Entertainment</p>
        </div>
      </Container>
    </footer>
  )
}
