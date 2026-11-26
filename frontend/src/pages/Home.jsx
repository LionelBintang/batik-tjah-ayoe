import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import products from '../data/products.json'
import { rupiah } from '../utils/format'
import './Catalog.css'
import './Home.css'

// Ganti ID di sini kalau mau produk pilihan yang lain
const unggulanIds = ['P001', 'P005', 'P006']
const unggulan = unggulanIds
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean)

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
        <div className="product-grid featured">
          {unggulan.map((p) => (
            <Link to={`/produk/${p.id}`} key={p.id} className="product-card">
              <div className="product-img">
                {p.gambar_url ? (
                  <img src={p.gambar_url} alt={p.nama_produk} />
                ) : (
                  <span>Foto produk</span>
                )}
              </div>
              <h3>{p.nama_produk}</h3>
              <p className="product-meta">{p.kategori} · {p.warna}</p>
              <p className="product-price">{rupiah(p.harga)}</p>
            </Link>
          ))}
        </div>
        <div className="featured-more">
          <Link to="/katalog" className="btn">Lihat Semua Produk</Link>
        </div>
      </section>
    </>
  )
}

export default Home