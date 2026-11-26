import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import './Home.css'

function Home() {
  return (
    <>
      <section className="hero">
        <img src={logo} alt="Logo Batik Tjah Ayoe" className="hero-logo" />
        <p className="script">batik untuk gaya sehari-hari</p>
        <h1>Koleksi Terbaru</h1>
        <Link to="/katalog" className="btn">Lihat Koleksi</Link>
      </section>

      <section className="section">
        <h2>Tentang Kami</h2>
        <p className="section-text">
          Tjah Ayoe memadukan wastra batik tradisional dengan gaya
          berpakaian sehari-hari, untuk generasi muda yang ingin tampil
          berkarakter.
        </p>
      </section>

      <section className="section section-card">
        <h2>Koleksi Pilihan</h2>
        <div className="grid">
          <div className="card-placeholder">Produk 1</div>
          <div className="card-placeholder">Produk 2</div>
          <div className="card-placeholder">Produk 3</div>
        </div>
      </section>
    </>
  )
}

export default Home