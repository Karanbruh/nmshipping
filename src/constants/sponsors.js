import mcaLogo from '../assets/sponsors/mca.png'
import hapagLloydLogo from '../assets/sponsors/hapag-lloyd.png'
import jmBaxiLogo from '../assets/sponsors/jm-baxi.png'
import jswLogo from '../assets/sponsors/jsw.png'
import bjkSportsLogo from '../assets/sponsors/bjk-sports-centre.png'

const MCA = {
  id: 'mca',
  name: 'Mumbai Cricket Association',
  logo: mcaLogo,
}

const HAPAG_LLOYD = {
  id: 'hapag-lloyd',
  name: 'Hapag-Lloyd',
  logo: hapagLloydLogo,
}

const JM_BAXI = {
  id: 'jm-baxi',
  name: 'J M BAXI',
  tagline: 'The Port Specialist',
  logo: jmBaxiLogo,
}

const JSW = {
  id: 'jsw',
  name: 'JSW',
  logo: jswLogo,
}

const BJK_SPORTS = {
  id: 'bjk-sports-centre',
  name: 'BJK Sports Centre',
  tagline: 'Love All, Khelo aur Khilo',
  logo: bjkSportsLogo,
}

export const SPONSORS_YEARS = [
  {
    year: 2026,
    sponsors: [JSW, JM_BAXI, MCA],
  },
  {
    year: 2025,
    sponsors: [JSW, JM_BAXI, MCA],
  },
  {
    year: 2024,
    sponsors: [BJK_SPORTS, JSW, HAPAG_LLOYD, JM_BAXI, MCA],
  },
]

export const DEFAULT_SPONSORS_YEAR = SPONSORS_YEARS[0].year

export const SPONSORS_NAV_YEARS = SPONSORS_YEARS.map(({ year }) => year)

/** Current-year sponsors — used on home carousel and presenting partners */
export const SPONSORS = SPONSORS_YEARS[0].sponsors

/** Featured partners shown above the home video for exposure */
export const PRESENTING_SPONSORS = [JSW, JM_BAXI, MCA]

export function getSponsorsYear(year) {
  return SPONSORS_YEARS.find((entry) => entry.year === year) ?? null
}
