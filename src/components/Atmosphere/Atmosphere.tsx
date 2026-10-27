import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type CSSProperties, type ReactNode } from 'react'
import type { Mood } from '../../data/site'
import { cloudLayer, type CloudKind } from './clouds'
import styles from './Atmosphere.module.css'

export type CloudLayer = {
  kind: CloudKind
  /** Rendered tile width in px (desktop); scaled down on small screens. */
  tile: number
  top?: string
  bottom?: string
  opacity?: number
  /** Seconds for one full tile of horizontal drift. 0 = still. */
  drift?: number
  /** Parallax travel in px across the section's scroll. */
  depth?: number
  /** Start the tile at a different point so repeated layers never line up. */
  offset?: number
  flip?: boolean
}

type AtmosphereProps = {
  mood: Mood
  layers?: CloudLayer[]
  sun?: { x: string; y: string; size?: string; warm?: boolean }
  stars?: boolean
  /** Load cloud images immediately (above the fold). */
  eager?: boolean
  className?: string
  children?: ReactNode
}

/**
 * The Uga sky. Every section shares these clouds; only the hour changes.
 * Purely decorative — hidden from assistive tech.
 */
export function Atmosphere({ mood, layers = [], sun, stars, eager, className, children }: AtmosphereProps) {
  const ref = useRef<HTMLDivElement>(null)
  const near = useInView(ref, { once: true, margin: '900px 0px' })
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const load = eager || near

  return (
    <div ref={ref} className={[styles.sky, styles[mood], className].filter(Boolean).join(' ')} aria-hidden="true">
      {sun && (
        <div
          className={[styles.sun, sun.warm && styles.warm].filter(Boolean).join(' ')}
          style={{ left: sun.x, top: sun.y, width: sun.size }}
        />
      )}
      {stars && <div className={styles.stars} />}
      {layers.map((layer, i) => (
        <ParallaxLayer
          key={i}
          layer={layer}
          mood={mood}
          load={load}
          progress={scrollYProgress}
          still={!!reduce}
        />
      ))}
      {children}
    </div>
  )
}

function ParallaxLayer({
  layer,
  mood,
  load,
  progress,
  still,
}: {
  layer: CloudLayer
  mood: Mood
  load: boolean
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  still: boolean
}) {
  const depth = still ? 0 : (layer.depth ?? 0)
  const y = useTransform(progress, [0, 1], [depth, -depth])
  const { src, ratio } = cloudLayer(layer.kind, mood)

  const vars = {
    '--tile': layer.tile,
    '--ratio': ratio,
    '--drift': `${layer.drift ?? 0}s`,
    '--offset': `${-(layer.offset ?? 0)}px`,
    top: layer.top,
    // Bottom-anchored layers sit lower by their parallax travel so rising never opens a gap.
    bottom: layer.top === undefined ? `calc(${layer.bottom ?? '0px'} - ${depth}px)` : undefined,
    opacity: layer.opacity ?? 1,
  } as CSSProperties

  return (
    <motion.div className={styles.layer} style={{ ...vars, y }}>
      <div
        className={[styles.tile, layer.drift ? styles.drifting : '', layer.flip ? styles.flip : ''].join(' ')}
        style={load ? { backgroundImage: `url(${src})` } : undefined}
      />
    </motion.div>
  )
}
