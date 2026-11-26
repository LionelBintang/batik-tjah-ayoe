import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useCart } from '../context/CartContext'
import './Navbar.css'

function Navbar() {
  const { totalItem } = useCart()

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Batik Tjah Ayoe" />
      </Link>
      <nav className="navbar-links">
        <NavLink to="/">Beranda</NavLink>
        <NavLink to="/katalog">Katalog</NavLink>
        <NavLink to="/keranjang">
          Keranjang
          {totalItem > 0 && <span className="cart-badge">{totalItem}</span>}
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar