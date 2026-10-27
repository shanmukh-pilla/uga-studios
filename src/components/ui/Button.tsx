import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'solid' | 'outline' | 'ghost' | 'light'
  size?: 'md' | 'sm'
  icon?: 'arrow' | 'play' | 'none'
  children: ReactNode
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Play() {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
      <path d="M0 0l10 6-10 6z" fill="currentColor" />
    </svg>
  )
}

type Look = Pick<ButtonProps, 'variant' | 'size' | 'icon' | 'className' | 'children'>

function Inner({ icon = 'arrow', children }: Pick<Look, 'icon' | 'children'>) {
  return (
    <>
      {icon === 'play' && (
        <span className={styles.play}>
          <Play />
        </span>
      )}
      <span>{children}</span>
      {icon === 'arrow' && <Arrow className={styles.arrow} />}
    </>
  )
}

const classes = ({ variant = 'solid', size = 'md', className }: Look) =>
  [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ')

/** Link styled as a button — for CTAs that navigate. */
export function Button({ variant, size, icon, className, children, ...rest }: ButtonProps) {
  return (
    <a className={classes({ variant, size, className, children })} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </a>
  )
}

/** Same look as <Button>, for actions that stay on the page (e.g. opening a player). */
export function ActionButton({
  variant,
  size,
  icon,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & Look) {
  return (
    <button type="button" className={classes({ variant, size, className, children })} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  )
}
