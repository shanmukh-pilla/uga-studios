import { About } from '../components/About/About'
import { FinalCTA } from '../components/FinalCTA/FinalCTA'
import { Films } from '../components/Films/Films'
import { Hero } from '../components/Hero/Hero'
import { Journal } from '../components/Journal/Journal'
import { Labs } from '../components/Labs/Labs'
import { Philosophy } from '../components/Philosophy/Philosophy'
import { Pillars } from '../components/Pillars/Pillars'
import { Services } from '../components/Services/Services'
import { Technology } from '../components/Technology/Technology'
import { Work } from '../components/Work/Work'

/*
 * One sky across the day: morning light → dusk (Films) → night (Labs) →
 * dawn (About) → open daylight for the close.
 */
export function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Pillars />
      <Technology />
      <Services />
      <Films />
      <Labs />
      <About />
      <Work />
      <Journal />
      <FinalCTA />
    </>
  )
}
