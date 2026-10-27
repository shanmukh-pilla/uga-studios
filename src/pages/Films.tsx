import { useCallback, useEffect, useState } from 'react'
import { channelIntro, films, type Film } from '../data/films'
import { FilmGallery } from '../components/Films/FilmGallery'
import { FilmsClosing } from '../components/Films/FilmsClosing'
import { FilmsHero } from '../components/Films/FilmsHero'
import { VideoViewer } from '../components/Films/VideoViewer'
import styles from './Films.module.css'

/*
 * Uga Films: one continuous evening — sunset over the ridges in the hero,
 * deepening to dusk through the films, night at the close.
 */
export function FilmsPage() {
  const [playing, setPlaying] = useState<Film | null>(null)
  const close = useCallback(() => setPlaying(null), [])

  useEffect(() => {
    document.title = 'Uga Films — Stories worth watching | Uga Studios'
  }, [])

  return (
    <div className={styles.page} data-tone="dark">
      <FilmsHero onWatch={() => setPlaying(channelIntro)} />
      <div className={styles.evening}>
        <FilmGallery films={films} onWatch={setPlaying} />
      </div>
      <FilmsClosing />
      <VideoViewer film={playing} onClose={close} />
    </div>
  )
}
