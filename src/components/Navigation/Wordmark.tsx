import styles from './Wordmark.module.css'

/**
 * The Uga Studios wordmark. The name itself is the logo — always
 * "Uga Studios": "Uga" is a word, never an acronym, never uppercased.
 */
export function Wordmark({ size = 'md', className }: { size?: 'md' | 'xl'; className?: string }) {
  return (
    <span className={[styles.wordmark, styles[size], className].filter(Boolean).join(' ')}>
      <span className={styles.uga}>Uga</span> <span className={styles.studios}>Studios</span>
    </span>
  )
}
