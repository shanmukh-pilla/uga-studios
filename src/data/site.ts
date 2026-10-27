/*
 * Site content. Uga Studios is early-stage: nothing here should claim clients,
 * products, metrics or releases that don't exist yet. Empty lists render
 * honest "in progress" states until real content is added.
 */

export const brand = {
  name: 'Uga Studios',
  tagline: 'Creative Technology & Entertainment',
  // Confirm this inbox is live before launch; set to null to hide email links.
  email: 'hello@ugastudios.com' as string | null,
  year: 2026,
}

export type NavItem = {
  label: string
  /** Absolute link: a homepage anchor today, or the page once it exists. */
  href: string
  /** Dedicated route (built pages link here via `href`). */
  path: string
}

export const primaryNav: NavItem[] = [
  { label: 'Technology', href: '/#technology', path: '/technology' },
  { label: 'Services', href: '/#services', path: '/services' },
  { label: 'Films', href: '/films', path: '/films' },
  { label: 'Labs', href: '/#labs', path: '/labs' },
  { label: 'About', href: '/#about', path: '/about' },
]

export const footerNav: NavItem[] = [
  ...primaryNav,
  { label: 'Journal', href: '/#journal', path: '/journal' },
  { label: 'Contact', href: '/#contact', path: '/contact' },
]

/** Only add entries with real, live URLs. */
export const socialLinks: { label: string; href: string }[] = []

export const contactHref = brand.email ? `mailto:${brand.email}` : '/#contact'

export type Mood = 'day' | 'morning' | 'dusk' | 'night' | 'dawn'

export type Pillar = {
  id: string
  index: string
  title: string
  subtitle: string
  description: string
  cta: string
  href: string
  mood: Mood
}

export const pillars: Pillar[] = [
  {
    id: 'technology',
    index: '01',
    title: 'Technology',
    subtitle: 'Products & Tools',
    description: 'Software, digital products and creative technology.',
    cta: 'Explore Technology',
    href: '#technology',
    mood: 'day',
  },
  {
    id: 'services',
    index: '02',
    title: 'Services',
    subtitle: 'Creative & Digital Services',
    description:
      'Design, websites, applications, digital marketing and AI-assisted creative workflows.',
    cta: 'Explore Services',
    href: '#services',
    mood: 'morning',
  },
  {
    id: 'films',
    index: '03',
    title: 'Uga Films',
    subtitle: 'Stories & Entertainment',
    description: 'Films, short-form content, music, characters and original stories.',
    cta: 'Explore Films',
    href: '/films',
    mood: 'dusk',
  },
  {
    id: 'labs',
    index: '04',
    title: 'Uga Labs',
    subtitle: 'Research & Experiments',
    description:
      'AI, creative technology, storytelling, production technology and entertainment experiments.',
    cta: 'Explore Labs',
    href: '#labs',
    mood: 'night',
  },
]

export const technologyFocus = [
  { title: 'Software', text: 'Considered tools built with care, from first sketch to shipped code.' },
  { title: 'Digital products', text: 'Products for how people create, watch and work next.' },
  { title: 'Creative tools', text: 'Instruments that make imagination easier to act on.' },
  { title: 'Technology for creators', text: 'Built around artists, storytellers and makers — not the other way round.' },
  { title: 'Experimental products', text: 'Ideas we test in the open before they become products.' },
]

export const serviceGroups = [
  {
    title: 'Design',
    items: ['Graphic Design', 'Branding', 'Social Media Design', 'YouTube Thumbnails'],
  },
  {
    title: 'Digital',
    items: ['Websites', 'UI/UX', 'Mobile Applications'],
  },
  {
    title: 'Growth',
    items: ['Digital Marketing', 'SEO', 'AI-assisted Creative Workflows'],
  },
]

export const filmForms = ['Films', 'Short-form content', 'Music', 'Characters', 'Original stories', 'Entertainment']

export const labsAreas = [
  { title: 'AI + Storytelling', text: 'How new tools can serve narrative, rather than replace the storyteller.' },
  { title: 'Creative Technology', text: 'Prototypes at the edge of art and software.' },
  { title: 'Production Technology', text: 'Faster, lighter ways to make films, music and media.' },
  { title: 'Entertainment Technology', text: 'New formats for how stories are experienced.' },
  { title: 'Future Interfaces', text: 'Calmer, more human ways to work with machines.' },
  { title: 'Experimental Workflows', text: 'Processes we try on ourselves first.' },
]

export type WorkItem = {
  title: string
  kind: 'Project' | 'Case study' | 'Product' | 'Film' | 'Experiment'
  summary: string
  href?: string
  image?: string
}

/** Real work only. While empty, the Work section shows the chapters to come. */
export const work: WorkItem[] = []

export const workChapters = ['Projects', 'Case studies', 'Products', 'Films', 'Experiments']

export const journalCategories = [
  'Creative Technology',
  'AI + Creativity',
  'Filmmaking',
  'Design',
  'Digital Marketing',
  'Building Uga',
  'Experiments',
  'Entertainment Technology',
]

export type JournalEntry = {
  title: string
  category: string
  date: string
  excerpt: string
  href: string
}

/** Real articles only. While empty, the Journal shows its first-entries state. */
export const journal: JournalEntry[] = []
