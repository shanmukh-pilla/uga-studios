import type { Transition } from 'framer-motion'

/** The house easing: a long, soft settle — like air coming to rest. */
export const easeAir = [0.22, 1, 0.36, 1] as const

export const airTransition: Transition = { duration: 1.1, ease: easeAir }

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
