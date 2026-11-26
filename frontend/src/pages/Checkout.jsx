import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { rupiah } from '../utils/format'
import './Checkout.css'

// Simulasi kirim pesanan. Nanti diganti simpan ke database (Supabase).
function kirimPesananDummy() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!navigator.onLine) {
        reject(new Error('Koneksi terputus'))
      } else {
        resolve({ id: 'ORD-' + Date.now().toString().slice(-6) })
      }
    }, 1500)
  })
}

function validasi(form) {
  const err = {}
  if (form.nama.trim().length < 3) {
    err.nama = 'Nama minimal 3 huruf.'
  }
  const wa = form.whatsapp.replace(/[\s-]/g, '')
  if (!/^(\+62|62|0)8\d{8,12}$/.test(wa)) {
    err.whatsapp = 'Nomor WhatsApp tidak valid, contoh: 081234567890.'
  }
  if (form.alamat.trim().length < 10) {
    err.alamat = 'Alamat minimal 10 karakter.'
  }
  return err
}

function Checkout() {
  const { items, totalHarga, kosongkan } = useCart()
  const [form, setForm] = useState({ nama: '', whatsapp: '', alamat: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [pesan, setPesan] = useState('')
  const [pesanan, setPesanan] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validasi(form)
    setErrors(err)
    if (Object.keys(err).length > 0) return

    setStatus('loading')
    setPesan('')
    try {
      const hasil = await kirimPesananDummy()
      setPesanan({ id: hasil.id, nama: form.nama.trim(), items, total: totalHarga })
      kosongkan()
      setStatus('success')
    } catch (error) {
      setStatus('error')
      setPesan(error.message + '. Silakan coba lagi.')
    }
  }

  // Tampilan setelah pesanan berhasil
  if (pesanan) {
    return (
      <section className="checkout checkout-done">
        <h1>Pesanan Diterima</h1>
        <p className="checkout-center">
          Terima kasih, {pesanan.nama}! Nomor pesanan simulasi: <strong>{pesanan.id}</strong>
        </p>
        <div className="order-summary">
          <h2>Ringkasan</h2>
          {pesanan.items.map((i) => (
            <div className="order-line" key={i.id + '-' + i.ukuran}>
              <span>{i.nama_produk} ({i.ukuran}) x{i.jumlah}</span>
              <span>{rupiah(i.harga * i.jumlah)}</span>
            </div>
          ))}
          <div className="order-total">
            <span>Total</span>
            <span>{rupiah(pesanan.total)}</span>
          </div>
        </div>
        <p className="status success">
          Ini hanya simulasi. Tidak ada pembayaran atau pengiriman sungguhan.
        </p>
        <Link to="/katalog" className="btn">Kembali ke Katalog</Link>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="checkout checkout-done">
        <h1>Checkout</h1>
        <p className="checkout-center">Keranjang masih kosong.</p>
        <Link to="/katalog" className="btn">Mulai Belanja</Link>
      </section>
    )
  }

  const sedangProses = status === 'loading'

  return (
    <section className="checkout">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="nama">Nama lengkap</label>
            <input id="nama" name="nama" value={form.nama} onChange={handleChange} disabled={sedangProses} />
            {errors.nama && <span className="field-error">{errors.nama}</span>}
          </div>

          <div className="field">
            <label htmlFor="whatsapp">Nomor WhatsApp</label>
            <input id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={handleChange} disabled={sedangProses} />
            {errors.whatsapp && <span className="field-error">{errors.whatsapp}</span>}
          </div>

          <div className="field">
            <label htmlFor="alamat">Alamat pengiriman</label>
            <textarea id="alamat" name="alamat" rows="4" value={form.alamat} onChange={handleChange} disabled={sedangProses} />
            {errors.alamat && <span className="field-error">{errors.alamat}</span>}
          </div>

          <button type="submit" className="btn" disabled={sedangProses}>
            {sedangProses ? 'Memproses...' : 'Buat Pesanan (Simulasi)'}
          </button>

          {sedangProses && <p className="status loading">Sedang memproses pesanan...</p>}
          {status === 'error' && <p className="status error">{pesan}</p>}
        </form>

        <aside className="order-summary">
          <h2>Pesanan Kamu</h2>
          {items.map((i) => (
            <div className="order-line" key={i.id + '-' + i.ukuran}>
              <span>{i.nama_produk} ({i.ukuran}) x{i.jumlah}</span>
              <span>{rupiah(i.harga * i.jumlah)}</span>
            </div>
          ))}
          <div className="order-total">
            <span>Total</span>
            <span>{rupiah(totalHarga)}</span>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Checkout