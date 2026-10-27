import { motion } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { airTransition, easeAir, viewportOnce } from './motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'p' | 'span'
}

/** Fades content up into place as it enters the viewport. */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...airTransition, delay }}
    >
      {children}
    </Tag>
  )
}

type RevealTextProps = {
  text: string
  as?: ElementType
  id?: string
  className?: string
  delay?: number
  /** Animate immediately instead of on scroll (e.g. the hero). */
  immediate?: boolean
}

/**
 * Headline reveal: each word rises from behind a mask.
 * Line breaks in `text` ("\n") are preserved.
 */
export function RevealText({ text, as: Tag = 'h2', id, className, delay = 0, immediate }: RevealTextProps) {
  const lines = text.split('\n')
  let wordIndex = 0
  const trigger = immediate
    ? { animate: 'shown' }
    : { whileInView: 'shown', viewport: viewportOnce }

  return (
    <Tag id={id} className={className} aria-label={text.replace(/\n/g, ' ')}>
      <motion.span initial="hidden" {...trigger} style={{ display: 'block' }} aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} style={{ display: 'block' }}>
            {line.split(' ').map((word, wi) => {
              const i = wordIndex++
              return (
                <span
                  key={wi}
                  style={{
                    display: 'inline-block',
                    overflow: 'hidden',
                    verticalAlign: 'top',
                    paddingBottom: '0.08em',
                    marginBottom: '-0.08em',
                  }}
                >
                  <motion.span
                    style={{ display: 'inline-block' }}
                    variants={{
                      hidden: { y: '105%', opacity: 0 },
                      shown: {
                        y: '0%',
                        opacity: 1,
                        transition: { duration: 1.2, ease: easeAir, delay: delay + i * 0.06 },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                  {wi < line.split(' ').length - 1 ? ' ' : null}
                </span>
              )
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
