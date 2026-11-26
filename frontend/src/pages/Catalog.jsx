import { useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products.json'
import './Catalog.css'

const unique = (key) => [...new Set(products.map((p) => p[key]))]
const kategoriList = unique('kategori')
const warnaList = unique('warna')
const ukuranList = ['S', 'M', 'L', 'XL']
const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')

function Catalog() {
  const [cari, setCari] = useState('')
  const [kategori, setKategori] = useState('')
  const [warna, setWarna] = useState('')
  const [ukuran, setUkuran] = useState('')
  const [hargaMaks, setHargaMaks] = useState('')

  const hasil = products.filter((p) => {
    const kataKunci = cari.toLowerCase()
    const cocokCari =
      p.nama_produk.toLowerCase().includes(kataKunci) ||
      p.kategori.toLowerCase().includes(kataKunci)
    const cocokKategori = !kategori || p.kategori === kategori
    const cocokWarna = !warna || p.warna === warna
    const cocokUkuran = !ukuran || p.ukuran_tersedia.split(',').includes(ukuran)
    const cocokHarga = !hargaMaks || p.harga <= Number(hargaMaks)
    return cocokCari && cocokKategori && cocokWarna && cocokUkuran && cocokHarga
  })

  const reset = () => {
    setCari('')
    setKategori('')
    setWarna('')
    setUkuran('')
    setHargaMaks('')
  }

  return (
    <section className="catalog">
      <h1>Katalog Produk</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Cari produk, mis. kemeja, outer..."
          value={cari}
          onChange={(e) => setCari(e.target.value)}
        />
        <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
          <option value="">Semua kategori</option>
          {kategoriList.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <select value={warna} onChange={(e) => setWarna(e.target.value)}>
          <option value="">Semua warna</option>
          {warnaList.map((w) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
        <select value={ukuran} onChange={(e) => setUkuran(e.target.value)}>
          <option value="">Semua ukuran</option>
          {ukuranList.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
        <select value={hargaMaks} onChange={(e) => setHargaMaks(e.target.value)}>
          <option value="">Semua harga</option>
          <option value="250000">Maks Rp 250.000</option>
          <option value="300000">Maks Rp 300.000</option>
          <option value="400000">Maks Rp 400.000</option>
        </select>
        <button className="btn" onClick={reset}>Reset</button>
      </div>

      {hasil.length === 0 ? (
        <p className="empty">
          Produk tidak ditemukan. Coba ubah kata kunci atau filter.
        </p>
      ) : (
        <div className="product-grid">
          {hasil.map((p) => (
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
      )}
    </section>
  )
}

export default Catalog