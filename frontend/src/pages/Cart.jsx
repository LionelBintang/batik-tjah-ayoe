import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { rupiah } from '../utils/format'
import './Cart.css'

function Cart() {
  const { items, ubahJumlah, hapus, totalHarga } = useCart()

  if (items.length === 0) {
    return (
      <section className="cart">
        <h1>Keranjang</h1>
        <p className="empty">Keranjang masih kosong.</p>
        <div className="cart-center">
          <Link to="/katalog" className="btn">Mulai Belanja</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="cart">
      <h1>Keranjang</h1>

      {items.map((i) => (
        <div className="cart-item" key={i.id + '-' + i.ukuran}>
          <div className="cart-thumb">
            {i.gambar_url && <img src={i.gambar_url} alt={i.nama_produk} />}
          </div>

          <div>
            <p className="cart-name">{i.nama_produk}</p>
            <p className="cart-meta">Ukuran {i.ukuran} · {rupiah(i.harga)}</p>
            <div className="qty">
              <button type="button" onClick={() => ubahJumlah(i.id, i.ukuran, i.jumlah - 1)}>−</button>
              <span>{i.jumlah}</span>
              <button type="button" onClick={() => ubahJumlah(i.id, i.ukuran, i.jumlah + 1)}>+</button>
            </div>
          </div>

          <div className="cart-right">
            <p className="cart-subtotal">{rupiah(i.harga * i.jumlah)}</p>
            <button type="button" className="link-btn" onClick={() => hapus(i.id, i.ukuran)}>
              Hapus
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <span>Total</span>
        <strong>{rupiah(totalHarga)}</strong>
      </div>

      <div className="cart-actions">
        <Link to="/checkout" className="btn">Lanjut ke Checkout</Link>
      </div>
    </section>
  )
}

export default Cart