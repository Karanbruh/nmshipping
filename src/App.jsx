import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BookingPage from './pages/BookingPage'
import TournamentPage from './pages/TournamentPage'
import CricketNewsPage from './pages/CricketNewsPage'
import GalleryPage from './pages/GalleryPage'
import AlbumPage from './components/gallery/AlbumPage'
import SponsorsPage from './pages/SponsorsPage'
import { DEFAULT_GALLERY_YEAR } from './constants/gallery'
import { DEFAULT_SPONSORS_YEAR } from './constants/sponsors'

function App() {
  return (
    <BrowserRouter>
      <div className="page-wrap">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/tournament" element={<TournamentPage />} />
          <Route path="/tournament/:year" element={<TournamentPage />} />
          <Route path="/cricket-news" element={<CricketNewsPage />} />
          <Route path="/gallery" element={<Navigate to={`/gallery/${DEFAULT_GALLERY_YEAR}`} replace />} />
          <Route path="/gallery/:year" element={<GalleryPage />} />
          <Route path="/gallery/:year/:slug" element={<AlbumPage />} />
          <Route path="/sponsors" element={<Navigate to={`/sponsors/${DEFAULT_SPONSORS_YEAR}`} replace />} />
          <Route path="/sponsors/:year" element={<SponsorsPage />} />
        </Routes>
        <Footer />
        <WhatsAppFab />
      </div>
    </BrowserRouter>
  )
}

export default App
