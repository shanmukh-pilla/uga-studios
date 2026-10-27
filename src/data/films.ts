/*
 * The Uga Films catalogue — real videos from https://www.youtube.com/@UgaFilms
 * (channel UC72zY6msr3-ZrnAb1R9B54A), verified September 2026.
 *
 * Only fill fields the source states. `year` is the YouTube publish year;
 * `type`, `director` and `description` come from each video's own title and
 * description. `sourceTitle` keeps the exact YouTube title for reference.
 * Newest first. Adding a film here is all the page needs.
 */

export const filmsChannelUrl = 'https://www.youtube.com/@UgaFilms'

export type FilmVersion = {
  label: string
  youtubeId: string
  duration?: string
}

export type Film = {
  id: string
  title: string
  sourceTitle: string
  youtubeId: string
  thumbnail: string
  year?: number
  type?: string
  duration?: string
  language?: string
  director?: string
  description?: string
  /** Other cuts of the same film (teaser, language versions). */
  versions?: FilmVersion[]
}

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

/** The channel's own intro — used for "Watch our story". */
export const channelIntro: Film = {
  id: 'uga-films',
  title: 'Uga Films',
  sourceTitle: 'uga films 🎬',
  youtubeId: 'VhWObERJmG0',
  thumbnail: thumb('VhWObERJmG0'),
  year: 2022,
  duration: '0:13',
}

export const films: Film[] = [
  {
    id: 'hush-money',
    title: 'Hush Money',
    sourceTitle: 'HUSH MONEY | VASANTH | UGA FILMS | VASANTH FILMS | 2022 | VIZAG | SHORT FILM',
    youtubeId: '44pCEWCIUrg',
    thumbnail: thumb('44pCEWCIUrg'),
    year: 2022,
    type: 'Short film',
    duration: '10:42',
    director: 'Vasanth Rao',
    description: 'It revolves around the story of three boys who try to steal money by blackmailing each other.',
    versions: [
      { label: 'Film', youtubeId: '44pCEWCIUrg', duration: '10:42' },
      { label: 'Teaser', youtubeId: '85Ci3LDwPbY', duration: '1:05' },
    ],
  },
  {
    id: 'infinity-days-of-love',
    title: 'Infinity Days of Love',
    sourceTitle: 'Infinity Days Of Love | 2022 | UGA FILMS | Sumanth | Vizag',
    youtubeId: 'cv5zcFWub0o',
    thumbnail: thumb('cv5zcFWub0o'),
    year: 2022,
    type: 'Film',
    duration: '10:45',
    director: 'Sumanth',
    description:
      'One day a young college boy sees a girl and falls in love with her, and follows her daily up her bus to college. What happened next?',
  },
  {
    id: 'hope-theme',
    title: 'Hope Theme',
    sourceTitle: 'Hope Theme',
    youtubeId: 'b3zMsfSUWtU',
    thumbnail: thumb('b3zMsfSUWtU'),
    year: 2022,
    duration: '1:03',
  },
  {
    id: 'ignition-2k22',
    title: 'Ignition 2K22',
    sourceTitle: 'IGNITION 2K22 | ANITS COLLEGE | MECHANICAL FEST | VIZAG | YMCA | FLASHMOB |',
    youtubeId: '7D1AoTw1s3U',
    thumbnail: thumb('7D1AoTw1s3U'),
    year: 2022,
    type: 'Flash mob',
    duration: '19:33',
    description:
      'Conducted as part of Ignition, the technical and cultural fest of the Department of Mechanical Engineering, ANITS, Visakhapatnam.',
  },
  {
    id: 'kibo',
    title: 'Kibo',
    sourceTitle: 'KIBO (Telugu) - Shanmukh Pilla, Varun Kumar Pilla, Uga films - Best Fantasy Movie of 2022',
    youtubeId: 'hjrs6d-lBlE',
    thumbnail: thumb('hjrs6d-lBlE'),
    year: 2022,
    type: 'Film',
    duration: '7:52',
    language: 'Telugu',
    director: 'P. Shanmukh & P. Varun Kumar',
  },
  {
    id: 'repati-bharatham',
    title: "Repati Bharatham (Tomorrow's India)",
    sourceTitle: "Repati Bharatham [Tomorrow's  India]",
    youtubeId: 'yEu3Ax1HCYI',
    thumbnail: thumb('yEu3Ax1HCYI'),
    year: 2022,
    duration: '2:01',
    director: 'Yogendra Koyelada',
    description:
      "A story about a boy (Subhas) who forgot to do homework which is given by his teacher on 25th January (voter's day).",
  },
  {
    id: 'the-day-before-diwali',
    title: 'The Day Before Diwali',
    sourceTitle: 'The day before diwali  (ENGLISH) | 2021 | K yogendra |  shanmukh |  subham | UGA FILMS |',
    youtubeId: 'SoQf4uG-tMg',
    thumbnail: thumb('SoQf4uG-tMg'),
    year: 2021,
    type: 'Short film',
    duration: '3:23',
    director: 'K. Yogendra',
    description: 'A story about a young boy recollecting his childhood days during Diwali.',
    versions: [
      { label: 'English', youtubeId: 'SoQf4uG-tMg', duration: '3:23' },
      { label: 'Telugu', youtubeId: 'IrWMMEAD_2k', duration: '3:26' },
    ],
  },
  {
    id: 'vicky',
    title: 'Vicky',
    sourceTitle: 'VICKY || The short film || short film shot on phone || redmi note 9 promax ||uga filmmakers',
    youtubeId: '-IE6NRgHvAM',
    thumbnail: thumb('-IE6NRgHvAM'),
    year: 2021,
    type: 'Short film',
    duration: '0:10',
    director: 'Varun Kumar Pilla',
  },
  {
    id: 'choose',
    title: 'Choose..!',
    sourceTitle: 'choose..! short film',
    youtubeId: 'MBnqtgQoNEE',
    thumbnail: thumb('MBnqtgQoNEE'),
    year: 2021,
    type: 'Short film',
    duration: '1:52',
  },
]

export const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`
