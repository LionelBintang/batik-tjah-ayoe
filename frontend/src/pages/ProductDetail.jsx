import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import products from '../data/products.json'
import { sizeCharts, jenisUkuran } from '../data/sizeChart'
import { useCart } from '../context/CartContext'
import { rupiah } from '../utils/format'
import './ProductDetail.css'

function ProductDetail() {
  const { id } = useParams()
  const { tambah } = useCart()
  const [ukuran, setUkuran] = useState('')
  const [jumlah, setJumlah] = useState(1)
  const [status, setStatus] = useState(null)

  const p = products.find((x) => x.id === id)

  if (!p) {
    return (
      <section className="detail">
        <h1>Produk tidak ditemukan</h1>
        <p className="detail-desc">Produk yang kamu cari tidak ada.</p>
        <Link to="/katalog" className="btn">Kembali ke Katalog</Link>
      </section>
    )
  }

  const ukuranList = p.ukuran_tersedia.split(',')
  const chart = sizeCharts[jenisUkuran[p.kategori] || 'atasan']

  const handleTambah = () => {
    if (!ukuran) {
      setStatus({ tipe: 'error', teks: 'Pilih ukuran dulu ya.' })
      return
    }
    tambah(p, ukuran, jumlah)
    setStatus({ tipe: 'success', teks: 'Berhasil ditambahkan ke keranjang.' })
  }

  return (
    <section className="detail">
      <Link to="/katalog" className="back-link">← Kembali ke katalog</Link>

      <div className="detail-main">
        <div className="detail-img">
          {p.gambar_url ? (
            <img src={p.gambar_url} alt={p.nama_produk} />
          ) : (
            <span>Foto produk</span>
          )}
        </div>

        <div className="detail-info">
          <h1>{p.nama_produk}</h1>
          <p className="detail-price">{rupiah(p.harga)}</p>
          <p className="detail-desc">{p.deskripsi}</p>

          <dl className="detail-specs">
            <dt>Kategori</dt><dd>{p.kategori}</dd>
            <dt>Bahan</dt><dd>{p.bahan}</dd>
            <dt>Warna</dt><dd>{p.warna}</dd>
            <dt>Cocok untuk</dt><dd className="cap">{p.occasion}</dd>
          </dl>

          <p className="detail-label">Pilih ukuran</p>
          <div className="size-options">
            {ukuranList.map((u) => (
              <button
                key={u}
                type="button"
                className={'size-btn' + (ukuran === u ? ' active' : '')}
                onClick={() => {
                  setUkuran(u)
                  setStatus(null)
                }}
              >
                {u}
              </button>
            ))}
          </div>

          <p className="detail-label">Jumlah</p>
          <div className="qty detail-qty">
            <button type="button" onClick={() => setJumlah(Math.max(1, jumlah - 1))}>−</button>
            <span>{jumlah}</span>
            <button type="button" onClick={() => setJumlah(Math.min(10, jumlah + 1))}>+</button>
          </div>

          <button className="btn detail-add" onClick={handleTambah}>
            Tambah ke Keranjang
          </button>

          {status && (
            <p className={'status ' + status.tipe}>
              {status.teks}{' '}
              {status.tipe === 'success' && <Link to="/keranjang">Lihat keranjang</Link>}
            </p>
          )}
        </div>
      </div>

      <div className="detail-section">
        <h2>Panduan Perawatan</h2>
        <p>{p.perawatan}</p>
      </div>

      <div className="detail-section">
        <h2>{chart.judul}</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {chart.kolom.map((k) => (
                  <th key={k}>{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.baris.map((baris) => (
                <tr key={baris[0]} className={ukuran === baris[0] ? 'row-active' : ''}>
                  {baris.map((sel, idx) => (
                    <td key={idx}>{sel}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          Ukuran contoh untuk prototype, bisa berbeda 1-2 cm dari produk asli.
        </p>
      </div>
    </section>
  )
}

export default ProductDetail

