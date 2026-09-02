import { DEFAULT_GALLERY_YEAR } from './gallery'
import { DEFAULT_SPONSORS_YEAR } from './sponsors'

export const BRAND = {
  name: 'Sheth Narottam Morarjee Shipping Cricket Tournament',
  shortName: 'NM Shipping',
  nameStart: 'NM',
  nameEnd: ' Shipping',
  logo: '/assets/logo/nm-shipping-logo.png',
  logoAlt: 'Sheth Narottam Morarjee Shipping Cricket Tournament — Oval Maidan',
  copyright: '© 2026 Sheth Narottam Morarjee Shipping Cricket Tournament. All rights reserved.',
  tagline: 'A Legacy of Sportsmanship and Maritime Excellence',
}

export const IMAGES = {
  hero: '/assets/about/about-mission.jpg',
  cricket: '/assets/about/about-legacy.jpg',
  ground: '/assets/about/about-mission.jpg',
  heritage: '/assets/about/about-values.jpg',
  maritime: '/assets/about/about-vision.jpg',
}

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Booking', to: '/booking' },
  { label: 'Tournament', to: '/tournament' },
  { label: 'Cricket News', to: '/cricket-news' },
  { label: 'Gallery', to: `/gallery/${DEFAULT_GALLERY_YEAR}` },
  { label: 'Sponsors', to: `/sponsors/${DEFAULT_SPONSORS_YEAR}` },
]

export const PAGE_HERO_IMAGES = {
  about: '/assets/about/about-mission.jpg',
  tournament: '/assets/about/about-vision.jpg',
  cricketNews: '/assets/about/about-legacy.jpg',
  contact: '/assets/video/sndm-18-poster.jpg',
  gallery: '/assets/gallery/pool/stock-01.jpg',
  sponsors: '/assets/about/about-mission.jpg',
  booking: '/assets/about/about-mission.jpg',
  album: '/assets/about/about-legacy.jpg',
}

export const TOURNAMENT_UPDATE = {
  year: 2026,
  title: 'Sheth Narottam Morarjee Shipping Cricket Tournament 2026',
  posterSrc: '/assets/tournament/tournament-update-2026.png',
  qrCaption: 'Let cricketers find this tournament. Scan this QR code.',
  website: 'www.nmshipping.com',
  location: 'Mumbai',
}

export const TOURNAMENT_EMBEDS = [
  {
    year: 2026,
    embedUrl:
      'https://cricheroes.com/tournament/1/1867536/sheth-narottam-morarjee-shipping-cricket-tournament-2026/matches/live-matches',
  },
  {
    year: 2025,
    embedUrl:
      'https://cricheroes.com/tournament/1/1360879/sheth-narottam-morarjee-shipping-cricket-tournament-2025/matches/past-matches',
  },
  {
    year: 2024,
    embedUrl:
      'https://cricheroes.com/tournament/941469/sheth-narottam-morarjee-shipping-cricket-tournament-2024/matches/past-matches?colorcode=4991c1&type=m',
  },
]

export const SOCIAL_LINKS = [
  { icon: 'bi-whatsapp', href: 'https://wa.me/919137601154', label: 'WhatsApp' },
]

export const HERO = {
  title: 'Sheth Narottam Morarjee Shipping Cricket Tournament',
  subtitle:
    'A prestigious annual cricket tournament celebrating sportsmanship and camaraderie within the shipping and allied industries since 1962.',
  venue: 'Oval Maidan (Elphinstone Ground)',
  videoSrc: '/assets/video/sndm-18.mp4',
  posterSrc: '/assets/video/sndm-18-poster.jpg',
}

export const HOME_PROMOS = {
  cricket: {
    title: 'Tournament Updates',
    subtitle: 'Match highlights, fixtures, and the latest from the ground.',
    imageSrc: '/assets/about/about-legacy.jpg',
    imageAlt: 'Cricket action from the Sheth Narottam Morarjee Shipping Cricket Tournament',
    ctaLabel: 'Tournament Update',
    ctaTo: '/tournament',
    ctaVariant: 'gold',
  },
  venue: {
    title: 'Oval Maidan (Elphinstone Ground)',
    subtitle: 'Book Mumbai\'s iconic cricket ground for your next match or corporate event.',
    imageSrc: '/assets/about/about-mission.jpg',
    imageAlt: 'Oval Maidan cricket ground in Mumbai',
    ctaLabel: 'Book now',
    ctaTo: '/booking',
    ctaVariant: 'primary',
  },
}

export const BOOKING = {
  venue: {
    title: 'Oval Maidan (Elphinstone Ground)',
    location: 'Mumbai, Maharashtra',
    description:
      'The historic Oval Maidan, also known as the Elphinstone Ground, sits in the heart of Mumbai. This iconic ground has been the home of the NM Shipping Cricket Tournament, hosting decades of competitive cricket among corporate teams.',
    imageSrc: '/assets/about/about-mission.jpg',
    imageAlt: 'Oval Maidan cricket ground in Mumbai',
  },
  unavailable: {
    title: 'Booking Not Available',
    message:
      'Online booking for Oval Maidan is currently unavailable. For enquiries about ground availability, corporate events, or match bookings, please contact us directly.',
  },
}

export const VENUE_CAROUSEL_IMAGES = [
  {
    src: '/assets/about/about-mission.jpg',
    alt: 'Oval Maidan cricket ground in Mumbai',
  },
  {
    src: '/assets/about/about-legacy.jpg',
    alt: 'Cricket action from the Sheth Narottam Morarjee Shipping Cricket Tournament',
  },
  {
    src: '/assets/video/sndm-18-poster.jpg',
    alt: 'Tournament highlight at Oval Maidan',
  },
  {
    src: '/assets/gallery/pool/stock-01.jpg',
    alt: 'Cricket match in progress',
  },
  {
    src: '/assets/gallery/pool/stock-09.jpg',
    alt: 'Players on the cricket field',
  },
]

export const ABOUT = {
  badge: 'About Us',
  heroImage: PAGE_HERO_IMAGES.about,
  heading: 'A Legacy of Sportsmanship and Maritime Excellence',
  text: 'The Sheth Narottam Morarjee Shipping Cricket Tournament, established in 1962, is a prestigious annual event celebrating the spirit of sportsmanship and camaraderie within the shipping industry. It was initiated by Late Smt. Sumati Morarjee, the then Director and ex-Chairperson of the Scindia Steam Navigation Co Ltd, with the vision of fostering a platform for corporate teams engaged in shipping and allied industries to compete and connect.',
  textContinued:
    'Over the past six decades, the tournament has grown in stature, attracting participation from renowned organizations worldwide. The event is a testament to the enduring legacy of the shipping industry and its commitment to promoting sports and fostering relationships.',
  image: IMAGES.cricket,
  imageAlt: 'Cricket action celebrating the tournament legacy',
  stats: [
    { value: '1962', label: 'Established' },
    { value: '60+', label: 'Years of Legacy' },
    { value: 'Mumbai', label: 'Home Ground' },
  ],
}

export const MISSION = {
  badge: 'Our Purpose',
  heading: 'Our Mission',
  icon: 'bi-bullseye',
  text: 'To continue the tradition of excellence and innovation in the Sheth Narottam Morarjee Shipping Cricket Tournament, providing a platform for corporate teams to showcase their talent, foster sportsmanship, and strengthen industry connections.',
  image: IMAGES.ground,
  imageAlt: 'Cricket match in progress at the tournament ground',
}

export const VISION = {
  badge: 'Looking Ahead',
  heading: 'Our Vision',
  icon: 'bi-binoculars',
  text: 'To make the Sheth Narottam Morarjee Shipping Cricket Tournament a nationally recognized event, celebrating the spirit of sportsmanship within the maritime industry.',
  image: IMAGES.maritime,
  imageAlt: 'Players celebrating after a tournament match',
}

export const VALUES = {
  badge: 'What We Stand For',
  heading: 'Our Values',
  image: IMAGES.heritage,
  imageAlt: 'Cricket action reflecting tournament values of fair play and excellence',
  items: [
    {
      title: 'Community',
      icon: 'bi-people-fill',
      description:
        'Fostering a sense of community and camaraderie amongst the shipping and maritime industry.',
    },
    {
      title: 'Excellence',
      icon: 'bi-trophy-fill',
      description: 'Striving for the highest standards of competition and performance.',
    },
    {
      title: 'Fair Play',
      icon: 'bi-shield-check',
      description: 'Adhering to the principles of fair play and sportsmanship.',
    },
    {
      title: 'Innovation',
      icon: 'bi-lightbulb-fill',
      description: 'Embracing new ideas and technologies to enhance the tournament experience.',
    },
  ],
}

export const CONTACT = {
  phone: '+91 9137601154',
  email: 'info@nmshippingshield.com',
  address: '140, Maharshi Karve Road, Mantralaya, Churchgate, Mumbai, Maharashtra 400032',
  whatsapp: 'https://wa.me/919137601154',
}

export const FOOTER_LINKS = {
  primary: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Tournament', to: '/tournament' },
    { label: 'Cricket News', to: '/cricket-news' },
    { label: 'Gallery', to: `/gallery/${DEFAULT_GALLERY_YEAR}` },
    { label: 'Sponsors', to: `/sponsors/${DEFAULT_SPONSORS_YEAR}` },
    { label: 'Contact Us', to: '/contact' },
  ],
}
