import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/katalog" element={<Catalog />} />
          <Route path="/keranjang" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App