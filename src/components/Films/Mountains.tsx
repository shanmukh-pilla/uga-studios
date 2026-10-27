import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import styles from './Mountains.module.css'

/*
 * Distant ridgelines for the Uga Films landscape. Paths are generated once
 * from a fixed seed (midpoint displacement), so the range never changes
 * between visits — it is a place, not a random pattern.
 */

const W = 1600
const H = 420

function ridge(seed: number, base: number, rough: number, peak: number) {
  let s = seed
  const rand = () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647 - 0.5
  }
  const n = 129
  const ys = new Array<number>(n).fill(base)
  ys[0] = base + rand() * peak
  ys[n - 1] = base + rand() * peak
  let step = n - 1
  let amp = peak
  while (step > 1) {
    const half = step / 2
    for (let i = half; i < n - 1; i += step) {
      ys[i] = (ys[i - half] + ys[i + half]) / 2 + rand() * amp
    }
    step = half
    amp *= rough
  }
  const pts = ys.map((y, i) => `${((i / (n - 1)) * W).toFixed(1)},${y.toFixed(1)}`)
  return `M0,${H} L${pts.join(' L')} L${W},${H} Z`
}

const RIDGES = [
  { d: ridge(11, 190, 0.56, 190), depth: 14, className: styles.far },
  { d: ridge(29, 250, 0.52, 150), depth: 32, className: styles.mid },
  { d: ridge(53, 318, 0.5, 110), depth: 56, className: styles.near },
]

type MountainsProps = {
  tone?: 'sunset' | 'night'
  className?: string
}

export function Mountains({ tone = 'sunset', className }: MountainsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <div ref={ref} className={[styles.range, styles[tone], className].filter(Boolean).join(' ')} aria-hidden="true">
      {RIDGES.map((r, i) => (
        <Ridge key={i} d={r.d} depth={reduce ? 0 : r.depth} className={r.className} progress={scrollYProgress} />
      ))}
    </div>
  )
}

function Ridge({
  d,
  depth,
  className,
  progress,
}: {
  d: string
  depth: number
  className: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const y = useTransform(progress, [0, 1], [-depth, depth])
  return (
    <motion.svg className={[styles.ridge, className].join(' ')} style={{ y }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
      <path d={d} />
    </motion.svg>
  )
}
