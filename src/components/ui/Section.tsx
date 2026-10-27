import type { ReactNode } from 'react'
import styles from './Section.module.css'

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={[styles.container, className].filter(Boolean).join(' ')}>{children}</div>
}

type LabelProps = {
  children: ReactNode
  index?: string
  tone?: 'dark' | 'light'
  className?: string
}

/** The small "Our World ——— 03" marker that opens each chapter. */
export function SectionLabel({ children, index, tone = 'dark', className }: LabelProps) {
  return (
    <div className={[styles.label, styles[tone], className].filter(Boolean).join(' ')}>
      {index && <span className={styles.index}>{index}</span>}
      <span className={styles.rule} aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

/** Wide-tracked uppercase line. Never pass the brand name — it is always written "Uga". */
export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return <p className={[styles.eyebrow, className].filter(Boolean).join(' ')}>{children}</p>
}
