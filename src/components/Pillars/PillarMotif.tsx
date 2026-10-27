import styles from './Pillars.module.css'

/**
 * Hairline drawings that give each chapter its own sign without leaving the
 * shared sky: an instrument, an artboard, a viewfinder, an orbit.
 */
export function PillarMotif({ id }: { id: string }) {
  return (
    <svg className={styles.motif} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      {id === 'technology' && (
        <g stroke="currentColor" strokeWidth="0.6">
          <circle cx="100" cy="100" r="58" />
          <circle cx="100" cy="100" r="40" strokeDasharray="1 3" />
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2
            const r1 = i % 6 === 0 ? 64 : 61
            return (
              <line
                key={i}
                x1={100 + Math.cos(a) * 58}
                y1={100 + Math.sin(a) * 58}
                x2={100 + Math.cos(a) * r1}
                y2={100 + Math.sin(a) * r1}
              />
            )
          })}
          <line x1="100" y1="30" x2="100" y2="170" opacity="0.4" />
          <line x1="30" y1="100" x2="170" y2="100" opacity="0.4" />
          <circle cx="141" cy="59" r="2.4" fill="currentColor" stroke="none" />
        </g>
      )}
      {id === 'services' && (
        <g stroke="currentColor" strokeWidth="0.6">
          <rect x="44" y="52" width="112" height="96" rx="2" />
          <line x1="81" y1="52" x2="81" y2="148" opacity="0.35" />
          <line x1="119" y1="52" x2="119" y2="148" opacity="0.35" />
          <line x1="44" y1="84" x2="156" y2="84" opacity="0.35" />
          <line x1="44" y1="116" x2="156" y2="116" opacity="0.35" />
          <circle cx="119" cy="84" r="14" />
          <path d="M44 52l-6-6M156 52l6-6M44 148l-6 6M156 148l6 6" opacity="0.6" />
        </g>
      )}
      {id === 'films' && (
        <g stroke="currentColor" strokeWidth="0.7">
          <path d="M30 70v-10h14M170 70v-10h-14M30 130v10h14M170 130v10h-14" />
          <line x1="96" y1="100" x2="104" y2="100" />
          <line x1="100" y1="96" x2="100" y2="104" />
          <rect x="30" y="60" width="140" height="80" opacity="0.18" />
        </g>
      )}
      {id === 'labs' && (
        <g stroke="currentColor" strokeWidth="0.6">
          <ellipse cx="100" cy="100" rx="70" ry="24" transform="rotate(-18 100 100)" />
          <ellipse cx="100" cy="100" rx="70" ry="24" transform="rotate(42 100 100)" opacity="0.5" />
          <circle cx="100" cy="100" r="9" />
          <circle cx="162" cy="80" r="2.6" fill="currentColor" stroke="none" />
        </g>
      )}
    </svg>
  )
}
