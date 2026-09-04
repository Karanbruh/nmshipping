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

/** All unique sponsors shown on the Sponsors page */
export const ALL_SPONSORS = [JSW, JM_BAXI, MCA, HAPAG_LLOYD, BJK_SPORTS]

/** Current sponsors — used on home carousel */
export const SPONSORS = [JSW, JM_BAXI, MCA]

/** Featured partners shown above the home video for exposure */
export const PRESENTING_SPONSORS = [JSW, JM_BAXI, MCA]
