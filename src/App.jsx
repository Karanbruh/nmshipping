import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BookingPage from './pages/BookingPage'
import TournamentPage from './pages/TournamentPage'
import CricketNewsPage from './pages/CricketNewsPage'
import GalleryPage from './pages/GalleryPage'
import SponsorsPage from './pages/SponsorsPage'

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
          <Route path="/cricket-news" element={<CricketNewsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
